import * as React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import type { ListProps, ListOwnerState, ListRootSlotProps, ListTypeMap, ListState } from './List.types';
import {
    generateUtilityClass,
    useClassNamesOverride,
    composeClasses,
    WithOptionalOwnerState,
    useSlotProps,
    useColorInversion,
    PolymorphicComponent
} from '../../utils';
import ListProvider from './ListProvider';
import ListContext from './ListContext';
import NestedListContext from './NestedListContext';
import ComponentListContext from './ComponentListContext';
import GroupListContext from './GroupListContext';
import RadioGroupContext from '../RadioGroup/RadioGroupContext';

const useUtilityClasses = (ownerState: ListOwnerState) => {
    const { wrap, variant, color, size, nesting, orientation, instanceSize } = ownerState;
    const slots = {
        root: [
            'relative flex grow box-border list-none m-0 p-0',
            orientation === 'horizontal' ? 'flex-row' : 'flex-col',
            wrap && 'flex-wrap',
            size === 'sm' && 'py-1 text-sm leading-4',
            size === 'md' && 'py-1.5 text-md leading-6',
            size === 'lg' && 'py-2 text-lg leading-10',
            color === 'neutral' && 'text-gray-900',
            color === 'danger' && 'text-danger-900',
            color === 'primary' && 'text-primary-900',
            variant === 'solid' && 'bg-gray-100',
            variant === 'soft' && 'bg-transparent',
            !instanceSize && !nesting && size && `size${size}`,
            instanceSize && `size${instanceSize}`,
            nesting && 'nesting'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const List = React.forwardRef(function List<RootComponentType extends React.ElementType>(
    props: ListProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const nesting = React.useContext(NestedListContext);
    const group = React.useContext(GroupListContext);
    const radioGroupContext = React.useContext(RadioGroupContext);

    const {
        component,
        className,
        children,
        size: sizeProp = 'md',
        orientation = 'vertical',
        wrap = false,
        variant: variantProp = 'solid',
        color: colorProp = 'neutral',
        role: roleProp,
        slots = {},
        slotProps = {},
        ...other
    } = props;
    const variant = variantProp;
    const size = sizeProp;
    const { getColor } = useColorInversion(variant);
    const color = getColor(props.color, colorProp);

    let role;
    if (group) {
        role = 'group';
    }
    if (radioGroupContext) {
        role = 'presentation';
    }
    if (roleProp) {
        role = roleProp;
    }

    const ownerState: ListOwnerState = {
        ...props,
        instanceSize: props.size,
        size,
        nesting,
        orientation,
        wrap,
        variant,
        color,
        role
    };

    const classes = useUtilityClasses(ownerState);

    const childContext: ListState = React.useMemo(() => {
        return { color, variant, size };
    }, [color, variant, size]);

    const Root: React.ElementType = slots.root ?? 'ul';
    const rootProps: WithOptionalOwnerState<ListRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef,
            as: component,
            role,
            'aria-labelledby': typeof nesting === 'string' ? nesting : undefined
        },
        ownerState,
        className: twMerge(classes.root, className)
    });

    return (
        <ListContext.Provider value={childContext}>
            <Root {...rootProps}>
                <ComponentListContext.Provider
                    value={`${typeof component === 'string' ? component : ''}:${role || ''}`}
                >
                    <ListProvider
                        row={orientation === 'horizontal'}
                        wrap={wrap}
                        size={sizeProp}
                        color={colorProp}
                        variant={variant}
                    >
                        {children}
                    </ListProvider>
                </ComponentListContext.Provider>
            </Root>
        </ListContext.Provider>
    );
}) as PolymorphicComponent<ListTypeMap>;

List.propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * The color of the component.
     * @default 'neutral'
     */
    color: PropTypes.oneOfType([PropTypes.oneOf(['neutral', 'primary', 'danger']), PropTypes.string]),
    /**
     * The component used for the root node.
     * Either a string to use an HTML element or a component.
     */
    component: PropTypes.elementType,
    /**
     * The component orientation.
     * @default 'vertical'
     */
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    /**
     * @ignore
     */
    role: PropTypes.string,
    /**
     * The size of the component (affect other nested list* components).
     * @default 'md'
     */
    size: PropTypes.oneOfType([PropTypes.oneOf(['sm', 'md', 'lg']), PropTypes.string]),
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
    }),
    /**
     * The variant to use.
     * @default 'solid'
     */
    variant: PropTypes.oneOfType([PropTypes.oneOf(['soft', 'solid']), PropTypes.string]),
    /**
     * Only for horizontal list.
     * If `true`, the list sets the flex-wrap to "wrap" and adjust margin to have gap-like behavior (will move to `gap` in the future).
     *
     * @default false
     */
    wrap: PropTypes.bool
} as any;

export { List };
