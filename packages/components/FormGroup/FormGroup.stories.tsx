import type { Meta, StoryObj } from '@storybook/react';

import { FormControlLabel } from '../FormControlLabel';
import { FormGroup } from './';
import { Switch } from '../Switch';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Utils/FormGroup',
    component: FormGroup,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof FormControlLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Column: Story = {
    args: {
        row: false
    },
    render: (args) => (
        <FormGroup {...args}>
            <FormControlLabel control={<Switch defaultChecked color="primary" />} label="Switch A" />
            <FormControlLabel required control={<Switch color="primary" />} label="Switch B" />
            <FormControlLabel disabled control={<Switch color="primary" />} label="Switch C" />
        </FormGroup>
    )
};

export const Row: Story = {
    args: {
        row: true
    },
    render: (args) => (
        <FormGroup {...args}>
            <FormControlLabel control={<Switch defaultChecked color="primary" />} label="Switch A" />
            <FormControlLabel required control={<Switch color="primary" />} label="Switch B" />
            <FormControlLabel disabled control={<Switch color="primary" />} label="Switch C" />
        </FormGroup>
    )
};
