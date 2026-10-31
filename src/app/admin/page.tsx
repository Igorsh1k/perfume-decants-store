'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Search, Package, DollarSign, Users, ShoppingBag, X, Check, Filter, Layers, ShieldCheck, Lock, Mail, Key, TrendingUp, BarChart3, Clock, CheckCircle } from 'lucide-react';
import { Product, ProductCategory, ProductGender, VolumeOption } from '@/types/product';
import { getStoredProducts, addProduct, updateProduct, deleteProduct } from '@/utils/productStorage';
import { getStoredOrders, updateOrderStatus, deleteAdminOrder, AdminOrder } from '@/utils/orderStorage';
import { useAuth, ADMIN_ACCOUNTS } from '@/context/AuthContext';

export default function AdminPage() {
  const { user, loginAsAdminWithCredentials } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'dashboard'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  // Admin Login Credentials Form
  const [adminEmail, setAdminEmail] = useState('admin@overdoseparfums.com.ua');
  const [adminPassword, setAdminPassword] = useState('admin12345');
  const [loginError, setLoginError] = useState('');

  // Search & Filter state for Product Constructor
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Modal State for Add / Edit Product
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product Form State
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('niche');
  const [formGender, setFormGender] = useState<ProductGender>('unisex');
  const [formImage, setFormImage] = useState('/images/baccarat_rouge.jpg');
  const [formDescription, setFormDescription] = useState('');
  const [formTopNotes, setFormTopNotes] = useState('Шафран, Жасмин');
  const [formHeartNotes, setFormHeartNotes] = useState('Бурштинове дерево, Амбра');
  const [formBaseNotes, setFormBaseNotes] = useState('Ялинова смола, Кедр');
  const [formBadges, setFormBadges] = useState<('hit' | 'new' | 'sale')[]>(['hit']);
  const [imageUploading, setImageUploading] = useState(false);

  // Volume options state
  const [formVolumes, setFormVolumes] = useState<VolumeOption[]>([
    { volume: '1 мл', price: 150, inStock: true },
    { volume: '2 мл', price: 300, inStock: true },
    { volume: '5 мл', price: 750, inStock: true },
    { volume: '10 мл', price: 1400, inStock: true },
  ]);

  useEffect(() => {
    const load = async () => {
      const [prods, ords] = await Promise.all([getStoredProducts(), getStoredOrders()]);
      setProducts(prods);
      setOrders(ords);
    };
    load();
  }, []);

  const handleUpdateOrderStatus = async (orderId: string, newStatus: AdminOrder['status'], currentTtn?: string) => {
    const updated = await updateOrderStatus(orderId, newStatus, currentTtn);
    setOrders(updated);
  };

  const handleUpdateOrderTtn = async (orderId: string, newTtn: string, currentStatus: AdminOrder['status']) => {
    const updated = await updateOrderStatus(orderId, currentStatus, newTtn);
    setOrders(updated);
  };

  const handleDeleteAdminOrder = async (orderId: string) => {
    if (confirm('Ви дійсно бажаєте видалити це замовлення?')) {
      const updated = await deleteAdminOrder(orderId);
      setOrders(updated);
    }
  };

  // Dynamic Analytics Calculation from synchronized order storage
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = orders.length;
  const uniqueCustomersCount = new Set(orders.map((o) => o.phone.trim() || o.customerName.trim())).size;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  const processingCount = orders.filter((o) => o.status === 'Обробляється' || o.status === 'Комплектується').length;
  const shippedCount = orders.filter((o) => o.status === 'Відправлено' || o.status === 'Доставлено').length;

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginAsAdminWithCredentials(adminEmail, adminPassword);
    if (!success) {
      setLoginError('Невірний e-mail або пароль адміністратора!');
    }
  };

  // Access Control Guard: Strict Validated Admin Login
  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 space-y-6">
        <div className="bg-[#121214] border border-[#27272A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#1A1A1E] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center mx-auto shadow-lg">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white">Вхід у Панель Адміністратора</h1>
            <p className="text-xs text-zinc-400 font-light">
              Введіть валідовані дані одного з двох адмінських акаунтів
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded-xl text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="text-zinc-300 block mb-1">Email Адміністратора *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@overdoseparfums.com.ua"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl pl-10 pr-4 py-2.5 text-white outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-300 block mb-1">Пароль Адміністратора *</label>
              <div className="relative">
                <Key className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="admin12345"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl pl-10 pr-4 py-2.5 text-white outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880] text-[#0B0B0C] font-bold text-xs uppercase tracking-widest rounded-xl hover:brightness-110 shadow-lg"
            >
              Авторизуватись в Адмінці
            </button>
          </form>

          {/* Validated Accounts Hint Box */}
          <div className="bg-[#1A1A1E] border border-[#3F3F46] p-4 rounded-xl text-[11px] text-zinc-400 space-y-1.5">
            <p className="font-semibold text-white">Дозволені адмінські акаунти в системі:</p>
            {ADMIN_ACCOUNTS.map((acc, i) => (
              <div key={i} className="flex justify-between font-mono">
                <span>{acc.email}</span>
                <span className="text-[#D4AF37]">Пароль: {acc.password}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormBrand('');
    setFormCategory('niche');
    setFormGender('unisex');
    setFormImage('/images/baccarat_rouge.jpg');
    setFormDescription('Вишуканий оригінальний аромат у компактному скляному атомайзері.');
    setFormTopNotes('Шафран, Бергамот');
    setFormHeartNotes('Троянда, Жасмин');
    setFormBaseNotes('Сандал, Мускус');
    setFormBadges(['new']);
    setFormVolumes([
      { volume: '1 мл', price: 140, inStock: true },
      { volume: '2 мл', price: 280, inStock: true },
      { volume: '5 мл', price: 680, inStock: true },
      { volume: '10 мл', price: 1290, inStock: true },
    ]);
    setIsProductModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormBrand(prod.brand);
    setFormCategory(prod.category);
    setFormGender(prod.gender);
    setFormImage(prod.image);
    setFormDescription(prod.description);
    setFormTopNotes(prod.notes?.top.join(', ') || '');
    setFormHeartNotes(prod.notes?.heart.join(', ') || '');
    setFormBaseNotes(prod.notes?.base.join(', ') || '');
    setFormBadges(prod.badges || []);
    setFormVolumes(prod.volumes || []);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Ви дійсно бажаєте видалити цей товар з каталогу?')) {
      const updated = await deleteProduct(id);
      setProducts(updated);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formBrand.trim()) return;

    const minPrice = formVolumes.length > 0 ? formVolumes[0].price : 200;

    const productData: Product = {
      id: editingProduct ? editingProduct.id : 'prod-' + Date.now(),
      name: formName,
      brand: formBrand,
      category: formCategory,
      gender: formGender,
      pricePerMl: Math.round(minPrice / 2),
      defaultPrice: minPrice,
      inStock: true,
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewCount: editingProduct ? editingProduct.reviewCount : 1,
      image: formImage,
      gallery: [formImage],
      description: formDescription,
      badges: formBadges,
      notes: {
        top: formTopNotes.split(',').map((s) => s.trim()).filter(Boolean),
        heart: formHeartNotes.split(',').map((s) => s.trim()).filter(Boolean),
        base: formBaseNotes.split(',').map((s) => s.trim()).filter(Boolean),
      },
      volumes: formVolumes,
    };

    let updatedList: Product[];
    if (editingProduct) {
      updatedList = await updateProduct(productData);
    } else {
      updatedList = await addProduct(productData);
    }

    setProducts(updatedList);
    setIsProductModalOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Будь ласка, оберіть файл зображення (JPG, PNG, WEBP)');
      return;
    }

    // Validate size — max 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert('Розмір фото не повинен перевищувати 2 МБ. Стисніть зображення і спробуйте знову.');
      return;
    }

    setImageUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      setFormImage(base64);
      setImageUploading(false);
    };
    reader.onerror = () => {
      alert('Помилка читання файлу. Спробуйте ще раз.');
      setImageUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    if (selectedCategoryFilter !== 'all' && p.category !== selectedCategoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="border-b border-[#27272A] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Панель Адміністратора • {user.name} ({user.email})
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
            Конструктор Товарів & Замовлення
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="px-6 py-3 bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880] text-[#0B0B0C] font-bold text-xs uppercase tracking-widest rounded-xl hover:brightness-110 shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Додати новий товар</span>
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-[#27272A] gap-4 sm:gap-8">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all relative flex items-center gap-2 ${
            activeTab === 'products' ? 'text-[#D4AF37] font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Конструктор товарів ({products.length})</span>
          {activeTab === 'products' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all relative flex items-center gap-2 ${
            activeTab === 'orders' ? 'text-[#D4AF37] font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Управління замовленнями ({orders.length})</span>
          {activeTab === 'orders' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />}
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`pb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all relative flex items-center gap-2 ${
            activeTab === 'dashboard' ? 'text-[#D4AF37] font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Дашборд аналітики</span>
          {activeTab === 'dashboard' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />}
        </button>
      </div>

      {/* Product Constructor Tab (CRUD) */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121214] p-4 rounded-xl border border-[#27272A]">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Пошук товару в конструкторі..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-zinc-400" />
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-[#1A1A1E] border border-[#3F3F46] text-white text-xs font-medium rounded-xl px-3 py-2 outline-none cursor-pointer"
              >
                <option value="all">Всі категорії</option>
                <option value="niche">Нішева парфумерія</option>
                <option value="luxury">Люкс парфумерія</option>
                <option value="flacons">Флакони та атомайзери</option>
                <option value="accessories">Аксесуари</option>
              </select>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-[#121214] border border-[#27272A] rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-[#16161A] text-zinc-400 uppercase tracking-wider font-semibold border-b border-[#27272A]">
                  <tr>
                    <th className="p-4">Товар</th>
                    <th className="p-4">Категорія / Стать</th>
                    <th className="p-4">Об'єми та Ціни</th>
                    <th className="p-4">Рейтинг</th>
                    <th className="p-4 text-right">Дії (Конструктор)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272A]">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#1A1A1E] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-black/40 border border-[#27272A] shrink-0">
                            <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#D4AF37] block">
                              {prod.brand}
                            </span>
                            <span className="font-bold text-white text-sm block">{prod.name}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="inline-block bg-[#27272A] text-zinc-200 px-2.5 py-1 rounded font-mono text-[11px] mb-1">
                          {prod.category === 'niche' ? 'Нішева' : prod.category === 'luxury' ? 'Люкс' : 'Аксесуари'}
                        </span>
                        <span className="block text-zinc-400 text-[10px]">
                          {prod.gender === 'unisex' ? 'Унісекс' : prod.gender === 'female' ? 'Жіноча' : 'Чоловіча'}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {prod.volumes.map((v) => (
                            <span key={v.volume} className="bg-[#1A1A1E] border border-[#3F3F46] px-2 py-0.5 rounded text-[10px] font-mono">
                              {v.volume}: <strong className="text-[#D4AF37]">{v.price} грн</strong>
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="p-4 font-mono">
                        <span className="text-[#D4AF37] font-bold">★ {prod.rating.toFixed(1)}</span> ({prod.reviewCount})
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(prod)}
                            className="p-2 bg-[#27272A] hover:bg-[#3F3F46] text-zinc-200 rounded-lg transition-colors"
                            title="Редагувати"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-2 bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 rounded-lg transition-colors"
                            title="Видалити"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Order Management Tab */}
      {activeTab === 'orders' && (
        <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#27272A] pb-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-white">
                Замовлення покупців ({orders.length})
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Керуйте статусами доставки, додавайте ТТН та видаляйте тестові замовлення
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#D4AF37] bg-[#1A1A1E] border border-[#3F3F46] px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Синхронізовано з сайтом
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 text-xs space-y-2">
              <Package className="w-8 h-8 text-zinc-600 mx-auto" />
              <p>Наразі замовлень немає.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-[#1A1A1E] border border-[#27272A] rounded-2xl p-5 space-y-4 hover:border-[#3F3F46] transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#27272A] pb-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-serif font-bold text-white text-base">№ {ord.orderNumber}</span>
                        <span className="text-[10px] bg-[#27272A] text-zinc-300 px-2 py-0.5 rounded font-mono">
                          {ord.date}
                        </span>
                        <span className="text-xs font-bold text-[#D4AF37] font-mono">
                          {ord.total} грн
                        </span>
                      </div>
                      <span className="text-zinc-400 text-xs block mt-1">
                        {ord.customerName} • <a href={`tel:${ord.phone}`} className="hover:underline text-zinc-300">{ord.phone}</a>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-400">Статус:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any, ord.ttn)}
                        className="bg-[#121214] border border-[#3F3F46] text-emerald-400 font-bold text-xs rounded-lg px-3 py-1.5 outline-none cursor-pointer"
                      >
                        <option value="Обробляється">Обробляється</option>
                        <option value="Комплектується">Комплектується</option>
                        <option value="Відправлено">Відправлено</option>
                        <option value="Доставлено">Доставлено</option>
                      </select>

                      <button
                        onClick={() => handleDeleteAdminOrder(ord.id)}
                        className="p-1.5 bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 rounded-lg transition-colors ml-2"
                        title="Видалити замовлення"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
                    <div>
                      <span className="text-zinc-500 block text-[11px]">Адреса доставки Новою Поштою:</span>
                      <span className="text-zinc-200">{ord.settlement}, {ord.branch}</span>
                    </div>

                    <div>
                      <span className="text-zinc-500 block text-[11px]">Номер ТТН (Нова Пошта):</span>
                      <input
                        type="text"
                        placeholder="Введіть ТТН..."
                        value={ord.ttn || ''}
                        onChange={(e) => handleUpdateOrderTtn(ord.id, e.target.value, ord.status)}
                        className="bg-[#121214] border border-[#3F3F46] text-white px-3 py-1.5 rounded-lg font-mono text-xs w-full max-w-xs mt-1 outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Analytics Dashboard Tab (Synchronized with Real Store Orders) */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Indicator */}
          <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-semibold">
                Аналітика Магазину Aura Parfums
              </span>
              <h2 className="font-serif text-2xl font-bold text-white mt-1">
                Точна фінансова та операційна статистика
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              100% Синхронізовано з реальною базою замовлень
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#121214] border border-[#27272A] p-6 rounded-2xl space-y-3 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all">
              <div className="flex justify-between items-center">
                <DollarSign className="w-8 h-8 text-[#D4AF37]" />
                <span className="text-[10px] font-mono uppercase bg-[#1A1A1E] text-zinc-400 px-2 py-1 rounded">Реальний виторг</span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 block font-semibold">Загальний виторг</span>
                <span className="text-3xl font-serif font-bold text-white">
                  {totalRevenue.toLocaleString('uk-UA')} грн
                </span>
              </div>
            </div>

            <div className="bg-[#121214] border border-[#27272A] p-6 rounded-2xl space-y-3 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all">
              <div className="flex justify-between items-center">
                <Package className="w-8 h-8 text-[#D4AF37]" />
                <span className="text-[10px] font-mono uppercase bg-[#1A1A1E] text-zinc-400 px-2 py-1 rounded">Замовлення</span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 block font-semibold">Всього замовлень</span>
                <span className="text-3xl font-serif font-bold text-white">
                  {totalOrdersCount} шт
                </span>
              </div>
            </div>

            <div className="bg-[#121214] border border-[#27272A] p-6 rounded-2xl space-y-3 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all">
              <div className="flex justify-between items-center">
                <Users className="w-8 h-8 text-[#D4AF37]" />
                <span className="text-[10px] font-mono uppercase bg-[#1A1A1E] text-zinc-400 px-2 py-1 rounded">Клієнти</span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 block font-semibold">Унікальні покупці</span>
                <span className="text-3xl font-serif font-bold text-white">
                  {uniqueCustomersCount} ос.
                </span>
              </div>
            </div>

            <div className="bg-[#121214] border border-[#27272A] p-6 rounded-2xl space-y-3 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all">
              <div className="flex justify-between items-center">
                <ShoppingBag className="w-8 h-8 text-[#D4AF37]" />
                <span className="text-[10px] font-mono uppercase bg-[#1A1A1E] text-zinc-400 px-2 py-1 rounded">Середній чеки</span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 block font-semibold">Середній чек</span>
                <span className="text-3xl font-serif font-bold text-white">
                  {avgOrderValue.toLocaleString('uk-UA')} грн
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121214] border border-[#27272A] p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3 text-[#D4AF37]">
                <Clock className="w-5 h-5" />
                <h3 className="font-serif font-bold text-white text-base">Замовлення в обробці</h3>
              </div>
              <div className="flex justify-between items-center border-t border-[#27272A] pt-3">
                <span className="text-xs text-zinc-300">Кількість замовлень у стадії обробки / комплектації:</span>
                <span className="text-xl font-mono font-bold text-amber-400">{processingCount} шт</span>
              </div>
            </div>

            <div className="bg-[#121214] border border-[#27272A] p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle className="w-5 h-5" />
                <h3 className="font-serif font-bold text-white text-base">Виконані та відправлені</h3>
              </div>
              <div className="flex justify-between items-center border-t border-[#27272A] pt-3">
                <span className="text-xs text-zinc-300">Кількість відправлених та доставлених замовлень:</span>
                <span className="text-xl font-mono font-bold text-emerald-400">{shippedCount} шт</span>
              </div>
            </div>
          </div>

          {/* Orders Breakdown Table inside Analytics */}
          <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-white text-lg border-b border-[#27272A] pb-3">
              Деталізація продажів по кожному замовленню
            </h3>

            {orders.length === 0 ? (
              <p className="text-xs text-zinc-400 py-4 text-center">Немає проведених замовлень у системі.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="bg-[#16161A] text-zinc-400 uppercase tracking-wider font-semibold border-b border-[#27272A]">
                    <tr>
                      <th className="p-3">Номер замовлення</th>
                      <th className="p-3">Дата</th>
                      <th className="p-3">Покупець</th>
                      <th className="p-3">Сума</th>
                      <th className="p-3">Статус</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272A]">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#1A1A1E]">
                        <td className="p-3 font-mono font-bold text-white">{ord.orderNumber}</td>
                        <td className="p-3 text-zinc-400">{ord.date}</td>
                        <td className="p-3 text-white">{ord.customerName} ({ord.phone})</td>
                        <td className="p-3 font-mono font-bold text-[#D4AF37]">{ord.total} грн</td>
                        <td className="p-3 font-semibold">
                          <span className={`px-2 py-0.5 rounded text-[11px] ${
                            ord.status === 'Відправлено' || ord.status === 'Доставлено'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Constructor Modal (Add / Edit) */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsProductModalOpen(false)} />

          <div className="relative w-full max-w-2xl bg-[#121214] text-white rounded-3xl border border-[#27272A] p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto my-8 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#27272A] pb-4">
              <h2 className="font-serif text-2xl font-bold text-white">
                {editingProduct ? 'Редагувати товар' : 'Додати новий товар (Конструктор)'}
              </h2>
              <button onClick={() => setIsProductModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-300 block mb-1">Назва товару *</label>
                  <input
                    type="text"
                    required
                    placeholder="Baccarat Rouge 540"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1">Бренд *</label>
                  <input
                    type="text"
                    required
                    placeholder="Maison Francis Kurkdjian"
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-300 block mb-1">Категорія</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#D4AF37]"
                  >
                    <option value="niche">Нішева парфумерія</option>
                    <option value="luxury">Люкс парфумерія</option>
                    <option value="flacons">Флакони та атомайзери</option>
                    <option value="accessories">Аксесуари</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1">Стать</label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as any)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#D4AF37]"
                  >
                    <option value="unisex">Унісекс</option>
                    <option value="female">Жіноча</option>
                    <option value="male">Чоловіча</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-zinc-300 block mb-2">Фото товару</label>
                <div className="flex gap-3 items-start">
                  {/* Preview */}
                  <div className="relative w-20 h-20 rounded-xl border border-[#3F3F46] bg-[#1A1A1E] shrink-0 overflow-hidden flex items-center justify-center">
                    {formImage ? (
                      <img
                        src={formImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <span className="text-zinc-600 text-[10px] text-center px-1">Немає фото</span>
                    )}
                    {imageUploading && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex-1 space-y-2">
                    {/* File picker button */}
                    <label className="flex items-center gap-2 px-4 py-2.5 bg-[#1A1A1E] border border-[#3F3F46] hover:border-[#D4AF37] rounded-xl cursor-pointer transition-colors text-zinc-300 hover:text-white text-xs font-semibold w-full justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {imageUploading ? 'Завантаження...' : 'Вибрати фото з комп\'ютера'}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={imageUploading}
                      />
                    </label>

                    {/* URL fallback */}
                    <input
                      type="text"
                      placeholder="або вставте URL: https://..."
                      value={formImage.startsWith('data:') ? '' : formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3 py-2 text-white outline-none focus:border-[#D4AF37] font-mono text-[11px] placeholder:text-zinc-600"
                    />
                    <p className="text-[10px] text-zinc-500">Макс. розмір файлу: 2 МБ • JPG, PNG, WEBP</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-zinc-300 block mb-1">Опис товару</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2 text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1">Верхні ноти</label>
                  <input
                    type="text"
                    value={formTopNotes}
                    onChange={(e) => setFormTopNotes(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 block mb-1">Ноти серця</label>
                  <input
                    type="text"
                    value={formHeartNotes}
                    onChange={(e) => setFormHeartNotes(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 block mb-1">Базові ноти</label>
                  <input
                    type="text"
                    value={formBaseNotes}
                    onChange={(e) => setFormBaseNotes(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              {/* Volume Options Constructor */}
              <div className="pt-2 border-t border-[#27272A] space-y-2">
                <label className="text-xs uppercase font-bold text-[#D4AF37] block">
                  Конструктор варіантів об'ємів та цін:
                </label>
                <div className="space-y-2">
                  {formVolumes.map((volObj, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Об'єм (наприклад 5 мл)"
                        value={volObj.volume}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormVolumes((prev) =>
                            prev.map((v, i) => (i === idx ? { ...v, volume: val } : v))
                          );
                        }}
                        className="w-1/2 bg-[#1A1A1E] border border-[#3F3F46] rounded-lg px-3 py-1.5 text-white"
                      />
                      <input
                        type="number"
                        placeholder="Ціна (грн)"
                        value={volObj.price}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setFormVolumes((prev) =>
                            prev.map((v, i) => (i === idx ? { ...v, price: val } : v))
                          );
                        }}
                        className="w-1/2 bg-[#1A1A1E] border border-[#3F3F46] rounded-lg px-3 py-1.5 text-white font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880] text-[#0B0B0C] font-bold text-xs uppercase tracking-widest rounded-xl hover:brightness-110 shadow-lg mt-4"
              >
                Зберегти товар у базі
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
