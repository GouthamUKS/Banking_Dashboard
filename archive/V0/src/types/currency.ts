/**
 * Currency Types
 */

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  change24h: number;
  trend: 'up' | 'down' | 'stable';
}

export interface CurrencyData {
  currencies: Currency[];
  isLoading: boolean;
  error: string | null;
}
