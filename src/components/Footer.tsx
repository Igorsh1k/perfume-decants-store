'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0B] text-zinc-300 border-t border-[#27272A] pt-16 pb-8">
      {/* Guarantees Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-[#121214] border border-[#27272A] rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#1A1A1E] text-[#D4AF37] rounded-xl border border-[#3F3F46]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-sm">100% Оригінальність</h4>
              <p className="text-xs text-zinc-400">Гарантія якості та автентичності кожного флакона</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#1A1A1E] text-[#D4AF37] rounded-xl border border-[#3F3F46]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-sm">Нова Пошта по Україні</h4>
              <p className="text-xs text-zinc-400">Швидка відправка в день замовлення (1-2 дні)</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#1A1A1E] text-[#D4AF37] rounded-xl border border-[#3F3F46]">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-sm">Гнучкий вибір об'ємів</h4>
              <p className="text-xs text-zinc-400">Деканти від 1 мл, 2 мл, 5 мл, 10 мл та цілі флакони</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#27272A]">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-wider text-white font-bold">
                OVERDOSE <span className="text-[#D4AF37]">PARFUMS</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Онлайн-ательє розпиву нішевої та люксової парфумерії в Україні. Спробуйте вишуканий аромат у компактному деканті без витрат на повний флакон.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1A1A1E] border border-[#27272A] flex items-center justify-center text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="viber://chat?number=%2B380971234567"
                className="w-9 h-9 rounded-full bg-[#1A1A1E] border border-[#27272A] flex items-center justify-center text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                title="Viber"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1A1A1E] border border-[#27272A] flex items-center justify-center text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#27272A] pb-2">
              Навігація
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-[#D4AF37] transition-colors">
                  Головна сторінка
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#D4AF37] transition-colors">
                  Каталог парфумів
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=niche" className="hover:text-[#D4AF37] transition-colors">
                  Нішева парфумерія
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=luxury" className="hover:text-[#D4AF37] transition-colors">
                  Люкс парфумерія
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=flacons" className="hover:text-[#D4AF37] transition-colors">
                  Флакони та атомайзери
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#27272A] pb-2">
              Клієнтам
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/delivery" className="hover:text-[#D4AF37] transition-colors">
                  Способи доставки
                </Link>
              </li>
              <li>
                <Link href="/delivery#payment" className="hover:text-[#D4AF37] transition-colors">
                  Варіанти оплати
                </Link>
              </li>
              <li>
                <Link href="/delivery#returns" className="hover:text-[#D4AF37] transition-colors">
                  Повернення та обмін (14 днів)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D4AF37] transition-colors">
                  Про нас та наша філософія
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#D4AF37] transition-colors">
                  Оформлення замовлення
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#27272A] pb-2">
              Контакти
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <a href="tel:+380971234567" className="hover:text-white font-mono">
                  +380 (97) 123-45-67
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <a href="mailto:info@overdoseparfums.com.ua" className="hover:text-white">
                  info@overdoseparfums.com.ua
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>м. Київ, вул. Хрещатик, 22</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Пн - Нд: 09:00 - 20:00 (без вихідних)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 Overdose Parfums. Всі права захищено. Оригінальна нішева парфумерія на розпив.</p>
          <div className="flex gap-4">
            <span>Нова Пошта</span>
            <span>•</span>
            <span>Оплата при отриманні</span>
            <span>•</span>
            <span>100% Оригінал</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
