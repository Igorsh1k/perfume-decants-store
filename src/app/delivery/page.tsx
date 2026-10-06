'use client';

import React, { useState } from 'react';
import { Truck, CreditCard, RefreshCw, ShieldCheck, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DeliveryPage() {
  const [activeTab, setActiveTab] = useState<'delivery' | 'payment' | 'returns'>('delivery');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="border-b border-[#27272A] pb-6 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Інформація для покупців
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-1">
          Доставка, оплата та повернення
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-light">
          Все про умови покупки, терміни доставки Новою Поштою та варіанти розрахунку в Overdose Parfums.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center border-b border-[#27272A]">
        <div className="flex gap-2 sm:gap-6">
          <button
            onClick={() => setActiveTab('delivery')}
            className={`pb-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all relative flex items-center gap-2 ${
              activeTab === 'delivery'
                ? 'text-[#D4AF37] font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Доставка</span>
            {activeTab === 'delivery' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('payment')}
            className={`pb-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all relative flex items-center gap-2 ${
              activeTab === 'payment'
                ? 'text-[#D4AF37] font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Оплата</span>
            {activeTab === 'payment' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            className={`pb-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all relative flex items-center gap-2 ${
              activeTab === 'returns'
                ? 'text-[#D4AF37] font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Повернення та обмін</span>
            {activeTab === 'returns' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Delivery Tab */}
        {activeTab === 'delivery' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#121214] p-8 rounded-3xl border border-[#27272A] space-y-6">
              <div className="flex items-center gap-3 text-[#D4AF37]">
                <Truck className="w-6 h-6" />
                <h2 className="font-serif text-2xl font-bold text-white">Доставка Новою Поштою по Україні</h2>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                Ми надсилаємо замовлення щодня по всій Україні через службу доставки Нова Пошта. Замовлення, оформлені до 16:00, відправляються в той самий день!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#1A1A1E] p-5 rounded-2xl border border-[#27272A] space-y-2">
                  <span className="text-xs font-bold text-[#D4AF37] block uppercase">Відділення Нової Пошти</span>
                  <p className="text-xs text-zinc-300">Термін: 1-2 робочі дні</p>
                  <p className="text-xs text-zinc-400">Вартість: від 55 грн</p>
                  <span className="text-[10px] text-emerald-400 block font-semibold">Безкоштовно від 2000 грн</span>
                </div>

                <div className="bg-[#1A1A1E] p-5 rounded-2xl border border-[#27272A] space-y-2">
                  <span className="text-xs font-bold text-[#D4AF37] block uppercase">Поштомат Нової Пошти</span>
                  <p className="text-xs text-zinc-300">Термін: 1-2 робочі дні</p>
                  <p className="text-xs text-zinc-400">Вартість: від 50 грн</p>
                  <span className="text-[10px] text-emerald-400 block font-semibold">Цілодобовий доступ 24/7</span>
                </div>

                <div className="bg-[#1A1A1E] p-5 rounded-2xl border border-[#27272A] space-y-2">
                  <span className="text-xs font-bold text-[#D4AF37] block uppercase">Кур'єр Нової Пошти</span>
                  <p className="text-xs text-zinc-300">Термін: 1-2 робочі дні</p>
                  <p className="text-xs text-zinc-400">Вартість: від 85 грн</p>
                  <span className="text-[10px] text-zinc-400 block">Прямо до дверей вашого дому</span>
                </div>
              </div>
            </div>

            {/* Packaging Notice */}
            <div className="bg-[#1A1813] border border-[#3F331D] p-6 rounded-2xl flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
              <div className="text-xs text-zinc-300 space-y-1">
                <h4 className="font-bold text-white text-sm">Надійна ударостійка упаковка декантів</h4>
                <p>
                  Всі скляні атомайзери додатково пакуються в декілька шарів повітряно-бульбашкової плівки, ущільнюються у твердій захисній коробці та запаюються. Ми гарантуємо цілісність кожного флакона під час транспортування.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Tab */}
        {activeTab === 'payment' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#121214] p-8 rounded-3xl border border-[#27272A] space-y-6">
              <div className="flex items-center gap-3 text-[#D4AF37]">
                <CreditCard className="w-6 h-6" />
                <h2 className="font-serif text-2xl font-bold text-white">Способи оплати</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-[#1A1A1E] p-5 rounded-2xl border border-[#27272A] space-y-2">
                  <h3 className="font-serif font-bold text-white text-base">1. Оплата при отриманні (Накладений платіж)</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Ви сплачуєте замовлення безпосередньо у відділенні або поштоматі Нової Пошти після огляду та перевірки цілісності упаковки.
                  </p>
                </div>

                <div className="bg-[#1A1A1E] p-5 rounded-2xl border border-[#27272A] space-y-2">
                  <h3 className="font-serif font-bold text-white text-base">2. Оплата на картку / Розрахунковий рахунок IBAN</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Після підтвердження замовлення менеджер надсилає вам офіційні реквізити IBAN або номер картки Monobank / ПриватБанк для оплати без комісії накладеного платежу.
                  </p>
                </div>

                <div className="bg-[#1A1A1E] p-5 rounded-2xl border border-[#27272A] space-y-2">
                  <h3 className="font-serif font-bold text-white text-base">3. Онлайн-підтвердження</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Швидке підтвердження по Viber або Telegram одразу після оформлення через сайт.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Returns Tab */}
        {activeTab === 'returns' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#121214] p-8 rounded-3xl border border-[#27272A] space-y-6">
              <div className="flex items-center gap-3 text-[#D4AF37]">
                <RefreshCw className="w-6 h-6" />
                <h2 className="font-serif text-2xl font-bold text-white">Умови повернення та обміну</h2>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                Відповідно до Закону України «Про захист прав споживачів», парфумерно-косметичні вироби належної якості не підлягають поверненню або обміну після відкриття/використання.
              </p>

              <div className="space-y-4 border-t border-[#27272A] pt-4">
                <h3 className="font-serif font-bold text-[#D4AF37] text-base">Випадки, коли ми робимо 100% заміну або повернення коштів:</h3>

                <ul className="space-y-2 text-xs text-zinc-300 list-disc list-inside">
                  <li>Пошкодження або деформація флакона/спрею під час транспортування Новою Поштою.</li>
                  <li>Отримання товару, який не відповідає замовленню (інший аромат або об'єм).</li>
                  <li>Виявлення заводського дефекту розпилювача (не працює помпа).</li>
                </ul>

                <div className="p-4 bg-[#1A1A1E] rounded-xl border border-[#3F3F46] text-xs text-zinc-300 space-y-2">
                  <p className="font-bold text-white">Як оформити повернення/обмін?</p>
                  <p>1. Зробіть фото або відео виявленого дефекту у день отримання замовлення.</p>
                  <p>2. Напишіть нам у Viber/Telegram або зателефонуйте: <span className="text-[#D4AF37] font-mono">+380 (97) 123-45-67</span>.</p>
                  <p>3. Ми відправимо повторний декант за наш рахунок у той же день!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Support CTA */}
        <div className="bg-gradient-to-r from-[#1A1813] to-[#2A2318] p-8 rounded-3xl border border-[#3F331D] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif font-bold text-white text-lg">Залишилися питання щодо замовлення?</h3>
            <p className="text-xs text-zinc-300">Наші консультанти з радістю допоможуть обрати об'єм та аромат.</p>
          </div>
          <a
            href="tel:+380971234567"
            className="px-6 py-3 bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#E6C687] transition-all shrink-0 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>+380 (97) 123-45-67</span>
          </a>
        </div>
      </div>
    </div>
  );
}
