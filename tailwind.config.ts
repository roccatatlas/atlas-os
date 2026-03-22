import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B0B0C',
        surface: '#111214',
        border: '#1E1F23',
        'text-primary': '#FFFFFF',
        'text-muted': '#8F8F93',
        cyan: { DEFAULT: '#06B6D4', dim: '#06B6D422' },
        blue: { DEFAULT: '#3B82F6', dim: '#3B82F622' },
        purple: { DEFAULT: '#7C3AED', dim: '#7C3AED22' },
        green: { DEFAULT: '#10B981' },
        amber: { DEFAULT: '#F59E0B' },
        pink: { DEFAULT: '#EC4899' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        twinkle: 'twinkle 4s infinite ease-in-out',
        float: 'floatY 6s infinite ease-in-out',
        nebula: 'nebulaPulse 8s infinite ease-in-out',
        'fade-up': 'fadeUp 0.8s ease-out both',
        'core-pulse': 'corePulse 4s infinite ease-in-out',
        pulse: 'pulse 3s infinite ease-in-out',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.2)',
        'glow-lg': '0 0 60px rgba(6, 182, 212, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
