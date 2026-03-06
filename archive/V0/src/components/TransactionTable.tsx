/**
 * TransactionTable Component
 * Accessible table with semantic HTML and ARIA labels
 * WCAG 2.1 AAA compliant with screen reader support
 */

import { memo, useMemo } from 'react';
import { Transaction } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import { COLOR_PALETTE, SHADOWS } from '../constants/design-system';

interface TransactionTableProps {
  transactions: Transaction[];
  loading?: boolean;
}

export const TransactionTable = memo(function TransactionTable({
  transactions,
  loading = false,
}: TransactionTableProps) {
  const { settings } = useAccessibility();

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: Transaction['status']): string => {
    switch (status) {
      case 'completed':
        return COLOR_PALETTE.status.success;
      case 'pending':
        return COLOR_PALETTE.status.warning;
      case 'failed':
        return COLOR_PALETTE.status.error;
      default:
        return COLOR_PALETTE.neutral.gray;
    }
  };

  const getTypeColor = (type: 'debit' | 'credit'): string => {
    return type === 'credit' ? COLOR_PALETTE.semantic.credit : COLOR_PALETTE.semantic.debit;
  };

  const getStatusLabel = (status: Transaction['status']): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const tableBg = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.background
    : settings.darkMode
    ? COLOR_PALETTE.dark.card
    : COLOR_PALETTE.neutral.white;

  const tableBorder = settings.highContrastMode
    ? `2px solid ${COLOR_PALETTE.highContrast.border}`
    : settings.darkMode
    ? `1px solid ${COLOR_PALETTE.dark.border}`
    : `1px solid ${COLOR_PALETTE.neutral.border}`;

  const headerBg = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.text
    : settings.darkMode
    ? COLOR_PALETTE.dark.surface
    : COLOR_PALETTE.primary.dark;

  const headerText = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.background
    : settings.darkMode
    ? COLOR_PALETTE.dark.text
    : COLOR_PALETTE.neutral.white;

  const rowHoverBg = settings.highContrastMode
    ? COLOR_PALETTE.neutral.lightGray
    : settings.darkMode
    ? COLOR_PALETTE.dark.surface
    : COLOR_PALETTE.primary.lighter;

  const textColor = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.text
    : settings.darkMode
    ? COLOR_PALETTE.dark.text
    : COLOR_PALETTE.neutral.darkGray;

  const sortedTransactions = useMemo(
    () => [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [transactions]
  );

  return (
    <article
      className="rounded-lg overflow-hidden transition-shadow"
      style={{
        boxShadow: SHADOWS.md,
        border: tableBorder,
      }}
      aria-label="Recent transactions"
    >
      {loading ? (
        <div
          className="p-6"
          style={{ backgroundColor: tableBg }}
          aria-busy="true"
        >
          <div
            className="space-y-3"
            role="status"
            aria-label="Loading transactions"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-12 rounded animate-pulse"
                style={{ backgroundColor: COLOR_PALETTE.neutral.lightGray }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse"
            style={{ backgroundColor: tableBg }}
            role="table"
          >
            {/* Table Head */}
            <thead>
              <tr style={{ backgroundColor: headerBg }}>
                <th
                  scope="col"
                  className="px-4 py-3 text-left font-semibold"
                  style={{
                    color: headerText,
                    fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                  }}
                  aria-label="Date of transaction"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left font-semibold"
                  style={{
                    color: headerText,
                    fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                  }}
                  aria-label="Transaction description"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left font-semibold"
                  style={{
                    color: headerText,
                    fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                  }}
                  aria-label="Transaction category"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right font-semibold"
                  style={{
                    color: headerText,
                    fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                  }}
                  aria-label="Transaction amount"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left font-semibold"
                  style={{
                    color: headerText,
                    fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                  }}
                  aria-label="Transaction status"
                >
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {sortedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="transition-colors hover:opacity-75 focus-within:outline-2 focus-within:outline-offset-0"
                  style={{
                    borderBottom: `1px solid ${settings.darkMode ? COLOR_PALETTE.dark.border : COLOR_PALETTE.neutral.border}`,
                    backgroundColor: tableBg,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = rowHoverBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = tableBg;
                  }}
                >
                  <td
                    className="px-4 py-4"
                    style={{
                      color: textColor,
                      fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                    }}
                  >
                    <time dateTime={transaction.date}>
                      {formatDate(transaction.date)}
                    </time>
                  </td>

                  <td
                    className="px-4 py-4 font-medium"
                    style={{
                      color: textColor,
                      fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                    }}
                  >
                    {transaction.description}
                  </td>

                  <td
                    className="px-4 py-4"
                    style={{
                      color: textColor,
                      fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                    }}
                  >
                    <span
                      className="inline-block px-2 py-1 rounded text-xs font-semibold uppercase"
                      style={{
                        backgroundColor: settings.darkMode 
                          ? COLOR_PALETTE.dark.surface 
                          : COLOR_PALETTE.primary.lighter,
                        color: settings.darkMode 
                          ? COLOR_PALETTE.dark.primary 
                          : COLOR_PALETTE.primary.dark,
                      }}
                    >
                      {transaction.category}
                    </span>
                  </td>

                  <td
                    className="px-4 py-4 text-right font-semibold"
                    style={{
                      color: getTypeColor(transaction.type),
                      fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                    }}
                    aria-label={`${transaction.type === 'debit' ? 'Debit' : 'Credit'} ${formatCurrency(transaction.amount)}`}
                  >
                    <span aria-hidden="true">
                      {transaction.type === 'credit' ? '+' : '-'}
                    </span>
                    {formatCurrency(transaction.amount)}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${getStatusColor(transaction.status)}20`,
                        color: getStatusColor(transaction.status),
                      }}
                      role="status"
                      aria-label={`Status: ${getStatusLabel(transaction.status)}`}
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
                        style={{ backgroundColor: getStatusColor(transaction.status) }}
                        aria-hidden="true"
                      />
                      {getStatusLabel(transaction.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sortedTransactions.length === 0 && (
            <div
              className="p-8 text-center"
              style={{
                backgroundColor: tableBg,
                color: textColor,
              }}
              role="status"
            >
              <p className="font-medium">No transactions found</p>
            </div>
          )}
        </div>
      )}
    </article>
  );
});

TransactionTable.displayName = 'TransactionTable';
