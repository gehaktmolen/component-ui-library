import * as React from 'react';
import type {
    Meta
    // StoryObj
} from '@storybook/react';

import { Portal } from './Portal';
import { Button } from '../Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Utils/Portal',
    component: Portal,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof Portal>;

export default meta;
// type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const Primary: Story = {
//     args: {
//         // open: false
//     },
//     render: (args) => <Portal {...args} />
// };

export function Basics() {
    const [show, setShow] = React.useState(false);
    const container = React.useRef(null);

    const handleClick = () => {
        setShow(!show);
    };

    return (
        <div className="flex flex-col gap-2">
            <Button color="neutral" onClick={handleClick}>
                {show ? 'Unmount children' : 'Mount children'}
            </Button>
            <div className="px-4 py-2 bg-primary-600 text-white text-sm rounded-md">
                It looks like I will render here.
                {show ? (
                    <Portal container={container.current}>
                        <span>But I actually render here!</span>
                    </Portal>
                ) : null}
            </div>
            <div className="px-4 py-2 text-primary-600 text-sm rounded-md" ref={container} />
        </div>
    );
}
