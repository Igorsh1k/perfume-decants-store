'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Layers, Award, Star } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export default function HomePage() {
  // Get Top Hits
  const hitProducts = PRODUCTS.filter((p) => p.badges?.includes('hit')).slice(0, 6);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-[#27272A]">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_smoky.jpg"
            alt="Niche perfume dark background"
            fill
            priority
            className="object-cover object-center brightness-75 scale-105 transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/70 to-[#0B0B0C]/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center pt-12 pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#1A1A1E]/80 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Онлайн-ательє декантів в Україні</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Оригінальна нішева парфумерія{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#E6C687]">
              на розпив (деканти)
            </span>
          </h1>

          <p className="mt-6 text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light px-2">
            Відкрийте для себе світ вишуканих нішевих та люксових ароматів у компактних атомайзерах від 1 мл. Знайомтесь з легендарними парфумами без витрат на повний флакон.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 px-2">
            <Link
              href="/catalog"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880] text-[#0B0B0C] font-bold text-sm uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/15 flex items-center justify-center gap-2 group"
            >
              <span>Перейти до каталогу</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/about"
              className="w-full sm:w-auto px-8 py-4 bg-[#1A1A1E]/90 hover:bg-[#27272A] text-white border border-[#3F3F46] hover:border-[#D4AF37]/50 font-semibold text-sm uppercase tracking-widest rounded-xl transition-all"
            >
              Чому саме розпив?
            </Link>
          </div>

          {/* Quick Badges */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-8 border-t border-zinc-800/80 text-xs">
            <div className="flex items-center justify-center gap-2 text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>100% Оригінальність</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-zinc-300">
              <Layers className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Об&apos;єми 1, 2, 5, 10 мл</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-zinc-300">
              <HeartHandshake className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Відправка Новою Поштою</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-zinc-300">
              <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Понад 50+ нішевих ароматів</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#27272A]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Вибір нашого бестселера
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
              Хіти продажів
            </h2>
          </div>
          <Link
            href="/catalog"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors"
          >
            <span>Дивитися всі аромати</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hitProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Banner Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Колекції Overdose Parfums
          </span>
          <h2 className="font-serif text-3xl font-bold text-white mt-1">
            Обирайте потрібну категорію
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/catalog?category=niche"
            className="group relative h-64 rounded-2xl overflow-hidden border border-[#27272A] hover:border-[#D4AF37] transition-all flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/40 to-transparent"
          >
            <Image
              src="/images/baccarat_rouge.jpg"
              alt="Нішева парфумерія"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
            />
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">
                Колекція
              </span>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                Нішева парфумерія
              </h3>
              <p className="text-xs text-zinc-400 mt-1">MFK, Tom Ford, Creed, Kilian, Le Labo</p>
            </div>
          </Link>

          <Link
            href="/catalog?category=luxury"
            className="group relative h-64 rounded-2xl overflow-hidden border border-[#27272A] hover:border-[#D4AF37] transition-all flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/40 to-transparent"
          >
            <Image
              src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop"
              alt="Люкс парфумерія"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
            />
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">
                Колекція
              </span>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                Люкс парфумерія
              </h3>
              <p className="text-xs text-zinc-400 mt-1">Chanel, Dior, YSL, Givenchy</p>
            </div>
          </Link>

          <Link
            href="/catalog?category=flacons"
            className="group relative h-64 rounded-2xl overflow-hidden border border-[#27272A] hover:border-[#D4AF37] transition-all flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/40 to-transparent"
          >
            <Image
              src="/images/decants_set.jpg"
              alt="Флакони та атомайзери"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
            />
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">
                Аксесуари
              </span>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                Флакони та атомайзери
              </h3>
              <p className="text-xs text-zinc-400 mt-1">Скляні деканти 5 мл, 10 мл з помпами</p>
            </div>
          </Link>

          <Link
            href="/catalog?category=accessories"
            className="group relative h-64 rounded-2xl overflow-hidden border border-[#27272A] hover:border-[#D4AF37] transition-all flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/40 to-transparent"
          >
            <Image
              src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop"
              alt="Упаковка та аксесуари"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
            />
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">
                Подарунки
              </span>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                Упаковка та бокси
              </h3>
              <p className="text-xs text-zinc-400 mt-1">Оксамитові мішечки та подарункові коробочки</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Why Decants Section */}
      <section className="bg-[#121214] border-y border-[#27272A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Переваги розпиву
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              Чому деканти — це найкраще рішення?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#1A1A1E] p-6 rounded-2xl border border-[#27272A] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#27272A] text-[#D4AF37] flex items-center justify-center font-bold text-xl">
                01
              </div>
              <h3 className="font-serif font-bold text-lg text-white">Тестування на шкірі</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Аромат розкривається індивідуально протягом дня. Декант 2-5 мл дозволяє повністю розносити парфум перед купівлею повного флакона.
              </p>
            </div>

            <div className="bg-[#1A1A1E] p-6 rounded-2xl border border-[#27272A] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#27272A] text-[#D4AF37] flex items-center justify-center font-bold text-xl">
                02
              </div>
              <h3 className="font-serif font-bold text-lg text-white">Зручний формат</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Компактний скляний атомайзер легко вміщується у сумочку, кишеню або дорожню косметичку для подорожей.
              </p>
            </div>

            <div className="bg-[#1A1A1E] p-6 rounded-2xl border border-[#27272A] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#27272A] text-[#D4AF37] flex items-center justify-center font-bold text-xl">
                03
              </div>
              <h3 className="font-serif font-bold text-lg text-white">Власна гардеробна нот</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Замість одного флакона за 10 000 грн ви можете зібрати колекцію з 10 різноманітних нішевих ароматів під будь-який настрій.
              </p>
            </div>

            <div className="bg-[#1A1A1E] p-6 rounded-2xl border border-[#27272A] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#27272A] text-[#D4AF37] flex items-center justify-center font-bold text-xl">
                04
              </div>
              <h3 className="font-serif font-bold text-lg text-white">100% Захист від підробок</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ми розливаємо виключно оригінальні флакони з офіційних дистриб'юторів Європи. Надаємо фото та батч-коди флакона.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Short Snippet */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#17171A] via-[#1F1C18] to-[#17171A] border border-[#3F331D] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden border border-[#D4AF37]/30 shrink-0">
            <Image
              src="/images/kilian_angels.jpg"
              alt="Aura Parfums Studio"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Про нас • Overdose Parfums
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">
              Ми робимо елітну парфумерію доступною для кожного
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Overdose Parfums була заснована парфумерними ентузіастами, які прагнуть відкрити естетику нішевих ароматів без зайвих бар'єрів. Ми ретельно відбираємо оригінальні флакони та створюємо охайні, герметичні деканти в елегантному оформленні.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors border-b border-[#D4AF37] pb-1"
              >
                <span>Дізнатись більше про нас</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Відгуки клієнтів
          </span>
          <h2 className="font-serif text-3xl font-bold text-white mt-1">
            Що кажуть про наші деканти
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121214] p-6 rounded-2xl border border-[#27272A] space-y-4">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              "Замовляла декант Baccarat Rouge 540 на 5 мл. Прийшов наступного дня в гарному оксамитовому мішечку. Аромат тримається колосально, шлейф неймовірний. Дякую!"
            </p>
            <div className="border-t border-[#27272A] pt-3 flex justify-between items-center text-xs">
              <span className="font-semibold text-white">Олена К.</span>
              <span className="text-zinc-500">Київ</span>
            </div>
          </div>

          <div className="bg-[#121214] p-6 rounded-2xl border border-[#27272A] space-y-4">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              "Чудова якість розпилювача у атомайзерах, не протікає в кишені! Брав 10 мл Creed Aventus та Angels' Share. Оригінал на 100%."
            </p>
            <div className="border-t border-[#27272A] pt-3 flex justify-between items-center text-xs">
              <span className="font-semibold text-white">Михайло В.</span>
              <span className="text-zinc-500">Львів</span>
            </div>
          </div>

          <div className="bg-[#121214] p-6 rounded-2xl border border-[#27272A] space-y-4">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              "Дуже зручний сайт, кошик збергіється, відправка Новою Поштою миттєва. Lost Cherry від Tom Ford тепер мій улюбленець!"
            </p>
            <div className="border-t border-[#27272A] pt-3 flex justify-between items-center text-xs">
              <span className="font-semibold text-white">Анастасія Р.</span>
              <span className="text-zinc-500">Одеса</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
