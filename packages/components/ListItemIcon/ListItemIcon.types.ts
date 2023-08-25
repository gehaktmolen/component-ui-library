import React from 'react';
import { PolymorphicProps, SlotComponentProps } from '../../utils';
import { Simplify } from '../../types';

export interface ListItemIconRootSlotPropsOverrides {}

export interface ListItemIconOwnProps {
    children?: React.ReactNode;
    className?: string;
    /**
     * The components used for each slot inside the ListItemIcon.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: ListItemIconSlots;
    /**
     * The props used for each slot.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', ListItemIconRootSlotPropsOverrides, ListItemIconOwnerState>;
    };
}

export interface ListItemIconSlots {
    /**
     * The component that renders the root.
     * @default 'span'
     */
    root?: React.ElementType;
}

export type ListItemIconOwnerState = Simplify<
    ListItemIconOwnProps & {
        /**
         * @internal
         * The orientation of the parent ListItemButton.
         */
        parentOrientation: 'horizontal' | 'vertical';
    }
>;

export type ListItemIconRootSlotProps = {
    ownerState: ListItemIconOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export interface ListItemIconTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'span'
> {
    props: ListItemIconOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type ListItemIconProps<RootComponentType extends React.ElementType = ListItemIconTypeMap['defaultComponent']> =
    PolymorphicProps<ListItemIconTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;
