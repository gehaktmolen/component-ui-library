import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import {
    InputAdornmentProps,
    InputAdornmentTypeMap,
    InputAdornmentRootSlotProps,
    InputAdornmentOwnerState
} from './InputAdornment.types';
import composeClasses from '../composeClasses';
import { getInputAdornmentUtilityClass } from './inputAdornmentClasses.ts';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

function useUtilityClasses(ownerState: InputAdornmentOwnerState) {
    const { disabled } = ownerState;

    const slots = {
        root: [`relative`, disabled && 'disabled']
    };

    return composeClasses(slots, useClassNamesOverride(getInputAdornmentUtilityClass));
}

/**
 *
 * API:
 *
 * - [InputAdornment API](https:///#form-label)
 */
export const InputAdornment = React.forwardRef(function InputAdornment<RootComponentType extends React.ElementType>(
    props: InputAdornmentProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const { children, disabled, slotProps = {}, slots = {}, ...other } = props;

    const ownerState: InputAdornmentOwnerState = {
        disabled,
        ...props
    };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'span';
    const rootProps: WithOptionalOwnerState<InputAdornmentRootSlotProps> = useSlotProps({
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
}) as PolymorphicComponent<InputAdornmentTypeMap>;

InputAdornment.propTypes = {
    /**
     * The badge will be added relative to this node.
     */
    children: PropTypes.node,
    /**
     * The props used for each slot inside the InputAdornment.
     * @default {}
     */
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the InputAdornment.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    })
} as any;
