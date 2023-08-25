import * as React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import type { ListSubheaderProps, ListSubheaderOwnerState, ListSubheaderRootSlotProps } from './ListSubheader.types';
import {
    generateUtilityClass,
    useClassNamesOverride,
    composeClasses,
    WithOptionalOwnerState,
    useSlotProps,
    useColorInversion,
    useId,
    PolymorphicComponent
} from '../../utils';
import ListSubheaderDispatch from './ListSubheaderContext';
import { ListSubheaderTypeMap } from './ListSubheader.types';
import ListContext from '../List/ListContext.ts';

const useUtilityClasses = (ownerState: ListSubheaderOwnerState) => {
    const { variant, color, sticky } = ownerState;
    const slots = {
        root: ['root', sticky && 'sticky', color && `color${color}`, variant && `variant${variant}`]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const ListSubheader = React.forwardRef(function ListSubheader<RootComponentType extends React.ElementType>(
    props: ListSubheaderProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const list = React.useContext(ListContext);

    const {
        component,
        className,
        children,
        id: idOverride,
        sticky = false,
        size: sizeProp = 'md',
        variant: variantProp = 'solid',
        color: colorProp = 'neutral',
        slots = {},
        slotProps = {},
        ...other
    } = props;

    const variant = list?.variant || variantProp;
    const size = list?.size || sizeProp;
    const { getColor } = useColorInversion(variant);
    const color = getColor(props.color, colorProp);
    const id = useId(idOverride);
    const setSubheaderId = React.useContext(ListSubheaderDispatch);

    React.useEffect(() => {
        if (setSubheaderId) {
            setSubheaderId(id || '');
        }
    }, [setSubheaderId, id]);

    const ownerState = {
        ...props,
        id,
        sticky,
        variant,
        size,
        color: variant ? color ?? 'neutral' : color
    };

    const classes = useUtilityClasses(ownerState);

    const Root: React.ElementType = slots.root ?? 'div';
    const rootProps: WithOptionalOwnerState<ListSubheaderRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            as: component,
            ref: forwardedRef
        },
        ownerState,
        className: twMerge(classes.root, className)
    });

    return <Root {...rootProps}>{children}</Root>;
}) as PolymorphicComponent<ListSubheaderTypeMap>;

ListSubheader.propTypes = {
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
    id: PropTypes.string,
    /**
     * If `true`, the component has sticky position (with top = 0).
     * @default false
     */
    sticky: PropTypes.bool,
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
     * The size of the component (affect other nested list* components).
     * @default 'md'
     */
    size: PropTypes.oneOfType([PropTypes.oneOf(['sm', 'md', 'lg']), PropTypes.string]),
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

export { ListSubheader };
