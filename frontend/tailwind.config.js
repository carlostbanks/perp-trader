// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          background: '#121212',
          foreground: '#ffffff',
          primary: '#00E599',
          secondary: '#1A1A1A',
          accent: '#FF4D4D',
          'accent-green': '#00E599',
          'accent-red': '#FF4D4D',
          muted: '#333333',
          card: '#1A1A1A',
        },
        fontFamily: {
          sans: ['var(--font-inter)'],
        },
      },
    },
    plugins: [],
  }