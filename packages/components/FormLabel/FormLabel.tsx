import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import { FormLabelProps, FormLabelTypeMap, FormLabelRootSlotProps, FormLabelOwnerState } from './FormLabel.types';
import composeClasses from '../composeClasses';
import { getFormLabelUtilityClass } from './formLabelClasses.ts';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

function useUtilityClasses(ownerState: FormLabelOwnerState) {
    const { disabled } = ownerState;

    const slots = {
        root: [
            `relative`,
            disabled && 'disabled',
        ]
    };

    return composeClasses(slots, useClassNamesOverride(getFormLabelUtilityClass));
}

/**
 *
 * API:
 *
 * - [FormLabel API](https:///#form-label)
 */
export const FormLabel = React.forwardRef(function FormLabel<RootComponentType extends React.ElementType>(
    props: FormLabelProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const {
        children,
        disabled,
        slotProps = {},
        slots = {},
        ...other
    } = props;

    const ownerState: FormLabelOwnerState = {
        disabled,
        ...props,
    };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'span';
    const rootProps: WithOptionalOwnerState<FormLabelRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef
        },
        ownerState,
        className: classes.root
    });

    return (
        <Root {...rootProps}>
            {children}
        </Root>
    );
}) as PolymorphicComponent<FormLabelTypeMap>;

FormLabel.propTypes = {
    /**
     * The badge will be added relative to this node.
     */
    children: PropTypes.node,
    /**
     * The props used for each slot inside the FormLabel.
     * @default {}
     */
    slotProps: PropTypes.shape({
        badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the FormLabel.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    }),
} as any;
