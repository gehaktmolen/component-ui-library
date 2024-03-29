import * as React from 'react';
import { SlotComponentProps } from '../utils';
import { Simplify } from '../../types';

export interface MenuButtonRootSlotPropsOverrides {}

export interface MenuButtonProps {
    children?: React.ReactNode;
    /**
     * Class name applied to the root element.
     */
    className?: string;
    /**
     * Element placed after the children.
     */
    endDecorator?: React.ReactNode;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, allows a disabled button to receive focus.
     * @default false
     */
    focusableWhenDisabled?: boolean;
    /**
     * Label of the button
     */
    label?: string;
    /**
     * The props used for each slot inside the MenuButton.
     * @default {}
     */
    slots?: MenuButtonSlots;
    /**
     * The components used for each slot inside the MenuButton.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slotProps?: {
        root?: SlotComponentProps<'button', MenuButtonRootSlotPropsOverrides, MenuButtonOwnerState>;
    };
}

export interface MenuButtonSlots {
    /**
     * The component that renders the root.
     * @default 'button'
     */
    root?: React.ElementType;
}

export type MenuButtonOwnerState = Simplify<
    MenuButtonProps & {
        active: boolean;
        focusableWhenDisabled: boolean;
        open: boolean;
    }
>;
