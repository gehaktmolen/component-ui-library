import * as React from 'react';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '../../utils';
import { useTabsContext } from '../Tabs';
import { UseTabParameters, UseTabReturnValue, UseTabRootSlotProps } from './useTab.types';
import { EventHandlers } from '../utils';
import { useCompoundItem } from '../utils/useCompoundItem';
import { useListItem } from '../useList';
import { useButton } from '../useButton';
import { TabMetadata } from '../useTabs';

function tabValueGenerator(otherTabValues: Set<string | number>) {
    return otherTabValues.size;
}

/**
 *
 * ## useTab API
 * - [useTab API](?path=/docs/navigation-tabs--docs#usetab-api-hook)
 */
export function useTab(parameters: UseTabParameters): UseTabReturnValue {
    const { value: valueParam, rootRef: externalRef, disabled = false, id: idParam } = parameters;

    const { orientation = 'horizontal' } = useTabsContext();

    const tabRef = React.useRef<HTMLElement>(null);
    const id = useId(idParam);

    const { value: selectedValue, selectionFollowsFocus, getTabPanelId } = useTabsContext();

    const tabMetadata = React.useMemo(() => ({ disabled, ref: tabRef, id }), [disabled, tabRef, id]);

    const {
        id: value,
        index,
        totalItemCount: totalTabsCount
    } = useCompoundItem<string | number, TabMetadata>(valueParam ?? tabValueGenerator, tabMetadata);

    const {
        getRootProps: getTabProps,
        rootRef: listItemRefHandler,
        highlighted,
        selected
    } = useListItem({
        item: value
    });

    const {
        getRootProps: getButtonProps,
        rootRef: buttonRefHandler,
        active,
        focusVisible,
        setFocusVisible
    } = useButton({
        disabled,
        focusableWhenDisabled: !selectionFollowsFocus,
        type: 'button'
    });

    const handleRef = useForkRef(tabRef, externalRef, listItemRefHandler, buttonRefHandler);

    const tabPanelId = value !== undefined ? getTabPanelId(value) : undefined;

    const getRootProps = <TOther extends EventHandlers>(
        otherHandlers: TOther = {} as TOther
    ): UseTabRootSlotProps<TOther> => {
        const resolvedTabProps = {
            ...otherHandlers,
            ...getTabProps(otherHandlers)
        };

        const resolvedButtonProps = {
            ...resolvedTabProps,
            ...getButtonProps(resolvedTabProps)
        };

        return {
            ...resolvedButtonProps,
            role: 'tab',
            'aria-controls': tabPanelId,
            'aria-selected': selected,
            id,
            ref: handleRef
        };
    };

    return {
        getRootProps,
        active,
        focusVisible,
        highlighted,
        orientation,
        index,
        rootRef: handleRef,
        // the `selected` state isn't set on the server (it relies on effects to be calculated),
        // so we fall back to checking the `value` prop with the selectedValue from the TabsContext
        selected: selected || value === selectedValue,
        setFocusVisible,
        totalTabsCount
    };
}
