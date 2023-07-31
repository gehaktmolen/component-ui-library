// import useState from 'storybook-addon-state';

import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';
import { Option } from '../Option';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Inputs/Select',
    component: Select,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    render: (args) => (
        <div className="mx-auto max-w-xs w-80">
            <Select defaultValue={10} {...args}>
                <Option value={10}>Documentation</Option>
                <Option value={20}>Components</Option>
                <Option value={30}>Features</Option>
            </Select>
        </div>
    )
};

// export const Controlled = () => {
//     const [value, setValue] = useState('select-controlled', 10);
//
//     return (
//         <div className="mx-auto max-w-xs w-80">
//             <Select value={value} onChange={(_, newValue) => setValue(newValue)}>
//                 <Option value={10}>Documentation</Option>
//                 <Option value={20}>Components</Option>
//                 <Option value={30}>Features</Option>
//             </Select>
//             <p className="mt-4">Selected value: {value}</p>
//         </div>
//     );
// };
