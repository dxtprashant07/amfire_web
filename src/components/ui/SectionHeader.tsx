import React from 'react';
import { cn } from '@/lib/cn';

interface SectionHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  eyebrow?: string;
  title: React.ReactNode;
  titleMb?: string;
  description?: string;
  descriptionMaxW?: string;
  descriptionMb?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'full';
  align?: 'left' | 'center';
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      eyebrow,
      title,
      titleMb = 'mb-4',
      description,
      descriptionMaxW,
      descriptionMb,
      maxWidth = 'md',
      align = 'center',
      className,
      ...props
    },
    ref
  ) => {
    const maxWidthStyles = {
      sm: 'max-w-md',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      full: 'max-w-full',
    };

    const alignStyles = {
      left: 'text-left',
      center: 'text-center mx-auto',
    };

    return (
      <div
        ref={ref}
        className={cn(maxWidthStyles[maxWidth], alignStyles[align], className)}
        {...props}
      >
        {eyebrow && <div className="amfire-eyebrow mb-4">{eyebrow}</div>}
        <h2
          className={cn(
            'text-5xl font-extrabold text-fg-default leading-tight',
            titleMb
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              'text-lg text-fg-muted leading-relaxed',
              descriptionMaxW,
              align === 'center' && descriptionMaxW && 'mx-auto',
              descriptionMb
            )}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

export { SectionHeader };
export type { SectionHeaderProps };
