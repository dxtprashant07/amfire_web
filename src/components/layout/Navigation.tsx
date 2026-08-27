import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Moon, Sun, Menu, X } from 'lucide-react';

interface NavigationProps {
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

const Navigation = React.forwardRef<HTMLDivElement, NavigationProps>(
  ({ isDarkMode = false, onThemeToggle }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const navItems = [
      { label: 'Services', href: '#services' },
      { label: 'About', href: '#about' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Contact', href: '#contact' },
    ];

    return (
      <nav
        ref={ref}
        className={cn(
          'sticky top-0 z-50 w-full border-b transition-all duration-base ease-standard',
          'bg-card border-default backdrop-blur-sm'
        )}
      >
        <div className="amfire-wrap">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 font-extrabold text-2xl gradient-text">
              AMFIRE
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-fg-default hover:text-orange transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Theme Toggle */}
              <button
                onClick={onThemeToggle}
                className={cn(
                  'p-2 rounded-md border border-default transition-all duration-base ease-standard',
                  'hover:bg-sunken focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange'
                )}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-orange" />
                ) : (
                  <Moon className="h-5 w-5 text-orange" />
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-md border border-default transition-all duration-base ease-standard hover:bg-sunken"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4 border-t border-default">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-fg-default hover:text-orange transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    );
  }
);

Navigation.displayName = 'Navigation';

export { Navigation };
export type { NavigationProps };
