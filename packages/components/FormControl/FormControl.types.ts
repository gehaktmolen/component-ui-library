import * as React from 'react';
import { Simplify, OverridableStringUnion } from '../../types';
import { PolymorphicProps, SlotComponentProps, ColorPaletteProp } from '../utils';

export type NativeFormControlElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export interface FormControlRootSlotPropsOverrides {}
export interface FormControlPropsSizeOverrides {}
export interface FormControlPropsColorOverrides {}

export interface FormControlOwnProps {
    /**
     * The content of the component.
     */
    children?: React.ReactNode | ((state: FormControlState) => React.ReactNode);
    /**
     * Class name applied to the root element.
     */
    className?: string;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: OverridableStringUnion<ColorPaletteProp, FormControlPropsColorOverrides>;
    /**
     * The default value of the form element.
     */
    defaultValue?: unknown;
    /**
     * If `true`, the children are in disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, the children will indicate an error.
     * @default false
     */
    error?: boolean;
    /**
     * Callback fired when the form element's value is modified.
     */
    onChange?: React.ChangeEventHandler<NativeFormControlElement>;
    /**
     * The content direction flow.
     * @default 'vertical'
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * If `true`, the user must specify a value for the input before the owning form can be submitted.
     * If `true`, the asterisk appears on the FormLabel.
     * @default false
     */
    required?: boolean;
    /**
     * The props used for each slot inside the FormControl.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'div', FormControlRootSlotPropsOverrides, FormControlOwnerState>;
    };
    /**
     * The components used for each slot inside the FormControl.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: FormControlSlots;
    /**
     * The size of the component.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', FormControlPropsSizeOverrides>;
    /**
     * The value of the form element.
     */
    value?: unknown;
}

export interface FormControlSlots {
    /**
     * The component that renders the root.
     * @default 'div'
     */
    root?: React.ElementType;
}

export interface FormControlTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'div'
> {
    props: FormControlOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type FormControlProps<RootComponentType extends React.ElementType = FormControlTypeMap['defaultComponent']> =
    PolymorphicProps<FormControlTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;

type NonOptionalOwnerState = 'disabled' | 'error' | 'required' | 'size' | 'color';

export type FormControlOwnerState = Simplify<
    Omit<FormControlOwnProps, NonOptionalOwnerState> &
        Required<Pick<FormControlProps, NonOptionalOwnerState>> & {
            filled: boolean;
            focused: boolean;
        }
>;

export type FormControlState = {
    labelId: string;
    htmlFor: string | undefined;
    'aria-describedby': string | undefined;
    setHelperText: (node: null | HTMLElement) => void;
    registerEffect: () => () => void;

    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: OverridableStringUnion<ColorPaletteProp, FormControlPropsColorOverrides>;
    /**
     * If `true`, the children are in disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, the children will indicate an error.
     * @default false
     */
    error?: boolean;
    /**
     * If `true`, the form element has some value.
     */
    filled: boolean;
    /**
     * If `true`, the form element is focused and not disabled.
     */
    focused: boolean;
    /**
     * Callback fired when the form element has lost focus.
     */
    onBlur: () => void;
    /**
     * Callback fired when the form element's value is modified.
     */
    onChange: React.ChangeEventHandler<NativeFormControlElement>;
    /**
     * Callback fired when the form element receives focus.
     */
    onFocus: () => void;
    /**
     * If `true`, the user must specify a value for the input before the owning form can be submitted.
     * If `true`, the asterisk appears on the FormLabel.
     * @default false
     */
    required?: boolean;
    /**
     * The size of the component.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', FormControlPropsSizeOverrides>;
    /**
     * The value of the form element.
     */
    value: unknown;
};

export type FormControlRootSlotProps = {
    children: React.ReactNode | ((state: FormControlState) => React.ReactNode);
    className?: string;
    ownerState: FormControlOwnerState;
};

export interface UseFormControlContextReturnValue extends FormControlState {}
