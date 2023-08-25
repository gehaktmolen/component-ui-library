import React from 'react';
import { PolymorphicProps, SlotComponentProps } from '../../utils';
import { Simplify } from '../../types';

export interface DividerRootSlotPropsOverrides {}

export interface DividerOwnProps {
    children?: React.ReactNode;
    className?: string;
    /**
     * The components used for each slot inside the Divider.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: DividerSlots;
    /**
     * The props used for each slot.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'div', DividerRootSlotPropsOverrides, DividerOwnerState>;
    };
}

export interface DividerSlots {
    /**
     * The component that renders the root.
     * @default 'span'
     */
    root?: React.ElementType;
}

export type DividerOwnerState = Simplify<
    DividerOwnProps & {
        /**
         * @internal
         * The orientation of the divider.
         */
        orientation: 'horizontal' | 'vertical';
    }
>;

export type DividerRootSlotProps = {
    ownerState: DividerOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export interface DividerTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'div'
> {
    props: DividerOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type DividerProps<RootComponentType extends React.ElementType = DividerTypeMap['defaultComponent']> =
    PolymorphicProps<DividerTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;
