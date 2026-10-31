'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, User as UserIcon, Truck, CreditCard, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { SETTLEMENTS, BRANCHES, Settlement } from '@/data/novaPoshta';
import { SearchableSelect } from '@/components/SearchableSelect';
import { addAdminOrder } from '@/utils/orderStorage';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { user, openAuthModal, addOrderToHistory } = useAuth();

  // Step state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [firstName, setFirstName] = useState('Ігор');
  const [lastName, setLastName] = useState('Шургалюк');
  const [middleName, setMiddleName] = useState('Васильович');
  const [email, setEmail] = useState('igorkrasavshuk@gmail.com');
  const [phone, setPhone] = useState('+38 (096) 559 81 97');

  // Delivery State
  const [selectedSettlementId, setSelectedSettlementId] = useState('set-1'); // Поляниця
  const [selectedBranchId, setSelectedBranchId] = useState('br-poly-1');
  const [deliveryType, setDeliveryType] = useState<'warehouse' | 'postomat' | 'courier'>('warehouse');
  const [courierAddress, setCourierAddress] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');

  // Promo Code State
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Order Complete State
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderDetails, setConfirmedOrderDetails] = useState<{
    orderId: string;
    total: number;
    items: typeof cart;
    customerName: string;
    phone: string;
    settlement: string;
    branch: string;
  } | null>(null);

  // Auto fill if user is logged in
  useEffect(() => {
    if (user) {
      const parts = user.name.split(' ');
      setLastName(parts[0] || 'Шургалюк');
      setFirstName(parts[1] || 'Ігор');
      setMiddleName(parts[2] || 'Васильович');
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    if (promoCode.trim().toUpperCase() === 'OVERDOSE10' || promoCode.trim().toUpperCase() === 'AURA10') {
      setDiscountPercent(10);
      setPromoSuccess('Промокод застосовано! Знижка 10%.');
    } else if (promoCode.trim().toUpperCase() === 'VIP20') {
      setDiscountPercent(20);
      setPromoSuccess('Промокод застосовано! Знижка 20%.');
    } else {
      setPromoError('Недійсний промокод. Будь ласка, перевірте правильність написання.');
    }
  };

  const discountAmount = Math.round((totalPrice * discountPercent) / 100);
  const deliveryCost = totalPrice >= 2000 ? 0 : 60;
  const finalPrice = Math.max(0, totalPrice - discountAmount + deliveryCost);

  // Settlements Options for SearchableSelect
  const settlementOptions = SETTLEMENTS.map((s) => ({
    id: s.id,
    label: s.description,
  }));

  const currentSettlement = SETTLEMENTS.find((s) => s.id === selectedSettlementId) || SETTLEMENTS[0];

  // Branches Options filtered by settlement and deliveryType
  const filteredBranches = BRANCHES.filter(
    (b) => b.settlementId === selectedSettlementId && (deliveryType === 'warehouse' ? b.type === 'warehouse' : b.type === 'postomat')
  );

  const branchOptions = filteredBranches.map((b) => ({
    id: b.id,
    label: b.address,
    subLabel: `Макс. вага: ${b.maxWeight}`,
  }));

  const currentBranch = BRANCHES.find((b) => b.id === selectedBranchId) || filteredBranches[0] || BRANCHES[0];

  const handleConfirmOrder = async () => {
    const generatedOrderId = 'OVERDOSE-' + Math.floor(100000 + Math.random() * 900000);
    const fullName = `${lastName} ${firstName} ${middleName}`.trim();
    const branchText = deliveryType === 'courier' ? courierAddress : currentBranch?.address || 'Відділення №1';

    const orderData = {
      orderId: generatedOrderId,
      total: finalPrice,
      items: [...cart],
      customerName: fullName,
      phone,
      settlement: currentSettlement.description,
      branch: branchText,
    };

    setConfirmedOrderDetails(orderData);

    // Save to central Admin order storage for live analytics & admin tracking
    await addAdminOrder({
      id: 'ord-' + Date.now(),
      orderNumber: generatedOrderId,
      customerName: fullName,
      phone,
      date: new Date().toLocaleDateString('uk-UA'),
      total: finalPrice,
      status: 'Обробляється',
      settlement: currentSettlement.description,
      branch: branchText,
      itemsCount: cart.length,
    });

    // Save to user history if logged in
    if (user) {
      addOrderToHistory({
        id: 'ord-' + Date.now(),
        orderNumber: generatedOrderId,
        date: new Date().toLocaleDateString('uk-UA'),
        items: [...cart],
        total: finalPrice,
        status: 'Обробляється',
        settlement: currentSettlement.description,
        branch: branchText,
      });
    }

    setOrderConfirmed(true);
    clearCart();
  };

  if (orderConfirmed && confirmedOrderDetails) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-fadeIn">
        <div className="w-20 h-20 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37]">
            Замовлення успішно прийнято!
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Дякуємо за замовлення № {confirmedOrderDetails.orderId}
          </h1>
          <p className="text-zinc-300 text-sm max-w-md mx-auto">
            Наш менеджер вже готує деканти до відправки. Статус можна відстежувати у вашому Особистому кабінеті.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 text-left space-y-4 max-w-lg mx-auto text-xs">
          <div className="border-b border-[#27272A] pb-3 flex justify-between font-semibold">
            <span>Отримувач:</span>
            <span className="text-white">{confirmedOrderDetails.customerName}</span>
          </div>
          <div className="border-b border-[#27272A] pb-3 flex justify-between">
            <span>Доставка Новою Поштою:</span>
            <span className="text-white text-right max-w-xs">{confirmedOrderDetails.branch}</span>
          </div>

          <div className="space-y-2 pt-2">
            <p className="font-bold text-white">Куплені деканти:</p>
            {confirmedOrderDetails.items.map((item) => (
              <div key={item.id} className="flex justify-between text-zinc-300">
                <span>
                  {item.product.name} ({item.selectedVolume}) x {item.quantity}
                </span>
                <span className="font-mono">{item.price * item.quantity} грн</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#27272A] flex justify-between items-center text-sm font-bold">
            <span className="text-white">Всього до сплати:</span>
            <span className="text-lg font-serif text-[#D4AF37]">{confirmedOrderDetails.total} грн</span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/account"
            className="px-6 py-3 bg-[#1A1A1E] border border-[#3F3F46] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:border-[#D4AF37]"
          >
            Перейти в Кабінет
          </Link>
          <Link
            href="/catalog"
            className="px-6 py-3 bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880] text-[#0B0B0C] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg"
          >
            Продовжити покупки
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#121214] border border-[#27272A] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 text-zinc-600" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-white">Ваш кошик порожній</h1>
        <p className="text-zinc-400 text-sm max-w-md mx-auto">
          Ви ще не додали жодного нішевого чи люксового аромату.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:bg-[#E6C687] transition-all"
        >
          <span>Перейти до каталогу</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Step-by-Step Checkout matching screenshots */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: Authorization / Contact Info */}
          <div className="bg-[#121214] border border-[#27272A] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-[#27272A] flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-[#D4AF37]" />
                1. Контактні дані
              </h2>
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-[#D4AF37] underline font-semibold"
                >
                  Редагувати
                </button>
              ) : (
                !user && (
                  <button
                    onClick={openAuthModal}
                    className="text-xs text-[#D4AF37] hover:underline font-semibold"
                  >
                    Є аккаунт? (Вхід Google)
                  </button>
                )
              )}
            </div>

            {currentStep === 1 ? (
              <div className="p-6 space-y-4 text-xs">
                {/* Social Login Notice */}
                {!user && (
                  <div className="bg-[#1A1A1E] border border-[#3F3F46] p-4 rounded-xl space-y-3 mb-4">
                    <p className="text-zinc-300">
                      Авторизуйтесь, щоб зберегти бонуси та пришвидшити оформлення замовлення
                    </p>
                    <button
                      type="button"
                      onClick={openAuthModal}
                      className="w-full py-2.5 bg-[#4285F4] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                    >
                      <div className="w-4 h-4 rounded-full bg-white text-[#4285F4] font-bold text-xs flex items-center justify-center">
                        G
                      </div>
                      <span>Увійти через Google</span>
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-zinc-400 block mb-1">Ім'я *</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">Прізвище *</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">По-батькові</label>
                    <input
                      type="text"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                      className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-zinc-400 block mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">Телефон *</label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#D4AF37] font-mono"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-3.5 bg-[#27272A] hover:bg-[#3F3F46] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all mt-4"
                >
                  Перейти до вибору доставки
                </button>
              </div>
            ) : (
              <div className="p-6 text-xs text-zinc-400 space-y-1">
                <p className="font-semibold text-white">{lastName} {firstName} {middleName}</p>
                <p>{email} • {phone}</p>
              </div>
            )}
          </div>

          {/* STEP 2: Delivery Selection matching screenshot */}
          <div className="bg-[#121214] border border-[#27272A] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-[#27272A] flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#D4AF37]" />
                2. Доставка
              </h2>
              {currentStep > 2 && (
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-[#D4AF37] underline font-semibold"
                >
                  Редагувати
                </button>
              )}
            </div>

            {currentStep === 2 ? (
              <div className="p-6 space-y-5 text-xs">
                <p className="text-zinc-400">
                  Ви можете обрати один зі збережених населених пунктів або ввести новий:
                </p>

                {/* Settlement Searchable Select */}
                <div>
                  <label className="text-zinc-300 font-semibold block mb-1.5">Місто доставки</label>
                  <SearchableSelect
                    options={settlementOptions}
                    value={selectedSettlementId}
                    onChange={(id) => {
                      setSelectedSettlementId(id);
                      const matchingBranch = BRANCHES.find((b) => b.settlementId === id);
                      if (matchingBranch) setSelectedBranchId(matchingBranch.id);
                    }}
                    placeholder="Пошук населеного пункту..."
                    searchPlaceholder="Введіть перші літери назви (наприклад Поляниця, Київ)..."
                  />
                </div>

                {/* Delivery Type Radios */}
                <div className="space-y-2 pt-2">
                  <label className="text-zinc-300 font-semibold block">Виберіть спосіб доставки</label>

                  <label
                    onClick={() => setDeliveryType('warehouse')}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      deliveryType === 'warehouse'
                        ? 'bg-[#1A1A1E] border-[#D4AF37]'
                        : 'bg-[#121214] border-[#27272A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={deliveryType === 'warehouse'}
                        onChange={() => {}}
                        className="accent-[#D4AF37]"
                      />
                      <span className="font-semibold text-white">На відділення «Нова пошта»</span>
                    </div>
                    <span className="text-zinc-400 text-[11px] font-mono">
                      {totalPrice >= 2000 ? 'Безкоштовно' : 'від 60 грн'}
                    </span>
                  </label>

                  <label
                    onClick={() => setDeliveryType('postomat')}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      deliveryType === 'postomat'
                        ? 'bg-[#1A1A1E] border-[#D4AF37]'
                        : 'bg-[#121214] border-[#27272A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={deliveryType === 'postomat'}
                        onChange={() => {}}
                        className="accent-[#D4AF37]"
                      />
                      <span className="font-semibold text-white">Поштомат «Нова пошта»</span>
                    </div>
                    <span className="text-zinc-400 text-[11px] font-mono">
                      {totalPrice >= 2000 ? 'Безкоштовно' : 'від 60 грн'}
                    </span>
                  </label>

                  <label
                    onClick={() => setDeliveryType('courier')}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      deliveryType === 'courier'
                        ? 'bg-[#1A1A1E] border-[#D4AF37]'
                        : 'bg-[#121214] border-[#27272A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={deliveryType === 'courier'}
                        onChange={() => {}}
                        className="accent-[#D4AF37]"
                      />
                      <span className="font-semibold text-white">Кур'єром «Нова пошта»</span>
                    </div>
                    <span className="text-zinc-400 text-[11px] font-mono">від 95 грн</span>
                  </label>
                </div>

                {/* Branch Searchable Select */}
                {deliveryType !== 'courier' ? (
                  <div>
                    <label className="text-zinc-300 font-semibold block mb-1.5">Оберіть номер відділення / поштомату</label>
                    <SearchableSelect
                      options={branchOptions}
                      value={selectedBranchId}
                      onChange={(id) => setSelectedBranchId(id)}
                      placeholder="Оберіть відділення або введіть номер..."
                      searchPlaceholder="Пошук за номером відділення або вулицею..."
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-zinc-300 font-semibold block mb-1.5">Введіть вулицю та будинок кур'єру</label>
                    <input
                      type="text"
                      placeholder="вул. Основна 15, кв. 4"
                      value={courierAddress}
                      onChange={(e) => setCourierAddress(e.target.value)}
                      className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="w-full py-3.5 bg-[#27272A] hover:bg-[#3F3F46] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all mt-4"
                >
                  Перейти до оплати
                </button>
              </div>
            ) : currentStep > 2 ? (
              <div className="p-6 text-xs text-zinc-400 space-y-1">
                <p className="font-semibold text-white">{currentSettlement.description}</p>
                <p>{currentBranch?.address}</p>
              </div>
            ) : null}
          </div>

          {/* STEP 3: Payment Selection */}
          <div className="bg-[#121214] border border-[#27272A] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-[#27272A]">
              <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                3. Оплата
              </h2>
            </div>

            {currentStep === 3 && (
              <div className="p-6 space-y-5 text-xs">
                <div className="space-y-2">
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'bg-[#1A1A1E] border-[#D4AF37]' : 'bg-[#121214] border-[#27272A]'
                    }`}
                  >
                    <input
                      type="radio"
                      checked={paymentMethod === 'cod'}
                      onChange={() => {}}
                      className="mt-1 accent-[#D4AF37]"
                    />
                    <div>
                      <span className="block font-semibold text-white">Оплата при отриманні (накладений платіж)</span>
                      <span className="block text-[11px] text-zinc-400 mt-0.5">Оплата у відділенні НП після перевірки</span>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'bg-[#1A1A1E] border-[#D4AF37]' : 'bg-[#121214] border-[#27272A]'
                    }`}
                  >
                    <input
                      type="radio"
                      checked={paymentMethod === 'card'}
                      onChange={() => {}}
                      className="mt-1 accent-[#D4AF37]"
                    />
                    <div>
                      <span className="block font-semibold text-white">Оплата на картку / IBAN</span>
                      <span className="block text-[11px] text-zinc-400 mt-0.5">Реквізити для сплати надсилаються у Viber/SMS</span>
                    </div>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="w-full py-4 bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880] text-[#0B0B0C] font-bold text-sm uppercase tracking-widest rounded-xl hover:brightness-110 shadow-xl shadow-[#D4AF37]/15 flex items-center justify-center gap-2 transition-all mt-4"
                >
                  <span>Підтвердити замовлення • {finalPrice} грн</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Order Summary Panel matching reference screenshot */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#27272A] pb-4">
              <h2 className="font-serif text-xl font-bold text-white">Ваше замовлення</h2>
              <Link href="/catalog" className="text-xs text-zinc-400 hover:text-[#D4AF37] underline">
                Редагувати замовлення
              </Link>
            </div>

            {/* Items list */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1 divide-y divide-[#27272A]">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex gap-4 items-center">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-black/40 border border-[#27272A] shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] block">
                      {item.product.brand}
                    </span>
                    <h4 className="font-semibold text-white line-clamp-1">{item.product.name}</h4>
                    <div className="flex justify-between text-zinc-400 mt-1 font-mono text-[11px]">
                      <span>Розмір: {item.selectedVolume}</span>
                      <span className="text-white font-bold">{item.price * item.quantity} грн</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Collapsible Promo Code Toggle matching screenshot */}
            <div className="border-t border-[#27272A] pt-4">
              <button
                type="button"
                onClick={() => setShowPromoInput(!showPromoInput)}
                className="w-full flex items-center justify-between text-xs text-zinc-300 font-semibold hover:text-[#D4AF37] transition-colors"
              >
                <span>Маєте промокод?</span>
                {showPromoInput ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showPromoInput && (
                <form onSubmit={applyPromo} className="flex gap-2 mt-3 animate-fadeIn">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Введіть код..."
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-[#1A1A1E] border border-[#3F3F46] rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#27272A] hover:bg-[#3F3F46] text-white text-xs font-semibold rounded-xl"
                  >
                    Застосувати
                  </button>
                </form>
              )}

              {promoSuccess && <p className="text-[11px] text-emerald-400 mt-2">{promoSuccess}</p>}
              {promoError && <p className="text-[11px] text-rose-400 mt-2">{promoError}</p>}
            </div>

            {/* Calculations */}
            <div className="border-t border-[#27272A] pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Сума замовлення:</span>
                <span className="font-mono text-white">{totalPrice} грн</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Знижка по промокоду ({discountPercent}%):</span>
                  <span className="font-mono">-{discountAmount} грн</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-400">
                <span>Доставка Новою Поштою:</span>
                <span className="font-mono text-white">
                  {deliveryCost === 0 ? 'Безкоштовно' : `${deliveryCost} грн`}
                </span>
              </div>

              <div className="border-t border-[#27272A] pt-3 flex justify-between items-center text-base font-bold">
                <span className="text-white">Всього:</span>
                <span className="text-2xl font-serif text-[#D4AF37]">{finalPrice} грн</span>
              </div>
            </div>

            {currentStep < 3 && (
              <button
                onClick={() => setCurrentStep((prev) => (prev + 1) as any)}
                className="w-full py-4 bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880] text-[#0B0B0C] font-bold text-xs uppercase tracking-widest rounded-xl hover:brightness-110 shadow-lg flex items-center justify-center gap-2"
              >
                <span>Оформити замовлення</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
