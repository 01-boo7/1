import React, { useState } from 'react';
import { CATEGORIES } from '../types';

interface SidebarProps {
  onCategoryChange: (category: string) => void;
  onPriceChange: (min: number, max: number) => void;
  activeCategory: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onCategoryChange, onPriceChange, activeCategory }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handlePriceFilter = () => {
    onPriceChange(minPrice, maxPrice);
  };
  
  return (
    <aside className="w-full lg:w-64 xl:w-72 p-6 bg-white border border-gray-200 rounded-sm h-fit sticky top-24">
      <div className="mb-8">
        <h4 className="text-lg font-bold text-gray-900 mb-4 border-r-4 border-amber-500 pr-3">التصنيفات</h4>
        <ul className="space-y-1">
          {CATEGORIES.map(category => (
            <li key={category}>
              <button
                onClick={() => onCategoryChange(category)}
                className={`w-full text-right px-3 py-2 rounded-sm transition-all duration-200 text-sm flex justify-between items-center group ${
                  activeCategory === category
                    ? 'bg-gray-100 text-amber-700 font-bold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-amber-600'
                }`}
              >
                <span>{category}</span>
                <i className={`fas fa-chevron-left text-xs ${activeCategory === category ? 'text-amber-500' : 'text-gray-300 group-hover:text-amber-500'}`}></i>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4 border-r-4 border-amber-500 pr-3">تصفية حسب السعر</h4>
        <div className="price-slider-wrapper">
          <div className="relative mb-6">
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
             <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
               <span>{minPrice} ج.م</span>
               <span>{maxPrice} ج.م</span>
             </div>
          </div>
          <button 
            onClick={handlePriceFilter}
            className="w-full bg-black text-white font-bold py-2 px-4 rounded-sm hover:bg-amber-600 transition-colors uppercase text-xs tracking-wider"
          >
            تطبيق التصفية
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;