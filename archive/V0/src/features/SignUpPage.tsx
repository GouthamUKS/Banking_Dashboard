/**
 * Sign Up Page
 * WCAG 2.1 AAA compliant registration form
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useAccessibility } from '../context/AccessibilityContext';
import { COLOR_PALETTE } from '../constants/design-system';
import { ErrorMessage } from '../components/ErrorMessage';

export function SignUpPage() {
  const navigate = useNavigate();
  const { settings } = useAccessibility();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await authService.signUp({
        name,
        email,
        password,
        confirmPassword,
      });
      navigate('/verify-email', { state: { email } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setIsLoading(false);
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
        background: settings.highContrastMode 
          ? bgColor 
          : settings.darkMode
          ? COLOR_PALETTE.dark.background
          : `linear-gradient(135deg, ${COLOR_PALETTE.primary.lighter} 0%, ${COLOR_PALETTE.neutral.white} 100%)`,
        color: textColor 
      }}
    >
      <div 
        className="w-full max-w-md rounded-2xl p-8"
        style={{
          backgroundColor: bgColor,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        }}
      >
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
            Create Account
          </h1>
          <p
            className="text-sm mt-2"
            style={{ color: COLOR_PALETTE.neutral.gray }}
          >
            Get started with us
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          role="form"
          aria-label="Sign up form"
        >
          {/* Name */}
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="name"
              style={{
                color: textColor,
                fontSize: settings.fontSize === 'large' ? '15px' : '14px',
              }}
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded border-2 focus:outline-none"
              style={{
                borderColor: COLOR_PALETTE.neutral.border,
                backgroundColor: bgColor,
                color: textColor,
              }}
              required
              disabled={isLoading}
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="signup-email"
              style={{
                color: textColor,
                fontSize: settings.fontSize === 'large' ? '15px' : '14px',
              }}
            >
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded border-2 focus:outline-none"
              style={{
                borderColor: COLOR_PALETTE.neutral.border,
                backgroundColor: bgColor,
                color: textColor,
              }}
              required
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="signup-password"
              style={{
                color: textColor,
                fontSize: settings.fontSize === 'large' ? '15px' : '14px',
              }}
            >
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded border-2 focus:outline-none"
              style={{
                borderColor: COLOR_PALETTE.neutral.border,
                backgroundColor: bgColor,
                color: textColor,
              }}
              required
              disabled={isLoading}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="confirm-password"
              style={{
                color: textColor,
                fontSize: settings.fontSize === 'large' ? '15px' : '14px',
              }}
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded border-2 focus:outline-none"
              style={{
                borderColor: COLOR_PALETTE.neutral.border,
                backgroundColor: bgColor,
                color: textColor,
              }}
              required
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && <ErrorMessage message={error} />}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded font-semibold transition-colors focus:outline-2 focus:outline-offset-2 min-h-[44px]"
            style={{
              backgroundColor: COLOR_PALETTE.primary.dark,
              color: COLOR_PALETTE.neutral.white,
              outlineColor: COLOR_PALETTE.primary.dark,
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <p
          className="text-center mt-4 text-sm"
          style={{
            color: COLOR_PALETTE.neutral.gray,
            fontSize: settings.fontSize === 'large' ? '15px' : '14px',
          }}
        >
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold hover:underline focus:outline-2 focus:outline-offset-2 rounded px-1"
            style={{
              color: COLOR_PALETTE.primary.dark,
              outlineColor: COLOR_PALETTE.primary.dark,
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
