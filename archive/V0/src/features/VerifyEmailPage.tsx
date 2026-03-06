/**
 * Email Verification Page
 * WCAG 2.1 AAA compliant email verification form
 */

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { COLOR_PALETTE } from '../constants/design-system';
import { ErrorMessage } from '../components/ErrorMessage';

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { settings } = useAccessibility();
  
  const email = (location.state as { email: string })?.email || '';
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [demoCode, setDemoCode] = useState<string>('');

  // Listen for verification code from console
  useEffect(() => {
    const originalLog = console.log;
    console.log = function(...args) {
      const message = args.join(' ');
      if (message.includes('Verification Code:')) {
        const codeMatch = message.match(/Verification Code:\s*(\d{6})/);
        if (codeMatch) {
          setDemoCode(codeMatch[1]);
        }
      }
      originalLog.apply(console, args);
    };

    return () => {
      console.log = originalLog;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const user = await authService.verifyEmail(email, code);
      login(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError(null);
    setIsResending(true);

    try {
      await authService.resendVerificationCode(email);
      setCodeSent(true);
      setTimeout(() => setCodeSent(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

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
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        backgroundColor: settings.darkMode 
          ? COLOR_PALETTE.dark.background 
          : bgColor, 
        color: textColor 
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl"
            style={{ backgroundColor: COLOR_PALETTE.primary.dark }}
          >
            B
          </div>
          <h1
            className="text-2xl font-bold"
            style={{
              color: textColor,
              fontSize: settings.fontSize === 'large' ? '28px' : '24px',
            }}
          >
            Verify Email
          </h1>
          <p
            className="text-sm mt-2"
            style={{ 
              color: settings.darkMode 
                ? COLOR_PALETTE.dark.textSecondary 
                : COLOR_PALETTE.neutral.gray 
            }}
          >
            Enter the verification code sent to {email}
          </p>
          <div
            className="mt-3 p-2 rounded text-xs"
            style={{
              backgroundColor: COLOR_PALETTE.primary.lighter,
              color: COLOR_PALETTE.primary.dark,
            }}
          >
            💡 <strong>Demo Mode:</strong> Check your browser console for the verification code
          </div>
          {demoCode && (
            <div
              className="mt-3 p-3 rounded border-2"
              style={{
                backgroundColor: COLOR_PALETTE.success.light,
                borderColor: COLOR_PALETTE.success.dark,
                color: COLOR_PALETTE.success.dark,
              }}
            >
              <p className="text-sm font-semibold mb-1">📧 Your Verification Code:</p>
              <p className="text-2xl font-bold font-mono tracking-widest">{demoCode}</p>
              <p className="text-xs mt-1">Copy this code and paste it above</p>
            </div>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          role="form"
          aria-label="Email verification form"
        >
          {/* Verification Code */}
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="verification-code"
              style={{
                color: textColor,
                fontSize: settings.fontSize === 'large' ? '15px' : '14px',
              }}
            >
              Verification Code
            </label>
            <input
              id="verification-code"
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              className="w-full px-4 py-2 rounded border-2 focus:outline-none text-center text-2xl tracking-widest font-mono"
              style={{
                borderColor: COLOR_PALETTE.neutral.border,
                backgroundColor: bgColor,
                color: textColor,
              }}
              required
              disabled={isLoading}
              aria-describedby="code-helper"
            />
            <p
              id="code-helper"
              className="text-xs mt-1"
              style={{ color: COLOR_PALETTE.neutral.gray }}
            >
              We sent a 6-digit code to your email
            </p>
          </div>

          {/* Success Message */}
          {codeSent && (
            <div
              className="p-3 rounded text-sm"
              style={{
                backgroundColor: COLOR_PALETTE.status.success,
                color: COLOR_PALETTE.neutral.white,
              }}
            >
              Code resent successfully! Check your email.
            </div>
          )}

          {/* Error Message */}
          {error && <ErrorMessage message={error} />}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className="w-full py-2 rounded font-semibold transition-colors focus:outline-2 focus:outline-offset-2 min-h-[44px]"
            style={{
              backgroundColor: COLOR_PALETTE.primary.dark,
              color: COLOR_PALETTE.neutral.white,
              outlineColor: COLOR_PALETTE.primary.dark,
              opacity: isLoading || code.length !== 6 ? 0.6 : 1,
            }}
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        {/* Resend Link */}
        <div className="text-center mt-6">
          <p
            className="text-sm"
            style={{
              color: COLOR_PALETTE.neutral.gray,
              fontSize: settings.fontSize === 'large' ? '15px' : '14px',
            }}
          >
            Didn't receive the code?{' '}
            <button
              onClick={handleResendCode}
              disabled={isResending}
              className="font-semibold hover:underline focus:outline-2 focus:outline-offset-2 rounded px-1 bg-transparent border-none cursor-pointer"
              style={{
                color: COLOR_PALETTE.primary.dark,
                outlineColor: COLOR_PALETTE.primary.dark,
                opacity: isResending ? 0.6 : 1,
              }}
            >
              {isResending ? 'Sending...' : 'Resend Code'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
