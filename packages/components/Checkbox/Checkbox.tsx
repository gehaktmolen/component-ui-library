import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '../composeClasses';
import { useSwitch } from '../useSwitch';
import {
    CheckboxProps,
    CheckboxOwnerState,
    CheckboxInputSlotProps,
    CheckboxRootSlotProps,
    CheckboxLabelContainerSlotProps,
    CheckboxInputContainerSlotProps,
    CheckboxTypeMap
} from './Checkbox.types';
import { useSlotProps, WithOptionalOwnerState, PolymorphicComponent } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import generateUtilityClass from '../generateUtilityClass';
import { FormControlState, useFormControlContext } from '../FormControl';

const useUtilityClasses = (ownerState: CheckboxOwnerState) => {
    const {
        // checked,
        disabled,
        // focusVisible,
        readOnly
        // color
    } = ownerState;

    const slots = {
        root: [
            'relative flex items-start'
            // focusVisible && 'ring-2 ring-offset-2 ring-primary-500 dark:ring-primary-400',
            // (disabled || readOnly) && 'opacity-40',
            // color === 'primary' && checked && 'bg-primary-500 dark:bg-primary-400',
            // color === 'neutral' && checked && 'bg-gray-500 dark:bg-gray-400',
            // color === 'danger' && checked && 'bg-danger-500 dark:bg-danger-400'
        ],
        labelContainer: ['ml-3 text-sm leading-6'],
        inputContainer: ['flex h-6 items-center'],
        input: [
            'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600',
            disabled || readOnly ? 'cursor-not-allowed' : 'cursor-pointer'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

/**
 * The foundation for building custom-styled switches.
 *
 * API:
 *
 * - [Checkbox API](https://#switch)
 */
export const Checkbox = React.forwardRef(function Checkbox<RootComponentType extends React.ElementType>(
    props: CheckboxProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const formControlContext: FormControlState | undefined = useFormControlContext();
    const {
        'aria-describedby': ariaDescribedby,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        checked: checkedProp,
        color = 'primary',
        defaultChecked,
        disabled: disabledProp,
        error,
        onBlur,
        onChange,
        onFocus,
        onFocusVisible,
        readOnly: readOnlyProp,
        required,
        slotProps = {},
        slots = {},
        ...other
    } = props;

    const {
        getInputProps,
        checked,
        disabled,
        // error: errorState,
        focusVisible,
        readOnly
    } = useSwitch({
        checked: checkedProp,
        defaultChecked,
        disabled: disabledProp,
        // error,
        onBlur,
        onChange,
        onFocus,
        onFocusVisible,
        readOnly: readOnlyProp
    });

    const ownerState: CheckboxOwnerState = {
        ...props,
        checked,
        disabled,
        focusVisible,
        readOnly,
        color
    };

    const classes = useUtilityClasses(ownerState);

    const Root: React.ElementType = slots.root ?? 'div';
    const rootProps: WithOptionalOwnerState<CheckboxRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef
        },
        ownerState,
        className: classes.root
    });

    const Input: React.ElementType = slots.input ?? 'input';
    const inputProps: WithOptionalOwnerState<CheckboxInputSlotProps> = useSlotProps({
        elementType: Input,
        getSlotProps: getInputProps,
        externalSlotProps: slotProps.input,
        additionalProps: {
            id: formControlContext?.htmlFor,
            'aria-describedby': formControlContext?.['aria-describedby'] ?? ariaDescribedby
            // 'aria-invalid': errorState,
        },
        ownerState,
        className: classes.input
    });

    const InputContainer: React.ElementType =
        slots.inputContainer === null ? () => null : slots.inputContainer ?? 'div';
    const inputContainerProps: WithOptionalOwnerState<CheckboxInputContainerSlotProps> = useSlotProps({
        elementType: InputContainer,
        externalSlotProps: slotProps.inputContainer,
        ownerState,
        className: classes.inputContainer
    });

    const LabelContainer: React.ElementType = slots.labelContainer ?? 'div';
    const labelContainerProps: WithOptionalOwnerState<CheckboxLabelContainerSlotProps> = useSlotProps({
        elementType: LabelContainer,
        externalSlotProps: slotProps.labelContainer,
        ownerState,
        className: classes.labelContainer
    });

    return (
        <Root {...rootProps}>
            <InputContainer {...inputContainerProps}>
                <Input
                    {...inputProps}
                    id="candidates"
                    aria-describedby="candidates-description"
                    name="candidates"
                    type="checkbox"
                />
            </InputContainer>
            <LabelContainer {...labelContainerProps}>
                <label htmlFor="candidates" className="font-medium text-gray-900">
                    Candidates
                </label>
                <p id="candidates-description" className="text-gray-500">
                    Get notified when a candidate applies for a job.
                </p>
            </LabelContainer>
        </Root>
    );
}) as PolymorphicComponent<CheckboxTypeMap>;

Checkbox.propTypes = {
    /**
     * If `true`, the component is checked.
     */
    checked: PropTypes.bool,
    /**
     * The color of the component.
     * @default 'primary'
     */
    color: PropTypes.oneOfType([PropTypes.oneOf(['neutral', 'primary']), PropTypes.string]),
    /**
     * The default checked state. Use when the component is not controlled.
     */
    defaultChecked: PropTypes.bool,
    /**
     * If `true`, the component is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * @ignore
     */
    onBlur: PropTypes.func,
    /**
     * Callback fired when the state is changed.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (string).
     * You can pull out the new checked state by accessing `event.target.checked` (boolean).
     */
    onChange: PropTypes.func,
    /**
     * @ignore
     */
    onFocus: PropTypes.func,
    /**
     * @ignore
     */
    onFocusVisible: PropTypes.func,
    /**
     * If `true`, the component is read only.
     */
    readOnly: PropTypes.bool,
    /**
     * If `true`, the `input` element is required.
     */
    required: PropTypes.bool,
    /**
     * The props used for each slot inside the Checkbox.
     * @default {}
     */
    slotProps: PropTypes.shape({
        input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        labelContainer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        inputContainer: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the Checkbox.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: PropTypes /* @typescript-to-proptypes-ignore */.shape({
        input: PropTypes.elementType,
        root: PropTypes.elementType,
        labelContainer: PropTypes.elementType,
        inputContainer: PropTypes.oneOfType([PropTypes.elementType, PropTypes.oneOf([null])])
    })
} as any;
