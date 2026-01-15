/**
 * Currencies Page
 * Main page for currency search and trending currencies with WCAG 2.1 AAA compliance
 */

import { Navbar } from '../components/Navbar';
import { CurrencySearch } from '../components/CurrencySearch';
import { TrendingCurrencies } from '../components/TrendingCurrencies';
import { useAccessibility } from '../context/AccessibilityContext';
import { COLOR_PALETTE } from '../constants/design-system';

export function CurrenciesPage() {
  const { settings } = useAccessibility();

  const bgColor = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.background
    : settings.darkMode
    ? COLOR_PALETTE.dark.background
    : COLOR_PALETTE.neutral.white;

  const textColor = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.text
    : settings.darkMode
    ? COLOR_PALETTE.dark.text
    : COLOR_PALETTE.neutral.darkGray;

  return (
    <div style={{ 
      background: settings.highContrastMode 
        ? bgColor 
        : settings.darkMode
        ? COLOR_PALETTE.dark.background
        : `linear-gradient(to bottom, ${COLOR_PALETTE.primary.lighter}, ${bgColor})`,
      color: textColor,
      minHeight: '100vh'
    }}>
      <Navbar />
      <main className="min-h-screen" style={{ paddingTop: '88px' }}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{
              color: textColor,
              fontSize: settings.fontSize === 'large' ? '36px' : '32px',
            }}
          >
            Currency Exchange
          </h1>
          <p
            className="text-gray-600 mb-8"
            style={{
              color: settings.darkMode 
                ? COLOR_PALETTE.dark.textSecondary 
                : COLOR_PALETTE.neutral.gray,
              fontSize: settings.fontSize === 'large' ? '15px' : '14px',
            }}
          >
            Search for currencies and explore trending rates
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Search Section */}
            <div className="lg:col-span-1">
              <div
                className="p-6 rounded-lg shadow-sm"
                style={{
                  backgroundColor: settings.highContrastMode
                    ? COLOR_PALETTE.highContrast.surface
                    : COLOR_PALETTE.neutral.lightGray,
                }}
              >
                <CurrencySearch />
              </div>
            </div>

            {/* Trending Section */}
            <div className="lg:col-span-2">
              <TrendingCurrencies />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
