/**
 * Trending Currencies Component
 * Display trending currencies with WCAG 2.1 AAA compliance
 */

import { useEffect, useState } from 'react';
import { currencyService } from '../services/currency.service';
import { useAccessibility } from '../context/AccessibilityContext';
import { COLOR_PALETTE } from '../constants/design-system';
import { Currency } from '../types/currency';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

export const TrendingCurrencies = () => {
  const { settings } = useAccessibility();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const trends = await currencyService.getTrendingCurrencies();
        setCurrencies(trends);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load trending currencies'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const textColor = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.text
    : settings.darkMode
    ? COLOR_PALETTE.dark.text
    : COLOR_PALETTE.neutral.darkGray;

  return (
    <div className="w-full">
      <h2
        className="text-lg font-bold mb-4"
        style={{
          color: textColor,
          fontSize: settings.fontSize === 'large' ? '20px' : '18px',
        }}
      >
        Trending Currencies
      </h2>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <LoadingSkeleton key={i} height="150px" />
          ))}
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      {!isLoading && currencies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currencies.map((currency) => (
            <div
              key={currency.code}
              className="p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: settings.highContrastMode
                  ? COLOR_PALETTE.highContrast.surface
                  : settings.darkMode
                  ? COLOR_PALETTE.dark.card
                  : COLOR_PALETTE.neutral.white,
                border: settings.darkMode
                  ? `1px solid ${COLOR_PALETTE.dark.border}`
                  : `1px solid ${COLOR_PALETTE.neutral.border}`,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3
                    className="font-bold"
                    style={{
                      color: textColor,
                      fontSize:
                        settings.fontSize === 'large' ? '18px' : '16px',
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
                <span
                  className="text-2xl"
                  role="img"
                  aria-label={currency.name}
                >
                  {currency.symbol}
                </span>
              </div>

              {/* Rate */}
              <p
                className="font-semibold text-lg mb-3"
                style={{
                  color: textColor,
                  fontSize:
                    settings.fontSize === 'large' ? '18px' : '16px',
                }}
              >
                {currency.symbol}
                {currency.rate.toFixed(2)}
              </p>

              {/* 24h Change */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="px-3 py-1 rounded-full font-semibold text-sm"
                  style={{
                    backgroundColor:
                      currency.change24h > 0
                        ? COLOR_PALETTE.success.light
                        : COLOR_PALETTE.error.light,
                    color:
                      currency.change24h > 0
                        ? COLOR_PALETTE.success.dark
                        : COLOR_PALETTE.error.dark,
                  }}
                >
                  {currency.change24h > 0 ? '↑' : '↓'} {Math.abs(currency.change24h).toFixed(2)}%
                </span>
                <span
                  className="text-xs"
                  style={{ color: COLOR_PALETTE.neutral.gray }}
                >
                  24h change
                </span>
              </div>

              {/* Trend Status */}
              <div
                className="pt-4 border-t"
                style={{ borderColor: COLOR_PALETTE.neutral.border }}
              >
                <span
                  className="inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-semibold"
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
                  <span role="img" aria-hidden="true">
                    {currency.trend === 'up' ? '📈' : currency.trend === 'down' ? '📉' : '➡️'}
                  </span>
                  Trend: {currency.trend.charAt(0).toUpperCase() + currency.trend.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && currencies.length === 0 && !error && (
        <div
          className="text-center py-12 rounded"
          style={{ backgroundColor: COLOR_PALETTE.neutral.lightGray }}
        >
          <p
            style={{
              color: COLOR_PALETTE.neutral.gray,
              fontSize: settings.fontSize === 'large' ? '15px' : '14px',
            }}
          >
            No trending currencies available
          </p>
        </div>
      )}
    </div>
  );
};
