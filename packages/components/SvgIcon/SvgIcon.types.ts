import React from 'react';
import { ColorPaletteProp, PolymorphicProps, SlotComponentProps } from '../../utils';
import { OverridableStringUnion, Simplify } from '../../types';

export interface SvgIconRootSlotPropsOverrides {}
export interface SvgIconPropsColorOverrides {}

export interface SvgIconOwnProps {
    children?: React.ReactNode;
    className?: string;
    /**
     * The color of the component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<'inherit' | ColorPaletteProp, SvgIconPropsColorOverrides>;
    /**
     * The fontSize applied to the icon. Defaults to 24px, but can be configured to inherit font size.
     * @default 'medium'
     */
    fontSize?: 'inherit' | 'small' | 'medium' | 'large';
    /**
     * Applies a color attribute to the SVG element.
     */
    htmlColor?: string;
    /**
     * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
     * prop will be ignored.
     * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
     * `component`'s viewBox to the root node.
     * @default false
     */
    inheritViewBox?: boolean;
    /**
     * Provides a human-readable title for the element that contains it.
     * https://www.w3.org/TR/SVG-access/#Equivalent
     */
    titleAccess?: string;
    /**
     * Allows you to redefine what the coordinates without units mean inside an SVG element.
     * For example, if the SVG element is 500 (width) by 200 (height),
     * and you pass viewBox="0 0 50 20",
     * this means that the coordinates inside the SVG will go from the top left corner (0,0)
     * to bottom right (50,20) and each unit will be worth 10px.
     * @default '0 0 24 24'
     */
    viewBox?: string;
    /**
     * The components used for each slot inside the SvgIcon.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: SvgIconSlots;
    /**
     * The props used for each slot inside the Toggle.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'span', SvgIconRootSlotPropsOverrides, SvgIconOwnerState>;
    };
}

export interface SvgIconSlots {
    /**
     * The component that renders the root.
     * @default 'svg'
     */
    root?: React.ElementType;
}

export type SvgIconOwnerState = Simplify<
    SvgIconOwnProps & {
        /**
         * @internal
         * The `children` has a `svg` element as a child.
         */
        hasSvgAsChild: boolean;
    }
>;

export type SvgIconRootSlotProps = {
    ownerState: SvgIconOwnerState;
    className?: string;
    children?: React.ReactNode;
};

export interface SvgIconTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'svg'
> {
    props: SvgIconOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type SvgIconProps<RootComponentType extends React.ElementType = SvgIconTypeMap['defaultComponent']> =
    PolymorphicProps<SvgIconTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;
