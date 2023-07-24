import * as React from 'react';
import { OverrideProps, OverridableTypeMap, OverridableComponent, Simplify } from '../../types';
import { SlotComponentProps } from '../utils';

export interface FormLabelRootSlotPropsOverrides {}
export interface FormLabelBadgeSlotPropsOverrides {}

export type FormLabelOwnerState = Simplify<
    FormLabelOwnProps & {
        disabled?: boolean;
    }
>;


export interface FormLabelOwnProps {
    /**
     * The component will be added relative to this node.
     */
    children?: React.ReactNode;
    /**
     * The props used for each slot inside the FormLabel.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', FormLabelRootSlotPropsOverrides, FormLabelOwnerState>;
        badge?: SlotComponentProps<'span', FormLabelBadgeSlotPropsOverrides, FormLabelOwnerState>;
    };
    /**
     * The components used for each slot inside the FormLabel.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: FormLabelSlots;
}

export interface FormLabelSlots {
    /**
     * The component that renders the root.
     * @default 'span'
     */
    root?: React.ElementType;
}

export interface FormLabelTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'span'
> {
    props: FormLabelOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

/**
 * Utility to create component types that inherit props from FormLabel.
 */
export interface ExtendFormLabelTypeMap<M extends OverridableTypeMap> {
    props: M['props'] & FormLabelTypeMap['props'];
    defaultComponent: M['defaultComponent'];
}

export type ExtendBadge<M extends OverridableTypeMap> = OverridableComponent<ExtendFormLabelTypeMap<M>>;

export type FormLabelProps<RootComponentType extends React.ElementType = FormLabelTypeMap['defaultComponent']> = OverrideProps<
    FormLabelTypeMap<NonNullable<unknown>, RootComponentType>,
    RootComponentType
> & {
    component?: RootComponentType;
};

export type FormLabelRootSlotProps = {
    children?: React.ReactNode;
    className?: string;
    ownerState: FormLabelOwnerState;
    ref: React.Ref<HTMLSpanElement>;
};
