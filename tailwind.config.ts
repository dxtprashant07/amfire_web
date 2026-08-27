import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Brand colors
        red: '#E23A2E',
        orange: '#F97316',
        amber: '#FB923C',
        
        // Surfaces
        page: 'var(--surface-page)',
        card: 'var(--surface-card)',
        raised: 'var(--surface-raised)',
        sunken: 'var(--surface-sunken)',
        overlay: 'var(--surface-overlay)',
        
        // Foreground
        default: 'var(--fg-default)',
        muted: 'var(--fg-muted)',
        subtle: 'var(--fg-subtle)',
        accent: 'var(--color-orange)',
        
        // Semantic
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
        
        // Gray scale
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
      },
      backgroundColor: {
        success: 'var(--color-success-bg)',
        warning: 'var(--color-warning-bg)',
        error: 'var(--color-error-bg)',
        info: 'var(--color-info-bg)',
        'accent-tint': 'var(--accent-tint)',
      },
      borderColor: {
        default: 'var(--border-default)',
        subtle: 'var(--border-subtle)',
        accent: 'var(--border-accent)',
      },
      borderRadius: {
        xs: 'var(--radius-sm)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        glow: 'var(--shadow-glow)',
        'glow-hover': 'var(--shadow-glow-hover)',
        'glow-sm': 'var(--shadow-glow-sm)',
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'btn-glow': 'var(--shadow-btn-glow)',
        'btn-glow-hover': 'var(--shadow-btn-glow-hover)',
        'btn-solid': 'var(--shadow-btn-solid)',
        'btn-solid-hover': 'var(--shadow-btn-solid-hover)',
        'focus-ring': 'var(--focus-ring)',
      },
      fontSize: {
        xs: ['var(--text-xs)', { lineHeight: 'var(--leading-normal)' }],
        sm: ['var(--text-sm)', { lineHeight: 'var(--leading-normal)' }],
        base: ['var(--text-base)', { lineHeight: 'var(--leading-normal)' }],
        lg: ['var(--text-lg)', { lineHeight: 'var(--leading-relaxed)' }],
        xl: ['var(--text-xl)', { lineHeight: 'var(--leading-relaxed)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--leading-snug)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--leading-snug)' }],
        '4xl': ['var(--text-4xl)', { lineHeight: 'var(--leading-tight)' }],
        '5xl': ['var(--text-5xl)', { lineHeight: 'var(--leading-tight)' }],
        '6xl': ['var(--text-6xl)', { lineHeight: 'var(--leading-none)' }],
        display: ['var(--text-display)', { lineHeight: 'var(--leading-none)' }],
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
        14: 'var(--space-14)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
      },
      maxWidth: {
        container: 'var(--content-max)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
        accelerate: 'var(--ease-accelerate)',
        decelerate: 'var(--ease-decelerate)',
        bounce: 'var(--ease-bounce)',
      },
      backgroundImage: {
        'gradient-fire': 'var(--gradient-fire)',
        'gradient-fire-135': 'var(--gradient-fire-135)',
        'gradient-fire-soft': 'var(--gradient-fire-soft)',
      },
    },
  },
  plugins: [],
} satisfies Config;
