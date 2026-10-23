'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag, Menu, X, Phone, Search,
  Sparkles, User, Settings, Home, BookOpen,
  Truck, Info,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/AuthModal';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openCart, totalItems } = useCart();
  const { user, openAuthModal } = useAuth();

  const navLinks = [
    { href: '/',         label: 'Головна',         icon: Home },
    { href: '/catalog',  label: 'Каталог',          icon: BookOpen },
    { href: '/delivery', label: 'Доставка та оплата', icon: Truck },
    { href: '/about',    label: 'Про нас',           icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0E0E10]/95 backdrop-blur-md border-b border-[#27272A] text-white">

        {/* ── Top promo banner ── */}
        <div className="bg-gradient-to-r from-[#1C1813] via-[#2A2318] to-[#1C1813] text-[#E6C687] py-1.5 px-4 text-center border-b border-[#3F331D]/40 flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-xs leading-tight">
            100% Оригінальна нішева та люксова парфумерія від 1 мл
            <span className="hidden sm:inline"> • Безкоштовна доставка від 2000 грн</span>
          </span>
        </div>

        {/* ── Main header row ── */}
        <div className="px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center h-14 sm:h-18 md:h-20 gap-2">

            {/* ── LEFT: burger (mobile only) ── */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden shrink-0 p-2 rounded-xl text-zinc-300 hover:text-[#D4AF37] hover:bg-[#1A1A1E] transition-all"
              aria-label="Меню"
            >
              {mobileMenuOpen
                ? <X className="w-5 h-5" />
                : <Menu className="w-5 h-5" />}
            </button>

            {/* ── LOGO — left on desktop, grows to fill on mobile ── */}
            <Link
              href="/"
              onClick={closeMobile}
              className="flex flex-col justify-center group flex-1 md:flex-none md:mr-8"
            >
              <span className="font-serif text-[15px] xs:text-base sm:text-2xl md:text-3xl tracking-wider text-white group-hover:text-[#D4AF37] transition-colors font-bold leading-none whitespace-nowrap">
                OVERDOSE <span className="text-[#D4AF37]">PARFUMS</span>
              </span>
              <span className="hidden sm:block text-[8px] uppercase tracking-[0.22em] text-zinc-400 font-light mt-0.5 whitespace-nowrap">
                Нішева парфумерія на розпив
              </span>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative text-xs lg:text-sm uppercase tracking-wider font-semibold whitespace-nowrap transition-colors py-1 ${
                    isActive(href) ? 'text-[#D4AF37]' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {label}
                  {isActive(href) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37] rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* ── RIGHT ACTIONS ── */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">

              {/* Phone — 2xl+ only */}
              <a
                href="tel:+380987979790"
                className="hidden 2xl:flex items-center gap-2 text-xs text-zinc-300 hover:text-[#D4AF37] border border-[#27272A] px-3 py-1.5 rounded-full hover:border-[#D4AF37]/50 transition-all whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                +380 (98) 797-97-90
              </a>

              {/* Search — md+ only */}
              <Link
                href="/catalog"
                className="hidden md:flex p-2 rounded-xl text-zinc-300 hover:text-[#D4AF37] hover:bg-[#1A1A1E] transition-all"
                title="Каталог"
              >
                <Search className="w-5 h-5" />
              </Link>

              {/* User/Account — md+ only, on mobile it's in burger menu */}
              {user ? (
                <Link
                  href="/account"
                  className="hidden md:flex items-center p-1 bg-[#1A1A1E] border border-[#3F3F46] hover:border-[#D4AF37] rounded-full transition-all"
                  title="Кабінет"
                >
                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[#27272A] border border-[#D4AF37] shrink-0">
                    {user.avatar
                      ? <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                      : <User className="w-3.5 h-3.5 text-[#D4AF37] absolute inset-0 m-auto" />}
                  </div>
                  <span className="hidden xl:inline text-xs font-medium text-white pr-2 pl-1 max-w-[80px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </Link>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="hidden md:flex items-center p-2 rounded-xl text-zinc-300 hover:text-[#D4AF37] hover:bg-[#1A1A1E] transition-all"
                  title="Увійти"
                >
                  <User className="w-5 h-5 text-[#D4AF37]" />
                </button>
              )}

              {/* Admin — md+ only */}
              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="hidden md:flex p-2 rounded-full text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/40 hover:text-white transition-colors"
                  title="Адмін"
                >
                  <Settings className="w-5 h-5" />
                </Link>
              )}

              {/* Cart — always visible */}
              <button
                onClick={openCart}
                className="relative p-2 sm:p-2.5 bg-[#1A1A1E] hover:bg-[#27272A] border border-[#3F3F46] rounded-full text-white transition-all hover:scale-105 shrink-0"
                aria-label="Кошик"
              >
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#0B0B0C] font-bold text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-0.5 shadow border border-[#0B0B0C]">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE DRAWER MENU ── */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0E0E10] border-t border-[#27272A]">

            {/* User block at top */}
            <div className="px-4 pt-4 pb-3 border-b border-[#27272A]">
              {user ? (
                <Link
                  href="/account"
                  onClick={closeMobile}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#1A1A1E] border border-[#3F3F46]"
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#27272A] border-2 border-[#D4AF37] shrink-0">
                    {user.avatar
                      ? <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                      : <User className="w-5 h-5 text-[#D4AF37] absolute inset-0 m-auto" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                  </div>
                </Link>
              ) : (
                <button
                  onClick={() => { closeMobile(); openAuthModal(); }}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-[#C5A880]/10 border border-[#D4AF37]/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1A1A1E] border border-[#3F3F46] flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-[#D4AF37]">Увійти / Реєстрація</p>
                      <p className="text-xs text-zinc-400">Бонуси та історія замовлень</p>
                    </div>
                  </div>
                </button>
              )}
            </div>

            {/* Nav links */}
            <nav className="px-4 py-3 space-y-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMobile}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium text-sm transition-all ${
                    isActive(href)
                      ? 'bg-[#27272A] text-[#D4AF37]'
                      : 'text-zinc-300 hover:bg-[#1A1A1E] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </Link>
              ))}
            </nav>

            {/* Bottom actions */}
            <div className="px-4 pb-5 space-y-1 border-t border-[#27272A] pt-3">
              <Link
                href="/catalog"
                onClick={closeMobile}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-zinc-300 hover:bg-[#1A1A1E] hover:text-white transition-all text-sm font-medium"
              >
                <Search className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                Пошук в каталозі
              </Link>

              <a
                href="tel:+380987979790"
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-zinc-300 hover:bg-[#1A1A1E] hover:text-white transition-all text-sm font-medium"
              >
                <Phone className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                +380 (98) 797-97-90
              </a>

              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={closeMobile}
                  className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-sm font-bold"
                >
                  <span className="flex items-center gap-3">
                    <Settings className="w-4 h-4 shrink-0" />
                    Адмін-панель
                  </span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal />
    </>
  );
};
