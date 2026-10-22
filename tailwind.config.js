/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/sections/**/*.{ts,tsx}',
    './src/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--bg)',
          2: 'var(--bg-2)',
          3: 'var(--bg-3)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
        },
        line: {
          DEFAULT: 'var(--line)',
          2: 'var(--line-2)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          2: 'var(--accent-2)',
        },
        card: 'var(--card)',
      },
      fontFamily: {
        sans: ['var(--sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--mono)', 'monospace'],
        display: ['var(--display)', 'serif'],
      },
      keyframes: {
        'pulse-dot': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(3)', opacity: '0' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
