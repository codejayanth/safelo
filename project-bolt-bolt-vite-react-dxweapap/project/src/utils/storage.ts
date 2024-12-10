import { Receipt } from '../types';

const STORAGE_KEY = 'receipt_manager_data';
const USER_KEY = 'receipt_manager_user';

interface StoredUser {
  email: string;
  password: string;
}

export function saveUser(email: string, password: string): void {
  const user = { email, password };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): StoredUser | null {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
}

export function saveReceipt(receipt: Receipt): void {
  const receipts = getReceipts();
  receipts.push(receipt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(receipts));
}

export function getReceipts(): Receipt[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getUserReceipts(email: string): Receipt[] {
  return getReceipts().filter(receipt => receipt.userEmail === email);
}

export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(USER_KEY);
}