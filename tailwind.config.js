const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'Mygray': '#ebe7f5',
        'light-Mygray': '#e5e7eb',
        'blue': 'RGB(58, 12, 163)',
        'wallpapper-blue': 'RGBA(58, 12, 163, .8)',
        'light-blue': '#1f78b4',
        'green': '#0ed1a5',
        'purple': '#7e1fb4',
        'pink': 'RGB(247, 37, 133)',
        'light-pink': 'rgb(236 72 153)',
        'red': '#dc2626',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
