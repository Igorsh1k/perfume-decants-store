import { Product } from '@/types/product';
import { PRODUCTS } from '@/data/products';

const STORAGE_KEY = 'overdose_parfums_products';

export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') {
    return PRODUCTS;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(PRODUCTS));
      return PRODUCTS;
    }
    return JSON.parse(saved);
  } catch {
    return PRODUCTS;
  }
}

export function saveProducts(products: Product[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }
}

export function addProduct(product: Product): Product[] {
  const current = getStoredProducts();
  const updated = [product, ...current];
  saveProducts(updated);
  return updated;
}

export function updateProduct(updatedProduct: Product): Product[] {
  const current = getStoredProducts();
  const updated = current.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
  saveProducts(updated);
  return updated;
}

export function deleteProduct(productId: string): Product[] {
  const current = getStoredProducts();
  const updated = current.filter((p) => p.id !== productId);
  saveProducts(updated);
  return updated;
}
