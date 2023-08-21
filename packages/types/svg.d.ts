import * as React from 'react';
import type { OverrideProps, OverridableComponent } from './types';

export interface SvgIconTypeMap<
    AdditionalProps = NonNullable<unknown>,
    DefaultComponent extends React.ElementType = 'svg'
> {
    props: AdditionalProps & {
        /**
         * Node passed into the SVG element.
         */
        children?: React.ReactNode;
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
         * The shape-rendering attribute. The behavior of the different options is described on the
         * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
         * If you are having issues with blurry icons you should investigate this prop.
         */
        shapeRendering?: string;
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
    };
    defaultComponent: DefaultComponent;
}

declare const SvgIcon: OverridableComponent<SvgIconTypeMap>;

export type SvgIconProps<
    RootComponent extends React.ElementType = SvgIconTypeMap['defaultComponent'],
    AdditionalProps = NonNullable<unknown>
> = OverrideProps<SvgIconTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
    component?: React.ElementType;
};

export default SvgIcon;
