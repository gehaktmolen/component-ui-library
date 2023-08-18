import * as React from 'react';
import { useCompoundItem, combineHooksSlotProps, useId, useForkRef } from '../../utils';
import { useButton } from '../useButton';
import { useListItem } from '../useList';
import { DropdownActionTypes } from '../useDropdown';
import { DropdownContext, type DropdownContextValue } from '../useDropdown';
import type {
    MenuItemMetadata,
    UseMenuItemParameters,
    UseMenuItemReturnValue,
    UseMenuItemRootSlotProps
} from './useMenuItem.types';
import type { EventHandlers } from '../../types';
import type { CancellableEvent } from '../../utils';

function idGenerator(existingKeys: Set<string>) {
    return `menu-item-${existingKeys.size}`;
}

const FALLBACK_MENU_CONTEXT: DropdownContextValue = {
    dispatch: () => {},
    popupId: '',
    registerPopup: () => {},
    registerTrigger: () => {},
    state: { open: true },
    triggerElement: null
};

/**
 *
 * ## useMenuItem API
 * - [useMenuItem API](#use-menu-item)
 */
export function useMenuItem(params: UseMenuItemParameters): UseMenuItemReturnValue {
    const { disabled = false, id: idParam, rootRef: externalRef, label } = params;

    const id = useId(idParam);
    const itemRef = React.useRef<HTMLElement>(null);

    const itemMetadata: MenuItemMetadata = React.useMemo(
        () => ({ disabled, id: id ?? '', label, ref: itemRef }),
        [disabled, id, label]
    );

    const { dispatch } = React.useContext(DropdownContext) ?? FALLBACK_MENU_CONTEXT;

    const {
        getRootProps: getListRootProps,
        highlighted,
        rootRef: listItemRefHandler
    } = useListItem({
        item: id
    });

    const { index, totalItemCount } = useCompoundItem(id ?? idGenerator, itemMetadata);

    const {
        getRootProps: getButtonProps,
        focusVisible,
        rootRef: buttonRefHandler
    } = useButton({
        disabled,
        focusableWhenDisabled: true
    });

    const handleRef = useForkRef(listItemRefHandler, buttonRefHandler, externalRef, itemRef);

    React.useDebugValue({ id, highlighted, disabled, label });

    const createHandleClick = (otherHandlers: EventHandlers) => (event: React.MouseEvent & CancellableEvent) => {
        otherHandlers.onClick?.(event);
        if (event.defaultPrevented) {
            return;
        }

        dispatch({
            type: DropdownActionTypes.close,
            event
        });
    };

    const getOwnHandlers = <TOther extends EventHandlers>(otherHandlers: TOther = {} as TOther) => ({
        ...otherHandlers,
        onClick: createHandleClick(otherHandlers)
    });

    function getRootProps<TOther extends EventHandlers = NonNullable<unknown>>(
        otherHandlers: TOther = {} as TOther
    ): UseMenuItemRootSlotProps<TOther> {
        const getCombinedRootProps = combineHooksSlotProps(
            getOwnHandlers,
            // Todo: Brain fart, help me please.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            combineHooksSlotProps(getButtonProps, getListRootProps)
        );

        // Todo: Brain fart, help me please.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return {
            ...getCombinedRootProps(otherHandlers),
            ref: handleRef,
            role: 'menuitem'
        };
    }

    // If `id` is undefined (during SSR in React < 18), we fall back to rendering a simplified menu item
    // which does not have access to information about its position or highlighted state.
    if (id === undefined) {
        return {
            getRootProps,
            disabled: false,
            focusVisible,
            highlighted: false,
            index: -1,
            totalItemCount: 0,
            rootRef: handleRef
        };
    }

    return {
        getRootProps,
        disabled,
        focusVisible,
        highlighted,
        index,
        totalItemCount,
        rootRef: handleRef
    };
}
