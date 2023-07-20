// const colors = require('tailwindcss/colors')
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
    important: '#root',
    // darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './packages/**/*.{jsx,tsx}',
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            primary: colors.emerald,
            secondary: colors.fuchsia,
            black: colors.black,
            white: colors.white,
            purple: colors.purple,
            amber: colors.amber,
            gray: colors.gray,
            emerald: colors.emerald,
        },
        extend: {

        },
    },
    plugins: [],
}

