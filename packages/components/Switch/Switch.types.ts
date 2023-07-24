import React from 'react';
import { Simplify, OverridableStringUnion } from '../../types';
import { PolymorphicProps, SlotComponentProps, ColorPaletteProp } from '../utils';
import { UseSwitchInputSlotProps, UseSwitchParameters } from '../useSwitch';

export interface SwitchRootSlotPropsOverrides {}
export interface SwitchThumbSlotPropsOverrides {}
export interface SwitchInputSlotPropsOverrides {}
export interface SwitchTrackSlotPropsOverrides {}
export interface SwitchPropsColorOverrides {}

export interface SwitchOwnProps extends UseSwitchParameters {
    /**
     * Class name applied to the root element.
     */
    className?: string;
    /**
     * The color of the component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, SwitchPropsColorOverrides>;
    /**
     * The components used for each slot inside the Switch.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: SwitchSlots;
    /**
     * The props used for each slot inside the Switch.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', SwitchRootSlotPropsOverrides, SwitchOwnerState>;
        thumb?: SlotComponentProps<'span', SwitchThumbSlotPropsOverrides, SwitchOwnerState>;
        input?: SlotComponentProps<'input', SwitchInputSlotPropsOverrides, SwitchOwnerState>;
        track?: SlotComponentProps<'span', SwitchTrackSlotPropsOverrides, SwitchOwnerState>;
    };
}

export interface SwitchSlots {
    /**
     * The component that renders the root.
     * @default 'span'
     */
    root?: React.ElementType;
    /**
     * The component that renders the input.
     * @default 'input'
     */
    input?: React.ElementType;
    /**
     * The component that renders the thumb.
     * @default 'span'
     */
    thumb?: React.ElementType;
    /**
     * The component that renders the track.
     * @default 'span'
     */
    track?: React.ElementType | null;
}

export interface SwitchTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'span'
> {
    props: SwitchOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type SwitchProps<RootComponentType extends React.ElementType = SwitchTypeMap['defaultComponent']> =
    PolymorphicProps<SwitchTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;

export type SwitchOwnerState = Simplify<
    SwitchOwnProps & {
        checked: boolean;
        disabled: boolean;
        focusVisible: boolean;
        readOnly: boolean;
    }
>;

export type SwitchRootSlotProps = {
    ownerState: SwitchOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export type SwitchThumbSlotProps = {
    ownerState: SwitchOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export type SwitchTrackSlotProps = {
    ownerState: SwitchOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export type SwitchInputSlotProps = Simplify<
    UseSwitchInputSlotProps & {
        ownerState: SwitchOwnerState;
        className?: string;
        children?: React.ReactNode;
    }
>;
