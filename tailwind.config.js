/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary :{
          100:"#FF9E9E",
          500 : "#FF5151",
          700 :"#FF5551"
        },
        darkorange:{
          500:"#fc2a2a",
        }
      }
    },
  },
  plugins: [],
}

