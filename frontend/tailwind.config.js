/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            display: ["Poppins", "sans-serif"],
            logo: ["Ingrid Darling", "sans-serif"],
        },
        extend: {
            colors: {
                primary: "#05B6D3",
                secondary: "#EF863E"
            },
            backgroundImage: {
                'login-bg-img': "url('./images/bg-image.png')",
                'signup-bg-img': "url('./images/signup-bg-img.png')",
            }
        },
    },
    plugins: [],
}
