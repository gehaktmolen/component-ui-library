import * as React from 'react';
import { OverrideProps, OverridableTypeMap, OverridableComponent, Simplify } from '../../types';
import { SlotComponentProps } from '../utils';

export interface InputBaseRootSlotPropsOverrides {}
export interface InputBaseBadgeSlotPropsOverrides {}

export type InputBaseOwnerState = Simplify<
    InputBaseOwnProps & {
        disabled?: boolean;
    }
>;

export interface InputBaseOwnProps {
    /**
     * The component will be added relative to this node.
     */
    children?: React.ReactNode;
    /**
     * The props used for each slot inside the InputBase.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', InputBaseRootSlotPropsOverrides, InputBaseOwnerState>;
        badge?: SlotComponentProps<'span', InputBaseBadgeSlotPropsOverrides, InputBaseOwnerState>;
    };
    /**
     * The components used for each slot inside the InputBase.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: InputBaseSlots;
}

export interface InputBaseSlots {
    /**
     * The component that renders the root.
     * @default 'span'
     */
    root?: React.ElementType;
}

export interface InputBaseTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'span'
> {
    props: InputBaseOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

/**
 * Utility to create component types that inherit props from InputBase.
 */
export interface ExtendInputBaseTypeMap<M extends OverridableTypeMap> {
    props: M['props'] & InputBaseTypeMap['props'];
    defaultComponent: M['defaultComponent'];
}

export type ExtendBadge<M extends OverridableTypeMap> = OverridableComponent<ExtendInputBaseTypeMap<M>>;

export type InputBaseProps<RootComponentType extends React.ElementType = InputBaseTypeMap['defaultComponent']> =
    OverrideProps<InputBaseTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType> & {
        component?: RootComponentType;
    };

export type InputBaseRootSlotProps = {
    children?: React.ReactNode;
    className?: string;
    ownerState: InputBaseOwnerState;
    ref: React.Ref<HTMLSpanElement>;
};
