import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex text-amber-400 text-xs">
      {[...Array(fullStars)].map((_, i) => <i key={`full-${i}`} className="fas fa-star"></i>)}
      {halfStar && <i className="fas fa-star-half-alt"></i>}
      {[...Array(emptyStars)].map((_, i) => <i key={`empty-${i}`} className="far fa-star"></i>)}
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div className="group relative bg-white rounded-sm transition-all duration-300 hover:shadow-xl hover:shadow-gray-200 border border-transparent hover:border-gray-100">
      <Link to={`/product/${product.id}`} className="block overflow-hidden relative">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.originalPrice && (
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
            )}
            {product.rating >= 4.5 && (
                 <span className="bg-black text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                 متميز
                 </span>
            )}
        </div>

        {/* Image */}
        <div className="relative h-[400px] overflow-hidden bg-gray-100">
            <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            />
             {/* Overlay Actions */}
            <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center gap-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/40 to-transparent pb-6">
                <button 
                    onClick={handleAddToCartClick} 
                    className="bg-white text-black hover:bg-amber-500 hover:text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-colors duration-200" 
                    title="إضافة إلى السلة"
                >
                    <i className="fas fa-shopping-bag"></i>
                </button>
                <Link 
                    to={`/product/${product.id}`}
                    className="bg-white text-black hover:bg-amber-500 hover:text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-colors duration-200"
                    title="عرض التفاصيل"
                >
                    <i className="fas fa-eye"></i>
                </Link>
            </div>
        </div>
        
        {/* Content */}
        <div className="p-4 text-center">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.category}</p>
          <h3 className="text-base font-bold text-gray-900 mb-2 truncate group-hover:text-amber-600 transition-colors">{product.name}</h3>
          <div className="flex justify-center mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -mt-8 w-full left-0 bg-white/90 py-1 md:static md:bg-transparent md:mt-0 md:w-auto md:opacity-100">
             <StarRating rating={product.rating} />
          </div>
          <div className="flex justify-center items-center gap-2">
            <span className="text-lg font-bold text-gray-900">{product.price} <span className="text-xs font-normal">ج.م</span></span>
            {product.originalPrice && (
              <del className="text-sm text-gray-400">{product.originalPrice} ج.م</del>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;