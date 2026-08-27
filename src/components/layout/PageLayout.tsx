import React from 'react';
import { cn } from '@/lib/cn';

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  navigation?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ navigation, footer, children, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col min-h-screen', className)} {...props}>
      {navigation && <div className="flex-shrink-0">{navigation}</div>}
      <main className="flex-1">{children}</main>
      {footer && <div className="flex-shrink-0">{footer}</div>}
    </div>
  )
);

PageLayout.displayName = 'PageLayout';

export { PageLayout };
export type { PageLayoutProps };
