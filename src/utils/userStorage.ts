'use client';

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
}

const USERS_STORAGE_KEY = 'overdose_parfums_registered_users';

// --- Password hashing via SHA-256 (crypto.subtle) ---

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// --- Storage operations ---

export function getRegisteredUsers(): RegisteredUser[] {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: RegisteredUser[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function findUserByEmail(email: string): RegisteredUser | undefined {
  const users = getRegisteredUsers();
  return users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
}

export async function registerUser(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{ success: boolean; error?: string; user?: RegisteredUser }> {
  const existing = findUserByEmail(data.email);
  if (existing) {
    return { success: false, error: 'Користувач з таким email вже зареєстрований' };
  }

  const passwordHash = await hashPassword(data.password);

  const newUser: RegisteredUser = {
    id: 'usr-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  const users = getRegisteredUsers();
  users.push(newUser);
  saveUsers(users);

  return { success: true, user: newUser };
}

export async function validateCredentials(
  email: string,
  password: string
): Promise<{ valid: boolean; user?: RegisteredUser; error?: string }> {
  const user = findUserByEmail(email);
  if (!user) {
    return { valid: false, error: 'Користувача з таким email не знайдено' };
  }

  const passwordHash = await hashPassword(password);
  if (passwordHash !== user.passwordHash) {
    return { valid: false, error: 'Невірний пароль' };
  }

  return { valid: true, user };
}
