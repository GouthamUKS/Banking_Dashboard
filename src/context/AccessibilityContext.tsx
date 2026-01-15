/**
 * Accessibility Context
 * Manages high contrast mode, font size, and motion preferences
 * WCAG 2.1 AA/AAA compliant
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AccessibilitySettings } from '../types';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  toggleHighContrast: () => void;
  toggleDarkMode: () => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('a11ySettings');
    if (saved) {
      return JSON.parse(saved);
    }

    // Check system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return {
      highContrastMode: false,
      darkMode: prefersDarkMode,
      fontSize: 'medium',
      reduceMotion: prefersReducedMotion,
    };
  });

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem('a11ySettings', JSON.stringify(settings));

    // Apply to document root
    const root = document.documentElement;
    if (settings.highContrastMode) {
      root.setAttribute('data-high-contrast', 'true');
    } else {
      root.removeAttribute('data-high-contrast');
    }

    if (settings.darkMode) {
      root.setAttribute('data-dark-mode', 'true');
    } else {
      root.removeAttribute('data-dark-mode');
    }

    root.setAttribute('data-font-size', settings.fontSize);
    if (settings.reduceMotion) {
      root.setAttribute('data-reduce-motion', 'true');
    } else {
      root.removeAttribute('data-reduce-motion');
    }
  }, [settings]);

  const toggleHighContrast = () => {
    setSettings((prev) => ({
      ...prev,
      highContrastMode: !prev.highContrastMode,
    }));
  };

  const toggleDarkMode = () => {
    setSettings((prev) => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  };

  const setFontSize = (fontSize: 'small' | 'medium' | 'large') => {
    setSettings((prev) => ({
      ...prev,
      fontSize,
    }));
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        toggleHighContrast,
        toggleDarkMode,
        setFontSize,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
