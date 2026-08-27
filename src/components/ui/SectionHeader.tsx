import React from 'react';
import { cn } from '@/lib/cn';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'full';
  align?: 'left' | 'center';
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      eyebrow,
      title,
      description,
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
        {eyebrow && (
          <div className="amfire-eyebrow mb-4">
            {eyebrow}
          </div>
        )}
        <h2 className="text-5xl font-extrabold text-fg-default mb-4 leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-lg text-fg-muted leading-relaxed">
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
        >
          {description}
        </p>
      )}
    </>
  );
}
