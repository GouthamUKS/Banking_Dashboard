/**
 * Loading Skeleton Component
 * Accessible loading state with animated skeleton
 * Respects prefers-reduced-motion
 */

import { memo } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { COLOR_PALETTE } from '../constants/design-system';

interface LoadingSkeletonProps {
  count?: number;
  height?: string;
  className?: string;
}

export const LoadingSkeleton = memo(function LoadingSkeleton({
  count = 3,
  height = 'h-12',
  className = '',
}: LoadingSkeletonProps) {
  const { settings } = useAccessibility();

  const animationClass = settings.reduceMotion
    ? ''
    : 'animate-pulse';

  return (
    <div
      className="space-y-3"
      role="status"
      aria-label="Loading content"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${height} rounded ${animationClass} ${className}`}
          style={{ backgroundColor: COLOR_PALETTE.neutral.lightGray }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
});

LoadingSkeleton.displayName = 'LoadingSkeleton';
