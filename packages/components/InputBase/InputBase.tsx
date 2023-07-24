import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import { InputBaseProps, InputBaseTypeMap, InputBaseRootSlotProps, InputBaseOwnerState } from './InputBase.types';
import composeClasses from '../composeClasses';
import { getInputBaseUtilityClass } from './inputBaseClasses.ts';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

function useUtilityClasses(ownerState: InputBaseOwnerState) {
    const { disabled } = ownerState;

    const slots = {
        root: [`relative`, disabled && 'disabled']
    };

    return composeClasses(slots, useClassNamesOverride(getInputBaseUtilityClass));
}

/**
 *
 * API:
 *
 * - [InputBase API](https:///#form-label)
 */
export const InputBase = React.forwardRef(function InputBase<RootComponentType extends React.ElementType>(
    props: InputBaseProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const { children, disabled, slotProps = {}, slots = {}, ...other } = props;

    const ownerState: InputBaseOwnerState = {
        disabled,
        ...props
    };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'span';
    const rootProps: WithOptionalOwnerState<InputBaseRootSlotProps> = useSlotProps({
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
}) as PolymorphicComponent<InputBaseTypeMap>;

InputBase.propTypes = {
    /**
     * The badge will be added relative to this node.
     */
    children: PropTypes.node,
    /**
     * The props used for each slot inside the InputBase.
     * @default {}
     */
    slotProps: PropTypes.shape({
        badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the InputBase.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    })
} as any;
