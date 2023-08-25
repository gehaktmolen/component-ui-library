import React from 'react';
import { PolymorphicProps, SlotComponentProps } from '../../utils';
import { Simplify, OverridableStringUnion } from '../../types';

export interface ListDividerRootSlotPropsOverrides {}

export interface ListDividerInsetOverrides {}

export interface ListDividerOwnProps {
    children?: React.ReactNode;
    className?: string;
    /**
     * The empty space on the side(s) of the divider in a vertical list.
     *
     * For horizontal list (the nearest parent List has `row` prop set to `true`), only `inset="gutter"` affects the list divider.
     * @default 'context'
     */
    inset?: OverridableStringUnion<'context' | 'gutter' | 'startDecorator' | 'startContent', ListDividerInsetOverrides>;
    /**
     * The component orientation.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The components used for each slot inside the ListDivider.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots?: ListDividerSlots;
    /**
     * The props used for each slot.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'li', ListDividerRootSlotPropsOverrides, ListDividerOwnerState>;
    };
}

export interface ListDividerSlots {
    /**
     * The component that renders the root.
     * @default 'li'
     */
    root?: React.ElementType;
}

export type ListDividerOwnerState = Simplify<
    ListDividerOwnProps & {
        /**
         * @internal
         * The internal prop for controlling CSS margin of the element.
         */
        'data-first-child'?: boolean;
        /**
         * @internal
         * The divider is wrapped by a horizontal list.
         */
        row: boolean;
    }
>;

export type ListDividerRootSlotProps = {
    ownerState: ListDividerOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export interface ListDividerTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'li'
> {
    props: ListDividerOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type ListDividerProps<RootComponentType extends React.ElementType = ListDividerTypeMap['defaultComponent']> =
    PolymorphicProps<ListDividerTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;
