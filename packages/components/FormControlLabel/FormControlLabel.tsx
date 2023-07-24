import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import {
    FormControlLabelProps,
    FormControlLabelTypeMap,
    FormControlLabelRootSlotProps,
    FormControlLabelOwnerState
} from './FormControlLabel.types';
import composeClasses from '../composeClasses';
import { getFormControlLabelUtilityClass } from './formControlLabelClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

function useUtilityClasses(ownerState: FormControlLabelOwnerState) {
    const { disabled } = ownerState;

    const slots = {
        root: [`relative`, disabled && 'disabled']
    };

    return composeClasses(slots, useClassNamesOverride(getFormControlLabelUtilityClass));
}

/**
 *
 * API:
 *
 * - [FormControlLabel API](https:///#form-control-label)
 */
export const FormControlLabel = React.forwardRef(function FormControlLabel<RootComponentType extends React.ElementType>(
    props: FormControlLabelProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const { children, disabled, slotProps = {}, slots = {}, ...other } = props;

    const ownerState: FormControlLabelOwnerState = {
        disabled,
        ...props
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

    return <Root {...rootProps}>{children}</Root>;
}) as PolymorphicComponent<FormControlLabelTypeMap>;

FormControlLabel.propTypes = {
    /**
     * The badge will be added relative to this node.
     */
    children: PropTypes.node,
    /**
     * The props used for each slot inside the FormControlLabel.
     * @default {}
     */
    slotProps: PropTypes.shape({
        badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the FormControlLabel.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    })
} as any;
