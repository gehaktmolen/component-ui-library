import * as React from 'react';
import { OverrideProps, OverridableTypeMap, OverridableComponent, Simplify } from '../../types';
import { SlotComponentProps } from '../utils';
import { OverridableStringUnion } from '../../types';

export interface BadgePropsVariantOverrides {}
export interface BadgePropsColorOverrides {}
export interface BadgeRootSlotPropsOverrides {}
export interface BadgeBadgeSlotPropsOverrides {}

export type BadgeOwnerState = Simplify<
    BadgeOwnProps & {
        badgeContent: React.ReactNode;
        invisible: boolean;
        max: number;
        showZero: boolean;
    }
>;

export interface BadgeOrigin {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
}

export interface BadgeOwnProps {
    /**
     * The anchor of the badge.
     * @default {
     *   vertical: 'top',
     *   horizontal: 'right',
     * }
     */
    anchorOrigin?: BadgeOrigin;
    /**
     * The color of the component.
     * @default 'default'
     */
    color?: OverridableStringUnion<
        'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning',
        BadgePropsColorOverrides
    >;
    /**
     * The variant to use.
     * @default 'standard'
     */
    variant?: OverridableStringUnion<'standard' | 'dot', BadgePropsVariantOverrides>;
    /**
     * Wrapped shape the badge should overlap.
     * @default 'rectangular'
     */
    overlap?: 'rectangular' | 'circular';
    /**
     * The content rendered within the badge.
     */
    badgeContent?: React.ReactNode;
    /**
     * The badge will be added relative to this node.
     */
    children?: React.ReactNode;
    /**
     * If `true`, the badge is invisible.
     * @default false
     */
    invisible?: boolean;
    /**
     * Max count to show.
     * @default 99
     */
    max?: number;
    /**
     * The props used for each slot inside the Badge.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', BadgeRootSlotPropsOverrides, BadgeOwnerState>;
        badge?: SlotComponentProps<'span', BadgeBadgeSlotPropsOverrides, BadgeOwnerState>;
    };
    /**
     * The components used for each slot inside the Badge.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: BadgeSlots;
    /**
     * Controls whether the badge is hidden when `badgeContent` is zero.
     * @default false
     */
    showZero?: boolean;
}

export interface BadgeSlots {
    /**
     * The component that renders the root.
     * @default 'span'
     */
    root?: React.ElementType;
    /**
     * The component that renders the badge.
     * @default 'span'
     */
    badge?: React.ElementType;
}

export interface BadgeTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'span'
> {
    props: BadgeOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

/**
 * Utility to create component types that inherit props from Badge.
 */
export interface ExtendBadgeTypeMap<M extends OverridableTypeMap> {
    props: M['props'] & BadgeTypeMap['props'];
    defaultComponent: M['defaultComponent'];
}

export type ExtendBadge<M extends OverridableTypeMap> = OverridableComponent<ExtendBadgeTypeMap<M>>;

export type BadgeProps<RootComponentType extends React.ElementType = BadgeTypeMap['defaultComponent']> = OverrideProps<
    BadgeTypeMap<NonNullable<unknown>, RootComponentType>,
    RootComponentType
> & {
    component?: RootComponentType;
};

export type BadgeRootSlotProps = {
    children?: React.ReactNode;
    className?: string;
    ownerState: BadgeOwnerState;
    ref: React.Ref<HTMLSpanElement>;
};

export type BadgeBadgeSlotProps = {
    className?: string;
    children?: React.ReactNode;
    ownerState: BadgeOwnerState;
};
