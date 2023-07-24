import * as React from 'react';
import { OverrideProps, OverridableTypeMap, OverridableComponent, Simplify } from '../../types';
import { SlotComponentProps } from '../utils';

export interface InputLabelRootSlotPropsOverrides {}
export interface InputLabelBadgeSlotPropsOverrides {}

export type InputLabelOwnerState = Simplify<
    InputLabelOwnProps & {
        disabled?: boolean;
    }
>;

export interface InputLabelOwnProps {
    /**
     * The component will be added relative to this node.
     */
    children?: React.ReactNode;
    /**
     * The props used for each slot inside the InputLabel.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', InputLabelRootSlotPropsOverrides, InputLabelOwnerState>;
        badge?: SlotComponentProps<'span', InputLabelBadgeSlotPropsOverrides, InputLabelOwnerState>;
    };
    /**
     * The components used for each slot inside the InputLabel.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: InputLabelSlots;
}

export interface InputLabelSlots {
    /**
     * The component that renders the root.
     * @default 'span'
     */
    root?: React.ElementType;
}

export interface InputLabelTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'span'
> {
    props: InputLabelOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

/**
 * Utility to create component types that inherit props from InputLabel.
 */
export interface ExtendInputLabelTypeMap<M extends OverridableTypeMap> {
    props: M['props'] & InputLabelTypeMap['props'];
    defaultComponent: M['defaultComponent'];
}

export type ExtendBadge<M extends OverridableTypeMap> = OverridableComponent<ExtendInputLabelTypeMap<M>>;

export type InputLabelProps<RootComponentType extends React.ElementType = InputLabelTypeMap['defaultComponent']> =
    OverrideProps<InputLabelTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType> & {
        component?: RootComponentType;
    };

export type InputLabelRootSlotProps = {
    children?: React.ReactNode;
    className?: string;
    ownerState: InputLabelOwnerState;
    ref: React.Ref<HTMLSpanElement>;
};
