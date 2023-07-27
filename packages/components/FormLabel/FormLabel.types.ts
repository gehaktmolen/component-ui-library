import * as React from 'react';
import { Simplify } from '../../types';
import { FormControlState } from '../FormControl';
import { UseFormLabelParameters, UseFormLabelRootSlotProps } from '../useFormLabel';
import { PolymorphicProps, SlotComponentProps } from '../utils';

export interface FormLabelRootSlotPropsOverrides {}
export interface FormLabelAsteriskSlotPropsOverrides {}

export type FormLabelOwnProps = Omit<UseFormLabelParameters, 'error'> & {
    /**
     * Class name applied to the root element.
     */
    className?: string;
    /**
     * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `Azrn-error` class on the root element.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    error?: boolean;
    /**
     * The props used for each slot inside the FormLabel.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'label', FormLabelRootSlotPropsOverrides, FormLabelOwnerState>;
        asterisk?: SlotComponentProps<'span', FormLabelAsteriskSlotPropsOverrides, FormLabelOwnerState>;
    };
    /**
     * The components used for each slot inside the FormLabelBase.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: FormLabelSlots;
};

export interface FormLabelSlots {
    /**
     * The component that renders the root.
     * @default 'label'
     */
    root?: React.ElementType;
    /**
     * The component that renders the input.
     * @default 'span'
     */
    asterisk?: React.ElementType;
}

export interface FormLabelTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'label'
> {
    props: FormLabelOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type FormLabelProps<RootComponentType extends React.ElementType = FormLabelTypeMap['defaultComponent']> =
    PolymorphicProps<FormLabelTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;

export type FormLabelOwnerState = Simplify<
    FormLabelOwnProps & {
        formControlContext: FormControlState | undefined;
    }
>;

export type FormLabelRootSlotProps = Simplify<
    UseFormLabelRootSlotProps & {
        ownerState: FormLabelOwnerState;
        className?: string;
        children?: React.ReactNode;
        ref?: React.Ref<HTMLLabelElement>;
    }
>;

export type FormLabelAsteriskSlotProps = Simplify<
    Omit<UseFormLabelRootSlotProps, 'onClick'> & {
        className?: string;
        ownerState: FormLabelOwnerState;
        ref: React.Ref<HTMLSpanElement>;
    }
>;
