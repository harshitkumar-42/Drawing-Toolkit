/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
        colors: {
            background1: 'rgba(255,255,255,0.6)',
            shadow1: ' 0px 7px 14px rgba(0,0,0,0.03), 0px 0px 3px rgba(0,0,0,0.06), 0px 0px 9px rgba(0,0,0,0.04) ',
            shadow2: ' 0 0 0 1px #4a47b1',
            border1: '#b8b8d9',
            border2: '#d6d6d6',
            text1: '#3d3d3d',
            text2: '#e3e2fe'
        }
    },
    plugins: [],
};