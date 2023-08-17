import * as React from 'react';
import type {
    Meta
    // StoryObj
} from '@storybook/react';

import { Button } from '../Button';
import { Portal } from '../Portal';
import { ClickAwayListener } from './ClickAwayListener';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Utils/ClickAwayListener',
    component: ClickAwayListener,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
        docs: {
            story: {
                inline: false,
                iframeHeight: 250
            }
        }
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof ClickAwayListener>;

export default meta;
// type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const Primary: Story = {
//     render: (args) => <ClickAwayListener {...args}></ClickAwayListener>
// };

export function Primary() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="relative">
                <Button type="button" color="neutral" onClick={handleClick}>
                    Open menu dropdown
                </Button>
                {open ? (
                    <div className="absolute z-10 border-2 px-4 py-2 bg-primary-600 text-gray-100 text-sm rounded-md shadow">
                        Click me, I will stay visible until you click outside.
                    </div>
                ) : null}
            </div>
        </ClickAwayListener>
    );
}

export function UsageWithPortal() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="relative">
                <Button type="button" color="neutral" onClick={handleClick}>
                    Open menu dropdown
                </Button>
                {open ? (
                    <Portal>
                        <div className="absolute z-10 border-2 px-4 py-2 bg-primary-600 text-gray-100 text-sm rounded-md shadow">
                            Click me, I will stay visible until you click outside.
                        </div>
                    </Portal>
                ) : null}
            </div>
        </ClickAwayListener>
    );
}

export function LeadingEvents() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
            <div className="relative">
                <Button type="button" color="neutral" onClick={handleClick}>
                    Open menu dropdown
                </Button>
                {open ? (
                    <div className="absolute z-10 px-4 py-2 bg-primary-600 text-gray-100 text-sm rounded-md shadow">
                        Click me, I will stay visible until you click outside.
                    </div>
                ) : null}
            </div>
        </ClickAwayListener>
    );
}
