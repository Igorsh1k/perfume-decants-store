'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedVolume, setSelectedVolume] = useState<string>(
    product.volumes[1]?.volume || product.volumes[0]?.volume || '2 мл'
  );
  const [added, setAdded] = useState(false);

  const currentVolumeObj = product.volumes.find((v) => v.volume === selectedVolume) || product.volumes[0];
  const currentPrice = currentVolumeObj ? currentVolumeObj.price : product.defaultPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVolume, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-[#121214] border border-[#27272A] rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[#D4AF37]/5">
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-black/40">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.badges?.includes('hit') && (
            <span className="bg-[#D4AF37] text-[#0B0B0C] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
              Хіт
            </span>
          )}
          {product.badges?.includes('new') && (
            <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
              Новинка
            </span>
          )}
          {product.badges?.includes('sale') && (
            <span className="bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
              Акція
            </span>
          )}
        </div>

        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick Gender Badge */}
        <span className="absolute bottom-3 right-3 text-[10px] bg-[#121214]/80 backdrop-blur-sm text-zinc-300 px-2 py-0.5 rounded border border-[#27272A]">
          {product.gender === 'unisex' ? 'Унісекс' : product.gender === 'female' ? 'Жіночий' : 'Чоловічий'}
        </span>
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand */}
          <p className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-1">
            {product.brand}
          </p>

          {/* Product Name */}
          <Link href={`/product/${product.id}`}>
            <h3 className="text-base font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-[#D4AF37] text-[#D4AF37]'
                      : 'text-zinc-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-zinc-400 font-mono text-[11px]">
              {product.rating.toFixed(1)} ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Volume Picker Pills */}
        <div className="mt-4 pt-3 border-t border-[#27272A]">
          <p className="text-[10px] uppercase text-zinc-400 font-medium mb-2">Обрати об'єм:</p>
          <div className="flex flex-wrap gap-1.5">
            {product.volumes.map((v) => (
              <button
                key={v.volume}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedVolume(v.volume);
                }}
                className={`text-[11px] px-2.5 py-1 rounded-md border font-mono transition-all ${
                  selectedVolume === v.volume
                    ? 'bg-[#D4AF37] text-[#0B0B0C] border-[#D4AF37] font-bold'
                    : 'bg-[#1A1A1E] text-zinc-300 border-[#27272A] hover:border-zinc-500'
                }`}
              >
                {v.volume}
              </button>
            ))}
          </div>

          {/* Price & Add Button */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-400 block">Ціна:</span>
              <span className="text-lg font-serif font-bold text-[#D4AF37]">
                {currentPrice} грн
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all ${
                added
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'bg-gradient-to-r from-[#C5A880] to-[#D4AF37] text-[#0B0B0C] hover:brightness-110 shadow-lg shadow-[#D4AF37]/10'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Додано</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>В кошик</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
