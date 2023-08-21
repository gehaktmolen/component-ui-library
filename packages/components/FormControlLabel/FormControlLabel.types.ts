import * as React from 'react';
import type { OverrideProps, OverridableTypeMap, OverridableComponent, Simplify } from '../../types';
import type { SlotComponentProps } from '../../utils';

export interface FormControlLabelRootSlotPropsOverrides {}
export interface FormControlLabelStackSlotPropsOverrides {}
export interface FormControlLabelAsteriskSlotPropsOverrides {}
export interface FormControlLabelLabelSlotPropsOverrides {}

export type FormControlLabelOwnerState = Simplify<
    FormControlLabelOwnProps & {
        disabled?: boolean;
        error?: boolean;
        filled?: boolean;
        focused?: boolean;
    }
>;

export interface FormControlLabelOwnProps {
    /**
     * If `true`, the component appears selected.
     */
    checked?: boolean;
    /**
     * The component will be added relative to this node.
     */
    children?: React.ReactNode;
    /**
     * A control element. For instance, it can be a `Radio`, a `Toggle` or a `CheckBox`.
     */
    control: React.ReactElement<any, any>;
    /**
     * If `true`, the control is disabled.
     */
    disabled?: boolean;
    /**
     * If `true`, the label is displayed in an error state.
     * @default false
     */
    error?: boolean;
    /**
     * A text or an element to be used in an enclosing label element.
     */
    label: React.ReactNode;
    /**
     * The position of the label.
     * @default 'end'
     */
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
    /**
     * If `true`, the label will indicate that the `input` is required.
     */
    required?: boolean;
    /**
     * The props used for each slot inside the FormControlLabel.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', FormControlLabelRootSlotPropsOverrides, FormControlLabelOwnerState>;
        stack?: SlotComponentProps<'div', FormControlLabelStackSlotPropsOverrides, FormControlLabelOwnerState>;
        asterisk?: SlotComponentProps<'span', FormControlLabelAsteriskSlotPropsOverrides, FormControlLabelOwnerState>;
        label?: SlotComponentProps<'span', FormControlLabelLabelSlotPropsOverrides, FormControlLabelOwnerState>;
    };
    /**
     * The components used for each slot inside the FormControlLabel.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: FormControlLabelSlots;
}

export interface FormControlLabelSlots {
    /**
     * The component that renders the root.
     * @default 'span'
     */
    root?: React.ElementType;
    /**
     * The component that renders the content of the label.
     * @default 'div'
     */
    stack?: React.ElementType;
    /**
     * The component that renders asterisk character for required option.
     * @default 'span'
     */
    asterisk?: React.ElementType;
    /**
     * The component that renders the label container.
     * @default 'span'
     */
    label?: React.ElementType;
}

export interface FormControlLabelTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'span'
> {
    props: FormControlLabelOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

/**
 * Utility to create component types that inherit props from FormControlLabel.
 */
export interface ExtendFormControlLabelTypeMap<M extends OverridableTypeMap> {
    props: M['props'] & FormControlLabelTypeMap['props'];
    defaultComponent: M['defaultComponent'];
}

export type ExtendFormControlLabel<M extends OverridableTypeMap> = OverridableComponent<
    ExtendFormControlLabelTypeMap<M>
>;

export type FormControlLabelProps<
    RootComponentType extends React.ElementType = FormControlLabelTypeMap['defaultComponent']
> = OverrideProps<FormControlLabelTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType> & {
    component?: RootComponentType;
};

export type FormControlLabelRootSlotProps = {
    children?: React.ReactNode;
    className?: string;
    ownerState: FormControlLabelOwnerState;
    ref: React.Ref<HTMLSpanElement>;
};

export type FormControlLabelStackSlotProps = {
    ownerState: FormControlLabelOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export type FormControlLabelAsteriskSlotProps = {
    ownerState: FormControlLabelOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export type FormControlLabelLabelSlotProps = {
    ownerState: FormControlLabelOwnerState;
    className?: string;
    children?: React.ReactNode;
};
