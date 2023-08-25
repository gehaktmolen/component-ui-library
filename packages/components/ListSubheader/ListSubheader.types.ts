import React from 'react';
import { PolymorphicProps, SlotComponentProps, ColorPaletteProp, VariantProp } from '../../utils';
import { Simplify, OverridableStringUnion } from '../../types';

export interface ListSubheaderRootSlotPropsOverrides {}
export interface ListItemPropsColorOverrides {}
export interface ListItemPropsVariantOverrides {}
export interface ListItemSizePropsSizeOverrides {}

export interface ListSubheaderOwnProps {
    children?: React.ReactNode;
    className?: string;
    /**
     * The id of the subheader. If not provided, it will be generated.
     */
    id?: string;
    /**
     * If `true`, the component has sticky position (with top = 0).
     * @default false
     */
    sticky?: boolean;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ListItemPropsColorOverrides>;
    /**
     * @default 'solid'
     */
    variant?: OverridableStringUnion<VariantProp, ListItemPropsVariantOverrides>;
    /**
     * The size of the component (affect other nested list* components).
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', ListItemSizePropsSizeOverrides>;
    /**
     * The components used for each slot inside the ListSubheader.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots?: ListSubheaderSlots;
    /**
     * The props used for each slot.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'div', ListSubheaderRootSlotPropsOverrides, ListSubheaderOwnerState>;
    };
}

export interface ListSubheaderSlots {
    /**
     * The component that renders the root.
     * @default 'div'
     */
    root?: React.ElementType;
}

export type ListSubheaderOwnerState = Simplify<ListSubheaderOwnProps>;

export type ListSubheaderRootSlotProps = {
    ownerState: ListSubheaderOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export interface ListSubheaderTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'div'
> {
    props: ListSubheaderOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type ListSubheaderProps<RootComponentType extends React.ElementType = ListSubheaderTypeMap['defaultComponent']> =
    PolymorphicProps<ListSubheaderTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;
