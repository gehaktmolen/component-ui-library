import type { Meta, StoryObj } from '@storybook/react';

import { FormLabel } from './';
import { FormControl } from '../FormControl';
import { FormHelperText } from '../FormHelperText';
import { Input } from '../Input';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Utils/FormLabel',
    component: FormLabel,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof FormLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        // required: false,
    },
    render: (args) => (
        <FormControl required={true}>
            <FormLabel {...args}>Label</FormLabel>
            <Input placeholder="Placeholder" />
            <FormHelperText>This is a helper text.</FormHelperText>
        </FormControl>
    )
};
