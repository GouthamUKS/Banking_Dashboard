/**
 * Banking Dashboard - Type Definitions
 * WCAG 2.1 AA/AAA Compliant with TypeScript strict mode
 */

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  category: 'transfer' | 'payment' | 'deposit' | 'withdrawal' | 'fee';
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
}

export interface Account {
  accountNumber: string;
  accountName: string;
  accountType: 'checking' | 'savings' | 'money-market';
  balance: number;
  availableBalance: number;
  currency: string;
  iban?: string;
  lastUpdated: string;
}

export interface AccountData {
  account: Account;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

export interface AccessibilitySettings {
  highContrastMode: boolean;
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  reduceMotion: boolean;
}

export interface Theme {
  mode: 'light' | 'dark';
  highContrast: boolean;
}
