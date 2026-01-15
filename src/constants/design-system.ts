/**
 * Color Palette - Modern Blue Theme
 * Professional blue theme with high contrast for accessibility
 * WCAG 2.1 AA/AAA compliant colors
 */

export const COLOR_PALETTE = {
  // Primary Colors - Blue Theme
  primary: {
    dark: '#003F7F', // Deep blue - primary action
    base: '#0056B3', // Main blue
    light: '#0E7FFF', // Light blue for hover
    lighter: '#E7F1FE', // Very light blue background
  },

  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    darkGray: '#1A1A1A', // Very dark gray for text
    gray: '#505050',
    lightGray: '#F5F5F5',
    border: '#DADADA',
  },

  // Status Colors - High Contrast
  status: {
    success: '#0D5F2A', // Dark green for positive
    warning: '#8B5B00', // Dark amber
    error: '#8B0000', // Dark red
    info: '#003F7F', // Dark blue
  },

  // Success Colors
  success: {
    dark: '#0D5F2A', // Dark green for positive
    light: '#E8F5F0', // Light green background
  },

  // Error Colors
  error: {
    dark: '#8B0000', // Dark red
    light: '#FFE8E8', // Light red background
  },

  // Semantic Colors
  semantic: {
    debit: '#8B0000', // Red for money out
    credit: '#0D5F2A', // Green for money in
    pending: '#8B5B00', // Amber for pending
  },

  // High Contrast Mode
  highContrast: {
    text: '#000000',
    background: '#FFFFFF',
    border: '#000000',
    surface: '#F0F0F0', // Light gray surface for high contrast
    focus: '#FFD700', // Gold focus indicator
  },

  // Dark Mode
  dark: {
    background: '#1A1D23',
    surface: '#242831',
    card: '#2D323E',
    text: '#E8EAED',
    textSecondary: '#9BA1A6',
    border: '#3D4450',
    primary: '#5BA3FF',
    primaryHover: '#7BB5FF',
  },
};

export const SPACING = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  xxl: '3rem', // 48px
};

export const FONT_SIZES = {
  xs: '12px',
  sm: '14px',
  base: '16px', // Base font size for readability
  lg: '18px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px',
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
};

export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

export const TRANSITIONS = {
  fast: 'all 150ms ease-in-out',
  normal: 'all 300ms ease-in-out',
  slow: 'all 500ms ease-in-out',
};
