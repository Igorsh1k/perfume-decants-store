'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Phone, Mail, Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type AuthTab = 'login' | 'register';

export const AuthModal: React.FC = () => {
  const router = useRouter();
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle, loginWithEmail, registerUser } = useAuth();

  const [tab, setTab] = useState<AuthTab>('login');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const resetForms = () => {
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
    setLoginLoading(false);
    setRegName('');
    setRegEmail('');
    setRegPhone('');
    setRegPassword('');
    setRegConfirm('');
    setRegError('');
    setRegLoading(false);
  };

  const switchTab = (newTab: AuthTab) => {
    setTab(newTab);
    setLoginError('');
    setRegError('');
  };

  const handleClose = () => {
    resetForms();
    setTab('login');
    closeAuthModal();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Заповніть всі поля');
      return;
    }

    setLoginLoading(true);
    const result = await loginWithEmail(loginEmail, loginPassword);
    setLoginLoading(false);

    if (!result.success) {
      if (result.notFound) {
        // Email not registered → suggest registration, pre-fill email
        setRegEmail(loginEmail);
        switchTab('register');
      } else {
        setLoginError(result.error || 'Помилка входу');
      }
    } else {
      resetForms();
      if (result.isAdmin) {
        router.push('/admin');
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || !regPassword || !regConfirm) {
      setRegError('Заповніть всі поля');
      return;
    }

    if (regPassword.length < 6) {
      setRegError('Пароль має бути не менше 6 символів');
      return;
    }

    if (regPassword !== regConfirm) {
      setRegError('Паролі не збігаються');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail)) {
      setRegError('Невірний формат email');
      return;
    }

    setRegLoading(true);
    const result = await registerUser({
      name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
    });
    setRegLoading(false);

    if (!result.success) {
      setRegError(result.error || 'Помилка реєстрації');
    } else {
      resetForms();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#121214] text-white rounded-3xl shadow-2xl border border-[#27272A] p-6 sm:p-8 space-y-5 z-10 animate-fadeIn max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-[#27272A]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher */}
        <div className="space-y-1">
          <div className="flex gap-1 bg-[#1A1A1E] rounded-xl p-1">
            <button
              onClick={() => switchTab('login')}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                tab === 'login'
                  ? 'bg-[#27272A] text-white shadow-md'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Вхід
            </button>
            <button
              onClick={() => switchTab('register')}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                tab === 'register'
                  ? 'bg-[#27272A] text-white shadow-md'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Реєстрація
            </button>
          </div>
          <p className="text-[11px] text-zinc-400 font-light pt-1 px-1">
            {tab === 'login'
              ? 'Увійдіть, щоб зберегти бонуси та пришвидшити оформлення замовлення'
              : 'Створіть акаунт, щоб отримувати бонуси та відстежувати замовлення'}
          </p>
        </div>

        {/* ===================== LOGIN TAB ===================== */}
        {tab === 'login' && (
          <>
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

            <div className="flex items-center gap-3 text-xs text-zinc-500 my-1">
              <span className="flex-1 h-px bg-[#27272A]" />
              <span>або</span>
              <span className="flex-1 h-px bg-[#27272A]" />
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Email & Password Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] placeholder:text-zinc-600"
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
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 bg-[#27272A] hover:bg-[#3F3F46] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginLoading ? 'Входимо...' : 'Увійти'}
              </button>
            </form>

            <p className="text-center text-xs text-zinc-500">
              Немає акаунту?{' '}
              <button
                onClick={() => switchTab('register')}
                className="text-[#D4AF37] hover:text-[#E6C687] font-semibold transition-colors"
              >
                Зареєструватися
              </button>
            </p>
          </>
        )}

        {/* ===================== REGISTER TAB ===================== */}
        {tab === 'register' && (
          <>
            {/* Error Message */}
            {regError && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{regError}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Ім&apos;я та прізвище</label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Іван Петренко"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Телефон</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+380 (XX) XXX-XX-XX"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">
                  Пароль <span className="text-zinc-600">(мін. 6 символів)</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Підтвердіть пароль</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={regLoading}
                className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A880] hover:from-[#E6C687] hover:to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {regLoading ? 'Реєструємо...' : 'Зареєструватися'}
              </button>
            </form>

            <p className="text-center text-xs text-zinc-500">
              Вже є акаунт?{' '}
              <button
                onClick={() => switchTab('login')}
                className="text-[#D4AF37] hover:text-[#E6C687] font-semibold transition-colors"
              >
                Увійти
              </button>
            </p>
          </>
        )}

        <button
          onClick={handleClose}
          className="w-full py-2.5 text-zinc-400 hover:text-white text-xs transition-all text-center"
        >
          Продовжити як гість
        </button>
      </div>
    </div>
  );
};
