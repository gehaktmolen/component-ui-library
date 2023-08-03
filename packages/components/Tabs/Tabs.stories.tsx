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
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    args: {}
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    render: (args) => (
        <Tabs className="mx-auto max-w-xs w-80" defaultValue={1} {...args}>
            <TabsList>
                <Tab value={1}>One</Tab>
                <Tab value={2}>Two</Tab>
                <Tab value={3}>Three</Tab>
            </TabsList>
            <TabPanel value={1}>First page</TabPanel>
            <TabPanel value={2}>Second page</TabPanel>
            <TabPanel value={3}>Third page</TabPanel>
        </Tabs>
    )
};
