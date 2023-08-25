import React from 'react';
import { PolymorphicProps, SlotComponentProps, ColorPaletteProp, VariantProp } from '../../utils';
import { Simplify, OverridableStringUnion } from '../../types';
import { ListPropsSizeOverrides } from '../List';

export interface ListItemRootSlotPropsOverrides {}
export interface ListItemPropsColorOverrides {}
export interface ListItemPropsVariantOverrides {}

export interface ListItemOwnProps {
    children?: React.ReactNode;
    className?: string;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ListItemPropsColorOverrides>;
    /**
     * The size of the component (affect other nested list* components).
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', ListPropsSizeOverrides>;
    /**
     * The element to display at the start of ListItem.
     */
    startAction?: React.ReactNode;
    /**
     * The element to display at the end of ListItem.
     */
    endAction?: React.ReactNode;
    /**
     * If `true`, the component can contain NestedList.
     * @default false
     */
    nested?: boolean;
    /**
     * If `true`, the component has sticky position (with top = 0).
     * @default false
     */
    sticky?: boolean;
    /**
     * @ignore
     */
    role?: string;
    /**
     * @default 'solid'
     */
    variant?: OverridableStringUnion<VariantProp, ListItemPropsVariantOverrides>;
    /**
     * The components used for each slot inside the ListItem.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots?: ListItemSlots;
    /**
     * The props used for each slot.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'li', ListItemRootSlotPropsOverrides, ListItemOwnerState>;
        startAction?: SlotComponentProps<'div', NonNullable<unknown>, ListItemOwnerState>;
        endAction?: SlotComponentProps<'div', NonNullable<unknown>, ListItemOwnerState>;
    };
}

export interface ListItemSlots {
    /**
     * The component that renders the root.
     * @default 'li'
     */
    root?: React.ElementType;
    /**
     * The component that renders the start action.
     * @default 'div'
     */
    startAction?: React.ElementType;
    /**
     * The component that renders the end action.
     * @default 'div'
     */
    endAction?: React.ElementType;
}

export type ListItemOwnerState = Simplify<
    ListItemOwnProps & {
        /**
         * If `true`, the element is rendered in a horizontal list.
         * @internal
         */
        row: boolean;
        /**
         * If `true`, the element is rendered in a wrapped list.
         * @internal
         */
        wrap: boolean;
        /**
         * If `true`, the element is rendered in a nested list item.
         */
        nesting: boolean | string;
        /**
         * @internal
         * The internal prop for controlling CSS margin of the element.
         */
        'data-first-child'?: boolean;
    }
>;

export type ListItemRootSlotProps = {
    ownerState: ListItemOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export type ListItemStartActionSlotProps = {
    ownerState: ListItemOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export type ListItemEndActionSlotProps = {
    ownerState: ListItemOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export interface ListItemTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'li'
> {
    props: ListItemOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type ListItemProps<RootComponentType extends React.ElementType = ListItemTypeMap['defaultComponent']> =
    PolymorphicProps<ListItemTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;
