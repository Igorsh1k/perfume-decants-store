export type ProductCategory = 'niche' | 'luxury' | 'flacons' | 'accessories';
export type ProductGender = 'unisex' | 'female' | 'male';

export interface VolumeOption {
  volume: string; // e.g. "1 мл", "2 мл", "5 мл", "10 мл", "Повний флакон (50 мл)"
  price: number;
  inStock: boolean;
}

export interface ProductNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  gender: ProductGender;
  pricePerMl: number;
  defaultPrice: number;
  volumes: VolumeOption[];
  image: string;
  gallery: string[];
  description: string;
  notes?: ProductNotes;
  badges?: ('hit' | 'new' | 'sale')[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface CartItem {
  id: string; // combination of productId + selectedVolume
  product: Product;
  selectedVolume: string;
  price: number;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  text: string;
  date: string;
}

export interface OrderData {
  fullName: string;
  phone: string;
  deliveryType: 'warehouse' | 'postomat' | 'courier';
  city: string;
  branch: string;
  paymentMethod: 'card' | 'cod' | 'receipt';
  comment?: string;
}
