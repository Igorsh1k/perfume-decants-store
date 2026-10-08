'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Phone, Search, Sparkles, User, Settings } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/AuthModal';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openCart, totalItems } = useCart();
  const { user, openAuthModal } = useAuth();

  const navLinks = [
    { href: '/', label: 'Головна' },
    { href: '/catalog', label: 'Каталог' },
    { href: '/delivery', label: 'Доставка та оплата' },
    { href: '/about', label: 'Про нас' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0E0E10]/95 backdrop-blur-md border-b border-[#27272A] text-white">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-[#1C1813] via-[#2A2318] to-[#1C1813] text-[#E6C687] text-xs py-1.5 px-4 text-center border-b border-[#3F331D]/40 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          <span>100% Оригінальна нішева та люксова парфумерія від 1 мл • Безкоштовна доставка від 2000 грн</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-300 hover:text-[#D4AF37] transition-colors"
                aria-label="Перемикач меню"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Logo */}
            <Link href="/" className="flex flex-col items-start group shrink-0 min-w-0">
              <span className="font-serif text-lg sm:text-2xl md:text-3xl tracking-wider text-white group-hover:text-[#D4AF37] transition-colors font-bold whitespace-nowrap">
                OVERDOSE <span className="text-[#D4AF37]">PARFUMS</span>
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-zinc-400 font-light -mt-1 whitespace-nowrap">
                Нішева парфумерія на розпив
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-5 lg:space-x-8 shrink-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs lg:text-sm uppercase tracking-wider font-semibold transition-colors relative py-1 whitespace-nowrap ${
                    isActive(link.href)
                      ? 'text-[#D4AF37]'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37] rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
              {/* Phone contact */}
              <a
                href="tel:+380987979790"
                className="hidden 2xl:flex items-center gap-2 text-xs text-zinc-300 hover:text-[#D4AF37] transition-colors border border-[#27272A] px-3 py-1.5 rounded-full hover:border-[#D4AF37]/50 whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+380 (98) 797-97-90</span>
              </a>

              {/* Quick Catalog Search */}
              <Link
                href="/catalog"
                className="p-2 text-zinc-300 hover:text-[#D4AF37] transition-colors"
                title="Шукати в каталозі"
              >
                <Search className="w-5 h-5" />
              </Link>

              {/* User Account / Login Button */}
              {user ? (
                <Link
                  href="/account"
                  className="flex items-center gap-2 p-1.5 bg-[#1A1A1E] border border-[#3F3F46] hover:border-[#D4AF37] rounded-full transition-all"
                  title="Особистий кабінет"
                >
                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[#27272A] border border-[#D4AF37] shrink-0">
                    {user.avatar ? (
                      <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-[#D4AF37] absolute inset-0 m-auto" />
                    )}
                  </div>
                  <span className="hidden lg:inline text-xs font-medium text-white pr-2 max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </Link>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="p-2 text-zinc-300 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                  title="Увійти"
                >
                  <User className="w-5 h-5 text-[#D4AF37]" />
                  <span className="hidden sm:inline">Кабінет</span>
                </button>
              )}

              {/* Admin Link - ONLY VISIBLE IF USER HAS ADMIN ROLE */}
              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="p-2 text-[#D4AF37] hover:text-white transition-colors bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/40"
                  title="Панель адміністратора"
                >
                  <Settings className="w-5 h-5" />
                </Link>
              )}

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="relative p-2.5 bg-[#1A1A1E] hover:bg-[#27272A] border border-[#3F3F46] rounded-full text-white transition-all hover:scale-105 shrink-0"
                aria-label="Кошик"
              >
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-[#0B0B0C]">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#121214] border-b border-[#27272A] px-4 pt-2 pb-6 space-y-4">
            <div className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'bg-[#27272A] text-[#D4AF37]'
                      : 'text-zinc-300 hover:bg-[#1A1A1E] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href={user ? '/account' : '#'}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (!user) openAuthModal();
                }}
                className="text-base font-semibold py-2 px-3 rounded-lg text-[#D4AF37] bg-[#1A1A1E] flex items-center justify-between"
              >
                <span>{user ? `Особистий кабінет (${user.name})` : 'Вхід / Авторизація (Google)'}</span>
                <User className="w-5 h-5" />
              </Link>

              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold py-2 px-3 rounded-lg text-[#D4AF37] bg-[#D4AF37]/10 flex items-center justify-between"
                >
                  <span>Адмін-панель</span>
                  <Settings className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal />
    </>
  );
};
