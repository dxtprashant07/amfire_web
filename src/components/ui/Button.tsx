import React from 'react';
import { cn } from '@/lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'right',
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary: 'bg-gradient-fire text-white shadow-glow hover:shadow-glow-hover hover:shadow-lg hover:-translate-y-0.5 active:scale-95',
      ghost: 'bg-card border border-default text-fg-default shadow-sm hover:border-orange hover:text-orange hover:shadow-md hover:-translate-y-0.5 active:bg-sunken active:scale-95',
      outline: 'border border-default text-fg-default hover:border-orange hover:text-orange',
      secondary: 'bg-muted text-fg-default hover:bg-gray-300 active:bg-gray-400',
    };

    const sizeStyles = {
      sm: 'px-3 py-2 text-sm h-9 rounded-sm',
      md: 'px-6 py-2.5 text-base h-11 rounded-md',
      lg: 'px-8 py-3 text-lg h-12 rounded-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-base ease-standard',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange',
          'whitespace-nowrap',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
