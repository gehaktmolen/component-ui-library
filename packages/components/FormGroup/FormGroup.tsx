import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import { FormGroupProps, FormGroupTypeMap, FormGroupRootSlotProps, FormGroupOwnerState } from './FormGroup.types';
import composeClasses from '../composeClasses';
import { getFormGroupUtilityClass } from './formGroupClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

function useUtilityClasses(ownerState: FormGroupOwnerState) {
    const { row, error } = ownerState;

    const slots = {
        root: [
            `flex flex-wrap ${row ? 'flex-row' : 'flex-col'}`,
            // Todo: Need to pass on error to slots
            error && 'error'
        ]
    };

    return composeClasses(slots, useClassNamesOverride(getFormGroupUtilityClass));
}

/**
 * FormGroup is a helpful wrapper used to group selection controls components that provides an easier API.
 *
 * API:
 *
 * - [FormGroup API](https:///#form-group)
 */
export const FormGroup = React.forwardRef(function FormGroup<RootComponentType extends React.ElementType>(
    props: FormGroupProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const { children, error, row, slotProps = {}, slots = {}, ...other } = props;

    const ownerState: FormGroupOwnerState = {
        error,
        row,
        ...props
    };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'div';
    const rootProps: WithOptionalOwnerState<FormGroupRootSlotProps> = useSlotProps({
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
}) as PolymorphicComponent<FormGroupTypeMap>;

FormGroup.propTypes = {
    /**
     * The badge will be added relative to this node.
     */
    children: PropTypes.node,
    /**
     * Display group of elements in a compact row.
     * @default false
     */
    row: PropTypes.bool,
    /**
     * The props used for each slot inside the FormGroup.
     * @default {}
     */
    slotProps: PropTypes.shape({
        badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the FormGroup.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    })
} as any;
