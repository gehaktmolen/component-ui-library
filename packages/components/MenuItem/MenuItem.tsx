import * as React from 'react';
import PropTypes from 'prop-types';
import type { PolymorphicComponent } from '../../utils';
import type { MenuItemOwnerState, MenuItemProps, MenuItemTypeMap } from './MenuItem.types';
import { useMenuItem } from '../useMenuItem';
import { generateUtilityClass, composeClasses, useClassNamesOverride, useSlotProps } from '../../utils';

function useUtilityClasses(ownerState: MenuItemOwnerState) {
    const { disabled, focusVisible } = ownerState;

    const slots = {
        root: [
            'relative block box-border flex justify-start center-items px-4 py-2 text-sm cursor-pointer select-none whitespace-nowrap',
            'text-gray-700 hover:bg-gray-200 hover:text-gray-900',
            disabled && 'disabled',
            focusVisible && 'focusVisible'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
}

/**
 *
 * ## MenuItem API
 * - [MenuItem API](#menu-item)
 */
const MenuItem = React.forwardRef(function MenuItem<RootComponentType extends React.ElementType>(
    props: MenuItemProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const { children, disabled: disabledProp = false, label, slotProps = {}, slots = {}, ...other } = props;

    const { getRootProps, disabled, focusVisible, highlighted } = useMenuItem({
        disabled: disabledProp,
        rootRef: forwardedRef,
        label
    });

    const ownerState: MenuItemOwnerState = { ...props, disabled, focusVisible, highlighted };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'li';
    const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        className: classes.root,
        ownerState
    });

    return <Root {...rootProps}>{children}</Root>;
}) as PolymorphicComponent<MenuItemTypeMap>;

MenuItem.propTypes = {
    /**
     * @ignore
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    disabled: PropTypes.bool,
    /**
     * A text representation of the menu item's content.
     * Used for keyboard text navigation matching.
     */
    label: PropTypes.string,
    /**
     * The props used for each slot inside the MenuItem.
     * @default {}
     */
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the MenuItem.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    })
} as any;

export { MenuItem };
