import * as React from 'react';
import type {
    Meta
    // StoryObj
} from '@storybook/react';

import { Modal } from './';
import { Button } from '../Button';
import { Fade } from '../Fade';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Feedback/Modal',
    component: Modal,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof Modal>;

export default meta;
// type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const Primary: Story = {
//     args: {
//         open: false,
//     },
//     render: (args) => <Modal {...args}><div></div></Modal>
// };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Primary = (args) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                {...args}
            >
                <Fade in={open}>
                    <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-danger-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg
                                        className="h-6 w-6 text-danger-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3
                                        className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                                        id="modal-title"
                                    >
                                        Deactivate account
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Are you sure you want to deactivate your account? All of your data will be
                                            permanently removed. This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-950 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <Button onClick={handleClose} color="danger" className="inline-flex sm:ml-3 sm:w-auto">
                                Deactivate
                            </Button>
                            <Button
                                onClick={handleClose}
                                color="neutral"
                                className="mt-3 inline-flex sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    );
};
