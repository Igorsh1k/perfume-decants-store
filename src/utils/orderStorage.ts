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
}

export const INITIAL_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'OVERDOSE-849201',
    customerName: 'Шургалюк Ігор Васильович',
    phone: '+38 (096) 559 81 97',
    date: '28.09.2026',
    total: 1557,
    status: 'Відправлено',
    ttn: '20450912839120',
    settlement: 'с. Поляниця (Івано-Франківська обл. Яремче р.)',
    branch: 'Відділення №1: участок Щивки, буд.1, приміщення 5',
    itemsCount: 2,
  },
  {
    id: 'ord-102',
    orderNumber: 'OVERDOSE-849202',
    customerName: 'Коваль Олена Петрівна',
    phone: '+380971234567',
    date: '28.09.2026',
    total: 2140,
    status: 'Обробляється',
    settlement: 'м. Київ',
    branch: 'Відділення №15: вул. Малопідвальна, 12',
    itemsCount: 3,
  },
];

const STORAGE_KEY = 'overdose_parfums_admin_orders';

export function getStoredOrders(): AdminOrder[] {
  if (typeof window === 'undefined') {
    return INITIAL_ADMIN_ORDERS;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ADMIN_ORDERS));
      return INITIAL_ADMIN_ORDERS;
    }
    return JSON.parse(saved);
  } catch {
    return INITIAL_ADMIN_ORDERS;
  }
}

export function saveOrders(orders: AdminOrder[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }
}

export function addAdminOrder(order: AdminOrder): AdminOrder[] {
  const current = getStoredOrders();
  const updated = [order, ...current];
  saveOrders(updated);
  return updated;
}

export function updateOrderStatus(orderId: string, newStatus: AdminOrder['status'], ttn?: string): AdminOrder[] {
  const current = getStoredOrders();
  const updated = current.map((o) => (o.id === orderId ? { ...o, status: newStatus, ...(ttn !== undefined ? { ttn } : {}) } : o));
  saveOrders(updated);
  return updated;
}

export function deleteAdminOrder(orderId: string): AdminOrder[] {
  const current = getStoredOrders();
  const updated = current.filter((o) => o.id !== orderId);
  saveOrders(updated);
  return updated;
}
