import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { ButtonOwnerState } from './Button.types.ts';
import { Icon } from '../Icon';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Inputs/Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
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
        variant: 'solid'
    },
    render: (args) => <Button {...args}>{args.label}</Button>
};

export const Variants: Story = {
    render: (args) => (
        <div className="py-2 flex flex-col items-center flex-wrap gap-2">
            <Button variant="solid">{args.label}</Button>
            <Button variant="soft">{args.label}</Button>
        </div>
    )
};

export const Sizes: Story = {
    render: (args) => (
        <div className="py-2 flex flex-col items-center flex-wrap gap-2">
            <Button size="sm">{args.label}</Button>
            <Button size="md">{args.label}</Button>
            <Button size="lg">{args.label}</Button>
        </div>
    )
};

export const Colors: Story = {
    render: (args) => (
        <div className="py-2 flex flex-col items-center flex-wrap gap-2">
            <Button color="primary">{args.label}</Button>
            <Button color="neutral">{args.label}</Button>
            <Button color="danger">{args.label}</Button>
        </div>
    )
};

export const StartDecorator: Story = {
    args: {
        variant: 'solid',
        color: 'neutral',
        startDecorator: <Icon icon="heart" color="primary" />
    },
    render: (args) => <Button {...args}>{args.label}</Button>
};

export const EndDecorator: Story = {
    args: {
        variant: 'solid',
        color: 'neutral',
        endDecorator: <Icon icon="heart" color="danger" />
    },
    render: (args) => <Button {...args}>{args.label}</Button>
};

export const StartAndEndDecorator: Story = {
    args: {
        variant: 'solid',
        color: 'neutral',
        startDecorator: <Icon icon="heart" color="#ff8080" />,
        endDecorator: <Icon icon="heart" color="primary" />
    },
    render: (args) => <Button {...args}>{args.label}</Button>
};

export const Custom: Story = {
    args: {
        variant: 'soft'
    },
    render: (args) => (
        <Button
            slotProps={{
                root: (state: ButtonOwnerState) => ({
                    className: `text-white bg-gradient-to-r from-primary-500 via-neutral-500 ${
                        state.focusVisible ? 'to-primary-500' : 'to-neutral-500'
                    } border border-2 ${state.active ? 'border-primary-500' : 'border-neutral-500'}`
                })
            }}
            {...args}
        >
            {args.label}
        </Button>
    )
};
