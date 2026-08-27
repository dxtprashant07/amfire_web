import React from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      icon,
      iconPosition = 'left',
      className,
      type = 'text',
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-fg-default mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex-shrink-0 text-fg-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full px-4 py-2.5 text-base font-regular bg-card border border-default rounded-md',
              'text-fg-default placeholder-fg-subtle',
              'transition-all duration-base ease-standard',
              'focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'hover:border-orange/50',
              error && 'border-error focus:border-error focus:ring-error/20',
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              className
            )}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex-shrink-0 text-fg-muted">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-error font-medium">{error}</p>
        )}
        {helper && !error && (
          <p className="mt-1.5 text-sm text-fg-muted">{helper}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
