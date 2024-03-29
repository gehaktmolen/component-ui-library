import * as React from 'react';
import { useTabsContext } from '../Tabs';
import {
    TabsListActionTypes,
    UseTabsListParameters,
    UseTabsListReturnValue,
    UseTabsListRootSlotProps,
    ValueChangeAction
} from './useTabsList.types';
import { EventHandlers } from '../utils';
import { useCompoundParent } from '../utils/useCompound';
import { TabMetadata } from '../useTabs';
import { useList, ListState, UseListParameters } from '../useList';
import { tabsListReducer } from './tabsListReducer';

/**
 *
 * ## useTabsList API
 * - [useTabsList API](?path=/docs/navigation-tabs--docs#usetabslist-api-hook)
 */
export function useTabsList(parameters: UseTabsListParameters): UseTabsListReturnValue {
    const { rootRef: externalRef } = parameters;

    const {
        direction = 'ltr',
        onSelected,
        orientation = 'horizontal',
        value,
        registerTabIdLookup,
        selectionFollowsFocus
    } = useTabsContext();

    const { subItems, contextValue: compoundComponentContextValue } = useCompoundParent<string | number, TabMetadata>();

    const tabIdLookup = React.useCallback(
        (tabValue: string | number) => {
            return subItems.get(tabValue)?.id;
        },
        [subItems]
    );

    registerTabIdLookup(tabIdLookup);

    const subItemKeys = React.useMemo(() => Array.from(subItems.keys()), [subItems]);

    const getTabElement = React.useCallback(
        (tabValue: string | number) => {
            if (tabValue == null) {
                return null;
            }

            return subItems.get(tabValue)?.ref.current ?? null;
        },
        [subItems]
    );

    const isRtl = direction === 'rtl';

    let listOrientation: UseListParameters<any, any>['orientation'];
    if (orientation === 'vertical') {
        listOrientation = 'vertical';
    } else {
        listOrientation = isRtl ? 'horizontal-rtl' : 'horizontal-ltr';
    }

    const handleChange = React.useCallback(
        (
            event:
                | React.FocusEvent<Element, Element>
                | React.KeyboardEvent<Element>
                | React.MouseEvent<Element, MouseEvent>
                | null,
            newValue: (string | number)[]
        ) => {
            onSelected(event, newValue[0] ?? null);
        },
        [onSelected]
    );

    const controlledProps = React.useMemo(() => {
        if (value === undefined) {
            return {};
        }

        return value != null ? { selectedValues: [value] } : { selectedValues: [] };
    }, [value]);

    const isItemDisabled = React.useCallback(
        (item: string | number) => subItems.get(item)?.disabled ?? false,
        [subItems]
    );

    const {
        contextValue: listContextValue,
        dispatch,
        getRootProps: getListboxRootProps,
        state: { highlightedValue, selectedValues },
        rootRef: mergedRootRef
    } = useList<string | number, ListState<string | number>, ValueChangeAction, { selectionFollowsFocus: boolean }>({
        controlledProps,
        disabledItemsFocusable: !selectionFollowsFocus,
        focusManagement: 'DOM',
        getItemDomElement: getTabElement,
        isItemDisabled,
        items: subItemKeys,
        rootRef: externalRef,
        onChange: handleChange,
        orientation: listOrientation,
        reducerActionContext: React.useMemo(
            () => ({ selectionFollowsFocus: selectionFollowsFocus || false }),
            [selectionFollowsFocus]
        ),
        selectionMode: 'single',

        // Todo: Resolve tabsListReducer incompatibility with stateReducer type error.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        stateReducer: tabsListReducer
    });

    React.useEffect(() => {
        if (value === undefined) {
            return;
        }

        // when a value changes externally, the highlighted value should be synced to it
        if (value != null) {
            dispatch({
                type: TabsListActionTypes.valueChange,
                value
            });
        }
    }, [dispatch, value]);

    const getRootProps = <TOther extends EventHandlers = NonNullable<unknown>>(
        otherHandlers: TOther = {} as TOther
    ): UseTabsListRootSlotProps<TOther> => {
        return {
            ...otherHandlers,
            ...getListboxRootProps(otherHandlers),
            'aria-orientation': orientation === 'vertical' ? 'vertical' : undefined,
            role: 'tablist'
        };
    };

    const contextValue = React.useMemo(
        () => ({
            ...compoundComponentContextValue,
            ...listContextValue
        }),
        [compoundComponentContextValue, listContextValue]
    );

    return {
        contextValue,
        dispatch,
        getRootProps,
        highlightedValue,
        isRtl,
        orientation,
        rootRef: mergedRootRef,
        selectedValue: selectedValues[0] ?? null
    };
}
