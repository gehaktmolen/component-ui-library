import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent } from '../utils';
import isHostComponent from '../utils/isHostComponent';
import { InputSlotProps, InputOwnerState, InputProps, InputRootSlotProps, InputTypeMap } from './Input.types';
import { useInput } from '../useInput';
import { EventHandlers, useSlotProps, useColorInversion, WithOptionalOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import generateUtilityClass from '../generateUtilityClass';

const INPUT_SOLID = Object.freeze({
    primary: 'bg-primary-500 dark:bg-primary-100',
    neutral: 'bg-white dark:bg-slate-800',
    danger: 'bg-danger-500 dark:bg-danger-100',
    info: 'bg-info-500 dark:bg-info-100',
    success: 'bg-success-500 dark:bg-success-100',
    warning: 'bg-warning-500 dark:bg-warning-100'
} as const);

const INPUT_OUTLINED = Object.freeze({
    primary: 'bg-primary-500 dark:bg-primary-100 text-primary-500 dark:text-amber-500',
    neutral: 'bg-white dark:bg-slate-800',
    danger: 'bg-danger-500 dark:bg-danger-100 text-danger-500 dark:text-amber-500',
    info: 'bg-info-500 dark:bg-info-100 text-info-500 dark:text-amber-500',
    success: 'bg-success-500 dark:bg-success-100 text-success-500 dark:text-amber-500',
    warning: 'bg-warning-500 dark:bg-warning-100 text-warning-500 dark:text-amber-500'
} as const);

const useUtilityClasses = (ownerState: InputOwnerState) => {
    const {
        color,
        disabled,
        error,
        focused,
        formControlContext,
        block,
        multiline,
        startAdornment,
        endAdornment,
        // size,
        variant
    } = ownerState;

    let classes = '';

    if (disabled) {
        classes += ' text-gray-50 dark:text-gray-50 bg-gray-400 dark:bg-gray-500';
    }

    if (startAdornment) {
        classes += ' text-gray-50 dark:text-gray-50 bg-gray-400 dark:bg-gray-500';
    }

    if (endAdornment) {
        classes += ' text-gray-50 dark:text-gray-50 bg-gray-400 dark:bg-gray-500';
    }

    switch (variant) {
        case 'solid':
            classes += ' ';

            if (color && !disabled) {
                classes += ` ${INPUT_SOLID[color]}`;
            }

            // if (size === 'sm') {
            //     classes += ' py-[4px] px-[10px] text-sm';
            // } else if (size === 'lg') {
            //     classes += ' py-[8px] px-[20px] text-lg';
            // }

            break;
        case 'outlined':
            classes += ' py-[5px] px-[15px] border border-current hover:bg-opacity-10';

            if (color && !disabled) {
                classes += ` ${INPUT_OUTLINED[color]} bg-opacity-0 dark:bg-opacity-0`;
            }

            // if (size === 'sm') {
            //     classes += ' py-[3px] px-[9px] text-sm';
            // } else if (size === 'lg') {
            //     classes += ' py-[7px] px-[21px] text-lg';
            // }

            break;
        case 'plain':
            classes += ' bg-transparent';

            if (color && !disabled) {
                classes += ` ${INPUT_SOLID[color]}`;
            }

            // if (size === 'sm') {
            //     classes += ' py-[4px] px-[5px] text-sm';
            // } else if (size === 'lg') {
            //     classes += ' py-[8px] px-[11px] text-lg';
            // }

            break;
    }

    const slots = {
        root: [
            'ps-2 pe-2 min-w-0 min-h-[2.5rem] relative flex rounded',
            'before:m-[1px] before:shadow-inner before:content-[""] before:block before:absolute before:pointer-events-none before:rounded before:inset-0',
            classes,
            disabled && 'disabled',
            error && 'error',
            focused && 'focused',
            Boolean(formControlContext) && 'controlled',
            block && 'w-full',
            multiline && 'multiline',
            Boolean(startAdornment) && 'adornedStart',
            Boolean(endAdornment) && 'adornedEnd'
        ],
        input: [
            'p-0 min-w-0 flex-1 text-inherit placeholder-[inherit] bg-transparent outline-0',
            disabled && 'disabled',
            multiline && 'multiline',
            focused && 'focused'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

/**
 *
 * API:
 *
 * - [Input API](https://#input)
 */
export const Input = React.forwardRef(function Input<RootComponentType extends React.ElementType>(
    props: InputProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const {
        'aria-describedby': ariaDescribedby,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        autoComplete,
        autoFocus,
        className,
        color: colorProp = 'neutral',
        defaultValue,
        disabled,
        endAdornment,
        error,
        block = false,
        id,
        multiline = false,
        name,
        onClick,
        onChange,
        onKeyDown,
        onKeyUp,
        onFocus,
        onBlur,
        placeholder,
        readOnly,
        required,
        size: sizeProp = 'md',
        startAdornment,
        value,
        variant = 'outlined',
        type: typeProp,
        rows,
        slotProps = {},
        slots = {},
        minRows,
        maxRows,
        ...other
    } = props;

    const {
        getRootProps,
        getInputProps,
        focused,
        formControlContext,
        error: errorState,
        disabled: disabledState
    } = useInput({
        disabled,
        defaultValue,
        error,
        onBlur,
        onClick,
        onChange,
        onFocus,
        required,
        value
    });

    const type = !multiline ? typeProp ?? 'text' : undefined;
    const size = props.size ?? sizeProp;
    const { getColor } = useColorInversion(variant);
    const color = getColor(props.color, error ? 'danger' : colorProp);

    const ownerState: InputOwnerState = {
        ...props,
        color,
        disabled: disabledState,
        error: errorState,
        focused,
        formControlContext,
        block,
        multiline,
        size,
        type,
        variant
    };

    const classes = useUtilityClasses(ownerState);

    const propsToForward = {
        'aria-describedby': ariaDescribedby,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        autoComplete,
        autoFocus,
        id,
        onKeyDown,
        onKeyUp,
        name,
        placeholder,
        readOnly,
        type
    };

    const Root = slots.root ?? 'div';
    const rootProps: WithOptionalOwnerState<InputRootSlotProps> = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef
        },
        ownerState,
        className: [classes.root, className]
    });
    const InputComponent = multiline ? slots.textarea ?? 'textarea' : slots.input ?? 'input';
    const inputProps: WithOptionalOwnerState<InputSlotProps> = useSlotProps({
        elementType: InputComponent,
        getSlotProps: (otherHandlers: EventHandlers) => {
            return getInputProps({
                ...propsToForward,
                ...otherHandlers
            });
        },
        externalSlotProps: slotProps.input,
        additionalProps: {
            id: formControlContext?.htmlFor,
            'aria-describedby': formControlContext?.['aria-describedby'] ?? ariaDescribedby,
            rows: multiline ? rows : undefined,
            ...(multiline &&
                !isHostComponent(InputComponent) && {
                    minRows: rows || minRows,
                    maxRows: rows || maxRows
                })
        },
        ownerState,
        className: classes.input
    });

    if (process.env.NODE_ENV !== 'production') {
        if (multiline) {
            if (rows) {
                if (minRows || maxRows) {
                    console.warn(
                        'Azrn: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.'
                    );
                }
            }
        }
    }

    return (
        <Root {...rootProps}>
            {startAdornment}
            <InputComponent {...inputProps} />
            {endAdornment}
        </Root>
    );
}) as PolymorphicComponent<InputTypeMap>;

Input.propTypes = {
    /**
     * @ignore
     */
    'aria-describedby': PropTypes.string,
    /**
     * @ignore
     */
    'aria-label': PropTypes.string,
    /**
     * @ignore
     */
    'aria-labelledby': PropTypes.string,
    /**
     * This prop helps users to fill forms faster, especially on mobile devices.
     * The name can be confusing, as it's more like an autofill.
     * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
     */
    autoComplete: PropTypes.string,
    /**
     * If `true`, the `input` element is focused during the first mount.
     */
    autoFocus: PropTypes.bool,
    /**
     * If `true`, the button will take up the full width of its container.
     * @default false
     */
    block: PropTypes.bool,
    /**
     * Class name applied to the root element.
     */
    className: PropTypes.string,
    /**
     * The color of the component.
     * @default 'neutral'
     */
    color: PropTypes.oneOfType([
        PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
        PropTypes.string
    ]),
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue: PropTypes.any,
    /**
     * If `true`, the component is disabled.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    disabled: PropTypes.bool,
    /**
     * Trailing adornment for this input.
     */
    endAdornment: PropTypes.node,
    /**
     * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `Mui-error` class on the root element.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    error: PropTypes.bool,
    /**
     * The id of the `input` element.
     */
    id: PropTypes.string,
    /**
     * @ignore
     */
    inputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.object
        })
    ]),
    /**
     * Maximum number of rows to display when multiline option is set to true.
     */
    maxRows: PropTypes.number,
    /**
     * Minimum number of rows to display when multiline option is set to true.
     */
    minRows: PropTypes.number,
    /**
     * If `true`, a `textarea` element is rendered.
     * @default false
     */
    multiline: PropTypes.bool,
    /**
     * Name attribute of the `input` element.
     */
    name: PropTypes.string,
    /**
     * @ignore
     */
    onBlur: PropTypes.func,
    /**
     * @ignore
     */
    onChange: PropTypes.func,
    /**
     * @ignore
     */
    onClick: PropTypes.func,
    /**
     * @ignore
     */
    onFocus: PropTypes.func,
    /**
     * @ignore
     */
    onKeyDown: PropTypes.func,
    /**
     * @ignore
     */
    onKeyUp: PropTypes.func,
    /**
     * The short hint displayed in the `input` before the user enters a value.
     */
    placeholder: PropTypes.string,
    /**
     * It prevents the user from changing the value of the field
     * (not from interacting with the field).
     */
    readOnly: PropTypes.bool,
    /**
     * If `true`, the `input` element is required.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    required: PropTypes.bool,
    /**
     * Number of rows to display when multiline option is set to true.
     */
    rows: PropTypes.number,
    /**
     * The size of the component.
     * @default 'md'
     */
    size: PropTypes.oneOfType([PropTypes.oneOf(['sm', 'md', 'lg']), PropTypes.string]),
    /**
     * The props used for each slot inside the Input.
     * @default {}
     */
    slotProps: PropTypes.shape({
        input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the InputBase.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        input: PropTypes.elementType,
        root: PropTypes.elementType,
        textarea: PropTypes.elementType
    }),
    /**
     * Leading adornment for this input.
     */
    startAdornment: PropTypes.node,
    /**
     * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
     * @default 'text'
     */
    type: PropTypes.oneOf([
        'button',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'time',
        'url',
        'week'
    ]),
    /**
     * The value of the `input` element, required for a controlled component.
     */
    value: PropTypes.any,
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
        PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
        PropTypes.string
    ])
} as any;
