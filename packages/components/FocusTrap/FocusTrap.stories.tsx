import * as React from 'react';
// import PropTypes from 'prop-types';
import type { Meta, StoryObj } from '@storybook/react';

import { FocusTrap } from './FocusTrap';
import { Button } from '../Button';
import { Input } from '../Input';
import { Portal } from '../Portal';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Utils/FocusTrap',
    component: FocusTrap,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof FocusTrap>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        open: false,
        children: <div>Hello</div>
    },
    render: (args) => <FocusTrap {...args} />
};

export function Basics() {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex items-center flex-col p-4 bg-gray-500 rounded-md shadow-md gap-2">
            <Button type="button" onClick={() => setOpen(true)}>
                Open
            </Button>
            {open && (
                <FocusTrap open>
                    <div tabIndex={-1}>
                        <label>
                            First name: <Input type="text" />
                        </label>
                        <br />
                        <Button type="button" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </div>
                </FocusTrap>
            )}
        </div>
    );
}

export function DisableEnforcedFocus() {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex items-center flex-col p-4 bg-gray-500 rounded-md shadow-md gap-2">
            <Button type="button" onClick={() => setOpen(true)}>
                Open
            </Button>
            {open && (
                <FocusTrap disableEnforceFocus open>
                    <div tabIndex={-1}>
                        <label>
                            First name: <Input type="text" />
                        </label>
                        <br />
                        <Button type="button" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </div>
                </FocusTrap>
            )}
        </div>
    );
}

export function LazyActivation() {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex items-center flex-col p-4 bg-gray-500 rounded-md shadow-md gap-2">
            <Button type="button" onClick={() => setOpen(true)}>
                Open
            </Button>
            {open && (
                <FocusTrap disableAutoFocus open>
                    <div tabIndex={-1}>
                        <label>
                            First name: <Input type="text" />
                        </label>
                        <br />
                        <Button type="button" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </div>
                </FocusTrap>
            )}
        </div>
    );
}

export function PortalFocusTrap() {
    const [open, setOpen] = React.useState(false);
    const [container, setContainer] = React.useState(null);

    return (
        <div className="flex items-center flex-col p-4 bg-gray-500 rounded-md shadow-md gap-2">
            <Button type="button" onClick={() => setOpen(true)}>
                Open
            </Button>
            {open && (
                <FocusTrap open>
                    <div tabIndex={-1}>
                        <label>
                            First name: <Input type="text" />
                        </label>
                        <br />
                        <Portal container={container}>
                            <label>
                                Last name: <Input type="text" />
                            </label>
                        </Portal>
                        <Button type="button" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </div>
                </FocusTrap>
            )}

            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <div ref={setContainer} />
        </div>
    );
}

export function ContainedToggleTrappedFocus() {
    const [open, setOpen] = React.useState(false);

    return (
        <FocusTrap open={open} disableRestoreFocus disableAutoFocus>
            <div className="flex items-center flex-col p-4 bg-gray-500 rounded-md shadow-md gap-2">
                <Button type="button" onClick={() => setOpen(!open)}>
                    {open ? 'Close' : 'Open'}
                </Button>
                {open && (
                    <label>
                        First name: <Input type="text" />
                    </label>
                )}
            </div>
        </FocusTrap>
    );
}
