/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#161622',
        secondary: {
          DEFAULT: '#FF9C01',
          100: '#FF9001',
          200: '#FF8E01'
        },
        black: {
          DEFAULT: '#000',
          100: '#1E1E2D',
          200: '#232533'
        },
        gray: {
          100: '#CDCDE0'
        }
      },
      fontFamily: {
        'p-thin': ['Poppins-Thin', 'sans-serif'],
        'p-extralight': ['Poppins-ExtraLight', 'sans-serif'],
        'p-light': ['Poppins-Light', 'sans-serif'],
        'p-regular': ['Poppins-Regular', 'sans-serif'],
        'p-medium': ['Poppins-Medium', 'sans-serif'],
        'p-semibold': ['Poppins-SemiBold', 'sans-serif'],
        'p-bold': ['Poppins-Bold', 'sans-serif'],
        'p-extrabold': ['Poppins-ExtraBold', 'sans-serif'],
        'p-black': ['Poppins-Black', 'sans-serif']
      }
    }
  },
  plugins: []
}
