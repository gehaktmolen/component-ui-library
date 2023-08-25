import React from 'react';
import { PolymorphicProps, SlotComponentProps, ColorPaletteProp } from '../../utils';
import { Simplify, OverridableStringUnion } from '../../types';

export interface RadioGroupRootSlotPropsOverrides {}
export interface RadioGroupPropsColorOverrides {}

export interface RadioGroupOwnProps {
    children?: React.ReactNode;
    className?: string;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, RadioGroupPropsColorOverrides>;
    /**
     * The components used for each slot inside the RadioGroup.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots?: RadioGroupSlots;
    /**
     * The props used for each slot.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'div', RadioGroupRootSlotPropsOverrides, RadioGroupOwnerState>;
    };
}

export interface RadioGroupSlots {
    /**
     * The component that renders the root.
     * @default 'div'
     */
    root?: React.ElementType;
}

export type RadioGroupOwnerState = Simplify<RadioGroupOwnProps>;

export type RadioGroupRootSlotProps = {
    ownerState: RadioGroupOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export interface RadioGroupTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'div'
> {
    props: RadioGroupOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type RadioGroupProps<RootComponentType extends React.ElementType = RadioGroupTypeMap['defaultComponent']> =
    PolymorphicProps<RadioGroupTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;
