import React from 'react';
import { PolymorphicProps, SlotComponentProps } from '../../utils';
import { Simplify } from '../../types';

export interface ListItemTextRootSlotPropsOverrides {}

export interface ListItemTextOwnProps {
    children?: React.ReactNode;
    className?: string;
    /**
     * The components used for each slot inside the ListItemText.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: ListItemTextSlots;
    /**
     * The props used for each slot.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'div', ListItemTextRootSlotPropsOverrides, ListItemTextOwnerState>;
    };
}

export interface ListItemTextSlots {
    /**
     * The component that renders the root.
     * @default 'div'
     */
    root?: React.ElementType;
}

export type ListItemTextOwnerState = Simplify<ListItemTextOwnProps>;

export type ListItemTextRootSlotProps = {
    ownerState: ListItemTextOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export interface ListItemTextTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'div'
> {
    props: ListItemTextOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type ListItemTextProps<RootComponentType extends React.ElementType = ListItemTextTypeMap['defaultComponent']> =
    PolymorphicProps<ListItemTextTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;
