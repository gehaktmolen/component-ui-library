import * as React from 'react';
import PropTypes from 'prop-types';
import type {
    Meta
    // StoryObj
} from '@storybook/react';

import { Popper } from './Popper';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Utils/Popper',
    component: Popper,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof Popper>;

export default meta;
// type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const Primary: Story = {
//     args: {
//         open: false
//     },
//     render: (args) => <Popper {...args} />
// };

function Radio({
    value,
    ...props
}: {
    value: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    defaultChecked?: boolean;
}) {
    return (
        <span>
            <input
                type="radio"
                id={`placement-${value}-radio`}
                name="placement"
                value={value}
                style={{ margin: '0 0.375rem 0 1rem' }}
                {...props}
            />
            <label htmlFor={`placement-${value}-radio`}>{value}</label>
        </span>
    );
}

Radio.propTypes = {
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.number, PropTypes.string])
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function PlacementForm({ setPlacement }) {
    return (
        <div className="relative text-gray-900 dark:text-gray-100">
            <div className="text-center">
                <b>Placement value:</b>
            </div>
            <div className="text-center py-1 px-0">
                {['top-start', 'top', 'top-end'].map((value) => (
                    <Radio
                        key={value}
                        value={value}
                        onChange={({ target }: { target: HTMLInputElement }) => {
                            setPlacement(target.value);
                        }}
                    />
                ))}
            </div>
            <div className="flex justify-between py-1 px-0">
                <div>
                    {['left-start', 'left', 'left-end'].map((value) => (
                        <Radio
                            key={value}
                            value={value}
                            onChange={({ target }: { target: HTMLInputElement }) => {
                                setPlacement(target.value);
                            }}
                        />
                    ))}
                </div>
                <div>
                    {['right-start', 'right', 'right-end'].map((value) => (
                        <Radio
                            key={value}
                            value={value}
                            onChange={({ target }: { target: HTMLInputElement }) => {
                                setPlacement(target.value);
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="text-center py-1 px-0">
                {['bottom-start', 'bottom', 'bottom-end'].map((value) => (
                    <Radio
                        key={value}
                        value={value}
                        defaultChecked={value === 'bottom'}
                        onChange={({ target }: { target: HTMLInputElement }) => {
                            setPlacement(target.value);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

PlacementForm.propTypes = {
    setPlacement: PropTypes.func.isRequired
};

export function Primary() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLSpanElement | null>(null);
    const [placement, setPlacement] = React.useState(undefined);
    return (
        <div className="w-full">
            <PlacementForm setPlacement={setPlacement} />
            <div className="relative mt-10 py-20 px-0 text-center rounded-xl border border-dashed border-gray-400 opacity-75">
                <span
                    ref={(elm) => setAnchorEl(elm)}
                    aria-describedby="placement-popper"
                    className="inline-block py-1.5 px-4 bg-primary-600 text-gray-100 rounded-md"
                >
                    Anchor
                </span>
                <Popper id="placement-popper" open={Boolean(anchorEl)} anchorEl={anchorEl} placement={placement}>
                    <div className="rounded-md border-0 py-1.5 px-2.5 m-2 shadow-lg ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                        The content of the Popper.
                    </div>
                </Popper>
                <svg className="absolute inset-0 h-full w-full stroke-gray-900/10" fill="none">
                    <defs>
                        <pattern
                            id="pattern-87beeb02-b726-4cd1-be69-ae5bc27986e9"
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
                        fill="url(#pattern-87beeb02-b726-4cd1-be69-ae5bc27986e9)"
                        width="100%"
                        height="100%"
                    ></rect>
                </svg>
            </div>
        </div>
    );
}
