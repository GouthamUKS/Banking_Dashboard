/**
 * Accessibility Panel Component
 * Provides controls for accessibility features
 * WCAG 2.1 AAA compliant
 */

import { memo, useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { COLOR_PALETTE } from '../constants/design-system';

export const AccessibilityPanel = memo(function AccessibilityPanel() {
  const { settings, toggleHighContrast, setFontSize } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all focus:outline-2 focus:outline-offset-2"
        style={{
          backgroundColor: COLOR_PALETTE.primary.dark,
          color: COLOR_PALETTE.neutral.white,
          outlineColor: COLOR_PALETTE.primary.dark,
          minHeight: '44px',
          minWidth: '44px',
        }}
        aria-label={isOpen ? 'Close accessibility options' : 'Open accessibility options'}
        aria-pressed={isOpen}
        aria-expanded={isOpen}
        aria-controls="a11y-panel"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          id="a11y-panel"
          className="absolute bottom-20 right-0 rounded-lg shadow-xl p-4 w-64"
          style={{
            backgroundColor: COLOR_PALETTE.neutral.white,
            border: `2px solid ${COLOR_PALETTE.primary.dark}`,
          }}
          role="region"
          aria-label="Accessibility options"
        >
          <h2
            className="text-lg font-bold mb-4"
            style={{ color: COLOR_PALETTE.primary.dark }}
          >
            Accessibility
          </h2>

          {/* High Contrast Toggle */}
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.highContrastMode}
                onChange={toggleHighContrast}
                className="w-4 h-4 rounded focus:outline-2 focus:outline-offset-2"
                style={{
                  outlineColor: COLOR_PALETTE.primary.dark,
                  accentColor: COLOR_PALETTE.primary.dark,
                }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: COLOR_PALETTE.neutral.darkGray }}
              >
                High Contrast Mode
              </span>
            </label>
          </div>

          {/* Font Size Controls */}
          <div>
            <p
              className="text-sm font-semibold mb-2"
              style={{ color: COLOR_PALETTE.neutral.darkGray }}
            >
              Font Size
            </p>
            <div className="space-y-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <label key={size} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="font-size"
                    value={size}
                    checked={settings.fontSize === size}
                    onChange={() => setFontSize(size)}
                    className="focus:outline-2 focus:outline-offset-2"
                    style={{
                      outlineColor: COLOR_PALETTE.primary.dark,
                      accentColor: COLOR_PALETTE.primary.dark,
                    }}
                  />
                  <span
                    className="text-sm"
                    style={{
                      color: COLOR_PALETTE.neutral.darkGray,
                      fontSize: size === 'large' ? '15px' : size === 'medium' ? '14px' : '13px',
                    }}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Reduce Motion Info */}
          <div className="mt-4 p-3 rounded bg-blue-50" style={{ backgroundColor: '#E8F5F2' }}>
            <p
              className="text-xs"
              style={{ color: COLOR_PALETTE.primary.dark }}
            >
              Your system motion preferences are respected throughout the application.
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

AccessibilityPanel.displayName = 'AccessibilityPanel';
