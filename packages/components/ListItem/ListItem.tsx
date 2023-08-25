import * as React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import type {
    ListItemProps,
    ListItemOwnerState,
    ListItemRootSlotProps,
    ListItemStartActionSlotProps,
    ListItemEndActionSlotProps,
    ListItemTypeMap
} from './ListItem.types';
import {
    generateUtilityClass,
    useClassNamesOverride,
    composeClasses,
    WithOptionalOwnerState,
    useSlotProps,
    useColorInversion,
    isElement,
    PolymorphicComponent
} from '../../utils';
import ListContext from '../List/ListContext';
import NestedListContext from '../List/NestedListContext';
import RowListContext from '../List/RowListContext';
import WrapListContext from '../List/WrapListContext';
import ComponentListContext from '../List/ComponentListContext';
import ListSubheaderDispatch from '../ListSubheader/ListSubheaderContext';
import GroupListContext from '../List/GroupListContext';

const useUtilityClasses = (ownerState: ListItemOwnerState) => {
    const { size, sticky, nested, variant, color } = ownerState;
    const slots = {
        root: [
            'relative flex flex-none items-center box-border',
            // 'pbs-1.5 pbe-1.5 ps-3 pe-3 min-b-s-3 m-inline-0',
            size === 'sm' && 'px-1.5',
            size === 'md' && 'px-2',
            size === 'lg' && 'px-2.5',
            color === 'neutral' && 'text-gray-900',
            color === 'danger' && 'text-danger-900',
            color === 'primary' && 'text-primary-900',
            !nested && 'items-center',
            nested && 'flex-col',
            sticky && 'sticky',
            variant && `variant${variant}`
        ],
        startAction: ['startAction'],
        endAction: ['endAction']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const ListItem = React.forwardRef(function ListItem<RootComponentType extends React.ElementType>(
    props: ListItemProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const list = React.useContext(ListContext);
    const group = React.useContext(GroupListContext);
    const listComponent = React.useContext(ComponentListContext);
    const row = React.useContext(RowListContext);
    const wrap = React.useContext(WrapListContext);
    const nesting = React.useContext(NestedListContext);

    const {
        component: componentProp,
        className,
        children,
        nested = false,
        sticky = false,
        size: sizeProp = 'md',
        variant: variantProp = 'solid',
        color: colorProp = 'neutral',
        startAction,
        endAction,
        role: roleProp,
        slotProps = {},
        slots = {},
        ...other
    } = props;

    const variant = list?.variant || variantProp;
    const size = list?.size || sizeProp;
    const { getColor } = useColorInversion(variant);
    const color = getColor(list?.color || props.color, colorProp);

    const [subheaderId, setSubheaderId] = React.useState('');

    const [listElement, listRole] = listComponent?.split(':') || ['', ''];
    const component = componentProp || (listElement && !listElement.match(/^(ul|ol|menu)$/) ? 'div' : undefined);

    let role = group === 'menu' ? 'none' : undefined;

    if (listComponent) {
        // ListItem can be used inside Menu to create nested menus, so it should have role="none"
        // https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        role = { menu: 'none', menubar: 'none', group: 'presentation' }[listRole];
    }
    if (roleProp) {
        role = roleProp;
    }

    const ownerState: ListItemOwnerState = {
        ...props,
        size,
        sticky,
        startAction,
        endAction,
        row,
        wrap,
        variant,
        color,
        nesting,
        nested,
        component,
        role
    };

    const classes = useUtilityClasses(ownerState);

    const Root: React.ElementType = slots.root ?? 'li';
    const rootProps: WithOptionalOwnerState<ListItemRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef,
            role
        },
        ownerState,
        className: twMerge(classes.root, className)
    });

    const StartAction: React.ElementType = slots.startAction ?? 'span';
    const startActionProps: WithOptionalOwnerState<ListItemStartActionSlotProps> = useSlotProps({
        elementType: StartAction,
        externalSlotProps: slotProps.startAction,
        ownerState,
        className: classes.startAction
    });

    const EndAction: React.ElementType = slots.endAction ?? 'span';
    const endActionProps: WithOptionalOwnerState<ListItemEndActionSlotProps> = useSlotProps({
        elementType: EndAction,
        externalSlotProps: slotProps.endAction,
        ownerState,
        className: classes.startAction
    });

    return (
        <ListSubheaderDispatch.Provider value={setSubheaderId}>
            <NestedListContext.Provider value={nested ? subheaderId || true : false}>
                <Root {...rootProps}>
                    {startAction && <StartAction {...startActionProps}>{startAction}</StartAction>}

                    {React.Children.map(children, (child, index) =>
                        React.isValidElement(child)
                            ? React.cloneElement(child, {
                                  // to let ListItem know when to apply margin(Inline|Block)Start
                                  ...(index === 0 && { 'data-first-child': '' }),
                                  ...(isElement(child, ['ListItem']) && {
                                      // The ListItem of ListItem should not be 'li'
                                      component: child.props.component || 'div'
                                  })
                              })
                            : child
                    )}

                    {endAction && <EndAction {...endActionProps}>{endAction}</EndAction>}
                </Root>
            </NestedListContext.Provider>
        </ListSubheaderDispatch.Provider>
    );
}) as PolymorphicComponent<ListItemTypeMap>;

ListItem.propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * The size of the component (affect other nested list* components).
     * @default 'md'
     */
    size: PropTypes.oneOfType([PropTypes.oneOf(['sm', 'md', 'lg']), PropTypes.string]),
    /**
     * The color of the component.
     * @default 'neutral'
     */
    color: PropTypes.oneOfType([PropTypes.oneOf(['neutral', 'primary', 'danger']), PropTypes.string]),
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: PropTypes.elementType,
    /**
     * The element to display at the end of ListItem.
     */
    endAction: PropTypes.node,
    /**
     * If `true`, the component can contain NestedList.
     * @default false
     */
    nested: PropTypes.bool,
    /**
     * @ignore
     */
    role: PropTypes.string,
    /**
     * The props used for each slot inside.
     * @default {}
     */
    slotProps: PropTypes.shape({
        endAction: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        startAction: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside.
     * @default {}
     */
    slots: PropTypes.shape({
        endAction: PropTypes.elementType,
        root: PropTypes.elementType,
        startAction: PropTypes.elementType
    }),
    /**
     * The element to display at the start of ListItem.
     */
    startAction: PropTypes.node,
    /**
     * If `true`, the component has sticky position (with top = 0).
     * @default false
     */
    sticky: PropTypes.bool,
    /**
     * The variant to use.
     * @default 'solid'
     */
    variant: PropTypes.oneOfType([PropTypes.oneOf(['soft', 'solid']), PropTypes.string])
} as any;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore internal logic to prevent <li> in <li>
ListItem.azrnName = 'ListItem';

export { ListItem };
