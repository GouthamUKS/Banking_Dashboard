/**
 * useAccountData Hook
 * Manages account and transaction data fetching with error handling
 * Implements React best practices for performance
 */

import { useState, useEffect, useCallback } from 'react';
import { AccountData } from '../types';
import { mockAccountService } from '../services/mock-account.service';

interface UseAccountDataReturn {
  data: AccountData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useAccountData = (): UseAccountDataReturn => {
  const [data, setData] = useState<AccountData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const accountData = await mockAccountService.getAccountData();
      setData(accountData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
