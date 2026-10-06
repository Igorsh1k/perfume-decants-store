'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 2000;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const freeShippingPercent = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121214] text-white shadow-2xl border-l border-[#27272A] flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#27272A] flex items-center justify-between bg-[#16161A]">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-xl font-serif font-bold tracking-wide">
                Ваш кошик <span className="text-sm font-sans font-normal text-zinc-400">({totalItems})</span>
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-[#27272A]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="bg-[#1A1A1E] p-4 border-b border-[#27272A] text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-zinc-300 mb-2">
                Додайте товарів ще на <span className="text-[#D4AF37] font-bold">{remainingForFreeShipping} грн</span> для <span className="text-emerald-400 font-semibold">безкоштовної доставки</span>
              </p>
            ) : (
              <p className="text-emerald-400 font-medium flex items-center gap-1 mb-2">
                <ShieldCheck className="w-4 h-4" />
                Вітаємо! У вас безкоштовна доставка Новою Поштою!
              </p>
            )}
            <div className="w-full bg-[#27272A] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#C5A880] to-[#D4AF37] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-zinc-400">
                <div className="w-20 h-20 rounded-full bg-[#1A1A1E] border border-[#27272A] flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-zinc-600" />
                </div>
                <h3 className="text-lg font-serif text-white font-medium">Ваш кошик порожній</h3>
                <p className="text-xs max-w-xs text-zinc-400">
                  Оберіть ваш улюблений нішевий або люксовий аромат у каталозі та спробуйте у зручному деканті.
                </p>
                <Link
                  href="/catalog"
                  onClick={closeCart}
                  className="mt-4 px-6 py-3 bg-[#D4AF37] text-[#0B0B0C] font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-[#E6C687] transition-all shadow-lg"
                >
                  Перейти до каталогу
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-[#1A1A1E] border border-[#27272A] rounded-xl hover:border-[#3F3F46] transition-colors"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-black/40 flex-shrink-0 border border-[#27272A]">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                            {item.product.brand}
                          </p>
                          <h4 className="text-sm font-medium text-white line-clamp-1">
                            {item.product.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                          title="Видалити"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="inline-block mt-1 text-[11px] bg-[#27272A] text-zinc-300 px-2 py-0.5 rounded font-mono">
                        Об'єм: {item.selectedVolume}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#3F3F46] rounded-md bg-[#121214]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-zinc-400 hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-bold font-mono text-[#D4AF37]">
                        {item.price * item.quantity} грн
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#27272A] bg-[#16161A] space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Загальна сума:</span>
                <span className="text-xl font-serif font-bold text-[#D4AF37]">
                  {totalPrice} грн
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full py-3.5 bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880] text-[#0B0B0C] font-bold text-xs uppercase tracking-widest rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  Оформити замовлення
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full py-2.5 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Продовжити покупки
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
