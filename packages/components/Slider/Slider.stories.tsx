import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './Slider';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Inputs/Slider',
    component: Slider,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const Primary: Story = {
//     render: (args) => <Slider {...args} />
// };

const marks = [
    {
        value: 0,
        label: '0°C'
    },
    {
        value: 20,
        label: '20°C'
    },
    {
        value: 37,
        label: '37°C'
    },
    {
        value: 100,
        label: '100°C'
    }
];

function valueText(value: number): string {
    return `${value}°C`;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function SliderValueLabel({ children, className }) {
    return <span className={className}>{children}</span>;
}

export const Primary: Story = {
    args: {
        marks,
        'aria-label': 'Temperature',
        getAriaValueText: valueText,
        min: 0,
        max: 100,
        step: null,
        defaultValue: 37,
        slots: { valueLabel: SliderValueLabel }
    },
    render: (args) => (
        <div className="flex items-center justify-center mx-auto max-w-xs w-80 h-80">
            <Slider {...args} />
        </div>
    )
};
