/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}' , './index.html'],
  theme: {
    extend: {
      container:{
        center:true
      },
      screens: {
        'md': '850px', // تغيير قيمة الشاشة 'md' إلى 800px أو أي قيمة أخرى ترغب بها
      },
    },
  },
  plugins: [],
}

