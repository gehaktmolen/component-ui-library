import * as React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import type {
    ListItemIconProps,
    ListItemIconOwnerState,
    ListItemIconRootSlotProps,
    ListItemIconTypeMap
} from './ListItemIcon.types';
import {
    generateUtilityClass,
    useClassNamesOverride,
    composeClasses,
    WithOptionalOwnerState,
    useSlotProps,
    PolymorphicComponent
} from '../../utils';

const useUtilityClasses = (ownerState: ListItemIconOwnerState) => {
    const { parentOrientation } = ownerState;

    const slots = {
        root: [
            'listItemIcon block box-border inline-flex flex-shrink-0 items-center min-i-s-10',
            parentOrientation === 'horizontal' && 'items-center justify-center'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const ListItemIcon = React.forwardRef(function ListItemIcon<RootComponentType extends React.ElementType>(
    props: ListItemIconProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const { children, className, component = 'span', parentOrientation, slotProps = {}, slots = {}, ...other } = props;

    const ownerState: ListItemIconOwnerState = {
        ...props,
        parentOrientation
    };

    const classes = useUtilityClasses(ownerState);

    const Root: React.ElementType = slots.root ?? 'span';
    const rootProps: WithOptionalOwnerState<ListItemIconRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef
        },
        ownerState,
        className: twMerge(classes.root, className)
    });

    return <Root {...rootProps}>{children}</Root>;
}) as PolymorphicComponent<ListItemIconTypeMap>;

ListItemIcon.propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: PropTypes.elementType,
    /**
     * The props used for each slot inside.
     * @default {}
     */
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    })
};

export { ListItemIcon };
