import * as React from 'react';
import {
    unstable_useForkRef as useForkRef,
    unstable_useId as useId,
    unstable_useEnhancedEffect as useEnhancedEffect
} from '../../utils';
import { UseMenuListboxSlotProps, UseMenuParameters, UseMenuReturnValue } from './useMenu.types';
import { menuReducer } from './menuReducer';
import { DropdownContext, DropdownContextValue } from '../useDropdown';
import { useList } from '../useList';
import { MenuItemMetadata } from '../useMenuItem';
import { DropdownActionTypes } from '../useDropdown';
import { EventHandlers } from '../utils';
import { useCompoundParent } from '../utils/useCompound';
import CancellableEvent from '../utils/cancellableEvent';
import combineHooksSlotProps from '../utils/combineHooksSlotProps';

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
 * ## useMenu API
 * - [useMenu API](#use-menu)
 */
export function useMenu(parameters: UseMenuParameters = {}): UseMenuReturnValue {
    const { listboxRef: listboxRefProp, onItemsChange, id: idParam } = parameters;

    const rootRef = React.useRef<HTMLElement | null>(null);
    const handleRef = useForkRef(rootRef, listboxRefProp);

    const listboxId = useId(idParam) ?? '';

    const {
        state: { open },
        dispatch: menuDispatch,
        triggerElement,
        registerPopup
    } = React.useContext(DropdownContext) ?? FALLBACK_MENU_CONTEXT;

    // store the initial open state to prevent focus stealing
    // (the first menu items gets focued only when the menu is opened by the user)
    const isInitiallyOpen = React.useRef(open);

    const { subItems, contextValue: compoundComponentContextValue } = useCompoundParent<string, MenuItemMetadata>();

    const subItemKeys = React.useMemo(() => Array.from(subItems.keys()), [subItems]);

    const getItemDomElement = React.useCallback(
        (itemId: string) => {
            if (itemId == null) {
                return null;
            }

            return subItems.get(itemId)?.ref.current ?? null;
        },
        [subItems]
    );

    const {
        dispatch: listDispatch,
        getRootProps: getListRootProps,
        contextValue: listContextValue,
        state: { highlightedValue },
        rootRef: mergedListRef
    } = useList({
        disabledItemsFocusable: true,
        focusManagement: 'DOM',
        getItemDomElement,
        getInitialState: () => ({
            selectedValues: [],
            highlightedValue: null
        }),
        isItemDisabled: (id) => subItems?.get(id)?.disabled || false,
        items: subItemKeys,
        getItemAsString: (id: string) => subItems.get(id)?.label || subItems.get(id)?.ref.current?.innerText,
        rootRef: handleRef,
        onItemsChange,
        reducerActionContext: { listboxRef: rootRef },
        selectionMode: 'none',

        // Todo: Resolve menuReducer incompatibility with stateReducer type error.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        stateReducer: menuReducer
    });

    useEnhancedEffect(() => {
        registerPopup(listboxId);
    }, [listboxId, registerPopup]);

    React.useEffect(() => {
        if (open && highlightedValue === subItemKeys[0] && !isInitiallyOpen.current) {
            subItems.get(subItemKeys[0])?.ref?.current?.focus();
        }
    }, [open, highlightedValue, subItems, subItemKeys]);

    React.useEffect(() => {
        // set focus to the highlighted item (but prevent stealing focus from other elements on the page)
        if (rootRef.current?.contains(document.activeElement) && highlightedValue !== null) {
            subItems?.get(highlightedValue)?.ref.current?.focus();
        }
    }, [highlightedValue, subItems]);

    const createHandleBlur = (otherHandlers: EventHandlers) => (event: React.FocusEvent & CancellableEvent) => {
        otherHandlers.onBlur?.(event);
        if (event.defaultPrevented) {
            return;
        }

        if (rootRef.current?.contains(event.relatedTarget as HTMLElement) || event.relatedTarget === triggerElement) {
            return;
        }

        menuDispatch({
            type: DropdownActionTypes.blur,
            event
        });
    };

    const createHandleKeyDown = (otherHandlers: EventHandlers) => (event: React.KeyboardEvent & CancellableEvent) => {
        otherHandlers.onKeyDown?.(event);
        if (event.defaultPrevented) {
            return;
        }

        if (event.key === 'Escape') {
            menuDispatch({
                type: DropdownActionTypes.escapeKeyDown,
                event
            });
        }
    };

    const getOwnListboxHandlers = (otherHandlers: EventHandlers = {}) => ({
        onBlur: createHandleBlur(otherHandlers),
        onKeyDown: createHandleKeyDown(otherHandlers)
    });

    const getListboxProps = <TOther extends EventHandlers>(
        otherHandlers: TOther = {} as TOther
    ): UseMenuListboxSlotProps => {
        const getCombinedRootProps = combineHooksSlotProps(getOwnListboxHandlers, getListRootProps);
        return {
            ...getCombinedRootProps(otherHandlers),
            id: listboxId,
            role: 'menu'
        };
    };

    React.useDebugValue({ subItems, highlightedValue });

    return {
        contextValue: {
            ...compoundComponentContextValue,
            ...listContextValue
        },
        dispatch: listDispatch,
        getListboxProps,
        highlightedValue,
        listboxRef: mergedListRef,
        menuItems: subItems,
        open,
        triggerElement
    };
}
