import type { Meta, StoryObj } from '@storybook/react';

import { Menu } from './';
import { MenuButton } from '../MenuButton';
import { MenuItem } from '../MenuItem';
import { Dropdown } from '../Dropdown';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Navigation/Menu',
    component: Menu,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    render: (args) => (
        <Dropdown>
            <MenuButton>Dashboard</MenuButton>
            <Menu {...args}>
                <MenuItem
                    onClick={() => {
                        console.log('Clicked on profile');
                    }}
                >
                    Profile
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        console.log('Clicked on my account');
                    }}
                >
                    My account
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        console.log('Clicked on log out');
                    }}
                >
                    Log out
                </MenuItem>
            </Menu>
        </Dropdown>
    )
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// export const Basics = () => {
//     const createHandleMenuClick = (menuItem: string) => {
//         return () => {
//             console.log(`Clicked on ${menuItem}`);
//         };
//     };
//
//     return (
//         <Dropdown>
//             <MenuButton>
//                 Dashboard
//             </MenuButton>
//             <Menu>
//                 <MenuItem onClick={()=> { console.log('Clicked on profile') }}>
//                     Profile
//                 </MenuItem>
//                 <MenuItem onClick={()=> { console.log('Clicked on my account') }}>
//                     My account
//                 </MenuItem>
//                 <MenuItem onClick={()=> { console.log('Clicked on log out') }}>
//                     Log out
//                 </MenuItem>
//             </Menu>
//         </Dropdown>
//     );
// };
