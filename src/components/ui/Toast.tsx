import React from 'react';
import { cn } from '@/lib/cn';

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'default',
      title,
      message,
      icon,
      action,
      onClose,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const variantStyles = {
      default: 'bg-card border border-default text-fg-default',
      success: 'bg-success-bg border border-success/20 text-success',
      warning: 'bg-warning-bg border border-warning/20 text-warning',
      error: 'bg-error-bg border border-error/20 text-error',
      info: 'bg-info-bg border border-info/20 text-info',
    };

    const handleClose = () => {
      setIsVisible(false);
      onClose?.();
    };

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-3 rounded-lg border p-4 shadow-lg animate-in slide-in-from-bottom-5 transition-all',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {icon && <div className="flex-shrink-0 pt-1">{icon}</div>}
        <div className="flex-1">
          {title && <p className="font-semibold">{title}</p>}
          {message && <p className="text-sm opacity-90">{message}</p>}
          {children}
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {action && (
            <button
              onClick={action.onClick}
              className="font-semibold text-sm underline hover:opacity-80 transition-opacity"
            >
              {action.label}
            </button>
          )}
          <button
            onClick={handleClose}
            className="font-semibold opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close toast"
          >
            ×
          </button>
        </div>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export { Toast };
export type { ToastProps };
