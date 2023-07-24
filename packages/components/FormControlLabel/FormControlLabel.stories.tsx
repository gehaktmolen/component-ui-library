import type { Meta, StoryObj } from '@storybook/react';

import { FormControlLabel } from './';
import { FormGroup } from '../FormGroup';
import { Switch } from '../Switch';

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
        control: <Switch />,
        disabled: false,
        error: false,
        required: false,
        checked: true
    },
    render: (args) => <FormControlLabel {...args} />
};

export const Grouped: Story = {
    render: (args) => (
        <FormGroup row={true}>
            <FormControlLabel {...args} control={<Switch defaultChecked color="primary" />} label="Label" />
            <FormControlLabel {...args} required control={<Switch color="primary" />} label="Required" />
            <FormControlLabel {...args} disabled control={<Switch color="primary" />} label="Disabled" />
        </FormGroup>
    )
};
