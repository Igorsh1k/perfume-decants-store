'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Check, ShieldCheck, Truck, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Product } from '@/types/product';
import { getStoredProducts } from '@/utils/productStorage';
import { Review } from '@/types/product';
import { getReviews, saveReview } from '@/utils/reviews';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getStoredProducts().then(setProducts);
  }, []);

  const product = products.find((p) => p.id === productId);

  if (!product && products.length > 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-white">Товар не знайдено</h1>
        <p className="text-zinc-400 text-sm">Неможливо знайти вказаний аромат або аксесуар.</p>
        <Link
          href="/catalog"
          className="inline-block px-6 py-3 bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs uppercase tracking-wider rounded-lg"
        >
          Повернутися до каталогу
        </Link>
      </div>
    );
  }

  if (!product) {
    return <div className="p-12 text-center text-zinc-400 font-mono">Завантаження товару...</div>;
  }

  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedVolume, setSelectedVolume] = useState<string>(
    product.volumes[1]?.volume || product.volumes[0]?.volume || '2 мл'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    setReviews(getReviews(product.id));
    setSelectedImage(product.image);
  }, [product.id, product.image]);

  const currentVolumeObj = product.volumes.find((v) => v.volume === selectedVolume) || product.volumes[0];
  const unitPrice = currentVolumeObj ? currentVolumeObj.price : product.defaultPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, selectedVolume, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;

    const saved = saveReview({
      productId: product.id,
      userName: newReviewName,
      rating: newReviewRating,
      text: newReviewText,
    });

    setReviews((prev) => [saved, ...prev]);
    setNewReviewName('');
    setNewReviewText('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Back Link */}
      <div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад до каталогу</span>
        </Link>
      </div>

      {/* Main Product Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Gallery Column */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#121214] border border-[#27272A] shadow-2xl">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              priority
              className="object-cover transition-all duration-300"
            />
            {product.badges?.includes('hit') && (
              <span className="absolute top-4 left-4 bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                Хіт продажів
              </span>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img
                      ? 'border-[#D4AF37] scale-105'
                      : 'border-[#27272A] opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#D4AF37]">
              {product.brand}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
              {product.name}
            </h1>

            {/* Rating summary */}
            <div className="flex items-center gap-2 mt-3 text-sm">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[#D4AF37] text-[#D4AF37]'
                        : 'text-zinc-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-white font-bold">{product.rating.toFixed(1)}</span>
              <span className="text-zinc-500 font-mono text-xs">({reviews.length} відгуків)</span>
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400 font-medium text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> В наявності
              </span>
            </div>
          </div>

          {/* Volume Selection Pills */}
          <div className="bg-[#121214] p-6 rounded-2xl border border-[#27272A] space-y-4">
            <label className="text-xs uppercase tracking-wider font-bold text-zinc-300 block">
              1. Оберіть об'єм деканта:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {product.volumes.map((v) => (
                <button
                  key={v.volume}
                  onClick={() => setSelectedVolume(v.volume)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedVolume === v.volume
                      ? 'bg-[#D4AF37] text-[#0B0B0C] border-[#D4AF37] font-bold shadow-lg shadow-[#D4AF37]/10'
                      : 'bg-[#1A1A1E] text-zinc-300 border-[#27272A] hover:border-zinc-500'
                  }`}
                >
                  <span className="block text-xs font-mono font-bold">{v.volume}</span>
                  <span className="block text-xs mt-1 opacity-90">{v.price} грн</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price & Quantity & Add to Cart */}
          <div className="bg-[#121214] p-6 rounded-2xl border border-[#27272A] space-y-6">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
              <div>
                <span className="text-xs text-zinc-400 block">Вартість ({selectedVolume}):</span>
                <span className="text-3xl font-serif font-bold text-[#D4AF37]">
                  {totalPrice} грн
                </span>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-3 bg-[#1A1A1E] border border-[#3F3F46] rounded-xl p-1.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 text-zinc-400 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-mono font-bold text-sm text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1.5 text-zinc-400 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Big Add Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                added
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880] text-[#0B0B0C] hover:brightness-110 shadow-xl shadow-[#D4AF37]/15'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Додано в кошик!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Додати в кошик • {totalPrice} грн</span>
                </>
              )}
            </button>

            {/* Service badges */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-zinc-400 border-t border-[#27272A]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>Відправка сьогодні</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Оплата при отриманні</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-white">Опис аромату</h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Olfactory Pyramid Section */}
      {product.notes && (
        <section className="bg-[#121214] border border-[#27272A] rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="text-center max-w-md mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Парфумерна композиція
            </span>
            <h2 className="font-serif text-2xl font-bold text-white mt-1">Піраміда аромату</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1A1A1E] p-6 rounded-2xl border border-[#27272A] space-y-3 text-center">
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold">
                1. Верхні ноти
              </span>
              <p className="text-xs text-zinc-500 font-light">Перші враження (10-15 хвилин)</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {product.notes.top.map((note) => (
                  <span
                    key={note}
                    className="bg-[#27272A] text-zinc-200 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#1A1A1E] p-6 rounded-2xl border border-[#27272A] space-y-3 text-center">
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold">
                2. Ноти серця
              </span>
              <p className="text-xs text-zinc-500 font-light">Основне ядро (2-4 години)</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {product.notes.heart.map((note) => (
                  <span
                    key={note}
                    className="bg-[#27272A] text-zinc-200 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#1A1A1E] p-6 rounded-2xl border border-[#27272A] space-y-3 text-center">
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold">
                3. Базові ноти
              </span>
              <p className="text-xs text-zinc-500 font-light">Глибокий шлейф (до 24 годин)</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {product.notes.base.map((note) => (
                  <span
                    key={note}
                    className="bg-[#27272A] text-zinc-200 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section className="space-y-8">
        <div className="border-b border-[#27272A] pb-4 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Думки покупців
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              Відгуки про {product.name}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-4">
            {reviews.length === 0 ? (
              <p className="text-xs text-zinc-400">Будьте першим, хто залишить відгук про цей аромат!</p>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="bg-[#121214] p-6 rounded-2xl border border-[#27272A] space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{rev.userName}</h4>
                      <span className="text-[11px] text-zinc-500 font-mono">{rev.date}</span>
                    </div>
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-zinc-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{rev.text}</p>
                </div>
              ))
            )}
          </div>

          {/* Add Review Form */}
          <div className="bg-[#121214] p-6 rounded-2xl border border-[#27272A] space-y-4">
            <h3 className="font-serif font-bold text-white text-lg">Залишити відгук</h3>

            {reviewSubmitted && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs rounded-lg">
                Дякуємо! Ваш відгук успішно додано та збережено.
              </div>
            )}

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-300 block mb-1">Ваше ім'я *</label>
                <input
                  type="text"
                  required
                  placeholder="Олена або Олександр"
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1">Оцінка *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 text-[#D4AF37]"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= newReviewRating ? 'fill-[#D4AF37]' : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1">Ваш відгук *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Поділіться вашими враженнями про стійкість, шлейф та звучання аромату..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#E6C687] transition-all"
              >
                Опублікувати відгук
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
