import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { CATEGORIES } from '../types';

interface AdminPageProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formState, setFormState] = useState<Omit<Product, 'id' | 'rating'>>({
    name: '',
    category: CATEGORIES[1],
    price: 0,
    originalPrice: undefined,
    imageUrl: '',
    description: '',
  });

  useEffect(() => {
    if (isEditing) {
      const productToEdit = products.find(p => p.id === isEditing);
      if (productToEdit) {
        setFormState({
          name: productToEdit.name,
          category: productToEdit.category,
          price: productToEdit.price,
          originalPrice: productToEdit.originalPrice,
          imageUrl: productToEdit.imageUrl,
          description: productToEdit.description,
        });
      }
    } else {
      resetForm();
    }
  }, [isEditing, products]);

  const resetForm = () => {
    setIsEditing(null);
    setFormState({
      name: '',
      category: CATEGORIES[1],
      price: 0,
      originalPrice: undefined,
      imageUrl: '',
      description: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: name === 'price' || name === 'originalPrice' ? (value ? parseFloat(value) : undefined) : value }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormState(prev => ({ ...prev, imageUrl: reader.result as string }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      onUpdateProduct({ id: isEditing, rating: products.find(p => p.id === isEditing)?.rating || 0, ...formState });
    } else {
      onAddProduct({ ...formState, rating: 0 });
    }
    resetForm();
  };

  return (
    <div className="container mx-auto px-4 py-12 mt-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 border-r-4 border-amber-500 pr-4">لوحة تحكم المنتجات</h1>
        <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold">
            {products.length} منتج
        </div>
      </div>

      {/* Product Form */}
      <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-200 mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
            {isEditing ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
             <label className="text-sm font-bold text-gray-600">اسم المنتج</label>
             <input type="text" name="name" value={formState.name} onChange={handleChange} placeholder="مثال: تي شيرت قطني" required className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors" />
          </div>
          <div className="space-y-1">
             <label className="text-sm font-bold text-gray-600">التصنيف</label>
             <select name="category" value={formState.category} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors">
                {CATEGORIES.filter(c => c !== "الكل").map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="space-y-1">
             <label className="text-sm font-bold text-gray-600">السعر الحالي</label>
             <input type="number" name="price" value={formState.price || ''} onChange={handleChange} placeholder="0.00" required className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors" />
          </div>
          <div className="space-y-1">
             <label className="text-sm font-bold text-gray-600">السعر الأصلي (قبل الخصم)</label>
             <input type="number" name="originalPrice" value={formState.originalPrice || ''} onChange={handleChange} placeholder="اختياري" className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors" />
          </div>
          
          <div className="md:col-span-2 space-y-1">
            <label className="text-sm font-bold text-gray-600">الوصف</label>
            <textarea name="description" value={formState.description} onChange={handleChange} placeholder="أدخل وصفاً جذاباً للمنتج..." required rows={4} className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors" />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-sm font-bold text-gray-600">صورة المنتج</label>
            <div className="flex flex-col gap-3">
                <input type="text" name="imageUrl" value={formState.imageUrl} onChange={handleChange} placeholder="رابط الصورة المباشر" className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors" />
                <div className="text-center text-gray-500 text-sm">- أو -</div>
                <input type="file" onChange={handleImageUpload} accept="image/*" className="w-full text-sm text-gray-500 file:ml-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer"/>
            </div>
          </div>
          
          <div className="md:col-span-2 flex justify-end gap-4 border-t border-gray-100 pt-6">
            {isEditing && <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-sm hover:bg-gray-300 transition-colors">إلغاء</button>}
            <button type="submit" className="bg-black text-white font-bold py-2 px-8 rounded-sm hover:bg-amber-600 transition-colors shadow-md">
                {isEditing ? 'حفظ التعديلات' : 'إضافة المنتج'}
            </button>
          </div>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-right text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                <th scope="col" className="px-6 py-4">الصورة</th>
                <th scope="col" className="px-6 py-4">الاسم</th>
                <th scope="col" className="px-6 py-4">التصنيف</th>
                <th scope="col" className="px-6 py-4">السعر</th>
                <th scope="col" className="px-6 py-4">الإجراءات</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4"><img src={product.imageUrl} alt={product.name} className="w-12 h-16 object-cover rounded-sm border border-gray-200" /></td>
                    <td className="px-6 py-4 font-bold text-gray-900">{product.name}</td>
                    <td className="px-6 py-4"><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{product.category}</span></td>
                    <td className="px-6 py-4 font-medium text-amber-600">{product.price} ج.م</td>
                    <td className="px-6 py-4">
                        <div className="flex gap-3">
                            <button onClick={() => setIsEditing(product.id)} className="text-blue-600 hover:text-blue-800 bg-blue-50 p-2 rounded hover:bg-blue-100 transition-colors"><i className="fas fa-edit"></i></button>
                            <button onClick={() => onDeleteProduct(product.id)} className="text-red-600 hover:text-red-800 bg-red-50 p-2 rounded hover:bg-red-100 transition-colors"><i className="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;