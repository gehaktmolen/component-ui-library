import * as React from 'react';
import PropTypes from 'prop-types';
import type {
    ListItemTextProps,
    ListItemTextOwnerState,
    ListItemTextRootSlotProps,
    ListItemTextTypeMap
} from './ListItemText.types';
import {
    generateUtilityClass,
    useClassNamesOverride,
    composeClasses,
    WithOptionalOwnerState,
    useSlotProps,
    PolymorphicComponent
} from '../../utils';

const useUtilityClasses = () => {
    const slots = {
        root: ['flex-1 min-w-0']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const ListItemText = React.forwardRef(function ListItemText<RootComponentType extends React.ElementType>(
    props: ListItemTextProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const { children, slotProps = {}, slots = {}, ...other } = props;

    const ownerState: ListItemTextOwnerState = {
        ...props
    };

    const classes = useUtilityClasses();

    const Root: React.ElementType = slots.root ?? 'div';
    const rootProps: WithOptionalOwnerState<ListItemTextRootSlotProps> = useSlotProps({
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
}) as PolymorphicComponent<ListItemTextTypeMap>;

ListItemText.propTypes = {
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
     * Either a string to use an HTML element or a component.
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

export { ListItemText };
