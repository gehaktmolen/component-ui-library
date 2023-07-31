import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';
import { Option } from '../Option';
import { OptionGroup } from '../OptionGroup';
import { FormControl } from '../FormControl';
import { FormLabel } from '../FormLabel';
import { Button } from '../Button';

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

export const Controlled = () => {
    const [value, setValue] = React.useState<number | null>(10);

    return (
        <div className="mx-auto max-w-xs w-80">
            <Select value={value} onChange={(_, newValue) => setValue(newValue)}>
                <Option value={10}>Documentation</Option>
                <Option value={20}>Components</Option>
                <Option value={30}>Features</Option>
            </Select>
            <p className="mt-4 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                Selected value: {value}
            </p>
        </div>
    );
};

const characters = [
    { name: 'Frodo', race: 'Hobbit' },
    { name: 'Sam', race: 'Hobbit' },
    { name: 'Merry', race: 'Hobbit' },
    { name: 'Gandalf', race: 'Maia' },
    { name: 'Gimli', race: 'Dwarf' }
];
export const UsingObjectValues = () => {
    const [character, setCharacter] = React.useState<{ name: string; race: string } | null>(characters[0]);

    return (
        <div className="mx-auto max-w-xs w-80">
            <Select value={character} onChange={(_, newValue) => setCharacter(newValue)}>
                {characters.map((c) => (
                    <Option key={c.name} value={c}>
                        {c.name}
                    </Option>
                ))}
            </Select>
            <p className="mt-4 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">Selected character:</p>
            <pre className="text-xs leading-6 text-gray-900 dark:text-gray-200">
                {JSON.stringify(character, null, 2)}
            </pre>
        </div>
    );
};

// Todo: Resolve typescript errors for UsingObjectValuesForm Story.
export const UsingObjectValuesForm = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const getSerializedValue = (option) => {
        if (option?.value == null) {
            return '';
        }

        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `${option.value.race}.${option.value.name}`;
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleSubmit = (event) => {
        event.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const formData = new FormData(event.currentTarget);
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        alert(`character=${formData.get('character')}`);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex items-end max-w-xs w-80">
                <FormControl>
                    <FormLabel id="object-value-default-label" htmlFor="object-value-default-button">
                        Default behavior
                    </FormLabel>
                    <Select
                        name="character"
                        id="object-value-default-button"
                        aria-labelledby="object-value-default-label object-value-default-button"
                    >
                        {characters.map((character) => (
                            <Option key={character.name} value={character}>
                                {character.name}
                            </Option>
                        ))}
                    </Select>
                </FormControl>
                <Button className="ml-1" type="submit">
                    Submit
                </Button>
            </form>
            <form onSubmit={handleSubmit} className="flex items-end max-w-xs w-80 mt-2">
                <FormControl>
                    <FormLabel id="object-value-serialize-label" htmlFor="object-value-serialize-button">
                        Custom getSerializedValue
                    </FormLabel>
                    <Select
                        getSerializedValue={getSerializedValue}
                        name="character"
                        id="object-value-serialize-button"
                        aria-labelledby="object-value-serialize-label object-value-serialize-button"
                    >
                        {characters.map((character) => (
                            <Option key={character.name} value={character}>
                                {character.name}
                            </Option>
                        ))}
                    </Select>
                </FormControl>
                <Button className="ml-1" type="submit">
                    Submit
                </Button>
            </form>
        </>
    );
};

export const Grouping: Story = {
    render: () => (
        <div className="mx-auto max-w-xs w-80">
            <Select>
                <OptionGroup label="Hobbits">
                    <Option value="Frodo">Frodo</Option>
                    <Option value="Sam">Sam</Option>
                    <Option value="Merry">Merry</Option>
                    <Option value="Pippin">Pippin</Option>
                </OptionGroup>
                <OptionGroup label="Elves">
                    <Option value="Galadriel">Galadriel</Option>
                    <Option value="Legolas">Legolas</Option>
                </OptionGroup>
            </Select>
        </div>
    )
};

export const Custom: Story = {
    render: (args) => (
        <div className="mx-auto max-w-xs w-80">
            <Select
                defaultValue={10}
                slotProps={{
                    root: {
                        className:
                            'bg-primary-500 dark:bg-primary-200 ring-primary-600 dark:ring-primary-400 focus:ring-primary-500 text-white dark:text-gray-900'
                    },
                    listbox: {
                        className: 'py-0 mt-4'
                    }
                }}
                {...args}
            >
                <Option value={10}>Documentation</Option>
                <Option value={20}>Components</Option>
                <Option value={30}>Features</Option>
            </Select>
        </div>
    )
};

export const FormSubmission: Story = {
    render: () => (
        <>
            <FormControl className="mx-auto max-w-xs w-80">
                <FormLabel htmlFor="unnamed-select">Default</FormLabel>
                <Select defaultValue={10} id="unnamed-select">
                    <Option value={10}>Ten</Option>
                    <Option value={20}>Twenty</Option>
                    <Option value={30}>Thirty</Option>
                </Select>
            </FormControl>
            <FormControl className="mt-4 mx-auto max-w-xs w-80">
                <FormLabel htmlFor="named-select">
                    With the <code>name</code> prop
                </FormLabel>
                <Select defaultValue={10} id="named-select" name="demo-select">
                    <Option value={10}>Ten</Option>
                    <Option value={20}>Twenty</Option>
                    <Option value={30}>Thirty</Option>
                </Select>
            </FormControl>
        </>
    )
};

export const MultiSelect: Story = {
    render: () => (
        <div className="mx-auto max-w-xs w-80">
            <Select multiple defaultValue={[10, 20]}>
                <Option value={10}>Ten</Option>
                <Option value={20}>Twenty</Option>
                <Option value={30}>Thirty</Option>
                <Option value={40}>Forty</Option>
                <Option value={50}>Fifty</Option>
            </Select>
        </div>
    )
};

export const Hooks: Story = {
    render: () => <div className="mx-auto max-w-xs w-80">WIP</div>
};

export const SelectedValueAppearance: Story = {
    render: () => <div className="mx-auto max-w-xs w-80">WIP</div>
};

export const OptionAppearance: Story = {
    render: () => <div className="mx-auto max-w-xs w-80">WIP</div>
};
