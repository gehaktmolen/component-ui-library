import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import { useTabPanel } from '../useTabPanel';
import { TabPanelOwnerState, TabPanelProps, TabPanelRootSlotProps, TabPanelTypeMap } from './TabPanel.types';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import generateUtilityClass from '../generateUtilityClass';

const useUtilityClasses = (ownerState: { hidden: boolean }) => {
    const { hidden } = ownerState;

    const slots = {
        root: ['w-full', hidden && 'hidden']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};
/**
 *
 * TabPanel API:
 * - [TabPanel API](?path=/docs/navigation-tabs--docs#tabpanel-api)
 */
export const TabPanel = React.forwardRef(function TabPanel<RootComponentType extends React.ElementType>(
    props: TabPanelProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const { children, value, slotProps = {}, slots = {}, ...other } = props;

    const { hidden, getRootProps } = useTabPanel(props);

    const ownerState: TabPanelOwnerState = {
        ...props,
        hidden
    };

    const classes = useUtilityClasses(ownerState);

    const TabPanelRoot: React.ElementType = slots.root ?? 'div';
    const tabPanelRootProps: WithOptionalOwnerState<TabPanelRootSlotProps> = useSlotProps({
        elementType: TabPanelRoot,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            role: 'tabpanel',
            ref: forwardedRef
        },
        ownerState,
        className: classes.root
    });

    return <TabPanelRoot {...tabPanelRootProps}>{!hidden && children}</TabPanelRoot>;
}) as PolymorphicComponent<TabPanelTypeMap>;

TabPanel.propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * The props used for each slot inside the TabPanel.
     * @default {}
     */
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the TabPanel.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    }),
    /**
     * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
     * If not provided, it will fall back to the index of the panel.
     * It is recommended to explicitly provide it, as it's required for the tab panel to be rendered on the server.
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
} as any;
