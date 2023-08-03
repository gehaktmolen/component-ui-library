import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { Toggle } from '../Toggle';
import { FormControlLabel } from '../FormControlLabel';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Data Display/Badge',
    component: Badge,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    args: {
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
        },
        variant: 'standard',
        invisible: false,
        badgeContent: 100,
        color: 'primary'
    }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Rectangular: Story = {
    args: {
        overlap: 'rectangular'
    },
    render: (args) => (
        <Badge {...args}>
            <span className="w-10 h-10 rounded-xl bg-gray-300 dark:bg-gray-600 inline-block align-middle" />
        </Badge>
    )
};

export const Circular: Story = {
    args: {
        overlap: 'circular'
    },
    render: (args) => (
        <Badge {...args}>
            <Icon icon="heart" size="2xl" color="#ff8080" />
        </Badge>
    )
};

export const Max: Story = {
    render: () => (
        <div className="flex flex-row gap-4">
            <Badge badgeContent={99}>
                <span className="w-10 h-10 rounded-xl bg-gray-300 dark:bg-gray-600 inline-block align-middle" />
            </Badge>
            <Badge badgeContent={100}>
                <span className="w-10 h-10 rounded-xl bg-gray-300 dark:bg-gray-600 inline-block align-middle" />
            </Badge>
            <Badge badgeContent={100} max={999}>
                <span className="w-10 h-10 rounded-xl bg-gray-300 dark:bg-gray-600 inline-block align-middle" />
            </Badge>
        </div>
    )
};

export const ShowZero: Story = {
    render: () => (
        <div className="flex flex-row gap-4">
            <Badge badgeContent={0}>
                <span className="w-10 h-10 rounded-xl bg-gray-300 dark:bg-gray-600 inline-block align-middle" />
            </Badge>
            <Badge badgeContent={0} showZero>
                <span className="w-10 h-10 rounded-xl bg-gray-300 dark:bg-gray-600 inline-block align-middle" />
            </Badge>
        </div>
    )
};

export const BadgeContent: Story = {
    args: {
        overlap: 'circular'
    },
    render: () => (
        <Badge
            slotProps={{
                root: {
                    className: 'box-border m-0 p-0 text-xs list-none relative inline-block leading-none'
                },
                badge: {
                    className:
                        'z-auto absolute top-0 right-0 min-w-badge min-h-badge p-0 text-white font-semibold font-xs rounded-xl bg-primary-500 leading-5.5 whitespace-nowrap text-center translate-x-1/2 -translate-y-1/2 drop-shadow-lg origin-right'
                }
            }}
            badgeContent={5}
        >
            <span className="w-10 h-10 rounded-xl bg-gray-300 dark:bg-gray-600 inline-block align-middle" />
        </Badge>
    )
};

export const BadgeVisibility = () => {
    const [count, setCount] = React.useState(1);
    const [invisible, setInvisible] = React.useState(false);

    const handleBadgeVisibility = () => {
        setInvisible(!invisible);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
                <Badge badgeContent={count}>
                    <span className="w-10 h-10 rounded-xl bg-gray-300 dark:bg-gray-600 inline-block align-middle" />
                </Badge>
                <div className="flex flex-row gap-1">
                    <Button
                        aria-label="reduce"
                        onClick={() => {
                            setCount(Math.max(count - 1, 0));
                        }}
                    >
                        Remove
                    </Button>
                    <Button
                        aria-label="increase"
                        onClick={() => {
                            setCount(count + 1);
                        }}
                    >
                        Add
                    </Button>
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <Badge badgeContent={count} invisible={invisible}>
                    <span className="w-10 h-10 rounded-xl bg-gray-300 dark:bg-gray-600 inline-block align-middle" />
                </Badge>
                <FormControlLabel
                    control={<Toggle checked={!invisible} onChange={handleBadgeVisibility} />}
                    label="Show Badge"
                />
            </div>
        </div>
    );
};
