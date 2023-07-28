import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';
import { Button } from '../Button';
import { FormHelperText } from '../FormHelperText';
import { FormControl } from '../FormControl';
import { FormLabel } from '../FormLabel';

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

// export const Variants: Story = {
//     render: () => (
//         <div className="py-2 flex flex-col items-center flex-wrap gap-2">
//             <Input placeholder="Type in here…" variant="solid" />
//             <Input placeholder="Type in here…" variant="soft" />
//         </div>
//     )
// };

// export const Sizes: Story = {
//     render: () => (
//         <div className="py-2 flex flex-col items-center flex-wrap gap-2">
//             <Input size="sm" placeholder="Small" />
//             <Input size="md" placeholder="Medium" />
//             <Input size="lg" placeholder="Large" />
//         </div>
//     )
// };

// export const Colors: Story = {
//     render: () => (
//         <div className="py-2 flex flex-col items-center flex-wrap gap-2">
//             <Input placeholder="Type in here…" color="primary" />
//             <Input placeholder="Type in here…" color="neutral" />
//             <Input placeholder="Type in here…" color="danger" />
//         </div>
//     )
// };

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

export const Disabled: Story = {
    render: () => (
        <FormControl disabled={true}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="you@example.com" />
        </FormControl>
    )
};

export const Error: Story = {
    render: () => (
        <FormControl error={true} required={true}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="you@example.com" defaultValue="Oh no, error found!" />
            <FormHelperText>Not a valid email address.</FormHelperText>
        </FormControl>
    )
};

export const StartDecorator: Story = {
    render: () => (
        <Input
            type="email"
            placeholder="you@example.com"
            startDecorator={
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                </svg>
            }
        />
    )
};

export const EndDecorator: Story = {
    render: () => (
        <Input
            type="text"
            placeholder="000-00-0000"
            endDecorator={
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                    />
                </svg>
            }
        />
    )
};

export const StartAddOn: Story = {
    render: () => <Input type="email" placeholder="you@example.com" startAddOn="http://" />
};

export const EndAddOn: Story = {
    render: () => (
        <Input
            type="text"
            placeholder="You"
            startDecorator={
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                </svg>
            }
            endAddOn="example.com"
        />
    )
};
