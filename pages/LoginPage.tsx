import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLogin: (user: string, pass: string) => boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة.');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center" style={{ minHeight: 'calc(100vh - 10rem)' }}>
      <div className="w-full max-w-md bg-white p-8 rounded-sm shadow-xl border border-gray-200">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">تسجيل الدخول</h1>
            <p className="text-gray-500 text-sm">مرحباً بك في لوحة تحكم الإدارة</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-bold text-gray-700">اسم المستخدم</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
              autoComplete="username"
              placeholder="admin"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">كلمة المرور</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>
          {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded text-center border border-red-100">{error}</div>}
          <button type="submit" className="w-full bg-black text-white font-bold py-3 rounded-sm hover:bg-amber-600 transition-colors uppercase tracking-wider shadow-lg">
            دخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;