import React from 'react';
import type { Simplify, OverridableStringUnion } from '../../types';
import type { PolymorphicProps, ColorPaletteProp, SlotComponentProps } from '../../utils';
import type { UseToggleInputSlotProps, UseToggleParameters } from '../useToggle';

export interface ToggleRootSlotPropsOverrides {}
export interface ToggleThumbSlotPropsOverrides {}
export interface ToggleInputSlotPropsOverrides {}
export interface ToggleTrackSlotPropsOverrides {}
export interface TogglePropsColorOverrides {}

export interface ToggleOwnProps extends UseToggleParameters {
    /**
     * Class name applied to the root element.
     */
    className?: string;
    /**
     * The color of the component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, TogglePropsColorOverrides>;
    /**
     * The components used for each slot inside the Toggle.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: ToggleSlots;
    /**
     * The props used for each slot inside the Toggle.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', ToggleRootSlotPropsOverrides, ToggleOwnerState>;
        thumb?: SlotComponentProps<'span', ToggleThumbSlotPropsOverrides, ToggleOwnerState>;
        input?: SlotComponentProps<'input', ToggleInputSlotPropsOverrides, ToggleOwnerState>;
        track?: SlotComponentProps<'span', ToggleTrackSlotPropsOverrides, ToggleOwnerState>;
    };
}

export interface ToggleSlots {
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

export interface ToggleTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'span'
> {
    props: ToggleOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type ToggleProps<RootComponentType extends React.ElementType = ToggleTypeMap['defaultComponent']> =
    PolymorphicProps<ToggleTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;

export type ToggleOwnerState = Simplify<
    ToggleOwnProps & {
        checked: boolean;
        disabled: boolean;
        focusVisible: boolean;
        readOnly: boolean;
    }
>;

export type ToggleRootSlotProps = {
    ownerState: ToggleOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export type ToggleThumbSlotProps = {
    ownerState: ToggleOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export type ToggleTrackSlotProps = {
    ownerState: ToggleOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export type ToggleInputSlotProps = Simplify<
    UseToggleInputSlotProps & {
        ownerState: ToggleOwnerState;
        className?: string;
        children?: React.ReactNode;
    }
>;
