import * as React from 'react';
import PropTypes from 'prop-types';
import { generateUtilityClass, composeClasses, useSlotProps, useClassNamesOverride } from '../../utils';
import { useTabs, TabsProvider } from '../useTabs';
import type { PolymorphicComponent, WithOptionalOwnerState } from '../../utils';
import type { TabsOwnerState, TabsProps, TabsRootSlotProps, TabsTypeMap } from './Tabs.types';

const useUtilityClasses = (ownerState: TabsOwnerState) => {
    const { orientation } = ownerState;

    const slots = {
        root: ['flex', orientation === 'horizontal' ? 'flex-col' : 'flex-row']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

/**
 * Tabs are UI elements for organizing and navigating between groups of related content.
 *
 * ## API
 * - [Tabs API](?path=/docs/navigation-tabs--docs#api)
 */
export const Tabs = React.forwardRef(function Tabs<RootComponentType extends React.ElementType>(
    props: TabsProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const {
        children,
        value: valueProp,
        defaultValue,
        orientation = 'horizontal',
        direction = 'ltr',
        onChange,
        selectionFollowsFocus,
        slotProps = {},
        slots = {},
        ...other
    } = props;

    const { contextValue } = useTabs(props);

    const ownerState: TabsOwnerState = {
        ...props,
        orientation,
        direction
    };

    const classes = useUtilityClasses(ownerState);

    const TabsRoot: React.ElementType = slots.root ?? 'div';
    const tabsRootProps: WithOptionalOwnerState<TabsRootSlotProps> = useSlotProps({
        elementType: TabsRoot,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef
        },
        ownerState,
        className: classes.root
    });

    return (
        <TabsRoot {...tabsRootProps}>
            <TabsProvider value={contextValue}>{children}</TabsProvider>
        </TabsRoot>
    );
}) as PolymorphicComponent<TabsTypeMap>;

Tabs.propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * The direction of the text.
     * @default 'ltr'
     */
    direction: PropTypes.oneOf(['ltr', 'rtl']),
    /**
     * Callback invoked when new value is being set.
     */
    onChange: PropTypes.func,
    /**
     * The component orientation (layout flow direction).
     * @default 'horizontal'
     */
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    /**
     * If `true` the selected tab changes on focus. Otherwise, it only
     * changes on activation.
     */
    selectionFollowsFocus: PropTypes.bool,
    /**
     * The props used for each slot inside the Tabs.
     * @default {}
     */
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the Tabs.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    }),
    /**
     * The value of the currently selected `Tab`.
     * If you don't want any selected `Tab`, you can set this prop to `null`.
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
} as any;
