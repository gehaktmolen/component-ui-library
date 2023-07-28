// const colors = require('tailwindcss/colors')
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
    // important: '#root',
    darkMode: ['class', '[class="dark"]'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './packages/**/*.{jsx,tsx}'],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            disabled: colors.gray,
            primary: colors.fuchsia,
            success: colors.emerald,
            danger: colors.red,
            warning: colors.amber,
            info: colors.blue,
            black: colors.black,
            white: colors.white,
            purple: colors.purple,
            amber: colors.amber,
            indigo: colors.indigo,
            gray: colors.gray,
            emerald: colors.emerald,
            slate: colors.slate
        },
        extend: {}
    },
    plugins: []
};
