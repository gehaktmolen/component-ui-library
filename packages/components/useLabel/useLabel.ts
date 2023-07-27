import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '../../utils';
import { UseLabelParameters, UseLabelReturnValue, UseLabelRootSlotProps } from './useLabel.types';
import extractEventHandlers from '../utils/extractEventHandlers.ts';
import { FormControlState, useFormControlContext } from '../FormControl';

/**
 *
 * API:
 *
 * - [useLabel API](https://#use-form-label)
 */
export function useLabel(parameters: UseLabelParameters = {}): UseLabelReturnValue {
    const { error: errorProp = false, required: requiredProp = false, rootRef: externalRef } = parameters;

    const formControlContext: FormControlState | undefined = useFormControlContext();

    let error: boolean;
    let required: boolean;

    if (formControlContext) {
        error = formControlContext.error ?? errorProp;
        required = formControlContext.required ?? requiredProp;

        if (process.env.NODE_ENV !== 'production') {
            const definedLocalProps = (['error', 'required'] as const).filter((prop) => parameters[prop] !== undefined);

            if (definedLocalProps.length > 0) {
                console.warn(
                    [
                        'Azrn: You have set props on a label that is inside a FormControl.',
                        'Set these props on a FormControl instead. Otherwise they will be ignored.',
                        `Ignored props: ${definedLocalProps.join(', ')}`
                    ].join('\n')
                );
            }
        }
    } else {
        error = errorProp;
        required = requiredProp;
    }

    const labelRef = React.useRef<HTMLLabelElement | HTMLElement>();
    const handleRef = useForkRef(externalRef, labelRef);

    // Todo: Set focus to possible existing input instead.
    const handleClick =
        (otherHandlers: Record<string, React.EventHandler<any>>) => (event: React.MouseEvent<HTMLInputElement>) => {
            if (labelRef.current && event.currentTarget === event.target) {
                labelRef.current.focus();
            }

            otherHandlers.onClick?.(event);
        };

    const getRootProps = <TOther extends Record<string, any> = NonNullable<unknown>>(
        externalProps: TOther = {} as TOther
    ): UseLabelRootSlotProps<TOther> => {
        // onBlur, onChange and onFocus are forwarded to the input slot.
        const propsEventHandlers = extractEventHandlers(parameters, ['onBlur', 'onChange', 'onFocus']);
        const externalEventHandlers = { ...propsEventHandlers, ...extractEventHandlers(externalProps) };

        return {
            ...externalProps,
            ...externalEventHandlers,
            onClick: handleClick(externalEventHandlers)
        };
    };

    return {
        error,
        formControlContext,
        getRootProps,
        rootRef: handleRef,
        required
    };
}
