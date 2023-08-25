import * as React from 'react';
import RowListContext from './RowListContext';
import WrapListContext from './WrapListContext';
import NestedListContext from './NestedListContext';

import { ListState } from './List.types';

interface ListProviderProps {
    /**
     * If `undefined`, there is no effect.
     * If `true` or `false`, affects the nested List styles.
     */
    nested?: boolean;
    /**
     * If `true`, display the list in horizontal direction.
     * @default false
     */
    row?: boolean;
    /**
     * Only for horizontal list.
     * If `true`, the list sets the flex-wrap to "wrap" and adjust margin to have gap-like behavior (will move to `gap` in the future).
     *
     * @default false
     */
    wrap?: boolean;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: ListState['color'];
    /**
     * The size of the component (affect other nested list* components).
     * @default 'md'
     */
    size?: ListState['size'];
    /**
     * @default 'solid'
     */
    variant?: ListState['variant'];
}

/**
 * @ignore - internal component.
 */
function ListProvider(props: React.PropsWithChildren<ListProviderProps>) {
    const { children, nested, row = false, wrap = false } = props;
    const baseProviders = (
        <RowListContext.Provider value={row}>
            <WrapListContext.Provider value={wrap}>
                {React.Children.map(children, (child, index) =>
                    React.isValidElement(child)
                        ? React.cloneElement(child, {
                              // to let List(Item|ItemButton) know when to apply margin(Inline|Block)Start
                              ...(index === 0 && { 'data-first-child': '' }),
                              ...{
                                  size: props.size,
                                  color: props.color,
                                  variant: props.variant
                              }
                          })
                        : child
                )}
            </WrapListContext.Provider>
        </RowListContext.Provider>
    );
    if (nested === undefined) {
        return baseProviders;
    }
    return <NestedListContext.Provider value={nested}>{baseProviders}</NestedListContext.Provider>;
}

export default ListProvider;
