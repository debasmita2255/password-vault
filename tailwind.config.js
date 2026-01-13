// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{html,js}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // <--- This line is critical!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}