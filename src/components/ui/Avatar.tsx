import React from 'react';
import { cn } from '@/lib/cn';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, initials, size = 'md', className, ...props }, ref) => {
    const sizeStyles = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    };

    const radiusStyles = {
      sm: 'rounded-md',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-lg',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center flex-shrink-0 font-bold bg-gradient-fire text-white',
          sizeStyles[size],
          radiusStyles[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover rounded-inherit" />
        ) : (
          initials
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
export type { AvatarProps };
