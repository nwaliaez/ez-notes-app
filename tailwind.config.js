const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        theme1: '#ffb3c6', // Theme 1
        theme2: '#f9daac', // Theme 2
        theme3: '#a4d1e8', // Theme 3
        theme4: '#adc0ea', // Theme 4
        theme5: '#81b29a', // Theme 5
        primary: 'var(--color-primary)', // Background
        secondary: 'var(--color-secondary)', // Secondary background
        text: 'var(--color-text)', // Primary text
        title: 'var(--color-text-title)', // Primary text
        textMuted: 'var(--color-text-muted)', // Muted/secondary text
        border: 'var(--color-border)', // Borders
        accent: 'var(--color-accent)', // Accent (buttons, links)
        accentHover: 'var(--color-accent-hover)', // Hover state for accent
        success: 'var(--color-success)', // Success state
        error: 'var(--color-error)', // Error state
        warning: 'var(--color-warning)', // Warning state
        shadow: 'var(--color-shadow)' // Box shadows
      },
      boxShadow: {
        custom: '0 4px 6px var(--color-shadow)' // Custom shadow with theme-aware colors
      },
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans] // Default font, replace "Inter" with your preferred font
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
