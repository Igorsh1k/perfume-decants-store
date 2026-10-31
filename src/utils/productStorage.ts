import { Product } from '@/types/product';
import { PRODUCTS } from '@/data/products';
import { supabase } from '@/lib/supabase';

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Convert Supabase row → Product shape used by the app */
function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    brand: row.brand as string,
    category: row.category as Product['category'],
    gender: row.gender as Product['gender'],
    pricePerMl: row.price_per_ml as number,
    defaultPrice: row.default_price as number,
    inStock: row.in_stock as boolean,
    rating: Number(row.rating),
    reviewCount: row.review_count as number,
    image: (row.image as string) || '',
    gallery: (row.gallery as string[]) || [],
    description: (row.description as string) || '',
    badges: (row.badges as Product['badges']) || [],
    notes: {
      top: (row.notes_top as string[]) || [],
      heart: (row.notes_heart as string[]) || [],
      base: (row.notes_base as string[]) || [],
    },
    volumes: (row.volumes as Product['volumes']) || [],
  };
}

/** Convert Product → Supabase insert/update shape */
function productToRow(p: Product) {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    gender: p.gender,
    price_per_ml: p.pricePerMl,
    default_price: p.defaultPrice,
    in_stock: p.inStock,
    rating: p.rating,
    review_count: p.reviewCount,
    image: p.image,
    gallery: p.gallery,
    description: p.description,
    badges: p.badges || [],
    notes_top: p.notes?.top || [],
    notes_heart: p.notes?.heart || [],
    notes_base: p.notes?.base || [],
    volumes: p.volumes,
  };
}

// ─── Seed helper (runs once if DB is empty) ───────────────────────────────────

async function seedIfEmpty(): Promise<void> {
  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  if ((count ?? 0) === 0) {
    const rows = PRODUCTS.map(productToRow);
    await supabase.from('products').insert(rows);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getStoredProducts(): Promise<Product[]> {
  await seedIfEmpty();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('getStoredProducts error:', error);
    return PRODUCTS;
  }

  return data.map(rowToProduct);
}

export async function addProduct(product: Product): Promise<Product[]> {
  const { error } = await supabase
    .from('products')
    .insert(productToRow(product));

  if (error) console.error('addProduct error:', error);
  return getStoredProducts();
}

export async function updateProduct(product: Product): Promise<Product[]> {
  const { error } = await supabase
    .from('products')
    .update(productToRow(product))
    .eq('id', product.id);

  if (error) console.error('updateProduct error:', error);
  return getStoredProducts();
}

export async function deleteProduct(productId: string): Promise<Product[]> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) console.error('deleteProduct error:', error);
  return getStoredProducts();
}
