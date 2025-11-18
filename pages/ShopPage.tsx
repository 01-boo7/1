import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';

interface ShopPageProps {
  products: Product[];
  isLoading: boolean;
  searchQuery: string;
  onAddToCart: (product: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ products, isLoading, searchQuery, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortOrder, setSortOrder] = useState('menu_order');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const categoryMatch = activeCategory === 'الكل' || product.category === activeCategory;
      const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
      const searchMatch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return categoryMatch && priceMatch && searchMatch;
    });

    switch (sortOrder) {
      case 'price':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    return filtered;
  }, [products, activeCategory, priceRange, sortOrder, searchQuery]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-12 mt-16">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">المتجر</h1>
        <div className="h-1 w-20 bg-amber-500 mx-auto"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <Sidebar 
          onCategoryChange={setActiveCategory}
          onPriceChange={(min, max) => setPriceRange({ min, max })}
          activeCategory={activeCategory}
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-sm shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-2 sm:mb-0">
              عرض <span className="font-bold text-black">{filteredAndSortedProducts.length}</span> من كل النتائج
            </p>
            <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-gray-600">ترتيب حسب:</label>
                <select 
                id="sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-sm focus:ring-amber-500 focus:border-amber-500 block p-2 outline-none cursor-pointer"
                >
                <option value="menu_order">الافتراضي</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="price">السعر: من الأقل إلى الأعلى</option>
                <option value="price-desc">السعر: من الأعلى إلى الأقل</option>
                </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))
            ) : (
              <div className="sm:col-span-2 xl:col-span-3 text-center py-20 bg-white border border-gray-100 rounded-sm">
                <div className="text-gray-300 text-6xl mb-4"><i className="fas fa-search"></i></div>
                <p className="text-gray-500 text-lg">
                  {searchQuery ? `لا توجد نتائج بحث عن "${searchQuery}"` : "لا توجد منتجات تطابق اختياراتك."}
                </p>
                <button onClick={() => {setActiveCategory('الكل'); setPriceRange({min:0, max:1000})}} className="mt-4 text-amber-600 font-bold hover:underline">
                    إعادة تعيين الفلتر
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;