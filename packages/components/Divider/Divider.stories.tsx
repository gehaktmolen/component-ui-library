import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './Divider';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Data Display/WIP/Divider',
    component: Divider,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        children: <span>Continue</span>
    },
    render: (args) => (
        <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="relative h-[150px] overflow-hidden rounded-xl border border-dashed border-gray-400 opacity-75">
                    <svg className="absolute inset-0 h-full w-full stroke-gray-900/10" fill="none">
                        <defs>
                            <pattern
                                id="pattern-1526ac66-f54a-4681-8fb8-0859d412f251"
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
                            fill="url(#pattern-1526ac66-f54a-4681-8fb8-0859d412f251)"
                            width="100%"
                            height="100%"
                        ></rect>
                    </svg>
                </div>
                <Divider {...args} />
                <div className="relative h-[150px] overflow-hidden rounded-xl border border-dashed border-gray-400 opacity-75">
                    <svg className="absolute inset-0 h-full w-full stroke-gray-900/10" fill="none">
                        <defs>
                            <pattern
                                id="pattern-1526ac66-f54a-4681-8fb8-0859d412f251"
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
                            fill="url(#pattern-1526ac66-f54a-4681-8fb8-0859d412f251)"
                            width="100%"
                            height="100%"
                        ></rect>
                    </svg>
                </div>
            </div>
        </main>
    )
};
