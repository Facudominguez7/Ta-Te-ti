/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      maxWidth: {
        '33.33p' : '33.33%',
      },
      width: {
        '750': '750px', 
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

