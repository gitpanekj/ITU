/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        header: "#04103B",
        background: "#F1F5F9"
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};