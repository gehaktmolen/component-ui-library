import React from 'react';
import { ColorPaletteProp, PolymorphicProps, SlotComponentProps, VariantProp } from '../../utils';
import { OverridableStringUnion, Simplify } from '../../types';
import { ListItemPropsColorOverrides, ListItemPropsVariantOverrides } from '../ListItem';

export interface ListItemButtonRootSlotPropsOverrides {}
export interface ListItemButtonPropsSizeOverrides {}

export interface ListItemButtonOwnProps {
    children?: React.ReactNode;
    className?: string;
    /**
     * A ref for imperative actions. It currently only supports `focusVisible()` action.
     */
    action?: React.Ref<{
        focusVisible(): void;
    }>;
    /**
     * If `true`, the list item is focused during the first mount.
     * Focus will also be triggered if the value changes from false to true.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * This prop can help identify which element has keyboard focus.
     * The class name will be applied when the element gains the focus through keyboard interaction.
     * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
     * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
     * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
     * if needed.
     */
    focusVisibleClassName?: string;
    /**
     * The content direction flow.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The size of the component (affect other nested list* components).
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', ListItemButtonPropsSizeOverrides>;
    /**
     * If `true`, the component is selected.
     * @default false
     */
    selected?: boolean;
    /**
     * @ignore
     */
    role?: string;
    /**
     * @default 0
     */
    tabIndex?: NonNullable<React.HTMLAttributes<any>['tabIndex']>;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ListItemPropsColorOverrides>;
    /**
     * @default 'solid'
     */
    variant?: OverridableStringUnion<VariantProp, ListItemPropsVariantOverrides>;
    /**
     * The components used for each slot inside the ListItemButton.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: ListItemButtonSlots;
    /**
     * The props used for each slot.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'div', ListItemButtonRootSlotPropsOverrides, ListItemButtonOwnerState>;
    };
}

export interface ListItemButtonSlots {
    /**
     * The component that renders the root.
     * @default 'div'
     */
    root?: React.ElementType;
}

export type ListItemButtonOwnerState = Simplify<
    ListItemButtonOwnProps & {
        /**
         * If `true`, the element's focus is visible.
         */
        focusVisible?: boolean;
        /**
         * If `true`, the element is rendered in a horizontal list.
         * @internal
         */
        row?: boolean;
        /**
         * @internal
         * The internal prop for controlling CSS margin of the element.
         */
        'data-first-child'?: boolean;
    }
>;

export type ListItemButtonRootSlotProps = {
    ownerState: ListItemButtonOwnerState;
    className?: string;
    children?: React.ReactNode;
    role?: string;
};

export interface ListItemButtonTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'div'
> {
    props: ListItemButtonOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type ListItemButtonProps<
    RootComponentType extends React.ElementType = ListItemButtonTypeMap['defaultComponent']
> = PolymorphicProps<ListItemButtonTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;
