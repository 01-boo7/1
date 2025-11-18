import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { CartItem } from '../types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onCheckout: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, onCheckout }) => {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order placed:", { customerDetails, items: cartItems, total: subtotal });
    onCheckout();
    navigate('/order-confirmation', { state: { order: { customerDetails, items: cartItems, total: subtotal } } });
  };

  if (cartItems.length === 0) {
      return (
          <div className="container mx-auto px-4 py-32 text-center mt-10">
            <h2 className="text-2xl text-gray-900 font-bold mb-6">عفواً، السلة فارغة</h2>
            <Link to="/shop" className="bg-black text-white font-bold py-3 px-10 rounded-sm hover:bg-amber-600 transition-colors">
              اذهب للتسوق
            </Link>
          </div>
        );
  }

  return (
    <div className="container mx-auto px-4 py-12 mt-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">إتمام الطلب</h1>
        <p className="text-gray-500 mt-2">أكمل بياناتك لتأكيد طلبك</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Shipping Form */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <i className="far fa-address-card text-amber-600"></i> بيانات الشحن
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-700">الاسم الكامل</label>
              <input type="text" id="name" name="name" onChange={handleChange} required className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-colors" placeholder="مثال: محمد أحمد" />
            </div>
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-bold text-gray-700">العنوان بالتفصيل</label>
              <input type="text" id="address" name="address" onChange={handleChange} required className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-colors" placeholder="اسم الشارع، رقم المبنى، الشقة" />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-bold text-gray-700">رقم الهاتف</label>
              <input type="tel" id="phone" name="phone" onChange={handleChange} required className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-colors" placeholder="01xxxxxxxxx" />
            </div>
            <button type="submit" className="w-full mt-4 bg-amber-600 text-white font-bold py-4 rounded-sm hover:bg-amber-700 transition-colors shadow-lg text-lg">
              تأكيد الطلب (الدفع عند الاستلام)
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-8 rounded-sm border border-gray-200 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <i className="fas fa-receipt text-amber-600"></i> ملخص الطلب
          </h2>
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm border-b border-gray-200 pb-3 last:border-0">
                <div className="flex items-center gap-3">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-sm" />
                    <div>
                        <span className="block text-gray-800 font-semibold">{item.name}</span>
                        <span className="text-gray-500 text-xs">الكمية: {item.quantity}</span>
                    </div>
                </div>
                <span className="font-bold text-gray-900">{item.price * item.quantity} ج.م</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300 pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>المجموع الفرعي</span>
              <span>{subtotal} ج.م</span>
            </div>
             <div className="flex justify-between text-gray-600">
              <span>الشحن</span>
              <span>مجاني</span>
            </div>
            <div className="flex justify-between text-gray-900 font-bold text-xl pt-2">
              <span>الإجمالي</span>
              <span>{subtotal} ج.م</span>
            </div>
          </div>
          
           <div className="mt-6 bg-white p-4 rounded border border-gray-200 text-sm text-gray-600">
                <p><i className="fas fa-info-circle text-amber-600 ml-2"></i> الدفع نقداً عند الاستلام.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;