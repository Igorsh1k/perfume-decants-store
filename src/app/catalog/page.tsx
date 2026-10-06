'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Search, RotateCcw, X, ChevronDown } from 'lucide-react';
import { Product, ProductCategory, ProductGender } from '@/types/product';
import { getStoredProducts } from '@/utils/productStorage';
import { ProductCard } from '@/components/ProductCard';

function CatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') as ProductCategory | null;

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getStoredProducts());
  }, []);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(
    categoryParam ? [categoryParam] : []
  );
  const [selectedGenders, setSelectedGenders] = useState<ProductGender[]>([]);
  const [selectedVolumes, setSelectedVolumes] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 15000,
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'name'>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(9);

  // Toggle Category
  const toggleCategory = (cat: ProductCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Toggle Gender
  const toggleGender = (g: ProductGender) => {
    setSelectedGenders((prev) =>
      prev.includes(g) ? prev.filter((item) => item !== g) : [...prev, g]
    );
  };

  // Toggle Volume
  const toggleVolume = (vol: string) => {
    setSelectedVolumes((prev) =>
      prev.includes(vol) ? prev.filter((v) => v !== vol) : [...prev, vol]
    );
  };

  // Reset Filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedGenders([]);
    setSelectedVolumes([]);
    setOnlyInStock(false);
    setPriceRange({ min: 0, max: 15000 });
    setSearchQuery('');
    setSortBy('popular');
  };

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand) return false;
      }

      // Category
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Gender
      if (selectedGenders.length > 0 && !selectedGenders.includes(product.gender)) {
        return false;
      }

      // Volume availability
      if (selectedVolumes.length > 0) {
        const hasVolume = product.volumes.some((v) =>
          selectedVolumes.some((sv) => v.volume.toLowerCase().includes(sv.toLowerCase()))
        );
        if (!hasVolume) return false;
      }

      // In stock
      if (onlyInStock && !product.inStock) {
        return false;
      }

      // Price Range (check minimum volume price)
      const minProductPrice = Math.min(...product.volumes.map((v) => v.price));
      if (minProductPrice < priceRange.min || minProductPrice > priceRange.max) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        const priceA = Math.min(...a.volumes.map((v) => v.price));
        const priceB = Math.min(...b.volumes.map((v) => v.price));
        return priceA - priceB;
      }
      if (sortBy === 'price-desc') {
        const priceA = Math.min(...a.volumes.map((v) => v.price));
        const priceB = Math.min(...b.volumes.map((v) => v.price));
        return priceB - priceA;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'uk');
      }
      // Popular (rating + review count)
      return b.rating * b.reviewCount - a.rating * a.reviewCount;
    });
  }, [
    products,
    selectedCategories,
    selectedGenders,
    selectedVolumes,
    onlyInStock,
    priceRange,
    searchQuery,
    sortBy,
  ]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Title */}
      <div className="mb-8 border-b border-[#27272A] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Асортимент Aura Parfums
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-1">
            Каталог парфумерії та аксесуарів
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Шукати за назвою або брендом..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121214] border border-[#27272A] focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Top Controls Bar (Mobile Filter Toggle & Sorting) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#121214] p-4 rounded-xl border border-[#27272A]">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#1A1A1E] border border-[#3F3F46] rounded-lg text-xs font-semibold uppercase tracking-wider text-white"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
          <span>Фільтри {selectedCategories.length > 0 && `(${selectedCategories.length})`}</span>
        </button>

        <div className="text-xs text-zinc-400 font-mono">
          Знайдено: <span className="text-[#D4AF37] font-bold">{filteredProducts.length}</span> товарів
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 hidden sm:inline">Сортувати:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-[#1A1A1E] border border-[#3F3F46] text-white text-xs font-medium rounded-lg px-4 py-2 pr-8 outline-none focus:border-[#D4AF37] cursor-pointer"
            >
              <option value="popular">За популярністю</option>
              <option value="price-asc">Ціна: від дешевшої</option>
              <option value="price-desc">Ціна: від дорожчої</option>
              <option value="name">За назвою (А-Я)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar Component */}
        <aside
          className={`lg:block ${
            mobileFilterOpen ? 'block' : 'hidden'
          } bg-[#121214] p-6 rounded-2xl border border-[#27272A] space-y-6 self-start`}
        >
          <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
            <h3 className="font-serif font-bold text-white text-lg flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              Фільтрація
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] text-zinc-400 hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
              title="Скинути всі фільтри"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Скинути</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-300">Категорії</h4>
            <div className="space-y-2">
              {[
                { id: 'niche', label: 'Нішева парфумерія' },
                { id: 'luxury', label: 'Люкс парфумерія' },
                { id: 'flacons', label: 'Флакони та атомайзери' },
                { id: 'accessories', label: 'Упаковка та аксесуари' },
              ].map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2.5 text-xs text-zinc-300 hover:text-white cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(item.id as ProductCategory)}
                    onChange={() => toggleCategory(item.id as ProductCategory)}
                    className="w-4 h-4 rounded accent-[#D4AF37] bg-[#1A1A1E] border-[#3F3F46]"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender Filter */}
          <div className="space-y-2.5 pt-4 border-t border-[#27272A]">
            <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-300">Стать</h4>
            <div className="space-y-2">
              {[
                { id: 'unisex', label: 'Унісекс' },
                { id: 'female', label: 'Жіноча' },
                { id: 'male', label: 'Чоловіча' },
              ].map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2.5 text-xs text-zinc-300 hover:text-white cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedGenders.includes(item.id as ProductGender)}
                    onChange={() => toggleGender(item.id as ProductGender)}
                    className="w-4 h-4 rounded accent-[#D4AF37] bg-[#1A1A1E] border-[#3F3F46]"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Volume Filter */}
          <div className="space-y-2.5 pt-4 border-t border-[#27272A]">
            <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-300">Об'єм деканта</h4>
            <div className="flex flex-wrap gap-1.5">
              {['1 мл', '2 мл', '5 мл', '10 мл', 'Повний флакон'].map((vol) => (
                <button
                  key={vol}
                  onClick={() => toggleVolume(vol)}
                  className={`text-xs px-2.5 py-1 rounded-md border font-mono transition-colors ${
                    selectedVolumes.includes(vol)
                      ? 'bg-[#D4AF37] text-[#0B0B0C] font-bold border-[#D4AF37]'
                      : 'bg-[#1A1A1E] text-zinc-300 border-[#27272A] hover:border-zinc-500'
                  }`}
                >
                  {vol}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="space-y-2.5 pt-4 border-t border-[#27272A]">
            <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-300">Ціна (грн)</h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Від"
                value={priceRange.min || ''}
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) || 0 })}
                className="w-1/2 bg-[#1A1A1E] border border-[#3F3F46] rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
              />
              <span className="text-zinc-500">—</span>
              <input
                type="number"
                placeholder="До"
                value={priceRange.max || ''}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) || 15000 })}
                className="w-1/2 bg-[#1A1A1E] border border-[#3F3F46] rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* In Stock Filter */}
          <div className="pt-4 border-t border-[#27272A]">
            <label className="flex items-center gap-2.5 text-xs text-zinc-300 hover:text-white cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded accent-[#D4AF37] bg-[#1A1A1E] border-[#3F3F46]"
              />
              <span className="font-semibold text-white">Тільки в наявності</span>
            </label>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3 space-y-8">
          {displayedProducts.length === 0 ? (
            <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-12 text-center space-y-4">
              <p className="text-lg font-serif font-medium text-white">За вашим запитом нічого не знайдено</p>
              <p className="text-xs text-zinc-400">Спробуйте змінити обрані фільтри або пошуковий запит.</p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#E6C687] transition-all"
              >
                Скинути фільтри
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Show More Pagination */}
              {visibleCount < filteredProducts.length && (
                <div className="text-center pt-8">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="px-8 py-3 bg-[#1A1A1E] hover:bg-[#27272A] border border-[#3F3F46] hover:border-[#D4AF37] text-white text-xs uppercase tracking-widest font-semibold rounded-xl transition-all"
                  >
                    Показати ще ({filteredProducts.length - visibleCount})
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-400 font-mono">Завантаження каталогу...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
