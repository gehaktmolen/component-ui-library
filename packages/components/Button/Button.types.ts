import * as React from 'react';
import { Simplify, OverridableStringUnion } from '../../types';
import { UseButtonParameters, UseButtonRootSlotProps } from '../useButton';
import { SlotComponentProps, PolymorphicProps } from '../utils';

export interface ButtonPropsVariantOverrides {
}

export interface ButtonActions {
    focusVisible(): void;
}

export interface ButtonRootSlotPropsOverrides {
}

export interface ButtonPropsColorOverrides {
}

export interface ButtonPropsSizeOverrides {
}

export interface ButtonOwnProps extends Omit<UseButtonParameters, 'rootRef'> {
    /**
     * A ref for imperative actions. It currently only supports `focusVisible()` action.
     */
    action?: React.Ref<ButtonActions>;
    children?: React.ReactNode;
    className?: string;
    /**
     * The props used for each slot inside the Button.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'button', ButtonRootSlotPropsOverrides, ButtonOwnerState>;
    };
    /**
     * The components used for each slot inside the Button.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots?: ButtonSlots;
    /**
     * The variant to use.
     * @default 'text'
     */
    variant?: OverridableStringUnion<
        'text' | 'outlined' | 'contained',
        ButtonPropsVariantOverrides
    >;
    /**
     * The size of the component.
     * `small` is equivalent to the dense button styling.
     * @default 'medium'
     */
    size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>;
    /**
     * Element placed before the children.
     */
    startIcon?: React.ReactNode;
    /**
     * Element placed after the children.
     */
    endIcon?: React.ReactNode;
    /**
     * If `true`, no elevation is used.
     * @default false
     */
    disableElevation?: boolean;
    /**
     * If `true`, the button will take up the full width of its container.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * The color of the component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<
        'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
        ButtonPropsColorOverrides
    >;
}

export interface ButtonSlots {
    /**
     * The component that renders the root.
     * @default props.href || props.to ? 'a' : 'button'
     */
    root?: React.ElementType;
}

export type ButtonProps<
    RootComponentType extends React.ElementType = ButtonTypeMap['defaultComponent'],
> = PolymorphicProps<ButtonTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;

export interface ButtonTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'button',
> {
    props: ButtonOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type ButtonOwnerState = Simplify<
    ButtonOwnProps & {
    active: boolean;
    focusVisible: boolean;
}
>;

export type ButtonRootSlotProps = Simplify<
    UseButtonRootSlotProps & {
    ownerState: ButtonOwnerState;
    className?: string;
    children?: React.ReactNode;
}
>;
