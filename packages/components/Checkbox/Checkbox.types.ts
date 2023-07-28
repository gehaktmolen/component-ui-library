import React from 'react';
import { Simplify, OverridableStringUnion } from '../../types';
import { PolymorphicProps, SlotComponentProps, ColorPaletteProp } from '../utils';
import { UseSwitchInputSlotProps, UseSwitchParameters } from '../useSwitch';

export interface CheckboxRootSlotPropsOverrides {}
export interface CheckboxLabelContainerSlotPropsOverrides {}
export interface CheckboxInputSlotPropsOverrides {}
export interface CheckboxInputContainerSlotPropsOverrides {}
export interface CheckboxPropsColorOverrides {}

export interface CheckboxOwnProps extends UseSwitchParameters {
    /**
     * Class name applied to the root element.
     */
    className?: string;
    /**
     * The color of the component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, CheckboxPropsColorOverrides>;
    /**
     * The components used for each slot inside the Checkbox.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: CheckboxSlots;
    /**
     * The props used for each slot inside the Checkbox.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', CheckboxRootSlotPropsOverrides, CheckboxOwnerState>;
        labelContainer?: SlotComponentProps<'div', CheckboxLabelContainerSlotPropsOverrides, CheckboxOwnerState>;
        input?: SlotComponentProps<'input', CheckboxInputSlotPropsOverrides, CheckboxOwnerState>;
        inputContainer?: SlotComponentProps<'div', CheckboxInputContainerSlotPropsOverrides, CheckboxOwnerState>;
    };
}

export interface CheckboxSlots {
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
     * The component that renders the container of the label.
     * @default 'div'
     */
    labelContainer?: React.ElementType;
    /**
     * The component that renders the container of the input.
     * @default 'div'
     */
    inputContainer?: React.ElementType | null;
}

export interface CheckboxTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'span'
> {
    props: CheckboxOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type CheckboxProps<RootComponentType extends React.ElementType = CheckboxTypeMap['defaultComponent']> =
    PolymorphicProps<CheckboxTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;

export type CheckboxOwnerState = Simplify<
    CheckboxOwnProps & {
        checked: boolean;
        disabled: boolean;
        focusVisible: boolean;
        readOnly: boolean;
    }
>;

export type CheckboxRootSlotProps = {
    ownerState: CheckboxOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export type CheckboxLabelContainerSlotProps = {
    ownerState: CheckboxOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export type CheckboxInputContainerSlotProps = {
    ownerState: CheckboxOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export type CheckboxInputSlotProps = Simplify<
    UseSwitchInputSlotProps & {
        ownerState: CheckboxOwnerState;
        className?: string;
        children?: React.ReactNode;
    }
>;
