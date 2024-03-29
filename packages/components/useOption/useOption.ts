import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '../../utils';
import { SelectOption, UseOptionParameters, UseOptionReturnValue } from './useOption.types';
import { EventHandlers } from '../utils';
import { useListItem } from '../useList';
import { useCompoundItem } from '../utils/useCompoundItem';

/**
 *
 * ## useOption API
 * - [useOption API](?path=/docs/inputs-select--docs#useoption-api-hook)
 */
export function useOption<Value>(params: UseOptionParameters<Value>): UseOptionReturnValue {
    const { value, label, disabled, rootRef: optionRefParam, id: idParam } = params;

    const {
        getRootProps: getListItemProps,
        rootRef: listItemRefHandler,
        highlighted,
        selected
    } = useListItem({
        item: value
    });

    const id = useId(idParam);

    const optionRef = React.useRef<Element>(null);

    const selectOption: SelectOption<Value> = React.useMemo(
        () => ({
            disabled,
            label,
            value,
            ref: optionRef,
            id
        }),
        [disabled, label, value, id]
    );

    const { index } = useCompoundItem<Value, SelectOption<Value>>(value, selectOption);

    const handleRef = useForkRef(optionRefParam, optionRef, listItemRefHandler)!;

    return {
        getRootProps: <Other extends EventHandlers = NonNullable<unknown>>(otherHandlers: Other = {} as Other) => ({
            ...otherHandlers,
            ...getListItemProps(otherHandlers),
            id,
            ref: handleRef,
            role: 'option',
            'aria-selected': selected
        }),
        highlighted,
        index,
        selected,
        rootRef: handleRef
    };
}
