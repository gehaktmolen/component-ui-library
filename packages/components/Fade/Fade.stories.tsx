import type {
    Meta,
    StoryObj
} from '@storybook/react';

import { Fade } from './';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Transitions/Fade',
    component: Fade,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof Fade>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        in: true,
        timeout: {
            enter: 2_000,
            exit: 1_500
        }
    },
    render: (args) => <Fade {...args}><div className="text-gray-900 dark:text-gray-100">Fade Transition</div></Fade>
};
