import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '../composeClasses';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import { TabsListOwnerState, TabsListProps, TabsListRootSlotProps, TabsListTypeMap } from './TabsList.types';
import { useTabsList } from '../useTabsList';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import TabsListProvider from '../useTabsList/TabsListProvider';
import generateUtilityClass from '../generateUtilityClass';

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
 * API:
 *
 * - [TabsList API](https://#tabs-list)
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
