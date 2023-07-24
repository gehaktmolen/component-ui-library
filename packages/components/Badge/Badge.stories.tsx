import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';
import { Icon } from '../Icon';
import { Button } from '../Button';

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
            <Button variant="solid" color="warning">
                Button
            </Button>
        </Badge>
    )
};

export const Circular: Story = {
    args: {
        overlap: 'circular'
    },
    render: (args) => (
        <Badge {...args}>
            <Icon icon="heart" size="2xl" color="danger" />
        </Badge>
    )
};
