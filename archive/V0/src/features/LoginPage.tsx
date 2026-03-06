/**
 * Login Page
 * WCAG 2.1 AAA compliant login form
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { COLOR_PALETTE } from '../constants/design-system';
import { ErrorMessage } from '../components/ErrorMessage';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { settings } = useAccessibility();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const user = await authService.login({ email, password });
      login(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
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
            Welcome Back
          </h1>
          <p
            className="text-sm mt-2"
            style={{ 
              color: settings.darkMode 
                ? COLOR_PALETTE.dark.textSecondary 
                : COLOR_PALETTE.neutral.gray 
            }}
          >
            Sign in to your account
          </p>
          <div
            className="mt-3 p-3 rounded text-xs"
            style={{
              backgroundColor: settings.darkMode
                ? COLOR_PALETTE.dark.surface
                : COLOR_PALETTE.primary.lighter,
              color: settings.darkMode
                ? COLOR_PALETTE.dark.text
                : COLOR_PALETTE.primary.dark,
            }}
          >
            💡 <strong>Demo Mode:</strong> Use email: <code>user@example.com</code> / password: <code>password123</code>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          role="form"
          aria-label="Login form"
        >
          {/* Email */}
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="email"
              style={{
                color: textColor,
                fontSize: settings.fontSize === 'large' ? '15px' : '14px',
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded border-2 focus:outline-none focus:border-opacity-0"
              style={{
                borderColor: settings.darkMode 
                  ? COLOR_PALETTE.dark.border 
                  : COLOR_PALETTE.neutral.border,
                backgroundColor: bgColor,
                color: textColor,
              }}
              required
              aria-required="true"
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="password"
              style={{
                color: textColor,
                fontSize: settings.fontSize === 'large' ? '15px' : '14px',
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded border-2 focus:outline-none focus:border-opacity-0"
              style={{
                borderColor: settings.darkMode 
                  ? COLOR_PALETTE.dark.border 
                  : COLOR_PALETTE.neutral.border,
                backgroundColor: bgColor,
                color: textColor,
              }}
              required
              aria-required="true"
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && <ErrorMessage message={error} />}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-2 focus:outline-offset-2 min-h-[44px] hover:shadow-lg"
            style={{
              backgroundColor: COLOR_PALETTE.primary.dark,
              color: COLOR_PALETTE.neutral.white,
              outlineColor: COLOR_PALETTE.primary.dark,
              opacity: isLoading ? 0.6 : 1,
              transform: isLoading ? 'scale(0.98)' : 'scale(1)',
            }}
          >
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {/* Sign Up Link */}
        <p
          className="text-center mt-4 text-sm"
          style={{
            color: COLOR_PALETTE.neutral.gray,
            fontSize: settings.fontSize === 'large' ? '15px' : '14px',
          }}
        >
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold hover:underline focus:outline-2 focus:outline-offset-2 rounded px-1"
            style={{
              color: COLOR_PALETTE.primary.dark,
              outlineColor: COLOR_PALETTE.primary.dark,
            }}
          >
            Create account
          </Link>
        </p>

        {/* Demo Credentials */}
        <div
          className="mt-6 p-4 rounded text-sm"
          style={{
            backgroundColor: COLOR_PALETTE.primary.lighter,
            color: COLOR_PALETTE.primary.dark,
            fontSize: settings.fontSize === 'large' ? '13px' : '12px',
          }}
        >
          <p className="font-semibold mb-1">Demo Credentials:</p>
          <p>Email: user@example.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
}
