import React, { useState, useEffect } from 'react';
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
import { db } from './firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';

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

  // Initialize Cart from LocalStorage (Cart is still local for guests)
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Fetch Products from Firebase Firestore (Real-time)
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(collection(db, "products"), async (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as Product));
      
      // If database is empty, seed it with initial data
      if (productsData.length === 0) {
         // Check a local flag to prevent infinite re-seeding loops in edge cases, 
         // though checking db length is usually sufficient.
         const hasSeeded = localStorage.getItem('firebase_seeded');
         
         if (!hasSeeded) {
            console.log("Database empty. Seeding with initial products...");
            try {
                const initialProducts = await generateInitialProducts();
                // Batch add to Firestore
                for (const p of initialProducts) {
                    const { id, ...data } = p;
                    // We use setDoc with the ID from the generator to keep IDs clean (e.g., 'prod-1')
                    // or we could use addDoc to let Firebase generate IDs.
                    await setDoc(doc(db, "products", id), data);
                }
                localStorage.setItem('firebase_seeded', 'true');
            } catch (err) {
                console.error("Error seeding database:", err);
                setIsLoading(false);
            }
         } else {
             setIsLoading(false);
         }
      } else {
        setProducts(productsData);
        setIsLoading(false);
      }
    }, (error) => {
        console.error("Firebase error:", error);
        setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateLocalStorageCart = (data: any) => {
    localStorage.setItem('cart', JSON.stringify(data));
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
      updateLocalStorageCart(updatedCart);
      return updatedCart;
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0);
      updateLocalStorageCart(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      updateLocalStorageCart(updatedCart);
      return updatedCart;
    });
  };
  
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Firebase Operations
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
        // Add a new document with a generated id
        await addDoc(collection(db, "products"), {
            ...productData,
            rating: Math.floor(Math.random() * 2) + 4, // Default random rating for new items
        });
    } catch (e) {
        console.error("Error adding document: ", e);
        alert("حدث خطأ أثناء إضافة المنتج");
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
        const { id, ...data } = updatedProduct;
        await updateDoc(doc(db, "products", id), data as any);
    } catch (e) {
        console.error("Error updating document: ", e);
        alert("حدث خطأ أثناء تحديث المنتج");
    }
  };

  const deleteProduct = async (id: string) => {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذا المنتج؟')) {
        try {
            await deleteDoc(doc(db, "products", id));
        } catch (e) {
            console.error("Error deleting document: ", e);
            alert("حدث خطأ أثناء حذف المنتج");
        }
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