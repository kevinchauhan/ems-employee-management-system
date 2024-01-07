/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#009386',
        primaryDark: '#007C71',
        secondary: '#202B2F',
        light: '#E4E4E4',
      },
    },
  },
  plugins: [],
}

