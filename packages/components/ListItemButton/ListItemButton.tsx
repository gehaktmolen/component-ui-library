import * as React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import type {
    ListItemButtonProps,
    ListItemButtonOwnerState,
    ListItemButtonRootSlotProps
} from './ListItemButton.types';
import {
    generateUtilityClass,
    useClassNamesOverride,
    composeClasses,
    WithOptionalOwnerState,
    useSlotProps,
    useForkRef,
    useColorInversion,
    PolymorphicComponent
} from '../../utils';
import { useButton } from '../useButton';
import ListItemButtonOrientationContext from './ListItemButtonOrientationContext';
import RowListContext from '../List/RowListContext';
import { ListItemButtonTypeMap } from './ListItemButton.types';
import ListContext from '../List/ListContext.ts';

const useUtilityClasses = (ownerState: ListItemButtonOwnerState) => {
    const { size, color, disabled, focusVisible, selected, variant } = ownerState;

    const slots = {
        root: [
            'bg-danger-500',
            'relative box-border flex flex-row self-stretch items-center cursor-pointer border',
            'border-transparent hover:bg-gray-200 active:bg-gray-200',
            ownerState['data-first-child'] === undefined && 'mbs-0 ms-0',
            color === 'neutral' && 'text-gray-900',
            color === 'danger' && 'text-danger-900',
            color === 'primary' && 'text-primary-900',
            size === 'sm' && 'px-1.5',
            size === 'md' && 'px-2',
            size === 'lg' && 'px-2.5',
            disabled && 'disabled',
            focusVisible && 'focusVisible',
            color && `color${color}`,
            selected && 'selected',
            variant && `variant${variant}`
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const ListItemButton = React.forwardRef(function ListItemButton<RootComponentType extends React.ElementType>(
    props: ListItemButtonProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const list = React.useContext(ListContext);
    const row = React.useContext(RowListContext);

    const {
        children,
        className,
        action,
        component = 'div',
        size: sizeProp = 'md',
        orientation = 'horizontal',
        role,
        selected = false,
        color: colorProp = 'neutral',
        variant: variantProp = 'solid',
        slots = {},
        slotProps = {},
        ...other
    } = props;

    const variant = list?.variant || variantProp;
    const size = list?.size || sizeProp;
    const { getColor } = useColorInversion(variant);
    const color = getColor(list?.color || props.color, colorProp);

    const buttonRef = React.useRef<HTMLElement | null>(null);
    const handleRef = useForkRef(buttonRef, forwardedRef);

    const { focusVisible, setFocusVisible, getRootProps } = useButton({
        ...props,
        rootRef: handleRef
    });

    React.useImperativeHandle(
        action,
        () => ({
            focusVisible: () => {
                setFocusVisible(true);
                buttonRef.current?.focus();
            }
        }),
        [setFocusVisible]
    );

    const ownerState: ListItemButtonOwnerState = {
        ...props,
        component,
        size,
        color,
        focusVisible,
        orientation,
        row,
        selected,
        variant
    };

    const classes = useUtilityClasses(ownerState);

    const Root: React.ElementType = slots.root ?? 'div';
    const rootProps: WithOptionalOwnerState<ListItemButtonRootSlotProps> = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef
        },
        ownerState,
        className: twMerge(classes.root, className)
    });

    return (
        <ListItemButtonOrientationContext.Provider value={orientation}>
            <Root {...rootProps} role={role ?? rootProps.role}>
                {children}
            </Root>
        </ListItemButtonOrientationContext.Provider>
    );
}) as PolymorphicComponent<ListItemButtonTypeMap>;

ListItemButton.propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * @ignore
     */
    role: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use an HTML element or a component.
     */
    component: PropTypes.elementType,
    /**
     * The color of the component.
     * @default 'neutral'
     */
    color: PropTypes.oneOfType([PropTypes.oneOf(['neutral', 'primary', 'danger']), PropTypes.string]),
    /**
     * The variant to use.
     * @default 'solid'
     */
    variant: PropTypes.oneOfType([PropTypes.oneOf(['soft', 'solid']), PropTypes.string]),
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

export { ListItemButton };
