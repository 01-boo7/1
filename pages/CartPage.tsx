import React from 'react';
import { Link } from 'react-router-dom';
import type { CartItem } from '../types';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center mt-10">
        <div className="mb-6 bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
            <i className="fas fa-shopping-bag text-4xl text-gray-300"></i>
        </div>
        <h2 className="text-3xl text-gray-900 font-bold mb-2">سلة التسوق فارغة</h2>
        <p className="text-gray-500 mb-8">لم تقم بإضافة أي منتجات بعد.</p>
        <Link to="/shop" className="bg-amber-600 text-white font-bold py-3 px-10 rounded-sm hover:bg-amber-700 transition-colors shadow-lg hover:shadow-amber-600/30">
          ابدأ التسوق
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 mt-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 border-r-4 border-amber-500 pr-4">سلة التسوق</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-bold text-gray-700">
            <div className="col-span-6">المنتج</div>
            <div className="col-span-2 text-center">السعر</div>
            <div className="col-span-2 text-center">الكمية</div>
            <div className="col-span-2 text-center">الإجمالي</div>
          </div>
          {cartItems.map(item => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
              <div className="col-span-6 flex items-center gap-4">
                <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <i className="fas fa-times"></i>
                </button>
                <img src={item.imageUrl} alt={item.name} className="w-20 h-24 object-cover rounded-sm border border-gray-200" />
                <div>
                  <Link to={`/product/${item.id}`} className="font-bold text-gray-900 hover:text-amber-600 transition-colors block mb-1">{item.name}</Link>
                  <span className="text-xs text-gray-500 block md:hidden">{item.price} ج.م</span>
                </div>
              </div>
              
              <div className="hidden md:block col-span-2 text-center text-gray-600 font-medium">
                {item.price} ج.م
              </div>

              <div className="col-span-6 md:col-span-2 flex justify-center">
                <div className="flex items-center border border-gray-300 rounded-sm">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-100 text-gray-600">-</button>
                  <input type="number" value={item.quantity} readOnly className="w-10 text-center border-none outline-none font-bold text-sm text-gray-900 bg-transparent" />
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-100 text-gray-600">+</button>
                </div>
              </div>

              <div className="col-span-6 md:col-span-2 text-center font-bold text-amber-600 flex justify-between md:block items-center md:mt-0 mt-2">
                 <span className="md:hidden text-gray-500 text-sm">الإجمالي:</span>
                 {item.price * item.quantity} ج.م
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">ملخص الطلب</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
                <span>المجموع الفرعي</span>
                <span>{subtotal} ج.م</span>
            </div>
            <div className="flex justify-between text-gray-600">
                <span>الشحن</span>
                <span className="text-green-600 font-medium">مجاني</span>
            </div>
          </div>
          <div className="flex justify-between text-gray-900 font-bold text-xl border-t border-gray-100 pt-4 mb-6">
            <span>الإجمالي</span>
            <span>{subtotal} ج.م</span>
          </div>
          <Link to="/checkout" className="block text-center w-full bg-black text-white font-bold py-4 rounded-sm hover:bg-amber-600 transition-colors shadow-lg">
            التقدم لإتمام الطلب
          </Link>
          <div className="mt-4 text-center">
              <Link to="/shop" className="text-sm text-gray-500 hover:text-amber-600 underline decoration-dotted">متابعة التسوق</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;