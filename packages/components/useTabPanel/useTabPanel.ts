import * as React from 'react';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '../../utils';
import { useTabsContext } from '../Tabs';
import { useCompoundItem } from '../utils/useCompoundItem';
import { UseTabPanelParameters, UseTabPanelReturnValue } from './useTabPanel.types';

function tabPanelValueGenerator(otherTabPanelValues: Set<string | number>) {
    return otherTabPanelValues.size;
}

/**
 *
 * ## useTabPanel API
 * - [useTabPanel API](?path=/docs/navigation-tabs--docs#usetabpanel-api-hook)
 */
export function useTabPanel(parameters: UseTabPanelParameters): UseTabPanelReturnValue {
    const { value: valueParam, id: idParam, rootRef: externalRef } = parameters;

    const context = useTabsContext();
    if (context === null) {
        throw new Error('No TabContext provided');
    }

    const { value: selectedTabValue, getTabId } = context;

    const id = useId(idParam);
    const ref = React.useRef<HTMLElement>(null);
    const handleRef = useForkRef(ref, externalRef);
    const metadata = React.useMemo(() => ({ id, ref }), [id]);

    const { id: value } = useCompoundItem(valueParam ?? tabPanelValueGenerator, metadata);

    const hidden = value !== selectedTabValue;

    const correspondingTabId = value !== undefined ? getTabId(value) : undefined;

    const getRootProps = () => {
        return {
            'aria-labelledby': correspondingTabId ?? undefined,
            hidden,
            id: id ?? undefined,
            ref: handleRef
        };
    };

    return {
        hidden,
        getRootProps,
        rootRef: handleRef
    };
}
