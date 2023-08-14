import React from 'react';
import PropTypes from 'prop-types';
import type { Meta, StoryObj } from '@storybook/react';

import { twJoin, twMerge } from 'tailwind-merge';
import { Select, SelectProps } from './index';
import { useSelect, SelectProvider, UseSelectReturnValue, SelectValue } from '../useSelect';
import { SelectOption, useOption } from '../useOption';
import { Option, OptionProps } from '../Option';
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

export const Basics: Story = {
    render: () => (
        <div className="mx-auto max-w-xs w-80">
            <Select
                defaultValue={10}
                slotProps={{
                    root: {
                        className:
                            'bg-primary-600 dark:bg-primary-200 ring-primary-600 dark:ring-primary-400 focus:ring-primary-600 text-white dark:text-gray-900'
                    },
                    listbox: {
                        className: 'py-0 mt-4'
                    }
                }}
            >
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
    const [character, setCharacter] = React.useState<{ name: string; race: string } | undefined | null>(characters[0]);

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

export const Hooks = () => {
    interface CustomSelectProps extends SelectProps<string, false, 'button'> {
        options: CustomSelectOptionValue[];
        placeholder?: string;
    }

    type CustomSelectOptionValue = { label: string; value: string; disabled?: boolean };

    const options: CustomSelectOptionValue[] = [
        {
            label: 'Sauron',
            value: 'danger'
        },
        {
            label: 'Gimli',
            value: 'primary'
        }
    ];

    const CustomOption = <OptionValue extends string>(props: OptionProps<OptionValue>) => {
        const { children, value, className, disabled = false } = props;
        const { getRootProps, highlighted } = useOption({
            value,
            disabled,
            label: children
        });

        return (
            <li
                {...getRootProps()}
                className={twMerge(
                    className,
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    'text-gray-900 dark:text-gray-100',
                    value === 'primary' && 'text-primary-600',
                    value === 'danger' && 'text-danger-500',
                    highlighted && 'bg-gray-200 dark:bg-gray-800'
                )}
            >
                {children}
            </li>
        );
    };

    const CustomSelect = <OptionValue extends string, Multiple extends boolean>({
        options,
        placeholder
    }: CustomSelectProps) => {
        const listboxRef = React.useRef<HTMLElement | null>(null);
        const [listboxVisible, setListboxVisible] = React.useState(false);

        const { getButtonProps, getListboxProps, contextValue, value }: UseSelectReturnValue<OptionValue, Multiple> =
            useSelect({
                listboxRef,
                onOpenChange: setListboxVisible,
                open: listboxVisible
            });

        const renderSelectedValue = (value: OptionValue, options: CustomSelectOptionValue[]) => {
            const selectedOption = options.find((option) => option.value === value);
            return selectedOption ? `${selectedOption.label} (${value})` : null;
        };

        React.useEffect(() => {
            if (listboxVisible) {
                listboxRef.current?.focus();
            }
        }, [listboxVisible]);

        return (
            <div className="relative">
                <button
                    {...getButtonProps()}
                    className={twMerge(
                        'block max-w-xs w-full h-8 cursor-default rounded-md px-2.5 py-1.5 text-sm text-left shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 ring-gray-300 dark:ring-gray-600 focus:ring-primary-600 text-ellipsis overflow-hidden whitespace-nowrap',
                        value === 'primary' && 'bg-primary-600 dark:bg-primary-600 text-gray-100',
                        value === 'danger' && 'bg-danger-500 dark:bg-danger-600 text-gray-100'
                    )}
                >
                    {renderSelectedValue(value as OptionValue, options) || (
                        <span className="placeholder">{placeholder ?? ' '}</span>
                    )}
                </button>
                <ul
                    {...getListboxProps()}
                    aria-hidden={!listboxVisible}
                    className={twJoin(
                        listboxVisible ? '' : 'hidden',
                        'absolute block max-w-xs w-full mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm bg-white dark:bg-gray-900 ring-gray-300 dark:ring-gray-600'
                    )}
                >
                    <SelectProvider value={contextValue}>
                        {options.map((option) => {
                            return (
                                <CustomOption key={option.value} value={option.value}>
                                    {option.label}
                                </CustomOption>
                            );
                        })}
                    </SelectProvider>
                </ul>
            </div>
        );
    };

    CustomOption.propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        value: PropTypes.string.isRequired
    };

    CustomSelect.propTypes = {
        options: PropTypes.arrayOf(
            PropTypes.shape({
                disabled: PropTypes.bool,
                label: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired
            })
        ).isRequired,
        placeholder: PropTypes.string
    };

    return (
        <div className="mx-auto max-w-xs w-80">
            <CustomSelect placeholder="Select a hero…" options={options} />
        </div>
    );
};

export const SelectedValueAppearance = () => {
    const renderValue = (option: SelectValue<SelectOption<string>, false>) => {
        if (option == null) {
            return <span>Select an option...</span>;
        }

        return (
            <span>
                {option.label} ({option.value})
            </span>
        );
    };

    return (
        <div className="mx-auto max-w-xs w-80">
            <Select renderValue={renderValue}>
                <Option value={10}>Ten</Option>
                <Option value={20}>Twenty</Option>
                <Option value={30}>Thirty</Option>
            </Select>
        </div>
    );
};

const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
        code: 'AE',
        label: 'United Arab Emirates',
        phone: '971'
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    {
        code: 'AG',
        label: 'Antigua and Barbuda',
        phone: '1-268'
    },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
    { code: 'AS', label: 'American Samoa', phone: '1-684' }
];

export const OptionAppearance = () => {
    const renderValue = (option: SelectValue<SelectOption<string>, false>) => {
        if (option == null) {
            return <span>Select an option...</span>;
        }

        const c = countries.find((c) => c.code === option.value);

        return (
            <div className="flex flex-row">
                <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${c!.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${c!.code.toLowerCase()}.png 2x`}
                    alt={`Flag of ${c!.label}`}
                    className="mr-2"
                />
                <span>{option.label}</span>
            </div>
        );
    };

    return (
        <div className="mx-auto max-w-xs w-80">
            <Select renderValue={renderValue}>
                {countries.map((c) => (
                    <Option key={c.code} value={c.code} label={c.label} className="flex flex-row">
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png 2x`}
                            alt={`Flag of ${c.label}`}
                            className="mr-2"
                        />
                        {c.label} ({c.code}) +{c.phone}
                    </Option>
                ))}
            </Select>
        </div>
    );
};
