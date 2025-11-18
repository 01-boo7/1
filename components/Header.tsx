import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartItemCount: number;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, cartItemCount, isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-2 py-2 text-base font-semibold transition-colors duration-300 ${
      isActive ? 'text-amber-600' : 'text-gray-800 hover:text-amber-600'
    }`;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/shop');
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4 border-b border-gray-100'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo Area */}
          <div className="flex items-center gap-12">
            <NavLink to="/" className="text-3xl font-bold text-black tracking-widest flex items-center gap-2 group">
              <span className="border-2 border-black px-2 py-1 group-hover:border-amber-500 group-hover:text-amber-600 transition-all">TAG</span>
            </NavLink>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLink to="/" className={navLinkClass}>الرئيسية</NavLink>
              <NavLink to="/shop" className={navLinkClass}>المتجر</NavLink>
              <NavLink to="/admin" className={navLinkClass}>لوحة التحكم</NavLink>
              <NavLink to="/contact" className={navLinkClass}>اتصل بنا</NavLink>
            </nav>
          </div>

          {/* Actions Area */}
          <div className="flex items-center gap-5 text-gray-800">
            <div className="relative hidden lg:block group">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="ابحث عن منتج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-100 border-none text-gray-800 text-sm rounded-full py-2 pr-10 pl-4 focus:outline-none focus:ring-1 focus:ring-amber-500 w-48 transition-all duration-300 focus:w-64 focus:bg-white"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <i className="fa fa-search"></i>
                </span>
              </form>
            </div>

            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                <button onClick={handleLogout} className="hover:text-red-600 transition-colors" title="تسجيل الخروج">
                    <i className="fas fa-sign-out-alt text-xl"></i>
                </button>
                ) : (
                <NavLink to="/login" className="hover:text-amber-600 transition-colors" title="تسجيل الدخول">
                    <i className="far fa-user text-xl"></i>
                </NavLink>
                )}
                
                <NavLink to="/cart" className="relative hover:text-amber-600 transition-colors group">
                <i className="fas fa-shopping-bag text-xl"></i>
                {cartItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-white">
                    {cartItemCount}
                    </span>
                )}
                </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;