/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Include the HTML files
    './src/**/*.{js,jsx,ts,tsx}', // Include JavaScript/React files (adjust as needed)
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc', // Custom primary color
        secondary: '#ffed4a', // Custom secondary color
        danger: '#e3342f', // Custom danger color
        dark: '#2d3748', // Custom dark color for text or backgrounds
      },
      spacing: {
        18: '4.5rem', // Custom spacing value (example)
        72: '18rem', // Custom spacing value (example)
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'], // Custom sans font stack
        serif: ['Georgia', 'serif'], // Custom serif font stack
      },
      boxShadow: {
        'light': '0 4px 6px rgba(0, 0, 0, 0.1)', // Light custom shadow
        'medium': '0 4px 8px rgba(0, 0, 0, 0.15)', // Medium custom shadow
        'dark': '0 4px 12px rgba(0, 0, 0, 0.2)', // Darker custom shadow
      },
      screens: {
        'sm': '640px', // Small screens
        'md': '768px', // Medium screens
        'lg': '1024px', // Large screens
        'xl': '1280px', // Extra large screens
        '2xl': '1536px', // 2x extra large screens
      },
      transitionDuration: {
        400: '400ms', // Custom transition duration (e.g., for hover effects)
      },
    },
  },
  plugins: []
}
