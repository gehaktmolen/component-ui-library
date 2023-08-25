import React from 'react';
import { PolymorphicProps, SlotComponentProps, ColorPaletteProp } from '../../utils';
import { Simplify, OverridableStringUnion } from '../../types';

export interface RadioRootSlotPropsOverrides {}
export interface RadioPropsColorOverrides {}
export interface RadioPropsSizeOverrides {}

export interface RadioOwnProps {
    children?: React.ReactNode;
    className?: string;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, RadioPropsColorOverrides>;
    /**
     * The size of the component.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', RadioPropsSizeOverrides>;
    /**
     * If `true`, the root element's position is set to initial which allows the action area to fill the nearest positioned parent.
     * This prop is useful for composing Radio with ListItem component.
     * @default false
     */
    overlay?: boolean;
    /**
     * If `true`, the checked icon is removed and the selected variant is applied on the `action` element instead.
     * @default false
     */
    disableIcon?: boolean;
    /**
     * The components used for each slot inside the Radio.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots?: RadioSlots;
    /**
     * The props used for each slot.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'div', RadioRootSlotPropsOverrides, RadioOwnerState>;
    };
}

export interface RadioSlots {
    /**
     * The component that renders the root.
     * @default 'div'
     */
    root?: React.ElementType;
}

export type RadioOwnerState = Simplify<RadioOwnProps>;

export type RadioRootSlotProps = {
    ownerState: RadioOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export interface RadioTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'div'
> {
    props: RadioOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type RadioProps<RootComponentType extends React.ElementType = RadioTypeMap['defaultComponent']> =
    PolymorphicProps<RadioTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;
