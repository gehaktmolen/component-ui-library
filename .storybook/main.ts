import remarkGfm from 'remark-gfm';
import type { StorybookConfig } from '@storybook/react-vite';
const config: StorybookConfig = {
    stories: [
        '../docs/**/*.mdx',
        '../packages/**/*.stories.mdx',
        '../packages/**/*.stories.@(ts|tsx)'
        // '../stories/**/*.mdx',
        // '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
    ],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-styling',
        {
            name: '@storybook/addon-docs',
            options: {
                mdxPluginOptions: {
                    mdxCompileOptions: {
                        remarkPlugins: [remarkGfm]
                    }
                }
            }
        }
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {}
    },
    docs: {
        autodocs: 'tag'
    }
};
export default config;
