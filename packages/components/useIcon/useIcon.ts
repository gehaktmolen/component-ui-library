import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '../../utils';
import { UseIconParameters, UseIconReturnValue, UseIconRootSlotProps } from './useIcon.types';
import { EventHandlers } from '../utils';
import extractEventHandlers from '../utils/extractEventHandlers.ts';

/**
 *
 * API:
 *
 * - [useIcon API](https://#use-icon)
 */
export function useIcon(parameters: UseIconParameters = {}): UseIconReturnValue {
    const { rootRef: externalRef } = parameters;
    const iconRef = React.useRef<HTMLSpanElement | HTMLElement>();
    const handleRef = useForkRef(externalRef, iconRef);

    interface AdditionalIconProps {
        'aria-hidden'?: React.AriaAttributes['aria-hidden'];
    }

    const iconProps: AdditionalIconProps = {};

    iconProps['aria-hidden'] = true;

    const getRootProps = <TOther extends EventHandlers = NonNullable<unknown>>(
        otherHandlers: TOther = {} as TOther
    ): UseIconRootSlotProps<TOther> => {
        const propsEventHandlers = extractEventHandlers(parameters) as Partial<UseIconParameters>;
        const externalEventHandlers = {
            ...propsEventHandlers,
            ...otherHandlers
        };

        return {
            ...externalEventHandlers,
            ...iconProps,
            ref: handleRef
        };
    };

    return {
        getRootProps,
        rootRef: handleRef
    };
}
