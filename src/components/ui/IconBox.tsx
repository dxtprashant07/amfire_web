import React from 'react';
import { cn } from '@/lib/cn';

interface IconBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'accent';
}

const IconBox = React.forwardRef<HTMLDivElement, IconBoxProps>(
  ({ icon, size = 'md', variant = 'default', className, ...props }, ref) => {
    const sizeStyles = {
      sm: 'h-8 w-8 rounded-md',
      md: 'h-12 w-12 rounded-lg',
      lg: 'h-16 w-16 rounded-xl',
    };

    const variantStyles = {
      default: 'bg-gradient-fire text-white shadow-glow',
      accent: 'bg-accent-tint text-orange border border-accent-tint-border',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center flex-shrink-0 transition-transform duration-base ease-standard',
          'group-hover:scale-110 group-hover:rotate-3',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {icon}
      </div>
    );
  }
);

IconBox.displayName = 'IconBox';

export { IconBox };
export type { IconBoxProps };
