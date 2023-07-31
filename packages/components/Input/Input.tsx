import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent, isHostComponent } from '../utils';
import { InputSlotProps, InputOwnerState, InputProps, InputRootSlotProps, InputTypeMap } from './Input.types';
import { useInput } from '../useInput';
import { EventHandlers, useSlotProps, useColorInversion, WithOptionalOwnerState } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import composeClasses from '../composeClasses';
import generateUtilityClass from '../generateUtilityClass';

const useUtilityClasses = (ownerState: InputOwnerState) => {
    const {
        // color,
        disabled,
        error,
        focused,
        formControlContext,
        block,
        multiline,
        startAddOn,
        startDecorator,
        endAddOn,
        endDecorator
        // size,
        // variant
    } = ownerState;

    const slots = {
        root: [
            'mt-2',
            block && 'w-full',
            disabled && 'disabled',
            error && '',
            focused && '',
            Boolean(formControlContext) && '',
            multiline && '',
            (Boolean(startDecorator) || Boolean(endDecorator)) && 'relative rounded-md shadow-sm',
            (Boolean(startAddOn) || Boolean(endAddOn)) && 'flex rounded-md shadow-sm'
        ],
        input: [
            'block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
            !error && !disabled && 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-primary-500',
            error && 'text-danger-900 ring-danger-300 placeholder:text-danger-300 focus:ring-danger-500',
            disabled &&
                'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-primary-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:ring-gray-200',
            Boolean(startDecorator) && 'pl-10',
            Boolean(endDecorator) && 'pr-10',
            Boolean(startAddOn) && 'min-w-0 flex-1 rounded-none rounded-r-md',
            Boolean(endAddOn) && 'min-w-0 flex-1 rounded-none rounded-l-md'
        ],
        startAddOn: [
            'inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 bg-gray-200 sm:text-sm'
        ],
        startDecorator: ['pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'],
        endAddOn: [
            'inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 bg-gray-200 sm:text-sm'
        ],
        endDecorator: ['pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3']
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
        color: colorProp = 'primary',
        defaultValue,
        disabled,
        endDecorator: endDecoratorProp,
        endAddOn: endAddOnProp,
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
        startAddOn: startAddOnProp,
        startDecorator: startDecoratorProp,
        value,
        variant = 'solid',
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
            'aria-invalid': errorState,
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

    const startAddOn = startAddOnProp && <div className={classes.startAddOn}>{startAddOnProp}</div>;
    const startDecorator = startDecoratorProp && <div className={classes.startDecorator}>{startDecoratorProp}</div>;
    const endAddOn = endAddOnProp && <div className={classes.endAddOn}>{endAddOnProp}</div>;
    const endDecorator = endDecoratorProp && <div className={classes.endDecorator}>{endDecoratorProp}</div>;

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
            {startAddOn}
            {startDecorator}
            <InputComponent {...inputProps} />
            {endDecorator}
            {endAddOn}
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
     * @default 'primary'
     */
    // color: PropTypes.oneOfType([PropTypes.oneOf(['neutral', 'primary']), PropTypes.string]),
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
     * Trailing add on for this input.
     */
    endAddOn: PropTypes.node,
    /**
     * Trailing adornment for this input.
     */
    endDecorator: PropTypes.node,
    /**
     * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input.
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
    // size: PropTypes.oneOfType([PropTypes.oneOf(['sm', 'md', 'lg']), PropTypes.string]),
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
     * Leading add on for this input.
     */
    startAddOn: PropTypes.node,
    /**
     * Leading adornment for this input.
     */
    startDecorator: PropTypes.node,
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
    value: PropTypes.any
    /**
     * The variant to use.
     * @default 'solid'
     */
    // variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    //     PropTypes.oneOf(['soft', 'solid']),
    //     PropTypes.string
    // ])
} as any;
