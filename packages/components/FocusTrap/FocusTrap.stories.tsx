// import * as React from 'react';
// import PropTypes from 'prop-types';
import type { Meta, StoryObj } from '@storybook/react';

import { FocusTrap } from './FocusTrap';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Utils/FocusTrap',
    component: FocusTrap,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof FocusTrap>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        open: false
    },
    render: (args) => (
        <FocusTrap {...args}>
            <div>Hello</div>
        </FocusTrap>
    )
};
