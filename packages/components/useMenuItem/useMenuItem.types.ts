import * as React from 'react';
import { EventHandlers } from '../utils';
import { UseButtonRootSlotProps } from '../useButton';
import { CancellableEventHandler } from '../utils/cancellableEvent';

interface UseMenuItemRootSlotOwnProps {
    role: 'menuitem';
    ref: React.RefCallback<Element> | null;
}

export interface MenuItemMetadata {
    id: string;
    disabled: boolean;
    label?: string;
    ref: React.RefObject<HTMLElement>;
}

export type UseMenuItemRootSlotProps<TOther = NonNullable<unknown>> = TOther &
    UseMenuItemRootSlotOwnProps &
    UseButtonRootSlotProps<TOther> & {
        onClick: CancellableEventHandler<React.MouseEvent>;
    };

export interface UseMenuItemParameters {
    disabled?: boolean;
    id?: string;
    onClick?: React.MouseEventHandler<any>;
    rootRef: React.Ref<Element>;
    label?: string;
}

export interface UseMenuItemReturnValue {
    /**
     * Resolver for the root slot's props.
     * @param otherHandlers event handlers for the root slot
     * @returns props that should be spread on the root slot
     */
    getRootProps: <TOther extends EventHandlers = NonNullable<unknown>>(
        otherHandlers?: TOther
    ) => UseMenuItemRootSlotProps<TOther>;
    /**
     * If `true`, the component is disabled.
     */
    disabled: boolean;
    /**
     * If `true`, the component is being focused using keyboard.
     */
    focusVisible: boolean;
    /**
     * If `true`, the component is being highlighted.
     */
    highlighted: boolean;
    /**
     * 0-based index of the item in the menu.
     */
    index: number;
    /**
     * The ref to the component's root DOM element.
     */
    rootRef: React.RefCallback<Element> | null;
    /**
     * Total number of items in the menu.
     */
    totalItemCount: number;
}
