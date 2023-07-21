import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { ButtonOwnerState } from "./Button.types.ts";
import { Icon } from "../Icon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Azerion/Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
        // backgrounds: {
        //     default: 'dark'
        // }
        // theming: {
        //     themeOverride: 'dark',
        // },
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        label: {
            control: 'text',
            description: 'The content of the button.'
        }
    },
    args: {
        label: 'Button'
    }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        variant: 'solid',
    },
    render: (args) => (
        <Button {...args}>{args.label}</Button>
    )
};

export const StartDecorator: Story = {
    args: {
        variant: 'solid',
        color: 'primary',
    },
    render: (args) => (
        <Button {...args} startDecorator={<Icon icon="heart" color="secondary" />}>{args.label}</Button>
    )
};

export const Custom: Story = {
    render: (args) => (
        <Button slotProps={{
            root: (state: ButtonOwnerState) => ({
                className: ` drop-shadow-2xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 ${state.focusVisible ? 'to-pink-500' : 'to-amber-500'} border border-2 ${state.active ? 'border-purple-500' : 'border-amber-500'}`
            })
        }} {...args}>{args.label}</Button>
    )
};
