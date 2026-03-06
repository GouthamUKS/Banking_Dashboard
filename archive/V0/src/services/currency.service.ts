/**
 * Mock Currency Service
 * Simulates currency API with trending data
 */

import { Currency } from '../types/currency';

// Mock currency data
const MOCK_CURRENCIES: Currency[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    rate: 1.0,
    change24h: 0.0,
    trend: 'stable',
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    rate: 0.92,
    change24h: 1.5,
    trend: 'up',
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    rate: 0.79,
    change24h: 2.1,
    trend: 'up',
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    rate: 149.5,
    change24h: -0.8,
    trend: 'down',
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'C$',
    rate: 1.36,
    change24h: 0.3,
    trend: 'stable',
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    rate: 1.53,
    change24h: 1.2,
    trend: 'up',
  },
  {
    code: 'CHF',
    name: 'Swiss Franc',
    symbol: 'CHF',
    rate: 0.89,
    change24h: 0.5,
    trend: 'stable',
  },
  {
    code: 'CNY',
    name: 'Chinese Yuan',
    symbol: '¥',
    rate: 7.24,
    change24h: -1.1,
    trend: 'down',
  },
  {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    rate: 83.12,
    change24h: 0.7,
    trend: 'stable',
  },
  {
    code: 'SGD',
    name: 'Singapore Dollar',
    symbol: 'S$',
    rate: 1.35,
    change24h: 0.9,
    trend: 'up',
  },
];

export const currencyService = {
  /**
   * Get all currencies
   */
  getAllCurrencies: async (): Promise<Currency[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_CURRENCIES);
      }, 500);
    });
  },

  /**
   * Get trending currencies (top 5)
   */
  getTrendingCurrencies: async (): Promise<Currency[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const trending = MOCK_CURRENCIES.filter((c) => c.trend === 'up')
          .sort((a, b) => b.change24h - a.change24h)
          .slice(0, 5);
        resolve(trending);
      }, 500);
    });
  },

  /**
   * Search currencies by code or name
   */
  searchCurrencies: async (query: string): Promise<Currency[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerQuery = query.toLowerCase();
        const results = MOCK_CURRENCIES.filter(
          (c) =>
            c.code.toLowerCase().includes(lowerQuery) ||
            c.name.toLowerCase().includes(lowerQuery)
        );
        resolve(results);
      }, 300);
    });
  },

  /**
   * Get currency by code
   */
  getCurrencyByCode: async (code: string): Promise<Currency | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currency = MOCK_CURRENCIES.find(
          (c) => c.code.toUpperCase() === code.toUpperCase()
        );
        resolve(currency || null);
      }, 300);
    });
  },
};
