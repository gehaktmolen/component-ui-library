import type { Meta, StoryObj } from '@storybook/react';

import { TextareaAutosize } from './TextareaAutosize';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Utils/TextareaAutosize',
    component: TextareaAutosize,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof TextareaAutosize>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        minRows: 3,
        placeholder: 'Minimum 3 rows',
        className:
            'relative block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-primary-600'
    },
    render: (args) => <TextareaAutosize {...args} />
};
