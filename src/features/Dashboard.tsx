/**
 * Dashboard Feature
 * Main banking dashboard layout with account overview and transactions
 * Performance optimized with React.memo and lazy loading
 */

import { memo, Suspense, lazy } from 'react';
import { useAccountData } from '../hooks/useAccountData';
import { useAccessibility } from '../context/AccessibilityContext';
import { Navbar } from '../components/Navbar';
import { BalanceCard } from '../components/BalanceCard';
import { TransactionTable } from '../components/TransactionTable';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorMessage } from '../components/ErrorMessage';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { COLOR_PALETTE } from '../constants/design-system';

// Lazy load optional components for performance
const AccessibilityPanel = lazy(() =>
  import('../components/AccessibilityPanel').then((m) => ({ default: m.AccessibilityPanel }))
);

export const Dashboard = memo(function Dashboard() {
  const { data, isLoading, error, refetch } = useAccountData();
  const { settings } = useAccessibility();

  const backgroundColor = settings.highContrastMode
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
    <ErrorBoundary>
      <div style={{ backgroundColor, color: textColor, minHeight: '100vh' }}>
        <Navbar />

        {/* Main Content */}
        <main
          id="main-content"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          style={{ paddingTop: '88px' }}
          role="main"
          tabIndex={-1}
        >
          {/* Skip to content target */}
          <h1 className="sr-only">Banking Dashboard</h1>

          {/* Error State */}
          {error && !isLoading && (
            <div className="mb-6">
              <ErrorMessage message={error} onRetry={refetch} />
            </div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Balance Card */}
            <div className="lg:col-span-1">
              {isLoading && !data ? (
                <div
                  className="rounded-lg p-6"
                  style={{
                    backgroundColor: COLOR_PALETTE.primary.lighter,
                    border: `1px solid ${COLOR_PALETTE.primary.light}`,
                  }}
                >
                  <LoadingSkeleton count={4} height="h-6" />
                </div>
              ) : data?.account ? (
                <BalanceCard account={data.account} loading={isLoading} />
              ) : null}
            </div>

            {/* Quick Stats */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {/* Total Transactions */}
              <article
                className="rounded-lg p-4 border-2"
                style={{
                  backgroundColor: settings.darkMode
                    ? COLOR_PALETTE.dark.card
                    : COLOR_PALETTE.primary.lighter,
                  borderColor: settings.darkMode
                    ? COLOR_PALETTE.dark.border
                    : COLOR_PALETTE.primary.light,
                }}
              >
                <h2
                  className="text-sm font-semibold uppercase tracking-wide mb-2"
                  style={{
                    color: settings.darkMode
                      ? COLOR_PALETTE.dark.textSecondary
                      : COLOR_PALETTE.neutral.gray,
                    fontSize: settings.fontSize === 'large' ? '13px' : '12px',
                  }}
                >
                  Recent Transactions
                </h2>
                <p
                  className="text-2xl font-bold"
                  style={{
                    color: settings.darkMode
                      ? COLOR_PALETTE.dark.primary
                      : COLOR_PALETTE.primary.dark,
                    fontSize: settings.fontSize === 'large' ? '28px' : '24px',
                  }}
                  aria-label={`Total: ${data?.transactions.length || 0} transactions`}
                >
                  {data?.transactions.length || 0}
                </p>
              </article>

              {/* Total Credits */}
              <article
                className="rounded-lg p-4 border-2"
                style={{
                  backgroundColor: settings.darkMode
                    ? `${COLOR_PALETTE.dark.surface}`
                    : `${COLOR_PALETTE.semantic.credit}15`,
                  borderColor: COLOR_PALETTE.semantic.credit,
                }}
              >
                <h2
                  className="text-sm font-semibold uppercase tracking-wide mb-2"
                  style={{
                    color: settings.darkMode
                      ? COLOR_PALETTE.dark.textSecondary
                      : COLOR_PALETTE.neutral.gray,
                    fontSize: settings.fontSize === 'large' ? '13px' : '12px',
                  }}
                >
                  Total Credits
                </h2>
                <p
                  className="text-2xl font-bold"
                  style={{
                    color: COLOR_PALETTE.semantic.credit,
                    fontSize: settings.fontSize === 'large' ? '28px' : '24px',
                  }}
                  aria-label={`Total credits: $${(data?.transactions
                    .filter((t) => t.type === 'credit')
                    .reduce((sum, t) => sum + t.amount, 0) || 0
                  ).toFixed(2)}`}
                >
                  $
                  {(data?.transactions
                    .filter((t) => t.type === 'credit')
                    .reduce((sum, t) => sum + t.amount, 0) || 0
                  ).toFixed(2)}
                </p>
              </article>
            </div>
          </div>

          {/* Transactions Section */}
          <section aria-label="Transaction history">
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                color: textColor,
                fontSize: settings.fontSize === 'large' ? '24px' : '20px',
              }}
            >
              Transaction History
            </h2>

            {isLoading && !data ? (
              <LoadingSkeleton count={5} height="h-12" />
            ) : data?.transactions ? (
              <TransactionTable transactions={data.transactions} />
            ) : null}
          </section>
        </main>

        {/* Accessibility Panel - Lazy loaded */}
        <Suspense fallback={null}>
          <AccessibilityPanel />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
});

Dashboard.displayName = 'Dashboard';
