import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductDetailPageProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <div className="flex items-center space-x-1 text-amber-500">
        {[...Array(fullStars)].map((_, i) => <i key={`full-${i}`} className="fas fa-star"></i>)}
        {halfStar && <i className="fas fa-star-half-alt"></i>}
        {[...Array(emptyStars)].map((_, i) => <i key={`empty-${i}`} className="far fa-star text-gray-300"></i>)}
        <span className="text-gray-500 text-sm ml-2">({rating.toFixed(1)})</span>
      </div>
    );
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, onAddToCart }) => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find(p => p.id === productId);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl text-gray-600 mb-4">لم يتم العثور على المنتج.</h2>
        <Link to="/shop" className="bg-black text-white px-6 py-3 rounded-sm hover:bg-amber-600 transition-colors">
           العودة إلى المتجر
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-10">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
            <Link to="/" className="hover:text-amber-600">الرئيسية</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-amber-600">المتجر</Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">{product.name}</span>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="bg-white rounded-sm overflow-hidden border border-gray-100 sticky top-24">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-auto max-h-[80vh] object-contain mx-auto"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-8 py-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 font-serif">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-gray-300">|</span>
                <span className="text-sm text-amber-600 font-bold uppercase tracking-wider">{product.category}</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 flex items-baseline gap-4">
                <span>{product.price} ج.م</span>
                {product.originalPrice && (
                <del className="text-xl text-gray-400 font-normal">{product.originalPrice} ج.م</del>
                )}
            </div>
          </div>

          <div className="border-t border-b border-gray-100 py-6">
             <p className="text-gray-600 leading-loose text-lg">{product.description}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border border-gray-300 rounded-sm w-fit">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-3 text-xl hover:bg-gray-100 transition-colors text-gray-600">-</button>
              <input type="number" value={quantity} readOnly className="w-16 text-center border-none outline-none font-bold text-gray-900" />
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-3 text-xl hover:bg-gray-100 transition-colors text-gray-600">+</button>
            </div>
            <button 
              onClick={() => onAddToCart(product, quantity)}
              className="flex-1 bg-black text-white font-bold py-3 px-8 rounded-sm hover:bg-amber-600 transition-colors flex items-center justify-center gap-3 uppercase tracking-wider shadow-lg hover:shadow-amber-600/30"
            >
              <i className="fas fa-shopping-bag"></i>
              <span>إضافة إلى السلة</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-6 text-sm text-gray-500">
              <div className="flex items-center gap-2"><i className="fas fa-check-circle text-green-600"></i> متوفر في المخزون</div>
              <div className="flex items-center gap-2"><i className="fas fa-shield-alt text-gray-400"></i> ضمان الجودة</div>
              <div className="flex items-center gap-2"><i className="fas fa-truck text-gray-400"></i> شحن سريع</div>
              <div className="flex items-center gap-2"><i className="fas fa-lock text-gray-400"></i> دفع آمن</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;