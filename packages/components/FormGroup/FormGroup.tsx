import * as React from 'react';
import PropTypes from 'prop-types';
import { generateUtilityClass, composeClasses, useSlotProps, useClassNamesOverride } from '../../utils';
import type { PolymorphicComponent, WithOptionalOwnerState } from '../../utils';
import type { FormGroupProps, FormGroupTypeMap, FormGroupRootSlotProps, FormGroupOwnerState } from './FormGroup.types';

function useUtilityClasses(ownerState: FormGroupOwnerState) {
    const { row, error } = ownerState;

    const slots = {
        root: [`flex flex-wrap gap-4 ${row ? 'flex-row' : 'flex-col'}`, error && 'error']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
}

/**
 * FormGroup is a helpful wrapper used to group selection controls components that provides an easier API.
 *
 * ## API
 * - [FormGroup API](?path=/docs/utils-formgroup--docs#api)
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
