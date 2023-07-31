import theme from './theme';
import type { Preview } from '@storybook/react';
import { decorators } from './decorators';
import { withThemeByClassName } from '@storybook/addon-styling';
import '../src/tailwind.scss';

const preview: Preview = {
    parameters: {
        backgrounds: {
            default: 'light'
        },
        layout: 'centered',
        actions: { argTypesRegex: '^on[A-Z].*' },
        docs: {
            theme
        },
        controls: {
            hideNoControlsWarning: true,
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        },
        options: {
            storySort: {
                order: ['Docs', ['Intro']]
            }
        }
    },

    decorators: [
        ...decorators,
        // Adds theme switching support.
        // NOTE: requires setting "darkMode" to "class" in your tailwind config.
        withThemeByClassName({
            themes: {
                light: 'light',
                dark: 'dark'
            },
            defaultTheme: 'light'
        })
    ]
};

export default preview;
