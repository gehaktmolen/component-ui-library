import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import { FormHelperTextProps, FormHelperTextTypeMap, FormHelperTextRootSlotProps, FormHelperTextOwnerState } from './FormHelperText.types';
import composeClasses from '../composeClasses';
import { getFormHelperTextUtilityClass } from './formHelperTextClasses.ts';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

function useUtilityClasses(ownerState: FormHelperTextOwnerState) {
    const { disabled } = ownerState;

    const slots = {
        root: [
            `relative`,
            disabled && 'disabled',
        ]
    };

    return composeClasses(slots, useClassNamesOverride(getFormHelperTextUtilityClass));
}

/**
 *
 * API:
 *
 * - [FormHelperText API](https:///#form-helper-text)
 */
export const FormHelperText = React.forwardRef(function FormHelperText<RootComponentType extends React.ElementType>(
    props: FormHelperTextProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const {
        children,
        disabled,
        slotProps = {},
        slots = {},
        ...other
    } = props;

    const ownerState: FormHelperTextOwnerState = {
        disabled,
        ...props,
    };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'span';
    const rootProps: WithOptionalOwnerState<FormHelperTextRootSlotProps> = useSlotProps({
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
}) as PolymorphicComponent<FormHelperTextTypeMap>;

FormHelperText.propTypes = {
    /**
     * The badge will be added relative to this node.
     */
    children: PropTypes.node,
    /**
     * The props used for each slot inside the FormHelperText.
     * @default {}
     */
    slotProps: PropTypes.shape({
        badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the FormHelperText.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    }),
} as any;
