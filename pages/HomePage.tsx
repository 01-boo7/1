import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  products: Product[];
  isLoading: boolean;
  onAddToCart: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, isLoading, onAddToCart }) => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
          <span className="block text-amber-400 font-bold tracking-[0.3em] text-sm md:text-base mb-4 uppercase">موضة 2025 الجديدة</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight font-serif">
            تمرد، قوة، <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">وهوية</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            اكتشف تشكيلة Prand Hima الحصرية التي تجمع بين الأصالة والعصرية. صممت لتمنحك الثقة في كل خطوة.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
                to="/shop" 
                className="bg-amber-600 text-white font-bold py-4 px-10 rounded-sm hover:bg-amber-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/20 uppercase tracking-wider"
            >
                تسوق الآن
            </Link>
            <Link 
                to="/shop" 
                className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-sm hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wider"
            >
                عرض المجموعة
            </Link>
          </div>
        </div>
      </div>

      {/* Features Strip */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100">
                <div className="p-4">
                    <i className="fas fa-truck text-3xl text-amber-600 mb-3"></i>
                    <h3 className="font-bold text-gray-900 mb-1">شحن سريع ومجاني</h3>
                    <p className="text-sm text-gray-500">للطلبات التي تزيد عن 1000 جنيه</p>
                </div>
                <div className="p-4">
                    <i className="fas fa-undo text-3xl text-amber-600 mb-3"></i>
                    <h3 className="font-bold text-gray-900 mb-1">استبدال واسترجاع</h3>
                    <p className="text-sm text-gray-500">خلال 14 يوم من تاريخ الشراء</p>
                </div>
                <div className="p-4">
                    <i className="fas fa-headset text-3xl text-amber-600 mb-3"></i>
                    <h3 className="font-bold text-gray-900 mb-1">دعم فني 24/7</h3>
                    <p className="text-sm text-gray-500">فريقنا جاهز لمساعدتك دائماً</p>
                </div>
            </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">مختاراتنا لك</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">المنتجات الأكثر مبيعاً</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
            <Link to="/shop" className="inline-block border-b-2 border-black text-black font-bold pb-1 hover:text-amber-600 hover:border-amber-600 transition-colors text-lg">
                عرض كل المنتجات &larr;
            </Link>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="md:w-1/2 h-64 md:h-96">
                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" alt="Fashion Collection" className="w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-12 text-center md:text-right">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">تخفيضات نهاية الموسم</h3>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">احصل على خصم يصل إلى 50% على تشكيلة مختارة من الملابس الرجالية والنسائية. العرض ساري لفترة محدودة.</p>
                    <Link to="/shop" className="bg-black text-white font-bold py-3 px-8 rounded-sm hover:bg-amber-600 transition-colors">
                        اكتشف العروض
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;