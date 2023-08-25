import * as React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import type {
    ListDividerProps,
    ListDividerOwnerState,
    ListDividerRootSlotProps,
    ListDividerTypeMap
} from './ListDivider.types';
import {
    generateUtilityClass,
    useClassNamesOverride,
    composeClasses,
    WithOptionalOwnerState,
    useSlotProps,
    PolymorphicComponent
} from '../../utils';
import RowListContext from '../List/RowListContext';
import ComponentListContext from '../List/ComponentListContext';

const useUtilityClasses = (ownerState: ListDividerOwnerState) => {
    const { inset, row } = ownerState;

    const slots = {
        root: [
            'relative',
            row && '',
            inset === 'context' && '',
            inset === 'gutter' && '',
            inset === 'startDecorator' && '',
            inset === 'startContent' && '',
            ownerState['data-first-child'] === undefined && ''
        ],
        borderContainer: ['absolute inset-0 flex items-center'],
        border: ['w-full border-t border-primary-300']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const ListDivider = React.forwardRef(function ListDivider<RootComponentType extends React.ElementType>(
    props: ListDividerProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const row = React.useContext(RowListContext);
    const listComponent = React.useContext(ComponentListContext);

    const {
        className,
        inset = 'context',
        component: componentProp,
        role: roleProp,
        orientation: orientationProp,
        slotProps = {},
        slots = {},
        ...other
    } = props;

    const [listElement] = listComponent?.split(':') || ['', ''];
    const component = componentProp || (listElement && !listElement.match(/^(ul|ol|menu)$/) ? 'div' : 'li');
    const role = roleProp || (component === 'li' ? 'separator' : undefined);
    const orientation = orientationProp || (row ? 'vertical' : 'horizontal');

    const ownerState: ListDividerOwnerState = {
        ...props,
        inset,
        row,
        orientation,
        component,
        role
    };

    const classes = useUtilityClasses(ownerState);

    const Root: React.ElementType = slots.root ?? 'li';
    const rootProps: WithOptionalOwnerState<ListDividerRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef,
            role,
            ...(role === 'separator' &&
                orientation === 'vertical' && {
                    // The implicit aria-orientation of separator is 'horizontal'
                    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role
                    'aria-orientation': 'vertical'
                })
        },
        ownerState,
        className: twMerge(classes.root, className)
    });

    return (
        <Root {...rootProps}>
            <div className={classes.borderContainer} aria-hidden="true">
                <div className={classes.border} />
            </div>
        </Root>
    );
}) as PolymorphicComponent<ListDividerTypeMap>;

ListDivider.propTypes = {
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
     * The empty space on the side(s) of the divider in a vertical list.
     *
     * For horizontal list (the nearest parent List has `row` prop set to `true`), only `inset="gutter"` affects the list divider.
     * @default 'context'
     */
    inset: PropTypes.oneOfType([
        PropTypes.oneOf(['context', 'gutter', 'startDecorator', 'startContent']),
        PropTypes.string
    ]),
    /**
     * The component orientation.
     * @default 'horizontal'
     */
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    /**
     * @ignore
     */
    role: PropTypes.string,
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

export { ListDivider };
