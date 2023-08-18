import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export function SlideOver() {
    const [open, setOpen] = useState(true);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                    Panel title
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative rounded-md bg-gray-100 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-2.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            {/* Your content */}
                                            <div className="absolute inset-0 px-4 sm:px-6">
                                                <div className="relative h-full overflow-hidden rounded-xl border border-dashed border-gray-400 opacity-75">
                                                    <svg
                                                        className="absolute inset-0 h-full w-full stroke-gray-900/10"
                                                        fill="none"
                                                    >
                                                        <defs>
                                                            <pattern
                                                                id="pattern-431c35a6-d6ff-4ec0-a97f-8a526737d5ad"
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
                                                            fill="url(#pattern-431c35a6-d6ff-4ec0-a97f-8a526737d5ad)"
                                                            width="100%"
                                                            height="100%"
                                                        ></rect>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
