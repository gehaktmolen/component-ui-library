import * as React from 'react';
import { OverrideProps, OverridableTypeMap, OverridableComponent, Simplify } from '../../types';
import { SlotComponentProps } from '../utils';

export interface FormHelperTextRootSlotPropsOverrides {}
export interface FormHelperTextBadgeSlotPropsOverrides {}

export type FormHelperTextOwnerState = Simplify<
    FormHelperTextOwnProps & {
        disabled?: boolean;
    }
>;

export interface FormHelperTextOwnProps {
    /**
     * The component will be added relative to this node.
     */
    children?: React.ReactNode;
    /**
     * The props used for each slot inside the FormHelperText.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', FormHelperTextRootSlotPropsOverrides, FormHelperTextOwnerState>;
        badge?: SlotComponentProps<'span', FormHelperTextBadgeSlotPropsOverrides, FormHelperTextOwnerState>;
    };
    /**
     * The components used for each slot inside the FormHelperText.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: FormHelperTextSlots;
}

export interface FormHelperTextSlots {
    /**
     * The component that renders the root.
     * @default 'span'
     */
    root?: React.ElementType;
}

export interface FormHelperTextTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'span'
> {
    props: FormHelperTextOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

/**
 * Utility to create component types that inherit props from FormHelperText.
 */
export interface ExtendFormHelperTextTypeMap<M extends OverridableTypeMap> {
    props: M['props'] & FormHelperTextTypeMap['props'];
    defaultComponent: M['defaultComponent'];
}

export type ExtendBadge<M extends OverridableTypeMap> = OverridableComponent<ExtendFormHelperTextTypeMap<M>>;

export type FormHelperTextProps<
    RootComponentType extends React.ElementType = FormHelperTextTypeMap['defaultComponent']
> = OverrideProps<FormHelperTextTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType> & {
    component?: RootComponentType;
};

export type FormHelperTextRootSlotProps = {
    children?: React.ReactNode;
    className?: string;
    ownerState: FormHelperTextOwnerState;
    ref: React.Ref<HTMLSpanElement>;
};
