/**
 * Navbar Component
 * Accessible navigation with skip to content link
 * WCAG 2.1 AAA compliant keyboard navigation
 */

import { memo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAccessibility } from '../context/AccessibilityContext';
import { useAuth } from '../context/AuthContext';
import { COLOR_PALETTE } from '../constants/design-system';
import { Logo } from './Logo';

interface NavbarProps {
  onSkipContent?: () => void;
}

export const Navbar = memo(function Navbar({ onSkipContent }: NavbarProps) {
  const { settings, toggleHighContrast, toggleDarkMode } = useAccessibility();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Auto-hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsDropdownOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isDropdownOpen]);

  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
    onSkipContent?.();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const primaryColor = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.text
    : settings.darkMode
    ? COLOR_PALETTE.dark.primary
    : COLOR_PALETTE.primary.dark;

  const backgroundColor = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.background
    : settings.darkMode
    ? COLOR_PALETTE.dark.surface
    : COLOR_PALETTE.neutral.white;

  const borderColor = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.border
    : settings.darkMode
    ? COLOR_PALETTE.dark.border
    : COLOR_PALETTE.neutral.border;

  const textColor = settings.highContrastMode
    ? COLOR_PALETTE.highContrast.text
    : settings.darkMode
    ? COLOR_PALETTE.dark.text
    : COLOR_PALETTE.neutral.darkGray;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-opacity-95 transition-transform duration-300"
      style={{
        backgroundColor,
        borderColor,
        color: primaryColor,
        boxShadow: settings.darkMode ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Skip to Content Link - Keyboard Accessible */}
      <a
        href="#main-content"
        onClick={handleSkipClick}
        className="absolute -top-12 left-0 focus:static focus:top-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded"
        style={{
          backgroundColor: '#003F7F',
          color: COLOR_PALETTE.neutral.white,
        }}
      >
        Skip to Main Content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Logo size="md" />
          </Link>

          {/* Navigation Links */}
          <ul className="flex gap-6 items-center list-none m-0 p-0">
            <li>
              <Link
                to="/dashboard"
                className="text-sm font-medium hover:opacity-70 transition-opacity focus:outline-2 focus:outline-offset-2 rounded px-1"
                style={{
                  outlineColor: COLOR_PALETTE.primary.dark,
                  fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                  color: textColor,
                }}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/currencies"
                className="text-sm font-medium hover:opacity-70 transition-opacity focus:outline-2 focus:outline-offset-2 rounded px-1"
                style={{
                  outlineColor: COLOR_PALETTE.primary.dark,
                  fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                  color: textColor,
                }}
              >
                Currencies
              </Link>
            </li>
          </ul>

          {/* Right Actions */}
          <div className="flex gap-2 items-center">
            {/* Dark Mode Toggle - Icon Only */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-all focus:outline-2 focus:outline-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{
                outlineColor: primaryColor,
              }}
              aria-pressed={settings.darkMode}
              aria-label={
                settings.darkMode
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              title={
                settings.darkMode
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
            >
              <span style={{ fontSize: '20px' }}>
                {settings.darkMode ? '☀️' : '🌙'}
              </span>
            </button>

            {/* User Dropdown Menu */}
            {user && (
              <div className="relative" data-dropdown>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-all focus:outline-2 focus:outline-offset-2 min-h-[44px]"
                  style={{
                    outlineColor: primaryColor,
                  }}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span
                    className="text-sm font-medium hidden md:block"
                    style={{
                      fontSize: settings.fontSize === 'large' ? '15px' : '14px',
                      color: textColor,
                    }}
                  >
                    {user.name}
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform"
                    style={{
                      transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      fill: textColor,
                    }}
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg border overflow-hidden"
                    style={{
                      backgroundColor,
                      borderColor,
                      boxShadow: settings.darkMode 
                        ? '0 10px 25px rgba(0, 0, 0, 0.5)' 
                        : '0 10px 25px rgba(0, 0, 0, 0.15)',
                    }}
                    role="menu"
                  >
                    {/* User Info */}
                    <div
                      className="px-4 py-3 border-b"
                      style={{ borderColor }}
                    >
                      <p
                        className="text-sm font-semibold"
                        style={{ color: textColor }}
                      >
                        {user.name}
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          color: settings.darkMode
                            ? COLOR_PALETTE.dark.textSecondary
                            : COLOR_PALETTE.neutral.gray,
                        }}
                      >
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={toggleHighContrast}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-opacity-10 hover:bg-gray-500 transition-colors flex items-center gap-2"
                        style={{ color: textColor }}
                        role="menuitem"
                      >
                        <span>👁️</span>
                        <span>{settings.highContrastMode ? 'Normal Contrast' : 'High Contrast'}</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-opacity-10 hover:bg-red-500 transition-colors flex items-center gap-2"
                        style={{ color: COLOR_PALETTE.error.dark }}
                        role="menuitem"
                      >
                        <span>🚪</span>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
