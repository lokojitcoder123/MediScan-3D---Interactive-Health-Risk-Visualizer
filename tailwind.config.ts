import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Clinical dark theme
        background: {
          DEFAULT: '#0a1428',
          secondary: '#141e2e',
          tertiary: '#1a2438',
        },
        foreground: {
          DEFAULT: '#e8ecf1',
          secondary: '#a8b2bf',
        },
        // Risk colors
        'risk-low': '#10b981',
        'risk-medium': '#f59e0b',
        'risk-high': '#ef4444',
        // Accent - cyan/teal
        accent: {
          DEFAULT: '#06b6d4',
          light: '#22d3ee',
          dark: '#0891b2',
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8', 'filter': 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))' },
          '50%': { opacity: '1', 'filter': 'drop-shadow(0 0 16px rgba(6, 182, 212, 0.7))' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
