import * as React from 'react';
import PropTypes from 'prop-types';
import { generateUtilityClass, composeClasses, useSlotProps, useClassNamesOverride } from '../../utils';
import { useTabsList } from '../useTabsList';
import TabsListProvider from '../useTabsList/TabsListProvider';
import type { PolymorphicComponent, WithOptionalOwnerState } from '../../utils';
import type { TabsListOwnerState, TabsListProps, TabsListRootSlotProps, TabsListTypeMap } from './TabsList.types';

const useUtilityClasses = (ownerState: TabsListOwnerState) => {
    const { orientation } = ownerState;

    const slots = {
        root: [
            'isolate flex rounded-lg shadow',
            'divide-gray-200 dark:divide-gray-800 dark:shadow-gray-900',
            orientation === 'horizontal' ? 'flex-row divide-x' : 'flex-col divide-y'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

/**
 *
 * ## TabsList API
 * - [TabsList API](?path=/docs/navigation-tabs--docs#tabslist-api)
 */
export const TabsList = React.forwardRef(function TabsList<RootComponentType extends React.ElementType>(
    props: TabsListProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const { children, slotProps = {}, slots = {}, ...other } = props;

    const { isRtl, orientation, getRootProps, contextValue } = useTabsList({
        rootRef: forwardedRef
    });

    const ownerState: TabsListOwnerState = {
        ...props,
        isRtl,
        orientation
    };

    const classes = useUtilityClasses(ownerState);

    const TabsListRoot: React.ElementType = slots.root ?? 'div';
    const tabsListRootProps: WithOptionalOwnerState<TabsListRootSlotProps> = useSlotProps({
        elementType: TabsListRoot,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        ownerState,
        className: classes.root
    });

    return (
        <TabsListProvider value={contextValue}>
            <TabsListRoot {...tabsListRootProps}>{children}</TabsListRoot>
        </TabsListProvider>
    );
}) as PolymorphicComponent<TabsListTypeMap>;

TabsList.propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * The props used for each slot inside the TabsList.
     * @default {}
     */
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the TabsList.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    })
} as any;
