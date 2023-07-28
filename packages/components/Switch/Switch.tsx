import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '../composeClasses';
import { useSwitch } from '../useSwitch';
import {
    SwitchProps,
    SwitchOwnerState,
    SwitchInputSlotProps,
    SwitchRootSlotProps,
    SwitchThumbSlotProps,
    SwitchTrackSlotProps,
    SwitchTypeMap
} from './Switch.types';
import { useSlotProps, WithOptionalOwnerState, PolymorphicComponent } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import generateUtilityClass from '../generateUtilityClass';

const SWITCH_COLOR = Object.freeze({
    primary: 'bg-primary-500 dark:bg-primary-100',
    neutral: 'bg-white opacity-20'
} as const);

const useUtilityClasses = (ownerState: SwitchOwnerState) => {
    const { checked, disabled, focusVisible, readOnly, color } = ownerState;

    const slots = {
        root: [
            `relative inline-block w-10 h-6 m-2.5 ${
                disabled || readOnly ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
            }`
        ],
        thumb: [
            `block w-4 h-4 top-1 ${checked ? 'left-5' : 'left-1'} rounded-2xl ${
                focusVisible ? `${checked ? 'bg-white' : 'bg-slate-500'} shadow-outline-switch` : 'bg-white'
            } relative transition-all`
        ],
        input: ['cursor-[inherit] absolute w-full h-full top-0 left-0 opacity-0 z-10 m-0'],
        track: [
            `absolute block w-full h-full rounded-2xl ${
                checked ? (color ? SWITCH_COLOR[color] : '') : 'bg-slate-400 dark:bg-slate-600'
            }`
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
 * - [Switch API](https://#switch)
 */
export const Switch = React.forwardRef(function Switch<RootComponentType extends React.ElementType>(
    props: SwitchProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const {
        checked: checkedProp,
        color = 'neutral',
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

    const useSwitchProps = {
        checked: checkedProp,
        defaultChecked,
        disabled: disabledProp,
        onBlur,
        onChange,
        onFocus,
        onFocusVisible,
        readOnly: readOnlyProp
    };

    const { getInputProps, checked, disabled, focusVisible, readOnly } = useSwitch(useSwitchProps);

    const ownerState: SwitchOwnerState = {
        ...props,
        checked,
        disabled,
        focusVisible,
        readOnly,
        color
    };

    const classes = useUtilityClasses(ownerState);

    const Root: React.ElementType = slots.root ?? 'span';
    const rootProps: WithOptionalOwnerState<SwitchRootSlotProps> = useSlotProps({
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
    const thumbProps: WithOptionalOwnerState<SwitchThumbSlotProps> = useSlotProps({
        elementType: Thumb,
        externalSlotProps: slotProps.thumb,
        ownerState,
        className: classes.thumb
    });

    const Input: React.ElementType = slots.input ?? 'input';
    const inputProps: WithOptionalOwnerState<SwitchInputSlotProps> = useSlotProps({
        elementType: Input,
        getSlotProps: getInputProps,
        externalSlotProps: slotProps.input,
        ownerState,
        className: classes.input
    });

    const Track: React.ElementType = slots.track === null ? () => null : slots.track ?? 'span';
    const trackProps: WithOptionalOwnerState<SwitchTrackSlotProps> = useSlotProps({
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
}) as PolymorphicComponent<SwitchTypeMap>;

Switch.propTypes = {
    /**
     * If `true`, the component is checked.
     */
    checked: PropTypes.bool,
    /**
     * The color of the component.
     * @default 'neutral'
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
     * The props used for each slot inside the Switch.
     * @default {}
     */
    slotProps: PropTypes.shape({
        input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        track: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the Switch.
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
