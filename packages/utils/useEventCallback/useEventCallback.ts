import * as React from 'react';
import useEnhancedEffect from '../useEnhancedEffect';

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */
function useEventCallback<Fn extends (...args: any[]) => any = (...args: unknown[]) => unknown>(fn: Fn): Fn;
function useEventCallback<Args extends unknown[], Return>(fn: (...args: Args) => Return): (...args: Args) => Return;
function useEventCallback<Args extends unknown[], Return>(fn: (...args: Args) => Return): (...args: Args) => Return {
    const ref = React.useRef(fn);
    useEnhancedEffect(() => {
        ref.current = fn;
    });
    return React.useCallback(
        (...args: Args) =>
            // @ts-expect-error hide `this`
            // tslint:disable-next-line:ban-comma-operator
            (0, ref.current!)(...args),
        []
    );
}

export default useEventCallback;
