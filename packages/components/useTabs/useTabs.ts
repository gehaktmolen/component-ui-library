import * as React from 'react';
import { useCompoundParent, useControlled } from '../../utils';
import type { UseTabsParameters, UseTabsReturnValue } from './useTabs.types';
import type { TabPanelMetadata } from './TabsProvider';

export interface TabMetadata {
    disabled: boolean;
    id: string | undefined;
    ref: React.RefObject<HTMLElement>;
}

type IdLookupFunction = (id: string | number) => string | undefined;

/**
 *
 * ## useTabs API
 * - [useTabs API](?path=/docs/navigation-tabs--docs#usetabs-api-hook)
 */
export function useTabs(parameters: UseTabsParameters): UseTabsReturnValue {
    const { value: valueProp, defaultValue, onChange, orientation, direction, selectionFollowsFocus } = parameters;

    const [value, setValue] = useControlled({
        controlled: valueProp,
        default: defaultValue,
        name: 'Tabs',
        state: 'value'
    });

    const onSelected = React.useCallback(
        (event: React.SyntheticEvent | null, newValue: string | number | null) => {
            setValue(newValue);
            onChange?.(event, newValue);
        },
        [onChange, setValue]
    );

    const { subItems: tabPanels, contextValue: compoundComponentContextValue } = useCompoundParent<
        string | number,
        TabPanelMetadata
    >();

    const tabIdLookup = React.useRef<IdLookupFunction>(() => undefined);

    const getTabPanelId = React.useCallback(
        (tabValue: string | number) => {
            return tabPanels.get(tabValue)?.id;
        },
        [tabPanels]
    );

    const getTabId = React.useCallback((tabPanelId: string | number) => {
        return tabIdLookup.current(tabPanelId);
    }, []);

    const registerTabIdLookup = React.useCallback((lookupFunction: IdLookupFunction) => {
        tabIdLookup.current = lookupFunction;
    }, []);

    return <UseTabsReturnValue>{
        contextValue: {
            direction,
            getTabId,
            getTabPanelId,
            onSelected,
            orientation,
            registerTabIdLookup,
            selectionFollowsFocus,
            value,
            ...compoundComponentContextValue
        }
    };
}
