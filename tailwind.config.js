/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './.eleventy.js',
    './_includes/**/*.njk',
    './*.md',
    './posts/**/*.md',
  ],
  safelist: [
    // Prism classes
    'token',
    'boolean',
    'class-name',
    'constant',
    'keyword',
    'literal-property',
    'operator',
    'property',
    'punctuation',
    'string',
  ],
  theme: {
    extend: {
      animation: {
        'bg-slide': 'bg-slide 15s ease infinite',
      },
      backgroundSize: {
        'double': '200%',
      },
      colors: {
        'rbow-blue': '#0d6efd',
        'rbow-indigo': '#6610f2',
        'rbow-orange': '#fd7e14',
        'rbow-red': '#dc3545',
        'rbow-teal': '#20c997',
        'rbow-yellow': '#ffc107',
      },
      keyframes: {
        'bg-slide': {
          '0%': { backgroundPosition: '0 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0 50%' },
        },
      },
    },
    fontFamily: {
      'body': ['Fira Sans', 'sans-serif'],
      'mono': ['Fira Code', 'monospace'],
    },
  },
  plugins: [
  ],
};
