import type { Meta, StoryObj } from '@storybook/react';

import { FormControl } from '../FormControl';
import { FormHelperText } from './FormHelperText';
import { Switch } from '../Switch';
import { FormControlLabel } from '../FormControlLabel';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Utils/FormHelperText',
    component: FormHelperText,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof FormHelperText>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// Todo: Update Primary example to use checkbox, once we have checkbox component.
export const Primary: Story = {
    render: (args) => (
        <FormControl size="sm">
            <FormControlLabel control={<Switch />} label="I have read and agree to the terms and conditions." />
            <FormHelperText {...args}>Read our terms and conditions.</FormHelperText>
        </FormControl>
    )
};
