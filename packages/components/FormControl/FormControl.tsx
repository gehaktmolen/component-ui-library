import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useControlled as useControlled, unstable_useId as useId } from '../../utils';
import FormControlContext from './FormControlContext';
import {
    FormControlProps,
    NativeFormControlElement,
    FormControlTypeMap,
    FormControlOwnerState,
    FormControlRootSlotProps,
    FormControlState
} from './FormControl.types';
import { useSlotProps, WithOptionalOwnerState, PolymorphicComponent } from '../utils';
import composeClasses from '../composeClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import generateUtilityClass from '../generateUtilityClass';

function hasValue(value: unknown) {
    return value != null && !(Array.isArray(value) && value.length === 0) && value !== '';
}

function useUtilityClasses(ownerState: FormControlOwnerState) {
    const { disabled, error, filled, focused, orientation, required } = ownerState;

    const slots = {
        root: [
            `relative flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}`,
            disabled && 'disabled',
            focused && 'focused',
            error && 'error',
            filled && 'filled',
            required && 'required'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
}

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 * *   FormLabel
 * *   FormControlLabel
 * *   FormHelperText
 * *   Input
 *
 * You can find one composition example below.
 *
 * ```jsx
 * <FormControl>
 *   <FormLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️ Only one `Input` can be used within a FormControl because it creates visual inconsistencies.
 * For instance, only one input can be focused at the same time, the state shouldn't be shared.
 *
 * API:
 *
 * - [FormControl API](https://#form-control)
 */
export const FormControl = React.forwardRef(function FormControl<RootComponentType extends React.ElementType>(
    props: FormControlProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const {
        defaultValue,
        children,
        color: colorProp = 'neutral',
        disabled = false,
        error = false,
        onChange,
        orientation: orientationProp = 'vertical',
        required = false,
        slotProps = {},
        slots = {},
        size: sizeProp = 'md',
        value: incomingValue,
        ...other
    } = props;

    const [value, setValue] = useControlled({
        controlled: incomingValue,
        default: defaultValue,
        name: 'FormControl',
        state: 'value'
    });

    const filled = hasValue(value);
    const [focusedState, setFocused] = React.useState(false);
    const focused = focusedState && !disabled;
    const size = props.size ?? sizeProp;
    const color = props.color ?? colorProp;
    const orientation = props.orientation ?? orientationProp;
    const id = useId();
    const [helperText, setHelperText] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => setFocused((isFocused) => (disabled ? false : isFocused)), [disabled]);

    const ownerState: FormControlOwnerState = {
        ...props,
        id,
        color,
        disabled,
        error,
        filled,
        focused,
        orientation,
        required,
        size
    };

    const classes = useUtilityClasses(ownerState);

    let registerEffect: undefined | (() => () => void);
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const registeredInput = React.useRef(false);
        registerEffect = () => {
            if (registeredInput.current) {
                console.error(
                    [
                        'Azrn: A FormControl can contain only one control component (Autocomplete | Input | Textarea | Select | RadioGroup)',
                        'You should not mix those components inside a single FormControl instance'
                    ].join('\n')
                );
            }

            registeredInput.current = true;
            return () => {
                registeredInput.current = false;
            };
        };
    }

    const childContext: FormControlState = React.useMemo(() => {
        return {
            'aria-describedby': `${id || ''}-helper-text`,
            disabled,
            color,
            error,
            filled,
            focused,
            htmlFor: id,
            labelId: `${id || ''}-label`,
            onBlur: () => {
                setFocused(false);
            },
            onChange: (event: React.ChangeEvent<NativeFormControlElement>) => {
                setValue(event.target.value);
                onChange?.(event);
            },
            onFocus: () => {
                setFocused(true);
            },
            required,
            registerEffect: registerEffect!,
            setHelperText,
            size,
            value: value ?? ''
        };
    }, [
        disabled,
        color,
        error,
        filled,
        focused,
        helperText,
        id,
        onChange,
        registerEffect,
        required,
        size,
        setValue,
        value
    ]);

    const renderChildren = () => {
        if (typeof children === 'function') {
            return children(childContext);
        }

        return children;
    };

    const Root = slots.root ?? 'div';
    const rootProps: WithOptionalOwnerState<FormControlRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef,
            children: renderChildren()
        },
        ownerState,
        className: classes.root
    });

    return (
        <FormControlContext.Provider value={childContext}>
            <Root {...rootProps} />
        </FormControlContext.Provider>
    );
}) as PolymorphicComponent<FormControlTypeMap>;

FormControl.propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
        PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
        PropTypes.string
    ]),
    /**
     * @ignore
     */
    defaultValue: PropTypes.any,
    /**
     * If `true`, the children are in disabled state.
     * @default false
     */
    disabled: PropTypes.bool,
    /**
     * If `true`, the children will indicate an error.
     * @default false
     */
    error: PropTypes.bool,
    /**
     * Callback fired when the form element's value is modified.
     */
    onChange: PropTypes.func,
    /**
     * @ignore
     */
    id: PropTypes.string,
    /**
     * The content direction flow.
     * @default 'vertical'
     */
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    /**
     * If `true`, the label will indicate that the `input` is required.
     * @default false
     */
    required: PropTypes.bool,
    /**
     * The props used for each slot inside the FormControl.
     * @default {}
     */
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the FormControl.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    }),
    /**
     * The size of the component.
     * @default 'md'
     */
    size: PropTypes.oneOfType([PropTypes.oneOf(['sm', 'md', 'lg']), PropTypes.string]),
    /**
     * The value of the form element.
     */
    value: PropTypes.any
} as any;
