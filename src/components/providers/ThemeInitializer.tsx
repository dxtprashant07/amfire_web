'use client';

import { useEffect } from 'react';

/**
 * ThemeInitializer
 * Initializes theme from localStorage on client-side to prevent flash of wrong theme
 * Should be included early in the app to run before other components render
 */
export function ThemeInitializer() {
  useEffect(() => {
    try {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      // localStorage might not be available in some environments
      console.error('Failed to initialize theme:', e);
    }
  }, []);

  return null;
}
