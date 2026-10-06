'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';

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

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim() || !formData.message.trim()) return;

    setSubmitted(true);
    setFormData({ name: '', contact: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Естетика нішевої парфумерії
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Про Overdose Parfums та контакти
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
          Ми створили Overdose Parfums, щоб кожен міг спробувати справжні парфумерні шедеври у зручному форматі деканту від 1 мл.
        </p>
      </div>

      {/* Story & Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-[#27272A] shadow-2xl">
          <Image
            src="/images/hero_smoky.jpg"
            alt="Overdose Parfums Studio"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1E] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Наша філософія</span>
          </div>

          <h2 className="font-serif text-3xl font-bold text-white">
            Чому ми обираємо саме розпив (деканти)?
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
            <p>
              Нішева парфумерія — це мистецтво, яке не повинно бути обмежене ціною одного великого флакона в 10 000–15 000 грн. Часто аромат розкривається зовсім інакше на шкірі, ніж на паперовому блоттері в магазині.
            </p>
            <p>
              Розпив (декантування) — це процес точного переливання оригінального аромату з повнорозмірного флакона у невеликий скляний атомайзер (1 мл, 2 мл, 5 мл або 10 мл). Це дозволяє вам отримати 100% оригінальний парфум, розносити його в різних погодних умовах і зрозуміти, чи підходить він саме вам.
            </p>
            <p>
              У нашому асортименті представлені легендарні бренди: Maison Francis Kurkdjian, Tom Ford, Creed, Kilian Paris, Byredo, Le Labo, Xerjoff, Parfums de Marly та популярна люкс парфумерія.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#121214] border border-[#27272A] rounded-2xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs font-bold text-white">100% Гарантія оригінальності</span>
            </div>
            <div className="p-4 bg-[#121214] border border-[#27272A] rounded-2xl flex items-center gap-3">
              <HeartHandshake className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs font-bold text-white">Індивідуальний підбір нот</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Social Buttons Bar */}
      <div className="bg-[#121214] border border-[#27272A] rounded-3xl p-8 text-center space-y-6">
        <h3 className="font-serif text-2xl font-bold text-white">Зв'яжіться з нами в один клік</h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Швидка консультація щодо вибору аромату, перевірка батч-коду або допомога з замовленням у месенджерах.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="viber://chat?number=%2B380971234567"
            className="px-6 py-3 bg-[#7360F2] hover:bg-[#624FE1] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Написати в Viber</span>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Написати в Instagram</span>
          </a>

          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-[#229ED9] hover:bg-[#1D8BC0] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg"
          >
            <Send className="w-4 h-4" />
            <span>Написати в Telegram</span>
          </a>
        </div>
      </div>

      {/* Contact Cards & Feedback Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#121214] border border-[#27272A] rounded-3xl p-8 space-y-6">
            <h3 className="font-serif text-xl font-bold text-white border-b border-[#27272A] pb-4">
              Контактна інформація
            </h3>

            <div className="space-y-5 text-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1A1A1E] text-[#D4AF37] rounded-xl border border-[#27272A]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-zinc-400 block">Телефон клієнтської підтримки:</span>
                  <a href="tel:+380971234567" className="text-white font-bold font-mono text-sm hover:text-[#D4AF37]">
                    +380 (97) 123-45-67
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1A1A1E] text-[#D4AF37] rounded-xl border border-[#27272A]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-zinc-400 block">Електронна пошта:</span>
                  <a href="mailto:info@overdoseparfums.com.ua" className="text-white font-semibold hover:text-[#D4AF37]">
                    info@overdoseparfums.com.ua
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1A1A1E] text-[#D4AF37] rounded-xl border border-[#27272A]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-zinc-400 block">Адреса ательє / вивозу:</span>
                  <span className="text-white font-semibold">м. Київ, вул. Хрещатик, 22</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1A1A1E] text-[#D4AF37] rounded-xl border border-[#27272A]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-zinc-400 block">Графік роботи:</span>
                  <span className="text-white font-semibold">Пн - Нд: 09:00 - 20:00 (без вихідних)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Feedback Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#121214] border border-[#27272A] rounded-3xl p-8 space-y-6">
            <h3 className="font-serif text-xl font-bold text-white border-b border-[#27272A] pb-4">
              Форма зворотного зв'язку
            </h3>

            {submitted && (
              <div className="p-4 bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>Дякуємо! Ваше повідомлення успішно надіслане. Ми відповімо вам найближчим часом.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-300 block mb-1">Ваше ім'я *</label>
                <input
                  type="text"
                  required
                  placeholder="Олена"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1">Телефон або Email *</label>
                <input
                  type="text"
                  required
                  placeholder="+380... або name@mail.com"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1">Повідомлення *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Вкажіть, який аромат або об'єм вас цікавить, або напишіть ваші запитання..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880] text-[#0B0B0C] font-bold text-xs uppercase tracking-widest rounded-xl hover:brightness-110 shadow-lg shadow-[#D4AF37]/10 transition-all"
              >
                Надіслати повідомлення
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
