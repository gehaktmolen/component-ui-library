import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { ButtonOwnerState } from './Button.types.ts';
import { HeartIcon } from '@heroicons/react/24/solid';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Inputs/Button',
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
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ImR08MzS6FEIsz3WTH6G4S/Chromatic-Test?type=design&node-id=1%3A130&mode=dev'
        }
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

export const Basics: Story = {
    render: (args) => (
        <div className="py-2 flex flex-row items-center flex-wrap gap-2">
            <Button>{args.label}</Button>
            <Button disabled>{args.label}</Button>
        </div>
    )
};

export const Span: Story = {
    render: (args) => (
        <div className="py-2 flex flex-row items-center flex-wrap gap-2">
            <Button slots={{ root: 'span' }}>{args.label}</Button>
            <Button slots={{ root: 'span' }} disabled>
                {args.label}
            </Button>
        </div>
    )
};

export const DisabledFocus: Story = {
    render: () => (
        <div className="py-2 flex flex-row items-center flex-wrap gap-2">
            <Button disabled>focusableWhenDisabled = false</Button>
            <Button disabled focusableWhenDisabled>
                focusableWhenDisabled = true
            </Button>
        </div>
    )
};

export const DisabledFocusCustom: Story = {
    render: () => (
        <div className="py-2 flex flex-row items-center flex-wrap gap-2">
            <Button slots={{ root: 'span' }} disabled>
                focusableWhenDisabled = false
            </Button>
            <Button slots={{ root: 'span' }} disabled focusableWhenDisabled>
                focusableWhenDisabled = true
            </Button>
        </div>
    )
};

export const Hooks: Story = {
    render: (args) => (
        <div className="py-2 flex flex-row items-center flex-wrap gap-2">
            <Button slots={{ root: 'span' }}>{args.label}</Button>
            <Button slots={{ root: 'span' }} disabled>
                {args.label}
            </Button>
        </div>
    )
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
        startDecorator: <HeartIcon className="text-danger-500" />
    },
    render: (args) => <Button {...args}>{args.label}</Button>
};

export const EndDecorator: Story = {
    args: {
        variant: 'solid',
        color: 'neutral',
        endDecorator: <HeartIcon className="text-danger-500" />
    },
    render: (args) => <Button {...args}>{args.label}</Button>
};

export const StartAndEndDecorator: Story = {
    args: {
        variant: 'solid',
        color: 'neutral',
        startDecorator: <HeartIcon className="text-[#ff0080]" />,
        endDecorator: <HeartIcon className="text-danger-500" />
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
                    className: `text-gray-100 bg-gradient-to-r from-primary-600 via-neutral-600 ${
                        state.focusVisible ? 'to-primary-600' : 'to-neutral-600'
                    } border border-2 ${state.active ? 'border-primary-600' : 'border-neutral-600'}`
                })
            }}
            {...args}
        >
            {args.label}
        </Button>
    )
};
