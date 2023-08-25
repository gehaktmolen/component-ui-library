// const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

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
            // Import font from other project using css variable; https://youtu.be/4K-UDVy6pGM?t=129
            // fontFamily: {
            //     sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            // },
            cursor: {
                inherit: 'inherit'
            },
            fontSize: {
                badge: '10px'
            },
            borderRadius: {
                badge: '20px'
            },
            height: {
                badge: '20px'
            },
            maxWidth: {
                snackbar: '560px'
            },
            minWidth: {
                badge: '20px',
                listbox: '200px',
                snackbar: '300px'
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    'min-i-s': (value) => ({
                        'min-inline-size': value
                    }),
                    mbs: (value) => ({
                        'margin-block-start': value
                    }),
                    mbe: (value) => ({
                        'margin-block-end': value
                    }),
                    'm-inline': (value) => ({
                        'margin-inline': value
                    }),
                    'm-block': (value) => ({
                        'margin-block': value
                    }),
                    'p-inline': (value) => ({
                        'padding-inline': value
                    }),
                    'p-block': (value) => ({
                        'padding-block': value
                    }),
                    pbs: (value) => ({
                        'padding-block-start': value
                    }),
                    pbe: (value) => ({
                        'padding-block-end': value
                    }),
                    'min-b-s': (value) => ({
                        'min-block-size': value
                    })
                },
                { values: theme('spacing') }
            );
        })
    ]
};
