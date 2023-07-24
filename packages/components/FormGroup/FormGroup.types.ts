import * as React from 'react';
import { OverrideProps, OverridableTypeMap, OverridableComponent, Simplify } from '../../types';
import { SlotComponentProps } from '../utils';

export interface FormGroupRootSlotPropsOverrides {}

export type FormGroupOwnerState = Simplify<
    FormGroupOwnProps & {
        disabled?: boolean;
    }
>;

export interface FormGroupOwnProps {
    /**
     * The component will be added relative to this node.
     */
    children?: React.ReactNode;
    /**
     * Display group of elements in a compact row.
     * @default false
     */
    row?: boolean;
    /**
     * The props used for each slot inside the FormGroup.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', FormGroupRootSlotPropsOverrides, FormGroupOwnerState>;
    };
    /**
     * The components used for each slot inside the FormGroup.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: FormGroupSlots;
}

export interface FormGroupSlots {
    /**
     * The component that renders the root.
     * @default 'span'
     */
    root?: React.ElementType;
}

export interface FormGroupTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'span'
> {
    props: FormGroupOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

/**
 * Utility to create component types that inherit props from FormGroup.
 */
export interface ExtendFormGroupTypeMap<M extends OverridableTypeMap> {
    props: M['props'] & FormGroupTypeMap['props'];
    defaultComponent: M['defaultComponent'];
}

export type ExtendBadge<M extends OverridableTypeMap> = OverridableComponent<ExtendFormGroupTypeMap<M>>;

export type FormGroupProps<RootComponentType extends React.ElementType = FormGroupTypeMap['defaultComponent']> =
    OverrideProps<FormGroupTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType> & {
        component?: RootComponentType;
    };

export type FormGroupRootSlotProps = {
    children?: React.ReactNode;
    className?: string;
    ownerState: FormGroupOwnerState;
    ref: React.Ref<HTMLSpanElement>;
};
