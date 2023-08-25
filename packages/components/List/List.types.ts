import React from 'react';
import { PolymorphicProps, SlotComponentProps, ColorPaletteProp, VariantProp } from '../../utils';
import { Simplify, OverridableStringUnion } from '../../types';

export interface ListRootSlotPropsOverrides {}
export interface ListPropsColorOverrides {}
export interface ListPropsVariantOverrides {}
export interface ListPropsSizeOverrides {}

export interface ListOwnProps {
    children?: React.ReactNode;
    className?: string;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ListPropsColorOverrides>;
    /**
     * @default 'solid'
     */
    variant?: OverridableStringUnion<VariantProp, ListPropsVariantOverrides>;
    /**
     * The component orientation.
     * @default 'vertical'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The size of the component (affect other nested list* components).
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', ListPropsSizeOverrides>;
    /**
     * @ignore
     */
    role?: string;
    /**
     * The components used for each slot inside the List.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: ListSlots;
    /**
     * The props used for each slot.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'ul', ListRootSlotPropsOverrides, ListOwnerState>;
    };
    /**
     * Only for horizontal list.
     * If `true`, the list sets the flex-wrap to "wrap" and adjust margin to have gap-like behavior (will move to `gap` in the future).
     *
     * @default false
     */
    wrap?: boolean;
}

export interface ListSlots {
    /**
     * The component that renders the root.
     * @default 'ul'
     */
    root?: React.ElementType;
}

export type ListOwnerState = Simplify<
    ListOwnProps & {
        /**
         * @internal
         * The explicit size specified on the element instance.
         */
        instanceSize?: ListProps['size'];
        /**
         * @internal
         * If `true`, the element is rendered in a nested list item.
         */
        nesting?: boolean | string;
    }
>;

export type ListRootSlotProps = {
    ownerState: ListOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export interface ListTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'ul'
> {
    props: ListOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type ListProps<RootComponentType extends React.ElementType = ListTypeMap['defaultComponent']> = PolymorphicProps<
    ListTypeMap<NonNullable<unknown>, RootComponentType>,
    RootComponentType
>;

export type ListState = Pick<ListOwnProps, 'color' | 'size' | 'variant'>;
