import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from './Tabs';
import { Tab } from '../Tab';
import { TabsList } from '../TabsList';
import { TabPanel } from '../TabPanel';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Navigation/Tabs',
    component: Tabs,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Horizontal: Story = {
    render: () => (
        <Tabs className="mx-auto max-w-xs w-80" defaultValue={1}>
            <TabsList className="mb-4">
                <Tab value={1}>One</Tab>
                <Tab value={2}>Two</Tab>
                <Tab value={3}>Three</Tab>
            </TabsList>
            <div className="relative flex items-center text-center h-60 overflow-hidden rounded-xl border border-dashed border-gray-400 opacity-75">
                <TabPanel value={1}>
                    <span className="text-sm text-gray-900 dark:text-gray-100">First page</span>
                </TabPanel>
                <TabPanel value={2}>
                    <span className="text-sm text-gray-900 dark:text-gray-100">Second page</span>
                </TabPanel>
                <TabPanel value={3}>
                    <span className="text-sm text-gray-900 dark:text-gray-100">Third page</span>
                </TabPanel>
                <svg className="absolute inset-0 h-full w-full stroke-gray-900/10" fill="none">
                    <defs>
                        <pattern
                            id="pattern-87beeb02-b726-4cd1-be69-ae5bc27986e9"
                            x="0"
                            y="0"
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                        </pattern>
                    </defs>
                    <rect
                        stroke="none"
                        fill="url(#pattern-87beeb02-b726-4cd1-be69-ae5bc27986e9)"
                        width="100%"
                        height="100%"
                    ></rect>
                </svg>
            </div>
        </Tabs>
    )
};

export const Vertical: Story = {
    render: () => (
        <Tabs className="mx-auto max-w-xs w-80" defaultValue={1} orientation="vertical">
            <TabsList className="mr-4">
                <Tab value={1}>One</Tab>
                <Tab value={2}>Two</Tab>
                <Tab value={3}>Three</Tab>
            </TabsList>
            <div className="relative flex items-center text-center h-40 w-60 overflow-hidden rounded-xl border border-dashed border-gray-400 opacity-75">
                <TabPanel value={1}>
                    <span className="text-sm text-gray-900 dark:text-gray-100">First page</span>
                </TabPanel>
                <TabPanel value={2}>
                    <span className="text-sm text-gray-900 dark:text-gray-100">Second page</span>
                </TabPanel>
                <TabPanel value={3}>
                    <span className="text-sm text-gray-900 dark:text-gray-100">Third page</span>
                </TabPanel>
                <svg className="absolute inset-0 h-full w-full stroke-gray-900/10" fill="none">
                    <defs>
                        <pattern
                            id="pattern-87beeb02-b726-4cd1-be69-ae5bc27986e9"
                            x="0"
                            y="0"
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                        </pattern>
                    </defs>
                    <rect
                        stroke="none"
                        fill="url(#pattern-87beeb02-b726-4cd1-be69-ae5bc27986e9)"
                        width="100%"
                        height="100%"
                    ></rect>
                </svg>
            </div>
        </Tabs>
    )
};
