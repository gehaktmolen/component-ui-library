// import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { FormControl, useFormControlContext } from './';
import { FormLabel } from '../FormLabel';
import { FormHelperText } from '../FormHelperText';
import { Input } from '../Input';
// import clsx from 'clsx';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Utils/FormControl',
    component: FormControl,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    args: {}
} satisfies Meta<typeof FormControl>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {},
    render: (args) => (
        <FormControl defaultValue="" required {...args}>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Write your name here" />
            <FormHelperText>This is a helper text.</FormHelperText>
            <ControlStateDisplay />
        </FormControl>
    )
};

function ControlStateDisplay() {
    const formControlContext = useFormControlContext();
    if (formControlContext === undefined) {
        return null;
    }

    const { filled, focused } = formControlContext;

    return (
        <p className="mt-4 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
            {filled ? 'filled' : 'empty'}&nbsp;|&nbsp;
            {focused ? 'focused' : 'not focused'}
        </p>
    );
}
