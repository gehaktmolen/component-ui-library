// const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
    // important: '#root',
    darkMode: ['class', '[class="dark"]'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './packages/**/*.{jsx,tsx}'],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            primary: colors.fuchsia,
            danger: colors.red,
            white: colors.white,
            gray: colors.gray
        },
        extend: {
            // fontFamily: {
            //     sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            // },
        }
    },
    plugins: [require('@tailwindcss/forms')]
};
