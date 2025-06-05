import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'], // Kept Inter as per PRD
        headline: ['Inter', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: { // Kept for shadcn/ui sidebar component if used later
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)', // 8px
        md: 'calc(var(--radius) - 2px)', // 6px
        sm: 'calc(var(--radius) - 4px)', // 4px
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'window-open': { // Current animation
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'window-close': { // Current animation
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        'start-menu-open': { // For start menu centered transform: translateX(-50%) scale(0.9) to scale(1)
            '0%': { opacity: '0', transform: 'translateX(-50%) scale(0.9)' },
            '100%': { opacity: '1', transform: 'translateX(-50%) scale(1)' },
        },
        'start-menu-close': {
            '0%': { opacity: '1', transform: 'translateX(-50%) scale(1)' },
            '100%': { opacity: '0', transform: 'translateX(-50%) scale(0.9)' },
        },
        'fadeIn': { // For notification
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'window-open': 'window-open 0.2s ease-out forwards', // Keep existing window open/close
        'window-close': 'window-close 0.15s ease-in forwards',
        'start-menu-open': 'start-menu-open 0.2s ease-out forwards',
        'start-menu-close': 'start-menu-close 0.2s ease-out forwards',
        'fadeIn': 'fadeIn 0.3s ease forwards',
      },
      boxShadow: {
        // Updated based on --shadow: 0 4px 12px rgba(0,0,0,0.15)
        'window': '0 4px 12px rgba(0,0,0,0.15)',
        // Kept neumorphic for potential future use or if some components relied on it
        'neumorphic-light': '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
        'neumorphic-dark': '5px 5px 10px #1a1b1e, -5px -5px 10px #26272a',
      },
      backdropBlur: { // Ensuring xl for blur(20px)
        'xl': '20px',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
