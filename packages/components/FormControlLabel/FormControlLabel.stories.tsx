import type { Meta, StoryObj } from '@storybook/react';

import { FormControlLabel } from './';
import { Toggle } from '../Toggle';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Utils/FormControlLabel',
    component: FormControlLabel,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
        label: {
            type: 'string',
            description: 'The content of the label.'
        }
    },
    args: {
        label: 'Label'
    }
} satisfies Meta<typeof FormControlLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        labelPlacement: 'end',
        control: <Toggle />,
        disabled: false,
        error: false,
        required: false,
        checked: true
    },
    render: (args) => <FormControlLabel {...args} />
};
