import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/logo.svg"
        alt="Banking Dashboard Logo"
        className={`${sizeMap[size]} rounded-full`}
      />
      <span className="hidden sm:inline font-bold text-lg text-gray-900 dark:text-white">
        Banking
      </span>
    </div>
  );
};
