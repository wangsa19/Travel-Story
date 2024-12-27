/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            display: ["Poppins", "sans-serif"],
        },
        extend: {
            colors: {
                primary: "#05B603",
                secondary: "#EF863E"
            }
        },
    },
    plugins: [],
}
