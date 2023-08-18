import * as React from 'react';
import { useForkRef, combineHooksSlotProps } from '../../utils';
import { useButton } from '../useButton';
import { DropdownContext } from '../useDropdown';
import { DropdownActionTypes } from '../useDropdown';
import type { UseMenuButtonParameters, UseMenuButtonReturnValue } from './useMenuButton.types';
import type { EventHandlers } from '../../types';
import type { CancellableEvent } from '../../utils';

/**
 *
 * ## useMenuButton API
 *
 * - [useMenuButton API](#use-menu-button)
 */
export function useMenuButton(parameters: UseMenuButtonParameters = {}): UseMenuButtonReturnValue {
    const { disabled = false, focusableWhenDisabled, rootRef: externalRef } = parameters;

    const menuContext = React.useContext(DropdownContext);
    if (menuContext === null) {
        throw new Error('useMenuButton: no menu context available.');
    }

    const { state, dispatch, registerTrigger, popupId } = menuContext;

    const {
        getRootProps: getButtonRootProps,
        rootRef: buttonRootRef,
        active
    } = useButton({
        disabled,
        focusableWhenDisabled,
        rootRef: externalRef
    });

    const handleRef = useForkRef(buttonRootRef, registerTrigger);

    const createHandleClick = (otherHandlers: EventHandlers) => (event: React.MouseEvent & CancellableEvent) => {
        otherHandlers.onClick?.(event);
        if (event.defaultPrevented) {
            return;
        }

        dispatch({
            type: DropdownActionTypes.toggle,
            event
        });
    };

    const createHandleKeyDown = (otherHandlers: EventHandlers) => (event: React.KeyboardEvent & CancellableEvent) => {
        otherHandlers.onKeyDown?.(event);
        if (event.defaultPrevented) {
            return;
        }

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            dispatch({
                type: DropdownActionTypes.open,
                event
            });
        }
    };

    const getOwnRootProps = (otherHandlers: EventHandlers = {}) => ({
        onClick: createHandleClick(otherHandlers),
        onKeyDown: createHandleKeyDown(otherHandlers)
    });

    const getRootProps = (otherHandlers: EventHandlers = {}) => {
        const getCombinedProps = combineHooksSlotProps(getButtonRootProps, getOwnRootProps);

        return {
            ...getCombinedProps(otherHandlers),
            'aria-haspopup': 'menu' as const,
            'aria-expanded': state.open,
            'aria-controls': popupId,
            ref: handleRef
        };
    };

    return {
        active,
        getRootProps,
        open: state.open,
        rootRef: handleRef
    };
}
