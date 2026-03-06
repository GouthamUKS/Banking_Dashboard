/**
 * Currency Search Component
 * Search and filter currencies with WCAG 2.1 AAA compliance
 */

import { useState, useEffect } from 'react';
import { currencyService } from '../services/currency.service';
import { useAccessibility } from '../context/AccessibilityContext';
import { COLOR_PALETTE } from '../constants/design-system';
import { Currency } from '../types/currency';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

export function CurrencySearch() {
  const { settings } = useAccessibility();
  const [searchQuery, setSearchQuery] = useState('');
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setCurrencies([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await currencyService.searchCurrencies(searchQuery);
        setCurrencies(results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Search failed'
        );
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(performSearch, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const bgColor = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.background
    : settings.darkMode
    ? COLOR_PALETTE.dark.card
    : COLOR_PALETTE.neutral.white;

  const textColor = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.text
    : settings.darkMode
    ? COLOR_PALETTE.dark.text
    : COLOR_PALETTE.neutral.darkGray;

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="mb-6">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="currency-search"
          style={{
            color: textColor,
            fontSize: settings.fontSize === 'large' ? '15px' : '14px',
          }}
        >
          Search Currencies
        </label>
        <input
          id="currency-search"
          type="text"
          placeholder="Search by code (USD) or name (Dollar)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all"
          style={{
            borderColor: settings.darkMode 
              ? COLOR_PALETTE.dark.border 
              : COLOR_PALETTE.neutral.border,
            backgroundColor: bgColor,
            color: textColor,
            fontSize: settings.fontSize === 'large' ? '15px' : '14px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          }}
          aria-describedby="search-helper"
        />
        <p
          id="search-helper"
          className="text-xs mt-1"
          style={{ color: COLOR_PALETTE.neutral.gray }}
        >
          Type currency code or name to search
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <LoadingSkeleton key={i} height="60px" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && <ErrorMessage message={error} />}

      {/* Results */}
      {!isLoading && currencies.length > 0 && (
        <div className="space-y-2">
          <p
            className="text-sm font-semibold mb-3"
            style={{ color: textColor }}
          >
            Found {currencies.length} currency(ies)
          </p>
          {currencies.map((currency) => (
            <div
              key={currency.code}
              className="p-4 rounded border-l-4 transition-colors"
              style={{
                borderColor: COLOR_PALETTE.primary.dark,
                backgroundColor: settings.highContrastMode
                  ? COLOR_PALETTE.highContrast.surface
                  : COLOR_PALETTE.neutral.lightGray,
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className="font-semibold"
                    style={{
                      color: textColor,
                      fontSize:
                        settings.fontSize === 'large' ? '16px' : '15px',
                    }}
                  >
                    {currency.code}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: COLOR_PALETTE.neutral.gray }}
                  >
                    {currency.name}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="font-semibold"
                    style={{
                      color: textColor,
                      fontSize:
                        settings.fontSize === 'large' ? '16px' : '15px',
                    }}
                  >
                    {currency.symbol}
                    {currency.rate.toFixed(2)}
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      color:
                        currency.change24h > 0
                          ? COLOR_PALETTE.success.dark
                          : COLOR_PALETTE.error.dark,
                    }}
                  >
                    {currency.change24h > 0 ? '+' : ''}
                    {currency.change24h.toFixed(2)}%
                  </p>
                </div>
              </div>
              {/* Trend Indicator */}
              <div className="mt-2 pt-2 border-t" style={{ borderColor: COLOR_PALETTE.neutral.border }}>
                <span
                  className="inline-block px-2 py-1 rounded text-xs font-semibold"
                  style={{
                    backgroundColor:
                      currency.trend === 'up'
                        ? COLOR_PALETTE.success.light
                        : currency.trend === 'down'
                          ? COLOR_PALETTE.error.light
                          : COLOR_PALETTE.neutral.lightGray,
                    color:
                      currency.trend === 'up'
                        ? COLOR_PALETTE.success.dark
                        : currency.trend === 'down'
                          ? COLOR_PALETTE.error.dark
                          : COLOR_PALETTE.neutral.darkGray,
                  }}
                >
                  Trend: {currency.trend.charAt(0).toUpperCase() + currency.trend.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && searchQuery.trim() && currencies.length === 0 && !error && (
        <div
          className="text-center py-8 rounded"
          style={{ backgroundColor: COLOR_PALETTE.neutral.lightGray }}
        >
          <p
            style={{
              color: COLOR_PALETTE.neutral.gray,
              fontSize: settings.fontSize === 'large' ? '15px' : '14px',
            }}
          >
            No currencies found matching "{searchQuery}"
          </p>
        </div>
      )}

      {/* Initial State */}
      {!isLoading && !searchQuery.trim() && (
        <div
          className="text-center py-8 rounded"
          style={{ backgroundColor: COLOR_PALETTE.neutral.lightGray }}
        >
          <p
            style={{
              color: COLOR_PALETTE.neutral.gray,
              fontSize: settings.fontSize === 'large' ? '15px' : '14px',
            }}
          >
            Start typing to search for currencies
          </p>
        </div>
      )}
    </div>
  );
}
