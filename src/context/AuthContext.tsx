'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/types/product';
import {
  registerUser as registerUserStorage,
  validateCredentials,
  type RegisteredUser,
} from '@/utils/userStorage';

export interface UserOrder {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Обробляється' | 'Комплектується' | 'Відправлено' | 'Доставлено';
  ttn?: string;
  settlement: string;
  branch: string;
}

export type UserRole = 'client' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  isGoogleUser?: boolean;
  bonuses: number;
  savedCity: string;
  savedBranch: string;
  orders: UserOrder[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginWithGoogle: () => void;
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  registerUser: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  loginAsAdminWithCredentials: (email: string, pass: string) => boolean;
  logout: () => void;
  addOrderToHistory: (order: UserOrder) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'overdose_parfums_user';

// Strict Admin Credential List (2 Validated Admin Accounts)
export const ADMIN_ACCOUNTS = [
  {
    email: 'admin@overdoseparfums.com.ua',
    password: 'admin12345',
    name: 'Головний Адміністратор Overdose Parfums',
    phone: '+380 (98) 797-97-90',
  },
  {
    email: 'igorkrasavshuk@gmail.com',
    password: 'admin12345',
    name: 'Шургалюк Ігор (Адміністратор)',
    phone: '+38 (096) 559 81 97',
  },
];

// Default Client Profile (Google Login)
const CLIENT_DEMO_USER: UserProfile = {
  id: 'usr-google-777',
  name: 'Шургалюк Ігор Васильович',
  email: 'igorkrasavshuk@gmail.com',
  phone: '+38 (096) 559 81 97',
  role: 'client', // Regular client role
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
  isGoogleUser: true,
  bonuses: 350,
  savedCity: 'Поляниця',
  savedBranch: 'Відділення №1: участок Щивки, буд.1, приміщення 5 (Паркінг 1)',
  orders: [
    {
      id: 'ord-101',
      orderNumber: 'OVERDOSE-849201',
      date: '25.09.2026',
      total: 1557,
      status: 'Відправлено',
      ttn: '20450912839120',
      settlement: 'с. Поляниця (Івано-Франківська обл. Яремче р.)',
      branch: 'Відділення №1: участок Щивки, буд.1, приміщення 5',
      items: [
        {
          id: 'item-1',
          product: {
            id: 'mfk-baccarat-rouge-540',
            name: 'Baccarat Rouge 540',
            brand: 'Maison Francis Kurkdjian',
            category: 'niche',
            gender: 'unisex',
            pricePerMl: 170,
            defaultPrice: 340,
            inStock: true,
            rating: 4.9,
            reviewCount: 48,
            image: '/images/baccarat_rouge.jpg',
            gallery: ['/images/baccarat_rouge.jpg'],
            description: 'Легендарний аромат',
            volumes: [{ volume: '5 мл', price: 820, inStock: true }],
          },
          selectedVolume: '5 мл',
          price: 820,
          quantity: 1,
        },
      ],
    },
  ],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        if (user) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
        } else {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      } catch (e) {
        console.error('Failed to save user to localStorage', e);
      }
    }
  }, [user, isInitialized]);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const loginWithGoogle = () => {
    setUser(CLIENT_DEMO_USER);
    closeAuthModal();
  };

  const loginWithEmail = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Check admin accounts first
    const adminMatch = ADMIN_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    );
    if (adminMatch) {
      loginAsAdminWithCredentials(email, password);
      return { success: true };
    }

    // Check registered users
    const result = await validateCredentials(email, password);
    if (!result.valid || !result.user) {
      return { success: false, error: result.error || 'Невірний email або пароль' };
    }

    setUser({
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      phone: result.user.phone,
      role: 'client',
      bonuses: 0,
      savedCity: '',
      savedBranch: '',
      orders: [],
    });
    closeAuthModal();
    return { success: true };
  };

  const registerUser = async (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const result = await registerUserStorage(data);
    if (!result.success) {
      return { success: false, error: result.error };
    }

    // Auto-login after registration
    const registered = result.user!;
    setUser({
      id: registered.id,
      name: registered.name,
      email: registered.email,
      phone: registered.phone,
      role: 'client',
      bonuses: 0,
      savedCity: '',
      savedBranch: '',
      orders: [],
    });
    closeAuthModal();
    return { success: true };
  };

  const loginAsAdminWithCredentials = (email: string, pass: string): boolean => {
    const matched = ADMIN_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === pass
    );

    if (matched) {
      setUser({
        id: 'usr-admin-' + Date.now(),
        name: matched.name,
        email: matched.email,
        phone: matched.phone,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
        bonuses: 0,
        savedCity: 'м. Київ',
        savedBranch: 'Відділення №1',
        orders: [],
      });
      closeAuthModal();
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addOrderToHistory = (order: UserOrder) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        orders: [order, ...prev.orders],
        bonuses: prev.bonuses + Math.round(order.total * 0.05),
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        loginWithGoogle,
        loginWithEmail,
        registerUser,
        loginAsAdminWithCredentials,
        logout,
        addOrderToHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
