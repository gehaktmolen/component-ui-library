import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { FormControl, useFormControlContext } from './';
import { Input } from '../Input';
import clsx from 'clsx';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Utils/FormControl',
    component: FormControl,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    args: {}
} satisfies Meta<typeof FormControl>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {},
    render: (args) => (
        <FormControl defaultValue="" required {...args}>
            <Label>Name</Label>
            <Input
                placeholder="Write your name here"
                slotProps={{
                    input: {
                        className:
                            'w-80 text-sm font-normal leading-normal text-slate-900 dark:text-slate-300 bg-white dark:bg-slate-800 border border-solid border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg hover:bg-slate-100 hover:dark:bg-slate-900 hover:border-slate-400 hover:dark:border-slate-700 focus:outline-0 focus:shadow-outline-purple'
                    }
                }}
            />
            <HelperText />
        </FormControl>
    )
};

const Label = React.forwardRef<HTMLParagraphElement, { className?: string; children?: React.ReactNode }>(
    ({ className: classNameProp, children }, ref) => {
        const formControlContext = useFormControlContext();
        const [dirty, setDirty] = React.useState(false);

        React.useEffect(() => {
            if (formControlContext?.filled) {
                setDirty(true);
            }
        }, [formControlContext]);

        if (formControlContext === undefined) {
            return <p className={clsx('text-sm mb-1', classNameProp)}>{children}</p>;
        }

        const { error, required, filled } = formControlContext;
        const showRequiredError = dirty && required && !filled;

        return (
            <p
                ref={ref}
                className={clsx(
                    'text-sm mb-1',
                    classNameProp,
                    error || showRequiredError ? 'invalid text-red-500' : ''
                )}
            >
                {children}
                {required ? ' *' : ''}
            </p>
        );
    }
);

const HelperText = React.forwardRef<HTMLParagraphElement, { className?: string }>((props, ref) => {
    const { className, ...other } = props;
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
        if (formControlContext?.filled) {
            setDirty(true);
        }
    }, [formControlContext]);

    if (formControlContext === undefined) {
        return null;
    }

    const { required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return showRequiredError ? (
        <p ref={ref} className={clsx('text-sm', className)} {...other}>
            This field is required.
        </p>
    ) : null;
});
