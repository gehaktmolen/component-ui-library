import * as React from 'react';
import { OverridableStringUnion } from '../../types';
import { UseIconParameters } from '../useIcon';
import { PolymorphicProps, SlotComponentProps, ColorPaletteProp } from '../utils';
import { SizeProp, IconName } from '@fortawesome/fontawesome-svg-core';

export interface IconRootSlotPropsOverrides {}

export interface IconPropsColorOverrides {}

export interface IconPropsSizeOverrides {}

export interface IconOwnProps extends Omit<UseIconParameters, 'ref'> {
    /**
     * The color of the component.
     * @default 'neutral'
     */
    color?: string | OverridableStringUnion<ColorPaletteProp, IconPropsColorOverrides>;
    /**
     * The icon name based on Font Awesome Solid icons.
     */
    icon: IconName;
    /**
     * The components used for each slot inside the Icon.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots?: IconSlots;
    /**
     * The props used for each slot inside the Icon.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', IconRootSlotPropsOverrides, IconOwnerState>;
    };
    /**
     * The Font Awesome Solid size of the component.
     * @default 'sm'
     */
    size?: OverridableStringUnion<SizeProp, IconPropsSizeOverrides>;
}

export interface IconSlots {
    /**
     * The component that renders the root.
     * @default 'div'
     */
    root?: React.ElementType;
}

export interface IconTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'span'
> {
    props: IconOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type IconProps<RootComponentType extends React.ElementType = IconTypeMap['defaultComponent']> = PolymorphicProps<
    IconTypeMap<NonNullable<unknown>, RootComponentType>,
    RootComponentType
>;

export type IconOwnerState = IconOwnProps;

export type IconRootSlotProps = {
    ownerState: IconOwnerState;
    className?: string;
    ref: React.Ref<any>;
};
