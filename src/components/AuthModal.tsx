'use client';

import React, { useState } from 'react';
import { X, Phone, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle, loginWithEmail } = useAuth();
  const [email, setEmail] = useState('igorkrasavshuk@gmail.com');
  const [password, setPassword] = useState('••••••••••••');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      loginWithEmail(email, password);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeAuthModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#121214] text-white rounded-3xl shadow-2xl border border-[#27272A] p-6 sm:p-8 space-y-6 z-10 animate-fadeIn">
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-[#27272A]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-bold text-white">Авторизація</h2>
          <p className="text-xs text-zinc-400 font-light">
            Авторизуйтесь, щоб зберегти бонуси та пришвидшити оформлення замовлення
          </p>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 px-4 bg-[#3B5998] hover:bg-[#324B81] text-white text-xs font-bold rounded-xl transition-all shadow-md"
          >
            <span className="font-serif font-black text-sm">f</span>
            <span>Facebook</span>
          </button>

          <button
            type="button"
            onClick={loginWithGoogle}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-bold rounded-xl transition-all shadow-md"
          >
            <div className="w-4 h-4 rounded-full bg-white text-[#4285F4] font-bold text-xs flex items-center justify-center">
              G
            </div>
            <span>Google</span>
          </button>
        </div>

        <button
          type="button"
          onClick={loginWithGoogle}
          className="w-full py-2.5 px-4 bg-[#1A1A1E] border border-[#3F3F46] hover:border-zinc-500 text-zinc-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Телефон</span>
        </button>

        <div className="flex items-center gap-3 text-xs text-zinc-500 my-2">
          <span className="flex-1 h-px bg-[#27272A]" />
          <span>або</span>
          <span className="flex-1 h-px bg-[#27272A]" />
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] text-zinc-400 block mb-1">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-zinc-400 block mb-1">Пароль</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#27272A] hover:bg-[#3F3F46] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
          >
            Увійти
          </button>
        </form>

        <button
          onClick={closeAuthModal}
          className="w-full py-2.5 text-zinc-400 hover:text-white text-xs transition-all text-center"
        >
          Продовжити як гість
        </button>
      </div>
    </div>
  );
};
