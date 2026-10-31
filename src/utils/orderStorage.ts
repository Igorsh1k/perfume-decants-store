import { supabase } from '@/lib/supabase';

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  date: string;
  total: number;
  status: 'Обробляється' | 'Комплектується' | 'Відправлено' | 'Доставлено';
  ttn?: string;
  settlement: string;
  branch: string;
  itemsCount?: number;
  items?: unknown[];
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function rowToOrder(row: Record<string, unknown>): AdminOrder {
  return {
    id: row.id as string,
    orderNumber: row.order_number as string,
    customerName: row.customer_name as string,
    phone: row.phone as string,
    date: row.date as string,
    total: row.total as number,
    status: row.status as AdminOrder['status'],
    ttn: (row.ttn as string) || '',
    settlement: (row.settlement as string) || '',
    branch: (row.branch as string) || '',
    itemsCount: (row.items_count as number) || 1,
    items: (row.items as unknown[]) || [],
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getStoredOrders(): Promise<AdminOrder[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('getStoredOrders error:', error);
    return [];
  }

  return data.map(rowToOrder);
}

export async function addAdminOrder(order: AdminOrder): Promise<AdminOrder[]> {
  const { error } = await supabase.from('orders').insert({
    id: order.id,
    order_number: order.orderNumber,
    customer_name: order.customerName,
    phone: order.phone,
    date: order.date,
    total: order.total,
    status: order.status,
    ttn: order.ttn || '',
    settlement: order.settlement,
    branch: order.branch,
    items_count: order.itemsCount || 1,
    items: order.items || [],
  });

  if (error) console.error('addAdminOrder error:', error);
  return getStoredOrders();
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: AdminOrder['status'],
  ttn?: string,
): Promise<AdminOrder[]> {
  const updateData: Record<string, unknown> = { status: newStatus };
  if (ttn !== undefined) updateData.ttn = ttn;

  const { error } = await supabase
    .from('orders')
    .update(updateData)
    .eq('id', orderId);

  if (error) console.error('updateOrderStatus error:', error);
  return getStoredOrders();
}

export async function deleteAdminOrder(orderId: string): Promise<AdminOrder[]> {
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId);

  if (error) console.error('deleteAdminOrder error:', error);
  return getStoredOrders();
}

// Legacy sync stubs kept for backward compat (unused but avoids TS errors)
export const INITIAL_ADMIN_ORDERS: AdminOrder[] = [];
export function saveOrders(_orders: AdminOrder[]): void {}
