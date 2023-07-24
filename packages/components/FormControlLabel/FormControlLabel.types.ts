import * as React from 'react';
import { OverrideProps, OverridableTypeMap, OverridableComponent, Simplify } from '../../types';
import { SlotComponentProps } from '../utils';

export interface FormControlLabelRootSlotPropsOverrides {}
export interface FormControlLabelBadgeSlotPropsOverrides {}

export type FormControlLabelOwnerState = Simplify<
    FormControlLabelOwnProps & {
        disabled?: boolean;
    }
>;

export interface FormControlLabelOwnProps {
    /**
     * The component will be added relative to this node.
     */
    children?: React.ReactNode;
    /**
     * The props used for each slot inside the FormControlLabel.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', FormControlLabelRootSlotPropsOverrides, FormControlLabelOwnerState>;
        badge?: SlotComponentProps<'span', FormControlLabelBadgeSlotPropsOverrides, FormControlLabelOwnerState>;
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

export type ExtendBadge<M extends OverridableTypeMap> = OverridableComponent<ExtendFormControlLabelTypeMap<M>>;

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
