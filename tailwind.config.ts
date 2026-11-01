import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
                // Primary brand color (lime)
        brand: {
          DEFAULT: '#C6F135',
          foreground: '#0A0A0A',
          light: '#E2FF86',
        },
        // "Live / active" accent (deeper lime, for glows)
        accent: {
          DEFAULT: '#9BE22B',
        },
        // Card surfaces (near-black)
        surface: {
          DEFAULT: '#0D0D0D',
          raised: '#161616',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],     
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'slide-in': 'slide-in 0.35s ease-out both',
        'pulse-ring': 'pulse-ring 1.6s ease-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        wave: 'wave 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;