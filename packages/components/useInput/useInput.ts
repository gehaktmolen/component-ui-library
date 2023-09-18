import * as React from 'react';
import { extractEventHandlers, useForkRef } from '../../utils';
import { type FormControlState, useFormControlContext } from '../FormControl';
import type {
    UseInputSlotProps,
    UseInputParameters,
    UseInputRootSlotProps,
    UseInputReturnValue
} from './useInput.types';

/**
 *
 * ## useInput API
 * - [useInput API](?path=/docs/inputs-input--docs#useinput-api-hook)
 */
export function useInput(parameters: UseInputParameters = {}): UseInputReturnValue {
    const {
        defaultValue: defaultValueProp,
        disabled: disabledProp = false,
        error: errorProp = false,
        onBlur,
        onChange,
        onFocus,
        required: requiredProp = false,
        value: valueProp,
        inputRef: inputRefProp
    } = parameters;

    const formControlContext: FormControlState | undefined = useFormControlContext();

    let defaultValue: unknown;
    let disabled: boolean;
    let error: boolean;
    let required: boolean;
    let value: unknown;

    if (formControlContext) {
        defaultValue = undefined;
        disabled = formControlContext.disabled ?? false;
        error = formControlContext.error ?? false;
        required = formControlContext.required ?? false;
        value = formControlContext.value;

        if (process.env.NODE_ENV !== 'production') {
            const definedLocalProps = (['defaultValue', 'disabled', 'error', 'required', 'value'] as const).filter(
                (prop) => parameters[prop] !== undefined
            );

            if (definedLocalProps.length > 0) {
                console.warn(
                    [
                        'Azrn: You have set props on an input that is inside a FormControl.',
                        'Set these props on a FormControl instead. Otherwise they will be ignored.',
                        `Ignored props: ${definedLocalProps.join(', ')}`
                    ].join('\n')
                );
            }
        }
    } else {
        defaultValue = defaultValueProp;
        disabled = disabledProp;
        error = errorProp;
        required = requiredProp;
        value = valueProp;
    }

    if (process.env.NODE_ENV !== 'production') {
        const registerEffect = formControlContext?.registerEffect;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
            if (registerEffect) {
                return registerEffect();
            }

            return undefined;
        }, [registerEffect]);
    }

    const { current: isControlled } = React.useRef(value != null);

    const handleInputRefWarning = React.useCallback((instance: HTMLElement) => {
        if (process.env.NODE_ENV !== 'production') {
            if (instance && instance.nodeName !== 'INPUT' && !instance.focus) {
                console.error(
                    [
                        'Azrn: You have provided a `slots.input` to the input component',
                        'that does not correctly handle the `ref` prop.',
                        'Make sure the `ref` prop is called with a HTMLInputElement.'
                    ].join('\n')
                );
            }
        }
    }, []);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleInputRef = useForkRef(inputRef, inputRefProp, handleInputRefWarning);

    const [focused, setFocused] = React.useState(false);

    // The blur won't fire when the disabled state is set on a focused input.
    // We need to book keep the focused state manually.
    React.useEffect(() => {
        if (!formControlContext && disabled && focused) {
            setFocused(false);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onBlur?.();
        }
    }, [formControlContext, disabled, focused, onBlur]);

    const handleFocus =
        (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
        (event: React.FocusEvent<HTMLInputElement>) => {
            // Fix a bug with IE11 where the focus/blur events are triggered
            // while the component is disabled.
            if (formControlContext?.disabled) {
                event.stopPropagation();
                return;
            }

            otherHandlers.onFocus?.(event);

            if (formControlContext && formControlContext.onFocus) {
                formControlContext?.onFocus?.();
            } else {
                setFocused(true);
            }
        };

    const handleBlur =
        (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
        (event: React.FocusEvent<HTMLInputElement>) => {
            otherHandlers.onBlur?.(event);

            if (formControlContext && formControlContext.onBlur) {
                formControlContext.onBlur();
            } else {
                setFocused(false);
            }
        };

    const handleChange =
        (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
        (event: React.ChangeEvent<HTMLInputElement>, ...args: unknown[]) => {
            if (!isControlled) {
                const element = event.target || inputRef.current;
                if (element == null) {
                    throw new Error(
                        'Azrn: Expected valid input target. ' +
                            'Did you use a custom `slots.input` and forget to forward refs?'
                    );
                }
            }

            formControlContext?.onChange?.(event);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            otherHandlers.onChange?.(event, ...args);
        };

    const handleClick =
        (otherHandlers: Record<string, React.EventHandler<any>>) => (event: React.MouseEvent<HTMLInputElement>) => {
            if (inputRef.current && event.currentTarget === event.target) {
                inputRef.current.focus();
            }

            otherHandlers.onClick?.(event);
        };

    const getRootProps = <ExternalProps extends Record<string, any> = NonNullable<unknown>>(
        externalProps: ExternalProps = {} as ExternalProps
    ): UseInputRootSlotProps<ExternalProps> => {
        // onBlur, onChange and onFocus are forwarded to the input slot.
        const propsEventHandlers = extractEventHandlers(parameters, ['onBlur', 'onChange', 'onFocus']);
        const externalEventHandlers = { ...propsEventHandlers, ...extractEventHandlers(externalProps) };

        return {
            ...externalProps,
            ...externalEventHandlers,
            onClick: handleClick(externalEventHandlers)
        };
    };

    const getInputProps = <ExternalProps extends Record<string, any> = NonNullable<unknown>>(
        externalProps: ExternalProps = {} as ExternalProps
    ): UseInputSlotProps<ExternalProps> => {
        const propsEventHandlers: Record<string, React.EventHandler<any> | undefined> = {
            onBlur,
            onChange,
            onFocus
        };

        const externalEventHandlers = { ...propsEventHandlers, ...extractEventHandlers(externalProps) };

        const mergedEventHandlers = {
            ...externalEventHandlers,
            onBlur: handleBlur(externalEventHandlers),
            onChange: handleChange(externalEventHandlers),
            onFocus: handleFocus(externalEventHandlers)
        };

        return {
            ...mergedEventHandlers,
            'aria-invalid': error || undefined,
            defaultValue: defaultValue as string | number | readonly string[] | undefined,
            value: value as string | number | readonly string[] | undefined,
            required,
            disabled,
            ...externalProps,
            ref: handleInputRef,
            ...mergedEventHandlers
        };
    };

    return {
        disabled,
        error,
        focused,
        formControlContext,
        getInputProps,
        getRootProps,
        inputRef: handleInputRef,
        required,
        value
    };
}
