import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useControlled as useControlled } from '../../utils';
import { PolymorphicComponent } from '../utils';
import FormControlContext from './FormControlContext';
import { getFormControlUtilityClass } from './formControlClasses';
import {
    FormControlProps,
    NativeFormControlElement,
    FormControlTypeMap,
    FormControlOwnerState,
    FormControlState,
    FormControlRootSlotProps
} from './FormControl.types';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

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

    return composeClasses(slots, useClassNamesOverride(getFormControlUtilityClass));
}

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 * *   FormLabel
 * *   FormHelperText
 * *   Input
 * *   InputLabel
 *
 * You can find one composition example below.
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
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
        color = 'neutral',
        disabled = false,
        error = false,
        onChange,
        orientation = 'vertical',
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

    React.useEffect(() => setFocused((isFocused) => (disabled ? false : isFocused)), [disabled]);

    const ownerState: FormControlOwnerState = {
        ...props,
        color,
        disabled,
        error,
        filled,
        focused,
        orientation,
        required,
        size
    };

    const childContext: FormControlState = React.useMemo(() => {
        return {
            disabled,
            error,
            filled,
            focused,
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
            value: value ?? ''
        };
    }, [disabled, error, filled, focused, onChange, required, setValue, value]);

    const classes = useUtilityClasses(ownerState);

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
     * The color of the component.
     * @default 'neutral'
     */
    color: PropTypes.oneOfType([
        PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
        PropTypes.string
    ]),
    /**
     * @ignore
     */
    defaultValue: PropTypes.any,
    /**
     * If `true`, the label, input and helper text should be displayed in a disabled state.
     * @default false
     */
    disabled: PropTypes.bool,
    /**
     * If `true`, the label is displayed in an error state.
     * @default false
     */
    error: PropTypes.bool,
    /**
     * Callback fired when the form element's value is modified.
     */
    onChange: PropTypes.func,
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
