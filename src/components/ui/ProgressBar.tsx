import React from 'react';
import { cn } from '@/lib/cn';

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  animated?: boolean;
  label?: string;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      size = 'md',
      variant = 'default',
      animated = true,
      label,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min((value / max) * 100, 100);

    const sizeStyles = {
      sm: 'h-1.5 rounded-full',
      md: 'h-2 rounded-full',
      lg: 'h-3 rounded-full',
    };

    const variantStyles = {
      default: 'bg-gradient-fire',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {label && (
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-fg-default">{label}</span>
            <span className="text-sm text-fg-muted">{Math.round(percentage)}%</span>
          </div>
        )}
        <div className={cn('w-full bg-gray-200 overflow-hidden', sizeStyles[size])}>
          <div
            className={cn(
              'h-full transition-all duration-base ease-standard',
              animated && 'animate-pulse',
              variantStyles[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };
export type { ProgressBarProps };
