import * as React from 'react';
import { Transition } from 'react-transition-group';
import { twJoin } from 'tailwind-merge';
import type {
    Meta
    // StoryObj
} from '@storybook/react';

import { Snackbar } from './Snackbar';
import { Button } from '../Button';
import { SnackbarCloseReason } from '../useSnackbar';
// import { Option } from "../Option";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Feedback/Snackbar',
    component: Snackbar,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
        docs: {
            story: {
                inline: false,
                iframeHeight: 250
            }
        }
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof Snackbar>;

export default meta;
// type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const Primary: Story = {
//     args: {
//     },
//     render: (args) => <Snackbar {...args} />
// };

export const Primary = () => {
    const [open, setOpen] = React.useState(false);
    const [exited, setExited] = React.useState(true);
    const nodeRef = React.useRef(null);

    const handleClose = (event?: React.SyntheticEvent<any> | Event | null, reason?: SnackbarCloseReason) => {
        // if (reason === 'clickaway' || reason === 'escapeKeyDown') {
        console.log('Closing the snackbar', reason, event);
        // return;
        // }

        setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleOnEnter = () => {
        setExited(false);
    };

    const handleOnExited = () => {
        setExited(true);
    };

    const positioningStyles = {
        entering: 'translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2',
        entered: 'translate-y-0 opacity-100 sm:translate-x-0',
        exiting: 'opacity-0',
        exited: 'opacity-0',
        unmounted: 'opacity-0'
    };

    return (
        <div className="flex items-center justify-center h-full">
            <Button onClick={handleClick}>Open snackbar</Button>
            <Snackbar autoHideDuration={null} open={open} onClose={handleClose} exited={exited}>
                <Transition
                    timeout={{ enter: 300, exit: 100 }}
                    in={open}
                    appear
                    unmountOnExit
                    onEnter={handleOnEnter}
                    onExited={handleOnExited}
                    nodeRef={nodeRef}
                >
                    {(status) => (
                        <div
                            ref={nodeRef}
                            className={twJoin(
                                positioningStyles[status],
                                open ? 'transform ease-out duration-300 transition' : 'ease-in duration-100 transition',
                                'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900 shadow-lg ring-1 ring-gray-900 dark:ring-gray-700 ring-opacity-5'
                            )}
                        >
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg
                                            className="h-6 w-6 text-primary-400 dark:text-primary-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Successfully saved!
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                            Anyone with a link can now view this file.
                                        </p>
                                    </div>
                                    <div className="ml-4 flex flex-shrink-0">
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="inline-flex rounded-md bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500 focus:ring-offset-2"
                                        >
                                            <span className="sr-only">Close</span>
                                            <svg
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Transition>
            </Snackbar>
        </div>
    );
};
