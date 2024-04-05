/** @type {import('postcss/lib/processor')} */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...process.env.NODE_ENV === 'production' ? { cssnano: {} } : {},
  },
};
