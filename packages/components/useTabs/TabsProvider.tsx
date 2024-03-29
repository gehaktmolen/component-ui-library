import * as React from 'react';
import { TabsContext, TabsContextValue } from '../Tabs';
import { CompoundComponentContext, CompoundComponentContextValue } from '../utils/useCompound';

export type TabPanelMetadata = {
    id: string | undefined;
    ref: React.RefObject<HTMLElement>;
};

export type TabsProviderValue = CompoundComponentContextValue<string | number, TabPanelMetadata> & TabsContextValue;

export interface TabsProviderProps {
    value: TabsProviderValue;
    children: React.ReactNode;
}

/**
 * Sets up the contexts for the underlying Tab and TabPanel components.
 *
 * @ignore - do not document.
 */
export function TabsProvider(props: TabsProviderProps) {
    const { value: valueProp, children } = props;
    const {
        direction,
        getItemIndex,
        onSelected,
        orientation,
        registerItem,
        registerTabIdLookup,
        selectionFollowsFocus,
        totalSubItemCount,
        value,
        getTabId,
        getTabPanelId
    } = valueProp;

    const compoundComponentContextValue: CompoundComponentContextValue<string | number, TabPanelMetadata> =
        React.useMemo(
            () => ({
                getItemIndex,
                registerItem,
                totalSubItemCount
            }),
            [registerItem, getItemIndex, totalSubItemCount]
        );

    const tabsContextValue: TabsContextValue = React.useMemo(
        () => ({
            direction,
            getTabId,
            getTabPanelId,
            onSelected,
            orientation,
            registerTabIdLookup,
            selectionFollowsFocus,
            value
        }),
        [direction, getTabId, getTabPanelId, onSelected, orientation, registerTabIdLookup, selectionFollowsFocus, value]
    );

    return (
        <CompoundComponentContext.Provider value={compoundComponentContextValue}>
            <TabsContext.Provider value={tabsContextValue}>{children}</TabsContext.Provider>
        </CompoundComponentContext.Provider>
    );
}
