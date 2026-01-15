/**
 * Error Boundary Component
 * Catches React errors and displays accessible error message
 */

import { Component, ErrorInfo } from 'react';
import { COLOR_PALETTE } from '../constants/design-system';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center p-4"
          style={{ backgroundColor: COLOR_PALETTE.neutral.white }}
        >
          <div
            className="max-w-md w-full p-6 rounded-lg border-2"
            style={{
              backgroundColor: COLOR_PALETTE.neutral.lightGray,
              borderColor: COLOR_PALETTE.status.error,
            }}
            role="alert"
          >
            <h1
              className="text-xl font-bold mb-2"
              style={{ color: COLOR_PALETTE.status.error }}
            >
              Something went wrong
            </h1>
            <p
              className="text-sm mb-4"
              style={{ color: COLOR_PALETTE.neutral.gray }}
            >
              We encountered an unexpected error. Please refresh the page or contact support if
              the problem persists.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 p-3 bg-white rounded border border-red-200">
                <summary style={{ color: COLOR_PALETTE.status.error }}>Error details</summary>
                <pre
                  className="text-xs mt-2 overflow-auto max-h-40 p-2 bg-gray-100 rounded"
                  style={{ color: COLOR_PALETTE.neutral.darkGray }}
                >
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 w-full px-4 py-2 rounded font-semibold transition-colors focus:outline-2 focus:outline-offset-2 min-h-[44px]"
              style={{
                backgroundColor: COLOR_PALETTE.primary.dark,
                color: COLOR_PALETTE.neutral.white,
                outlineColor: COLOR_PALETTE.primary.dark,
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export {};
