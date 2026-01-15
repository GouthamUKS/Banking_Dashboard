/**
 * Error Message Component
 * Accessible error display with appropriate ARIA roles
 */

import { memo } from 'react';
import { COLOR_PALETTE } from '../constants/design-system';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = memo(function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="p-4 rounded-lg border-l-4"
      style={{
        backgroundColor: `${COLOR_PALETTE.status.error}10`,
        borderColor: COLOR_PALETTE.status.error,
        color: COLOR_PALETTE.status.error,
      }}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <svg
          className="w-5 h-5 mt-0.5 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm font-semibold hover:underline focus:outline-2 focus:outline-offset-2 px-2 py-1 rounded"
              style={{
                outlineColor: COLOR_PALETTE.status.error,
              }}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

ErrorMessage.displayName = 'ErrorMessage';
