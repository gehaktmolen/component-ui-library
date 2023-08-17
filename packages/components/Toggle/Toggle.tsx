import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '../composeClasses';
import { useToggle } from '../useToggle';
import {
    ToggleProps,
    ToggleOwnerState,
    ToggleInputSlotProps,
    ToggleRootSlotProps,
    ToggleThumbSlotProps,
    ToggleTrackSlotProps,
    ToggleTypeMap
} from './Toggle.types';
import { useSlotProps, WithOptionalOwnerState, PolymorphicComponent } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import generateUtilityClass from '../generateUtilityClass';

const useUtilityClasses = (ownerState: ToggleOwnerState) => {
    const { checked, disabled, focusVisible, readOnly, color } = ownerState;

    const slots = {
        root: [
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
            'bg-gray-300 dark:bg-gray-600',
            focusVisible && 'ring-2 ring-offset-2 ring-primary-600 dark:ring-primary-500',
            (disabled || readOnly) && 'opacity-40',
            color === 'primary' && checked && 'bg-primary-600 dark:bg-primary-500',
            color === 'neutral' && checked && 'bg-gray-600 dark:bg-gray-500',
            color === 'danger' && checked && 'bg-danger-600 dark:bg-danger-500'
        ],
        thumb: [
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0'
        ],
        input: [
            'cursor-inherit absolute w-full h-full top-0 left-0 opacity-0 z-10 m-0',
            disabled || readOnly ? 'cursor-not-allowed' : 'cursor-pointer'
        ],
        track: [
            'absolute w-full h-full rounded-full transition-colors duration-200 ease-in-out',
            color === 'primary' && checked && 'bg-primary-600 dark:bg-primary-500',
            color === 'neutral' && checked && 'bg-gray-600 dark:bg-gray-500',
            color === 'danger' && checked && 'bg-danger-600 dark:bg-danger-500'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

/**
 * The foundation for building custom-styled toggles.
 *
 * ## API
 * - [Toggle API](?path=/docs/inputs-toggle--docs#api)
 */
export const Toggle = React.forwardRef(function Toggle<RootComponentType extends React.ElementType>(
    props: ToggleProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const {
        checked: checkedProp,
        color = 'primary',
        defaultChecked,
        disabled: disabledProp,
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

    const useToggleProps = {
        checked: checkedProp,
        defaultChecked,
        disabled: disabledProp,
        onBlur,
        onChange,
        onFocus,
        onFocusVisible,
        readOnly: readOnlyProp
    };

    const { getInputProps, checked, disabled, focusVisible, readOnly } = useToggle(useToggleProps);

    const ownerState: ToggleOwnerState = {
        ...props,
        checked,
        disabled,
        focusVisible,
        readOnly,
        color
    };

    const classes = useUtilityClasses(ownerState);

    const Root: React.ElementType = slots.root ?? 'span';
    const rootProps: WithOptionalOwnerState<ToggleRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef
        },
        ownerState,
        className: classes.root
    });

    const Thumb: React.ElementType = slots.thumb ?? 'span';
    const thumbProps: WithOptionalOwnerState<ToggleThumbSlotProps> = useSlotProps({
        elementType: Thumb,
        externalSlotProps: slotProps.thumb,
        ownerState,
        className: classes.thumb
    });

    const Input: React.ElementType = slots.input ?? 'input';
    const inputProps: WithOptionalOwnerState<ToggleInputSlotProps> = useSlotProps({
        elementType: Input,
        getSlotProps: getInputProps,
        externalSlotProps: slotProps.input,
        ownerState,
        className: classes.input
    });

    const Track: React.ElementType = slots.track === null ? () => null : slots.track ?? 'span';
    const trackProps: WithOptionalOwnerState<ToggleTrackSlotProps> = useSlotProps({
        elementType: Track,
        externalSlotProps: slotProps.track,
        ownerState,
        className: classes.track
    });

    return (
        <Root {...rootProps}>
            <Track {...trackProps} />
            <Thumb {...thumbProps} />
            <Input {...inputProps} />
        </Root>
    );
}) as PolymorphicComponent<ToggleTypeMap>;

Toggle.propTypes = {
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
     * The props used for each slot inside the Toggle.
     * @default {}
     */
    slotProps: PropTypes.shape({
        input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        track: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the Toggle.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: PropTypes /* @typescript-to-proptypes-ignore */.shape({
        input: PropTypes.elementType,
        root: PropTypes.elementType,
        thumb: PropTypes.elementType,
        track: PropTypes.oneOfType([PropTypes.elementType, PropTypes.oneOf([null])])
    })
} as any;
