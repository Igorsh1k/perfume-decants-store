'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Package, Truck, Gift, LogOut, CheckCircle2, Clock, ChevronRight, Search, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const { user, logout, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'tracking' | 'profile'>('orders');

  // Tracking State
  const [ttnQuery, setTtnQuery] = useState('20450912839120');
  const [activeTtn, setActiveTtn] = useState('20450912839120');

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#121214] border border-[#27272A] flex items-center justify-center mx-auto text-[#D4AF37]">
          <User className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-white">Особистий кабінет</h1>
        <p className="text-zinc-400 text-sm max-w-md mx-auto">
          Увійдіть у свій акаунт або авторизуйтесь через Google, щоб переглядати історію замовлень, бонуси та відстежувати посилки Нової Пошти.
        </p>
        <button
          onClick={openAuthModal}
          className="px-8 py-3.5 bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880] text-[#0B0B0C] font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:brightness-110 transition-all"
        >
          Увійти через Google / Email
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile Banner */}
      <div className="bg-gradient-to-r from-[#17171A] via-[#1F1C18] to-[#17171A] border border-[#3F331D] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-xl shrink-0">
            {user.avatar ? (
              <Image src={user.avatar} alt={user.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-[#27272A] flex items-center justify-center text-white font-bold">
                {user.name[0]}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">{user.name}</h1>
              {user.isGoogleUser && (
                <span className="bg-[#4285F4]/20 border border-[#4285F4]/50 text-[#4285F4] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Google Account
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 font-mono">{user.email} • {user.phone}</p>
            <p className="text-xs text-zinc-300">
              Збережена адреса: <span className="text-[#D4AF37] font-medium">{user.savedCity}, {user.savedBranch}</span>
            </p>
          </div>
        </div>

        {/* Bonuses Badge */}
        <div className="flex items-center gap-4 bg-[#121214] border border-[#27272A] p-4 rounded-2xl shrink-0">
          <div className="p-3 bg-[#1A1A1E] text-[#D4AF37] rounded-xl border border-[#3F3F46]">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-semibold">
              Накопичені бонуси
            </span>
            <span className="text-2xl font-serif font-bold text-[#D4AF37]">
              {user.bonuses} грн
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#27272A] gap-4 sm:gap-8">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all relative flex items-center gap-2 ${
            activeTab === 'orders' ? 'text-[#D4AF37] font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Історія замовлень ({user.orders.length})</span>
          {activeTab === 'orders' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />}
        </button>

        <button
          onClick={() => setActiveTab('tracking')}
          className={`pb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all relative flex items-center gap-2 ${
            activeTab === 'tracking' ? 'text-[#D4AF37] font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Де моя посилка? (НП)</span>
          {activeTab === 'tracking' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />}
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all relative flex items-center gap-2 ${
            activeTab === 'profile' ? 'text-[#D4AF37] font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Персональні дані</span>
          {activeTab === 'profile' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />}
        </button>
      </div>

      {/* Tab Contents */}
      <div>
        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {user.orders.length === 0 ? (
              <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-12 text-center space-y-4">
                <Package className="w-10 h-10 text-zinc-600 mx-auto" />
                <h3 className="text-lg font-serif font-medium text-white">У вас поки немає замовлень</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Зробіть перше замовлення деканту, щоб отримати бонусні бали та відстежувати посилку.
                </p>
                <Link
                  href="/catalog"
                  className="inline-block px-6 py-2.5 bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs uppercase tracking-wider rounded-lg"
                >
                  Перейти до каталогу
                </Link>
              </div>
            ) : (
              user.orders.map((ord) => (
                <div key={ord.id} className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#27272A] pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif font-bold text-white text-lg">Замовлення № {ord.orderNumber}</h3>
                        <span className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">Дата: {ord.date}</p>
                    </div>

                    {ord.ttn && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-400">ТТН НП:</span>
                        <span className="font-mono text-xs text-[#D4AF37] font-bold bg-[#1A1A1E] px-2.5 py-1 rounded-lg border border-[#3F3F46]">
                          {ord.ttn}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Items list */}
                  <div className="space-y-3">
                    {ord.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs text-zinc-300">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-md overflow-hidden bg-black/40 border border-[#27272A]">
                            <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="font-medium text-white block">{item.product.name}</span>
                            <span className="text-zinc-500 text-[11px] font-mono">Об'єм: {item.selectedVolume} x {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-mono text-white font-semibold">{item.price * item.quantity} грн</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#27272A] pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <span className="text-zinc-400">
                      Адреса доставки: <span className="text-zinc-200">{ord.settlement}, {ord.branch}</span>
                    </span>
                    <span className="text-base font-serif font-bold text-[#D4AF37]">
                      Разом: {ord.total} грн
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tracking Tab */}
        {activeTab === 'tracking' && (
          <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-8">
            <div className="max-w-xl mx-auto space-y-3 text-center">
              <Truck className="w-10 h-10 text-[#D4AF37] mx-auto" />
              <h2 className="font-serif text-2xl font-bold text-white">Відстеження посилки Нової Пошти</h2>
              <p className="text-xs text-zinc-400 font-light">
                Введіть номер ТТН експрес-накладної, щоб дізнатися точне розташування посилки.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveTtn(ttnQuery);
                }}
                className="flex gap-2 pt-2"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Введіть ТТН (наприклад 20450912839120)"
                    value={ttnQuery}
                    onChange={(e) => setTtnQuery(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#E6C687] transition-all"
                >
                  Відстежити
                </button>
              </form>
            </div>

            {/* Timeline Progress */}
            {activeTtn && (
              <div className="max-w-2xl mx-auto bg-[#1A1A1E] border border-[#27272A] rounded-2xl p-6 space-y-6 pt-6">
                <div className="flex justify-between items-center border-b border-[#27272A] pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block">Номер ТТН</span>
                    <span className="font-mono text-lg font-bold text-[#D4AF37]">{activeTtn}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block">Статус посилки</span>
                    <span className="text-xs font-bold text-emerald-400">Прямує у пункт призначення</span>
                  </div>
                </div>

                {/* Timeline Steps */}
                <div className="relative space-y-6 pl-6 border-l-2 border-[#D4AF37]/50">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#121214] flex items-center justify-center text-black">
                      <CheckCircle2 className="w-3 h-3 text-black" />
                    </div>
                    <p className="text-xs font-bold text-white">Оформлено та запаковано в ательє Aura Parfums</p>
                    <p className="text-[11px] text-zinc-500 font-mono">25.09.2026, 14:30 • м. Київ</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#121214]" />
                    <p className="text-xs font-bold text-white">Відправлено з терміналу Київ-Схід</p>
                    <p className="text-[11px] text-zinc-500 font-mono">25.09.2026, 19:15 • Нова Пошта</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-[#121214] animate-ping" />
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-[#121214]" />
                    <p className="text-xs font-bold text-[#D4AF37]">Посилка в дорозі до регіонального хабу</p>
                    <p className="text-[11px] text-zinc-400 font-mono">Очікуване прибуття: сьогодні о 14:00</p>
                  </div>

                  <div className="relative opacity-50">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-zinc-700 border-2 border-[#121214]" />
                    <p className="text-xs font-bold text-zinc-400">Прибуття у Відділення №1 (с. Поляниця)</p>
                    <p className="text-[11px] text-zinc-500 font-mono">Очікує отримання</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 sm:p-8 max-w-xl mx-auto space-y-6">
            <h2 className="font-serif text-xl font-bold text-white border-b border-[#27272A] pb-4">
              Персональні дані
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">ПІБ</label>
                <input
                  type="text"
                  readOnly
                  value={user.name}
                  className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-white outline-none cursor-default"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Email</label>
                <input
                  type="email"
                  readOnly
                  value={user.email}
                  className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-white outline-none cursor-default font-mono"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Телефон</label>
                <input
                  type="text"
                  readOnly
                  value={user.phone}
                  className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-white outline-none cursor-default font-mono"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Збережене місто Нової Пошти</label>
                <input
                  type="text"
                  readOnly
                  value={user.savedCity}
                  className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-white outline-none cursor-default"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#27272A]">
              <button
                onClick={logout}
                className="w-full py-3 bg-red-950/60 border border-red-800 hover:bg-red-900 text-red-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Вийти з акаунту</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
