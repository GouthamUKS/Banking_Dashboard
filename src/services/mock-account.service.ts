/**
 * Mock Data Service
 * Simulates API responses with 500ms delay
 * Realistic banking data for testing and development
 */

import { Account, Transaction, AccountData } from '../types';

// Mock account data
const MOCK_ACCOUNT: Account = {
  accountNumber: '****2847',
  accountName: 'Goutham Soratoor',
  accountType: 'checking',
  balance: 45230.5,
  availableBalance: 44890.0,
  currency: 'USD',
  iban: 'US64 GBMD 0000 1234 5678',
  lastUpdated: new Date().toISOString(),
};

// Mock transactions
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn-001',
    date: '2026-01-15T14:30:00Z',
    description: 'Starbucks Coffee',
    amount: 5.45,
    type: 'debit',
    category: 'payment',
    status: 'completed',
    reference: 'REF-0001',
  },
  {
    id: 'txn-002',
    date: '2026-01-14T09:15:00Z',
    description: 'Salary Deposit',
    amount: 3500.0,
    type: 'credit',
    category: 'deposit',
    status: 'completed',
    reference: 'SAL-2026-01',
  },
  {
    id: 'txn-003',
    date: '2026-01-13T16:45:00Z',
    description: 'Netflix Subscription',
    amount: 15.99,
    type: 'debit',
    category: 'payment',
    status: 'completed',
    reference: 'REF-0003',
  },
  {
    id: 'txn-004',
    date: '2026-01-12T11:20:00Z',
    description: 'Amazon Purchase',
    amount: 67.89,
    type: 'debit',
    category: 'payment',
    status: 'completed',
    reference: 'REF-0004',
  },
  {
    id: 'txn-005',
    date: '2026-01-11T08:00:00Z',
    description: 'Transfer to Savings',
    amount: 500.0,
    type: 'debit',
    category: 'transfer',
    status: 'completed',
    reference: 'TRF-2026-001',
  },
  {
    id: 'txn-006',
    date: '2026-01-10T13:30:00Z',
    description: 'Gas Station',
    amount: 45.0,
    type: 'debit',
    category: 'withdrawal',
    status: 'completed',
    reference: 'REF-0006',
  },
  {
    id: 'txn-007',
    date: '2026-01-09T10:15:00Z',
    description: 'Bank Fee',
    amount: 2.5,
    type: 'debit',
    category: 'fee',
    status: 'completed',
    reference: 'FEE-2026-01',
  },
  {
    id: 'txn-008',
    date: '2026-01-08T15:45:00Z',
    description: 'Freelance Payment',
    amount: 250.0,
    type: 'credit',
    category: 'deposit',
    status: 'completed',
    reference: 'FRL-2026-001',
  },
];

/**
 * Simulates an API call with 500ms delay
 * Returns account data and transactions
 */
export const mockAccountService = {
  /**
   * Fetches account and transaction data
   * Simulates 500ms network delay
   */
  getAccountData: async (): Promise<AccountData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          account: MOCK_ACCOUNT,
          transactions: MOCK_TRANSACTIONS,
          isLoading: false,
          error: null,
        });
      }, 500);
    });
  },

  /**
   * Fetches transactions only
   */
  getTransactions: async (): Promise<Transaction[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_TRANSACTIONS);
      }, 500);
    });
  },

  /**
   * Fetches account details only
   */
  getAccount: async (): Promise<Account> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_ACCOUNT);
      }, 500);
    });
  },

  /**
   * Simulates error scenario
   */
  getAccountDataWithError: async (): Promise<AccountData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          account: MOCK_ACCOUNT,
          transactions: [],
          isLoading: false,
          error: 'Failed to load transactions. Please try again later.',
        });
      }, 500);
    });
  },
};
