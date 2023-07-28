import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';
import { Button } from '../Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Inputs/Input',
    component: Input,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    args: {}
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    render: (args) => <Input placeholder="Type in here…" {...args} />
};

export const Variants: Story = {
    render: () => (
        <div className="py-2 flex flex-col items-center flex-wrap gap-2">
            <Input placeholder="Type in here…" variant="solid" />
            <Input placeholder="Type in here…" variant="soft" />
            <Input placeholder="Type in here…" variant="outlined" />
            <Input placeholder="Type in here…" variant="plain" />
        </div>
    )
};

export const Sizes: Story = {
    render: () => (
        <div className="py-2 flex flex-col items-center flex-wrap gap-2">
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium" />
            <Input size="lg" placeholder="Large" />
        </div>
    )
};

export const Colors: Story = {
    render: () => (
        <div className="py-2 flex flex-col items-center flex-wrap gap-2">
            <Input placeholder="Type in here…" color="primary" />
            <Input placeholder="Type in here…" color="neutral" />
            <Input placeholder="Type in here…" color="danger" />
            <Input placeholder="Type in here…" color="info" />
            <Input placeholder="Type in here…" color="success" />
            <Input placeholder="Type in here…" color="warning" />
        </div>
    )
};

export const FormProps: Story = {
    render: () => (
        <div className="py-2 flex flex-col items-center flex-wrap gap-2">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                }}
            >
                <Input
                    placeholder="Try to submit with no text!"
                    required
                    slotProps={{
                        root: () => ({
                            className: 'mb-2'
                        })
                    }}
                />
                <Input
                    placeholder="It is disabled"
                    disabled
                    slotProps={{
                        root: () => ({
                            className: 'mb-2'
                        })
                    }}
                />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
};

export const Error: Story = {
    render: () => <Input placeholder="Type in here…" error defaultValue="Oh no, error found!" />
};
