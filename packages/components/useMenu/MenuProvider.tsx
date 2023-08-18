import * as React from 'react';
import { ListContext, type ListContextValue } from '../useList';
import type { MenuItemMetadata } from '../useMenuItem';
import { CompoundComponentContext, type CompoundComponentContextValue } from '../../utils';

export type MenuProviderValue = CompoundComponentContextValue<string, MenuItemMetadata> & ListContextValue<string>;

export interface MenuProviderProps {
    value: MenuProviderValue;
    children: React.ReactNode;
}

/**
 * Sets up the contexts for the underlying MenuItem components.
 *
 * @ignore - do not document.
 */
export function MenuProvider(props: MenuProviderProps) {
    const { value, children } = props;

    const {
        dispatch,
        getItemIndex,
        getItemState,
        registerHighlightChangeHandler,
        registerSelectionChangeHandler,
        registerItem,
        totalSubItemCount
    } = value;

    const listContextValue: ListContextValue<string> = React.useMemo(
        () => ({
            dispatch,
            getItemState,
            getItemIndex,
            registerHighlightChangeHandler,
            registerSelectionChangeHandler
        }),
        [dispatch, getItemIndex, getItemState, registerHighlightChangeHandler, registerSelectionChangeHandler]
    );

    const compoundComponentContextValue: CompoundComponentContextValue<string, MenuItemMetadata> = React.useMemo(
        () => ({
            getItemIndex,
            registerItem,
            totalSubItemCount
        }),
        [registerItem, getItemIndex, totalSubItemCount]
    );

    return (
        <CompoundComponentContext.Provider value={compoundComponentContextValue}>
            <ListContext.Provider value={listContextValue}>{children}</ListContext.Provider>
        </CompoundComponentContext.Provider>
    );
}
