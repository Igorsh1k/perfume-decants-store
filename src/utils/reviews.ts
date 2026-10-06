import { Review } from '@/types/product';

const STORAGE_KEY = 'aura_parfums_reviews';

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'mfk-baccarat-rouge-540',
    userName: 'Олена К.',
    rating: 5,
    text: 'Оригінал 100%! Замовляла 5 мл на пробу, аромат неймовірно стійкий, шлейф тримається два дні. Дякую за швидку доставку Новою Поштою та красиву упаковку!',
    date: '14.09.2026',
  },
  {
    id: 'rev-2',
    productId: 'mfk-baccarat-rouge-540',
    userName: 'Михайло В.',
    rating: 5,
    text: 'Дуже радий, що знайшов цей магазин. Можливість взяти 2-5 мл деканта — найкраще рішення перед купівлею повного флакона.',
    date: '02.09.2026',
  },
  {
    id: 'rev-3',
    productId: 'tom-ford-lost-cherry',
    userName: 'Анастасія',
    rating: 5,
    text: 'Вишня просто п\'янка! Якісний атомайзер, спрей дрібнорозпилювальний. Обов\'язково повернуся за іншими ароматами.',
    date: '18.09.2026',
  },
  {
    id: 'rev-4',
    productId: 'kilian-angels-share',
    userName: 'Дмитро Г.',
    rating: 5,
    text: 'Затишний затишок кориці та коньяку на осінь. Брала 10 мл у подарунок, прийшло в красивому оксамитовому мішечку.',
    date: '10.09.2026',
  },
  {
    id: 'rev-5',
    productId: 'creed-aventus',
    userName: 'Артем С.',
    rating: 5,
    text: 'Справжній Aventus, той самий шлейф ананаса та диму. Всі батч-коди відповідають. Рекомендую!',
    date: '05.09.2026',
  },
];

export function getReviews(productId: string): Review[] {
  if (typeof window === 'undefined') {
    return INITIAL_REVIEWS.filter((r) => r.productId === productId);
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS.filter((r) => r.productId === productId);
    }
    const parsed: Review[] = JSON.parse(saved);
    return parsed.filter((r) => r.productId === productId);
  } catch {
    return INITIAL_REVIEWS.filter((r) => r.productId === productId);
  }
}

export function saveReview(review: Omit<Review, 'id' | 'date'>): Review {
  const newReview: Review = {
    ...review,
    id: 'rev-' + Date.now(),
    date: new Date().toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  };

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const reviews: Review[] = saved ? JSON.parse(saved) : INITIAL_REVIEWS;
      const updated = [newReview, ...reviews];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save review to localStorage', e);
    }
  }

  return newReview;
}
