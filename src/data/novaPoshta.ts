export interface Settlement {
  id: string;
  name: string;
  region: string;
  description: string;
}

export interface Branch {
  id: string;
  settlementId: string;
  number: string;
  address: string;
  type: 'warehouse' | 'postomat' | 'courier';
  maxWeight: string;
}

export const SETTLEMENTS: Settlement[] = [
  { id: 'set-1', name: 'Поляниця', region: 'Івано-Франківська обл. Яремче р.', description: 'с. Поляниця (Івано-Франківська обл. Яремче р.)' },
  { id: 'set-2', name: 'Київ', region: 'м. Київ', description: 'м. Київ (Київська обл.)' },
  { id: 'set-3', name: 'Львів', region: 'м. Львів', description: 'м. Львів (Львівська обл.)' },
  { id: 'set-4', name: 'Одеса', region: 'м. Одеса', description: 'м. Одеса (Одеська обл.)' },
  { id: 'set-5', name: 'Харків', region: 'м. Харків', description: 'м. Харків (Харківська обл.)' },
  { id: 'set-6', name: 'Дніпро', region: 'м. Дніпро', description: 'м. Дніпро (Дніпропетровська обл.)' },
  { id: 'set-7', name: 'Івано-Франківськ', region: 'м. Івано-Франківськ', description: 'м. Івано-Франківськ (Івано-Франківська обл.)' },
  { id: 'set-8', name: 'Тернопіль', region: 'м. Тернопіль', description: 'м. Тернопіль (Тернопільська обл.)' },
  { id: 'set-9', name: 'Вінниця', region: 'м. Вінниця', description: 'м. Вінниця (Вінницька обл.)' },
  { id: 'set-10', name: 'Ужгород', region: 'м. Ужгород', description: 'м. Ужгород (Закарпатська обл.)' },
  { id: 'set-11', name: 'Чернівці', region: 'м. Чернівці', description: 'м. Чернівці (Чернівецька обл.)' },
  { id: 'set-12', name: 'Буковель', region: 'Івано-Франківська обл.', description: 'смт Буковель (Івано-Франківська обл.)' },
  { id: 'set-13', name: 'Яремче', region: 'Івано-Франківська обл.', description: 'м. Яремче (Івано-Франківська обл.)' },
];

export const BRANCHES: Branch[] = [
  // Поляниця
  {
    id: 'br-poly-1',
    settlementId: 'set-1',
    number: '1',
    address: 'Відділення №1: участок Щивки, буд.1, приміщення 5 (Паркінг 1)',
    type: 'warehouse',
    maxWeight: 'Без обмежень',
  },
  {
    id: 'br-poly-2',
    settlementId: 'set-1',
    number: '2',
    address: 'Відділення №2 (до 10 кг): участок Центр, буд. 74',
    type: 'warehouse',
    maxWeight: 'До 10 кг',
  },
  {
    id: 'br-poly-3',
    settlementId: 'set-1',
    number: '4012',
    address: 'Поштомат №4012: участок Щивки 2',
    type: 'postomat',
    maxWeight: 'До 20 кг',
  },

  // Київ
  {
    id: 'br-kyiv-1',
    settlementId: 'set-2',
    number: '1',
    address: 'Відділення №1: вул. Пироговський шлях, 135',
    type: 'warehouse',
    maxWeight: 'Без обмежень',
  },
  {
    id: 'br-kyiv-2',
    settlementId: 'set-2',
    number: '15',
    address: 'Відділення №15 (до 30 кг): вул. Малопідвальна, 12/10',
    type: 'warehouse',
    maxWeight: 'До 30 кг',
  },
  {
    id: 'br-kyiv-3',
    settlementId: 'set-2',
    number: '56',
    address: 'Відділення №56 (до 30 кг): вул. Хрещатик, 22',
    type: 'warehouse',
    maxWeight: 'До 30 кг',
  },
  {
    id: 'br-kyiv-4',
    settlementId: 'set-2',
    number: '8801',
    address: 'Поштомат №8801: вул. Хрещатик, 14',
    type: 'postomat',
    maxWeight: 'До 20 кг',
  },

  // Львів
  {
    id: 'br-lviv-1',
    settlementId: 'set-3',
    number: '1',
    address: 'Відділення №1: вул. Городоцька, 355/6',
    type: 'warehouse',
    maxWeight: 'Без обмежень',
  },
  {
    id: 'br-lviv-2',
    settlementId: 'set-3',
    number: '8',
    address: 'Відділення №8 (до 30 кг): вул. Героїв УПА, 76',
    type: 'warehouse',
    maxWeight: 'До 30 кг',
  },
  {
    id: 'br-lviv-3',
    settlementId: 'set-3',
    number: '9204',
    address: 'Поштомат №9204: пл. Ринок, 10',
    type: 'postomat',
    maxWeight: 'До 20 кг',
  },

  // Одеса
  {
    id: 'br-ods-1',
    settlementId: 'set-4',
    number: '1',
    address: 'Відділення №1: вул. Базова, 16',
    type: 'warehouse',
    maxWeight: 'Без обмежень',
  },
  {
    id: 'br-ods-2',
    settlementId: 'set-4',
    number: '12',
    address: 'Відділення №12 (до 30 кг): вул. Дерибасівська, 14',
    type: 'warehouse',
    maxWeight: 'До 30 кг',
  },

  // Дніпро
  {
    id: 'br-dn-1',
    settlementId: 'set-6',
    number: '1',
    address: 'Відділення №1: вул. Маршала Малиновського, 114',
    type: 'warehouse',
    maxWeight: 'Без обмежень',
  },
  {
    id: 'br-dn-2',
    settlementId: 'set-6',
    number: '5',
    address: 'Відділення №5 (до 30 кг): пр. Дмитра Яворницького, 65',
    type: 'warehouse',
    maxWeight: 'До 30 кг',
  },
];
