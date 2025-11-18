import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const orderDetails = location.state?.order;

  return (
    <div className="container mx-auto px-4 py-32 text-center mt-10">
      <div className="max-w-lg mx-auto bg-white p-10 rounded-sm shadow-lg border border-gray-100">
        <div className="w-24 h-24 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center border border-green-100">
          <i className="fas fa-check text-5xl text-green-500"></i>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">شكراً لطلبك!</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          لقد تم استلام طلبك بنجاح. سيقوم فريقنا بالتواصل معك قريباً جداً لتأكيد موعد التوصيل.
        </p>

        {orderDetails && (
             <div className="text-right bg-gray-50 p-6 rounded-sm mb-8 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">تفاصيل الطلب:</h3>
                <p className="text-sm text-gray-700 mb-2"><strong className="text-gray-900 ml-2">العميل:</strong> {orderDetails.customerDetails.name}</p>
                <p className="text-sm text-gray-700 mb-2"><strong className="text-gray-900 ml-2">إجمالي المبلغ:</strong> {orderDetails.total} ج.م</p>
                <p className="text-sm text-gray-700"><strong className="text-gray-900 ml-2">عدد العناصر:</strong> {orderDetails.items.length}</p>
             </div>
        )}

        <Link to="/shop" className="inline-block bg-black text-white font-bold py-3 px-10 rounded-sm hover:bg-amber-600 transition-colors uppercase tracking-wider">
          متابعة التسوق
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;