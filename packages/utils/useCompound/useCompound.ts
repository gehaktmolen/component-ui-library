import * as React from 'react';

interface RegisterItemReturnValue<Key> {
    /**
     * The id of the item.
     * If the `id` was `undefined`, an id from the `missingKeyGenerator` will be used.
     */
    id: Key;
    /**
     * A function that de-registers the item.
     */
    deregister: () => void;
}

export type KeyGenerator<Key> = (existingKeys: Set<Key>) => Key;

export type CompoundComponentContextValue<Key, SubItem> = {
    /**
     * Registers an item with the parent.
     * This should be called during the effect phase of the child component.
     * The `itemMetadata` should be a stable reference (e.g. a memoized object), to avoid unnecessary re-registrations.
     *
     * @param id Id of the item or A function that generates a unique id for the item.
     *   It is called with the set of the ids of all the items that have already been registered.
     *   Return `existingKeys.size` if you want to use the index of the new item as the id..
     * @param itemMetadata Arbitrary metadata to pass to the parent component.
     */
    registerItem: (id: Key | KeyGenerator<Key>, item: SubItem) => RegisterItemReturnValue<Key>;
    /**
     * Returns the 0-based index of the item in the parent component's list of registered items.
     *
     * @param id id of the item.
     */
    getItemIndex: (id: Key) => number;
    /**
     * The total number of items registered with the parent.
     */
    totalSubItemCount: number;
};

export const CompoundComponentContext = React.createContext<CompoundComponentContextValue<any, any> | null>(null);

CompoundComponentContext.displayName = 'CompoundComponentContext';

export interface UseCompoundParentReturnValue<Key, SubItem extends { ref: React.RefObject<Node> }> {
    /**
     * The value for the CompoundComponentContext provider.
     */
    contextValue: CompoundComponentContextValue<Key, SubItem>;
    /**
     * The subItems registered with the parent.
     * The key is the id of the subItems, and the value is the metadata passed to the `useCompoundItem` hook.
     * The order of the items is the same as the order in which they were registered.
     */
    subItems: Map<Key, SubItem>;
}

/**
 * Sorts the subItems by their position in the DOM.
 */
function sortSubItems<Key, SubItem extends { ref: React.RefObject<Node> }>(subItems: Map<Key, SubItem>) {
    const subItemsArray = Array.from(subItems.keys()).map((key) => {
        const subItem = subItems.get(key)!;
        return { key, subItem };
    });

    subItemsArray.sort((a, b) => {
        const aNode = a.subItem.ref.current;
        const bNode = b.subItem.ref.current;

        if (aNode === null || bNode === null || aNode === bNode) {
            return 0;
        }

        // eslint-disable-next-line no-bitwise
        return aNode.compareDocumentPosition(bNode) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1;
    });

    return new Map(subItemsArray.map((item) => [item.key, item.subItem]));
}

/**
 * Provides a way for a component to know about its children.
 *
 * Child components register themselves with the `useCompoundItem` hook, passing in arbitrary metadata to the parent.
 *
 * This is a more powerful alternative to `children` traversal, as child components don't have to be placed
 * directly inside the parent component. They can be anywhere in the tree (and even rendered by other components).
 *
 * The downside is that this doesn't work with SSR as it relies on the useEffect hook.
 *
 * @ignore - internal hook.
 */
export function useCompoundParent<Key, SubItem extends { ref: React.RefObject<Node> }>(): UseCompoundParentReturnValue<
    Key,
    SubItem
> {
    const [subItems, setSubItems] = React.useState(new Map<Key, SubItem>());
    const subItemKeys = React.useRef(new Set<Key>());

    const deregisterItem = React.useCallback(function deregisterItem(id: Key) {
        subItemKeys.current.delete(id);
        setSubItems((previousState) => {
            const newState = new Map(previousState);
            newState.delete(id);
            return newState;
        });
    }, []);

    const registerItem = React.useCallback(
        function registerItem(id: Key | KeyGenerator<Key>, item: SubItem) {
            let providedOrGeneratedId: Key;

            if (typeof id === 'function') {
                providedOrGeneratedId = (id as KeyGenerator<Key>)(subItemKeys.current);
            } else {
                providedOrGeneratedId = id;
            }

            subItemKeys.current.add(providedOrGeneratedId);
            setSubItems((previousState) => {
                const newState = new Map(previousState);
                newState.set(providedOrGeneratedId, item);
                return newState;
            });

            return {
                id: providedOrGeneratedId,
                deregister: () => deregisterItem(providedOrGeneratedId)
            };
        },
        [deregisterItem]
    );

    const sortedSubItems = React.useMemo(() => sortSubItems(subItems), [subItems]);

    const getItemIndex = React.useCallback(
        function getItemIndex(id: Key) {
            return Array.from(sortedSubItems.keys()).indexOf(id);
        },
        [sortedSubItems]
    );

    const contextValue = React.useMemo(
        () => ({
            getItemIndex,
            registerItem,
            totalSubItemCount: subItems.size
        }),
        [getItemIndex, registerItem, subItems.size]
    );

    return {
        contextValue,
        subItems: sortedSubItems
    };
}
