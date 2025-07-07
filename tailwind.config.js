/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  safelist: [
    'bg-green-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-gray-500',
    'hover:bg-green-600',
    'hover:bg-yellow-600',
    'hover:bg-blue-600',
    'hover:bg-purple-600',
    'hover:bg-orange-600',
    'hover:bg-gray-600',
    'text-white',
    'text-black',
    'rounded-full',
    'px-2',
    'py-1',
    'px-4',
    'py-2',
    'text-sm',
    'font-medium',
    'transition-colors',
    'duration-200',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
