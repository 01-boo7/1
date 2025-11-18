import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AdminPage from './pages/AdminPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import type { Product, CartItem } from './types';
import { generateInitialProducts } from './services/geminiService';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('isAdminAuthenticated') === 'true';
  });

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const fetchAndSetProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        const initialProducts = await generateInitialProducts();
        setProducts(initialProducts);
        localStorage.setItem('products', JSON.stringify(initialProducts));
      }
    } catch (error) {
        console.error("Failed to load products:", error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndSetProducts();
  }, [fetchAndSetProducts]);

  const updateLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity }];
      }
      updateLocalStorage('cart', updatedCart);
      return updatedCart;
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0);
      updateLocalStorage('cart', updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      updateLocalStorage('cart', updatedCart);
      return updatedCart;
    });
  };
  
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: Math.floor(Math.random() * 2) + 4,
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    updateLocalStorage('products', updatedProducts);
  };

  const updateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(updatedProducts);
    updateLocalStorage('products', updatedProducts);
  };

  const deleteProduct = (id: string) => {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذا المنتج؟')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      updateLocalStorage('products', updatedProducts);
    }
  };

  const handleLogin = (user: string, pass: string): boolean => {
    if (user === 'admin' && pass === 'password') {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    setIsAuthenticated(false);
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          cartItemCount={cartItemCount}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout} 
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/" element={<HomePage products={products} isLoading={isLoading} onAddToCart={addToCart} />} />
            <Route path="/shop" element={<ShopPage products={products} isLoading={isLoading} searchQuery={searchQuery} onAddToCart={addToCart} />} />
            <Route path="/product/:productId" element={<ProductDetailPage products={products} onAddToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cartItems={cart} onUpdateQuantity={updateCartQuantity} onRemoveItem={removeFromCart} />} />
            <Route path="/checkout" element={<CheckoutPage cartItems={cart} onCheckout={clearCart} />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/admin" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminPage 
                  products={products}
                  onAddProduct={addProduct}
                  onUpdateProduct={updateProduct}
                  onDeleteProduct={deleteProduct}
                />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={<div className="text-center p-16 text-2xl">صفحة اتصل بنا</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;