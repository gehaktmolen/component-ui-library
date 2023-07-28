import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import {
    FormControlLabelProps,
    FormControlLabelTypeMap,
    FormControlLabelRootSlotProps,
    FormControlLabelOwnerState,
    FormControlLabelStackSlotProps,
    FormControlLabelAsteriskSlotProps,
    FormControlLabelLabelSlotProps
} from './FormControlLabel.types';
import composeClasses from '../composeClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import generateUtilityClass from '../generateUtilityClass';

function useUtilityClasses(ownerState: FormControlLabelOwnerState) {
    const { disabled, filled, focused, labelPlacement, error, required } = ownerState;

    const slots = {
        root: [
            'inline-flex items-center align-middle ml-2 mr-3',
            disabled && 'disabled',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            filled && 'filled',
            focused && 'focused',
            labelPlacement === 'start' && 'flex-row-reverse ml-3 mr-2',
            labelPlacement === 'top' && 'flex-col-reverse ml-3',
            labelPlacement === 'bottom' && 'flex-col ml-3',
            required && 'required'
        ],
        stack: ['items-center'],
        asterisk: [error && 'error', error && 'text-red-500 dark:text-red-400'],
        label: [disabled && 'disabled', disabled && 'opacity-40']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
}

/**
 * Drop-in replacement of the Radio, Switch and Checkbox component. Use this component if you want to display an extra label.
 *
 * ```jsx
 * <FormGroup>
 *   <FormControlLabel control={<Switch defaultChecked />} label="Label" />
 *   <FormControlLabel required control={<Switch />} label="Required" />
 *   <FormControlLabel disabled control={<Switch />} label="Disabled" />
 * </FormGroup>
 * ```
 *
 * API:
 *
 * - [FormControlLabel API](https:///#form-control-label)
 */
export const FormControlLabel = React.forwardRef(function FormControlLabel<RootComponentType extends React.ElementType>(
    props: FormControlLabelProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const {
        children,
        control,
        disabled: disabledProp = false,
        error = false,
        label,
        labelPlacement = 'end',
        required: requiredProp = false,
        slotProps = {},
        slots = {},
        ...other
    } = props;

    const disabled = disabledProp ?? control.props.disabled;
    const required = requiredProp ?? control.props.required;

    const ownerState: FormControlLabelOwnerState = {
        disabled,
        error,
        labelPlacement,
        required,
        ...props
    };

    const controlProps = {
        disabled,
        required
    };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'span';
    const rootProps: WithOptionalOwnerState<FormControlLabelRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef
        },
        ownerState,
        className: classes.root
    });

    const Stack: React.ElementType = slots.stack === null ? () => null : slots.stack ?? 'div';
    const stackProps: WithOptionalOwnerState<FormControlLabelStackSlotProps> = useSlotProps({
        elementType: Stack,
        externalSlotProps: slotProps.stack,
        ownerState,
        className: classes.stack
    });

    const Asterisk: React.ElementType = slots.asterisk === null ? () => null : slots.asterisk ?? 'span';
    const asteriskProps: WithOptionalOwnerState<FormControlLabelAsteriskSlotProps> = useSlotProps({
        elementType: Asterisk,
        externalSlotProps: slotProps.asterisk,
        ownerState,
        className: classes.asterisk
    });

    const Label: React.ElementType = slots.label === null ? () => null : slots.label ?? 'span';
    const labelProps: WithOptionalOwnerState<FormControlLabelLabelSlotProps> = useSlotProps({
        elementType: Label,
        externalSlotProps: slotProps.label,
        ownerState,
        className: classes.label
    });

    return (
        <Root {...rootProps}>
            {React.cloneElement(control, controlProps)}
            {required ? (
                <Stack direction="row" {...stackProps}>
                    <Label {...labelProps}>{label}</Label>
                    <Asterisk aria-hidden {...asteriskProps}>
                        &thinsp;{'*'}
                    </Asterisk>
                </Stack>
            ) : (
                <Label {...labelProps}>{label}</Label>
            )}
        </Root>
    );
}) as PolymorphicComponent<FormControlLabelTypeMap>;

FormControlLabel.propTypes = {
    /**
     * If `true`, the component appears selected.
     */
    checked: PropTypes.bool,
    /**
     * The badge will be added relative to this node.
     */
    children: PropTypes.node,
    /**
     * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
     */
    control: PropTypes.element.isRequired,
    /**
     * If `true`, the control is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If `true`, the label is displayed in an error state.
     * @default false
     */
    error: PropTypes.bool,
    /**
     * A text or an element to be used in an enclosing label element.
     */
    label: PropTypes.node,
    /**
     * The position of the label.
     * @default 'end'
     */
    labelPlacement: PropTypes.oneOf(['bottom', 'end', 'start', 'top']),
    /**
     * If `true`, the label will indicate that the `input` is required.
     * @default false
     */
    required: PropTypes.bool,
    /**
     * The props used for each slot inside the FormControlLabel.
     * @default {}
     */
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        stack: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        asterisk: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        label: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the FormControlLabel.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType,
        stack: PropTypes.elementType,
        asterisk: PropTypes.elementType,
        label: PropTypes.elementType
    })
} as any;
