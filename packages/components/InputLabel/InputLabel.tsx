import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import { InputLabelProps, InputLabelTypeMap, InputLabelRootSlotProps, InputLabelOwnerState } from './InputLabel.types';
import composeClasses from '../composeClasses';
import { getInputLabelUtilityClass } from './inputLabelClasses.ts';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

function useUtilityClasses(ownerState: InputLabelOwnerState) {
    const { disabled } = ownerState;

    const slots = {
        root: [`relative`, disabled && 'disabled']
    };

    return composeClasses(slots, useClassNamesOverride(getInputLabelUtilityClass));
}

/**
 *
 * API:
 *
 * - [InputLabel API](https:///#form-label)
 */
export const InputLabel = React.forwardRef(function InputLabel<RootComponentType extends React.ElementType>(
    props: InputLabelProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const { children, disabled, slotProps = {}, slots = {}, ...other } = props;

    const ownerState: InputLabelOwnerState = {
        disabled,
        ...props
    };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'span';
    const rootProps: WithOptionalOwnerState<InputLabelRootSlotProps> = useSlotProps({
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
}) as PolymorphicComponent<InputLabelTypeMap>;

InputLabel.propTypes = {
    /**
     * The badge will be added relative to this node.
     */
    children: PropTypes.node,
    /**
     * The props used for each slot inside the InputLabel.
     * @default {}
     */
    slotProps: PropTypes.shape({
        badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the InputLabel.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    })
} as any;
