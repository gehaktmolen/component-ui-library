import * as React from 'react';
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
export const Primary: Story = {
    render: (args) => (
        <div className="flex max-w-xs w-80">
            <Slider {...args} />
        </div>
    )
};

function valueText(value: number): string {
    return `${value}°C`;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function SliderValueLabel({ children, className }) {
    return <span className={className}>{children}</span>;
}

export const Basics: Story = {
    render: () => (
        <div className="flex flex-col max-w-xs w-80">
            <Slider defaultValue={50} />
            <Slider defaultValue={10} disabled />
        </div>
    )
};

export const Vertical: Story = {
    render: () => (
        <div className="flex max-w-xs h-80">
            <Slider orientation="vertical" defaultValue={30} />
        </div>
    )
};

export const ValueLabel: Story = {
    render: () => (
        <div className="flex max-w-xs w-80">
            <Slider defaultValue={10} slots={{ valueLabel: SliderValueLabel }} />
        </div>
    )
};

export const Discrete: Story = {
    render: () => (
        <div className="flex max-w-xs w-80">
            <Slider
                aria-label="Temperature"
                defaultValue={30}
                getAriaValueText={valueText}
                step={10}
                marks
                min={10}
                max={110}
            />
        </div>
    )
};

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

export const CustomMarks: Story = {
    args: {
        marks,
        'aria-label': 'Temperature',
        getAriaValueText: valueText,
        defaultValue: 37,
    },
    render: (args) => (
        <div className="flex max-w-xs w-80">
            <Slider {...args} />
        </div>
    )
};

export const CustomMarksRestricted: Story = {
    args: {
        ...CustomMarks.args,
        step: null,
    },
    render: (args) => (
        <div className="flex max-w-xs w-80">
            <Slider {...args} />
        </div>
    )
};

export const RangeSlider = () => {
    const [value, setValue] = React.useState<number | number[]>([20, 37]);

    const handleChange = (_event: Event, newValue: number | number[]) => {
        setValue(newValue);
    };

    return (
        <div className="flex flex-col max-w-xs w-80">
            {/* controlled: */}
            <Slider
                value={value}
                onChange={handleChange}
                getAriaLabel={() => 'Temperature range'}
                getAriaValueText={valueText}
                min={0}
                max={100}
            />
            {/* uncontrolled: */}
            <Slider
                defaultValue={[20, 37]}
                getAriaLabel={() => 'Temperature range'}
                getAriaValueText={valueText}
                min={0}
                max={100}
            />
        </div>
    );
}
