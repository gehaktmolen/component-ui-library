import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { List } from './List';
import { ListItem } from '../ListItem';
import { ListItemButton } from '../ListItemButton';
import { ListItemIcon } from '../ListItemIcon';
import { ListSubheader } from '../ListSubheader';
import { ListDivider } from '../ListDivider';
import { Toggle } from '../Toggle';
import { FormControlLabel } from '../FormControlLabel';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Data Display/WIP/List',
    component: List,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
    // More items...
];

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {},
    render: (args) => (
        <main className="py-10 min-w-[400px]">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-md bg-gray-50 shadow">
                    <List {...args} />
                    <ul role="list" className="divide-y divide-gray-200">
                        {items.map((item) => (
                            <li key={item.id} className="px-6 py-4">
                                {/* Your content */}
                                <div className="relative h-16 overflow-hidden rounded border border-dashed border-gray-400 opacity-75">
                                    <svg className="absolute inset-0 h-full w-full stroke-gray-900/10" fill="none">
                                        <defs>
                                            <pattern
                                                id="pattern-91490595-fbd3-4496-beae-7777d695b0ad"
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
                                            fill="url(#pattern-91490595-fbd3-4496-beae-7777d695b0ad)"
                                            width="100%"
                                            height="100%"
                                        ></rect>
                                    </svg>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    )
};

export function Basics() {
    return (
        <List aria-labelledby="basic-list-demo" size="lg" color="danger" variant="soft">
            <ListItem>1 red onion</ListItem>
            <ListItem>2 red peppers</ListItem>
            <ListItem>120g bacon</ListItem>
        </List>
    );
}

export function Sizes() {
    return (
        <div className="flex justify-center grow gap-2 flex-wrap">
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size}>
                    <div className="text-gray-400 text-sm mb-4">
                        <code>size=&quot;{size}&quot;</code>
                    </div>
                    <List size={size} variant="solid" color="neutral">
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                        />
                                    </svg>
                                </ListItemIcon>
                                Home
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>Projects</ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>Settings</ListItemButton>
                        </ListItem>
                    </List>
                </div>
            ))}
        </div>
    );
}

export function Icons() {
    return (
        <List aria-labelledby="decorated-list-demo">
            <ListItem>
                <ListItemIcon>🧅</ListItemIcon> 1 red onion
            </ListItem>
            <ListItem>
                <ListItemIcon>🍤</ListItemIcon> 2 Shrimps
            </ListItem>
            <ListItem>
                <ListItemIcon>🥓</ListItemIcon> 120g bacon
            </ListItem>
        </List>
    );
}

export function Divider() {
    return (
        <div className="flex justify-center grow gap-2 flex-wrap">
            {([undefined, 'gutter', 'startDecorator', 'startContent'] as const).map((inset) => (
                <div key={inset || 'default'}>
                    <div className="text-gray-400 text-sm mb-4">
                        <code>{inset ? `inset="${inset}"` : '(default)'}</code>
                    </div>
                    <List variant="soft" className="min-w-[240px] rounded-md">
                        <ListItem>
                            <ListItemIcon>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://avatars.githubusercontent.com/u/4973935?v=4"
                                    alt=""
                                />
                            </ListItemIcon>
                            Mabel Boyle
                        </ListItem>
                        <ListDivider inset={inset} />
                        <ListItem>
                            <ListItemIcon>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://avatars.githubusercontent.com/u/4973935?v=4"
                                    alt=""
                                />
                            </ListItemIcon>
                            Boyd Burt
                        </ListItem>
                    </List>
                </div>
            ))}
        </div>
    );
}

export function Nested() {
    const [small, setSmall] = React.useState(false);
    return (
        <div>
            <FormControlLabel
                label="Toggle small nested list"
                className="mb-4"
                control={<Toggle checked={small} onChange={(event) => setSmall(event.target.checked)} />}
            ></FormControlLabel>
            <List variant="solid" size={small ? 'sm' : undefined} className="w-[200px] rounded-xl">
                <ListItem nested>
                    <ListSubheader>Category 1</ListSubheader>
                    <List>
                        <ListItem>
                            <ListItemButton>Subitem 1</ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>Subitem 2</ListItemButton>
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem nested>
                    <ListSubheader>Category 2</ListSubheader>
                    <List>
                        <ListItem>
                            <ListItemButton>Subitem 1</ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>Subitem 2</ListItemButton>
                        </ListItem>
                    </List>
                </ListItem>
            </List>
        </div>
    );
}
