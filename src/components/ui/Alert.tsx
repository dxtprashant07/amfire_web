import React from 'react';
import { cn } from '@/lib/cn';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
  onClose?: () => void;
  dismissible?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'default',
      icon,
      onClose,
      dismissible = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(true);

    const variantStyles = {
      default: 'bg-gray-100 text-fg-default border border-gray-200',
      success: 'bg-success-bg text-success border border-success/20',
      warning: 'bg-warning-bg text-warning border border-warning/20',
      error: 'bg-error-bg text-error border border-error/20',
      info: 'bg-info-bg text-info border border-info/20',
    };

    const handleClose = () => {
      setOpen(false);
      onClose?.();
    };

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-md border p-4 transition-all duration-base ease-standard',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="flex gap-3">
          {icon && <div className="flex-shrink-0 pt-0.5">{icon}</div>}
          <div className="flex-1">{children}</div>
          {dismissible && (
            <button
              onClick={handleClose}
              className="flex-shrink-0 font-semibold opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close alert"
            >
              ×
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
export type { AlertProps };
