import * as React from 'react';
import { OverrideProps, OverridableTypeMap, OverridableComponent, Simplify } from '../../types';
import { SlotComponentProps } from '../utils';

export interface InputAdornmentRootSlotPropsOverrides {}
export interface InputAdornmentBadgeSlotPropsOverrides {}

export type InputAdornmentOwnerState = Simplify<
    InputAdornmentOwnProps & {
        disabled?: boolean;
    }
>;

export interface InputAdornmentOwnProps {
    /**
     * The component will be added relative to this node.
     */
    children?: React.ReactNode;
    /**
     * The props used for each slot inside the InputAdornment.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', InputAdornmentRootSlotPropsOverrides, InputAdornmentOwnerState>;
        badge?: SlotComponentProps<'span', InputAdornmentBadgeSlotPropsOverrides, InputAdornmentOwnerState>;
    };
    /**
     * The components used for each slot inside the InputAdornment.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: InputAdornmentSlots;
}

export interface InputAdornmentSlots {
    /**
     * The component that renders the root.
     * @default 'span'
     */
    root?: React.ElementType;
}

export interface InputAdornmentTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'span'
> {
    props: InputAdornmentOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

/**
 * Utility to create component types that inherit props from InputAdornment.
 */
export interface ExtendInputAdornmentTypeMap<M extends OverridableTypeMap> {
    props: M['props'] & InputAdornmentTypeMap['props'];
    defaultComponent: M['defaultComponent'];
}

export type ExtendBadge<M extends OverridableTypeMap> = OverridableComponent<ExtendInputAdornmentTypeMap<M>>;

export type InputAdornmentProps<
    RootComponentType extends React.ElementType = InputAdornmentTypeMap['defaultComponent']
> = OverrideProps<InputAdornmentTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType> & {
    component?: RootComponentType;
};

export type InputAdornmentRootSlotProps = {
    children?: React.ReactNode;
    className?: string;
    ownerState: InputAdornmentOwnerState;
    ref: React.Ref<HTMLSpanElement>;
};
