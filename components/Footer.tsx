import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800 mt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-12 after:h-1 after:bg-amber-500">النشرة الإخبارية</h4>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">كن أول من يعرف عن العروض، إطلاق المنتجات الجديدة والعروض الحصرية! انضم لعائلة TAG الآن.</p>
            <form className="flex relative">
              <input 
                type="email" 
                placeholder="أدخل بريدك الإلكتروني..." 
                className="w-full bg-neutral-800 border border-neutral-700 text-white p-3 rounded-r-sm focus:outline-none focus:border-amber-500 transition-colors text-sm"
              />
              <button type="submit" className="bg-amber-600 text-white px-6 py-3 rounded-l-sm hover:bg-amber-700 transition-colors font-bold text-sm">
                اشترك
              </button>
            </form>
          </div>
          
          {/* About */}
          <div>
             <h4 className="text-lg font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-12 after:h-1 after:bg-amber-500">من هو TAG</h4>
            <p className="text-gray-400 text-sm leading-relaxed">TAG علامة أزياء رجالية تجسد التمرد، القوة، والهوية الشرقية بلمسة فخامة عصرية. ليست مجرد ملابس، بل رسالة.</p>
          </div>

          {/* Contact */}
          <div>
             <h4 className="text-lg font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-12 after:h-1 after:bg-amber-500">تواصل معنا</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-amber-500">
                  <i className="fa fa-phone"></i>
                </div>
                <span>01014907662</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-amber-500">
                  <i className="fa fa-envelope"></i>
                </div>
                <span>youssefamer968@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
             <h4 className="text-lg font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-12 after:h-1 after:bg-amber-500">تابعنا</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-amber-600 hover:text-white transition-all duration-300"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-amber-600 hover:text-white transition-all duration-300"><i className="fab fa-instagram"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-amber-600 hover:text-white transition-all duration-300"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black py-6 border-t border-neutral-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© جميع الحقوق محفوظة لـ Rakmyat 2025</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="uppercase tracking-widest">نقبل الدفع عبر:</span>
            <i className="fab fa-cc-visa text-2xl text-white"></i>
            <i className="fab fa-cc-mastercard text-2xl text-white"></i>
            <i className="fab fa-cc-paypal text-2xl text-white"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;