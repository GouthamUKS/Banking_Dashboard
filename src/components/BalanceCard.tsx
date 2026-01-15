/**
 * BalanceCard Component
 * Accessible card displaying account balance
 * High contrast colors and large touch targets (min 44px)
 * WCAG 2.1 AAA compliant
 */

import { memo } from 'react';
import { Account } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import { COLOR_PALETTE, SHADOWS } from '../constants/design-system';

interface BalanceCardProps {
  account: Account;
  loading?: boolean;
}

export const BalanceCard = memo(function BalanceCard({ account, loading = false }: BalanceCardProps) {
  const { settings } = useAccessibility();

  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const containerBg = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.background
    : settings.darkMode
    ? COLOR_PALETTE.dark.card
    : COLOR_PALETTE.primary.lighter;

  const containerBorder = settings.highContrastMode
    ? `3px solid ${COLOR_PALETTE.highContrast.border}`
    : settings.darkMode
    ? `1px solid ${COLOR_PALETTE.dark.border}`
    : `1px solid ${COLOR_PALETTE.primary.light}`;

  const textColor = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.text
    : settings.darkMode
    ? COLOR_PALETTE.dark.text
    : COLOR_PALETTE.neutral.darkGray;

  const labelColor = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.text
    : settings.darkMode
    ? COLOR_PALETTE.dark.textSecondary
    : COLOR_PALETTE.neutral.gray;

  const amountColor = settings.darkMode 
    ? COLOR_PALETTE.dark.primary 
    : COLOR_PALETTE.primary.dark;

  return (
    <article
      className="rounded-lg p-6 transition-shadow focus-within:outline-2 focus-within:outline-offset-2"
      style={{
        backgroundColor: containerBg,
        border: containerBorder,
        boxShadow: SHADOWS.md,
        outlineColor: COLOR_PALETTE.primary.dark,
      }}
      aria-label={`${account.accountName} - ${account.accountType} account`}
    >
      {loading ? (
        <div className="space-y-4" aria-busy="true">
          <div
            className="h-6 rounded animate-pulse"
            style={{ backgroundColor: COLOR_PALETTE.neutral.lightGray }}
            aria-hidden="true"
          />
          <div
            className="h-8 rounded animate-pulse w-2/3"
            style={{ backgroundColor: COLOR_PALETTE.neutral.lightGray }}
            aria-hidden="true"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Account Name */}
          <h2
            className="text-lg font-semibold"
            style={{
              color: textColor,
              fontSize: settings.fontSize === 'large' ? '20px' : '18px',
            }}
          >
            {account.accountName}
          </h2>

          {/* Account Type */}
          <p
            className="text-sm uppercase tracking-wide font-medium"
            style={{
              color: labelColor,
              fontSize: settings.fontSize === 'large' ? '13px' : '12px',
            }}
          >
            {account.accountType.replace('-', ' ')} Account
          </p>

          {/* Balance Display */}
          <div className="pt-4 border-t-2 space-y-3" style={{ borderColor: labelColor }}>
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wide mb-1"
                style={{
                  color: labelColor,
                  fontSize: settings.fontSize === 'large' ? '12px' : '11px',
                }}
              >
                Total Balance
              </label>
              <p
                className="text-3xl font-bold"
                style={{
                  color: amountColor,
                  fontSize: settings.fontSize === 'large' ? '36px' : '32px',
                }}
                aria-label={`Total balance: ${formatCurrency(account.balance, account.currency)}`}
              >
                {formatCurrency(account.balance, account.currency)}
              </p>
            </div>

            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wide mb-1"
                style={{
                  color: labelColor,
                  fontSize: settings.fontSize === 'large' ? '12px' : '11px',
                }}
              >
                Available Balance
              </label>
              <p
                className="text-xl font-semibold"
                style={{
                  color: COLOR_PALETTE.semantic.credit,
                  fontSize: settings.fontSize === 'large' ? '20px' : '18px',
                }}
                aria-label={`Available balance: ${formatCurrency(account.availableBalance, account.currency)}`}
              >
                {formatCurrency(account.availableBalance, account.currency)}
              </p>
            </div>
          </div>

          {/* Account Details */}
          <div className="pt-4 space-y-2">
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1"
                style={{
                  color: labelColor,
                  fontSize: settings.fontSize === 'large' ? '12px' : '11px',
                }}
              >
                Account Number
              </label>
              <p
                className="font-mono text-sm"
                style={{
                  color: textColor,
                  fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                }}
              >
                {account.accountNumber}
              </p>
            </div>

            {account.iban && (
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wide mb-1"
                  style={{
                    color: labelColor,
                    fontSize: settings.fontSize === 'large' ? '12px' : '11px',
                  }}
                >
                  IBAN
                </label>
                <p
                  className="font-mono text-sm break-all"
                  style={{
                    color: textColor,
                    fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                  }}
                >
                  {account.iban}
                </p>
              </div>
            )}

            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wide mb-1"
                style={{
                  color: labelColor,
                  fontSize: settings.fontSize === 'large' ? '12px' : '11px',
                }}
              >
                Last Updated
              </label>
              <time
                className="text-sm"
                dateTime={account.lastUpdated}
                style={{
                  color: textColor,
                  fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                }}
              >
                {new Date(account.lastUpdated).toLocaleString()}
              </time>
            </div>
          </div>
        </div>
      )}
    </article>
  );
});

BalanceCard.displayName = 'BalanceCard';
