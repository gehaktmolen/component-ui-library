import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '../../utils';
import composeClasses from '../composeClasses';
import { TabProps, TabTypeMap, TabRootSlotProps, TabOwnerState } from './Tab.types';
import { useTab } from '../useTab';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import generateUtilityClass from '../generateUtilityClass';

const useUtilityClasses = (ownerState: TabOwnerState) => {
    const { selected, disabled, orientation } = ownerState;

    const slots = {
        root: [
            'group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium focus:z-10',
            'bg-gray-100 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800',
            selected
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-100',
            disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
            orientation === 'horizontal'
                ? 'first-of-type:rounded-s-lg last-of-type:rounded-e-lg'
                : 'first-of-type:rounded-tl-lg first-of-type:rounded-tr-lg last-of-type:rounded-bl-lg last-of-type:rounded-br-lg'
        ],
        border: [
            'absolute',
            selected ? 'bg-primary-600 dark:bg-primary-500' : 'bg-transparent',
            orientation === 'horizontal' ? 'inset-x-0 bottom-0 h-0.5' : 'inset-y-0 left-0 w-1'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};
/**
 *
 * ## Tab API
 * - [Tab API](?path=/docs/navigation-tabs--docs#tab-api)
 */
export const Tab = React.forwardRef(function Tab<RootComponentType extends React.ElementType>(
    props: TabProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const {
        action,
        border: borderProp = true,
        children,
        value: valueProp,
        disabled = false,
        onChange,
        onClick,
        onFocus,
        slotProps = {},
        slots = {},
        ...other
    } = props;

    const tabRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();
    const handleRef = useForkRef(tabRef, forwardedRef);

    const { active, highlighted, orientation, selected, getRootProps } = useTab({
        ...props,
        rootRef: handleRef
    });

    const ownerState: TabOwnerState = {
        ...props,
        active,
        disabled,
        highlighted,
        orientation,
        selected
    };

    const classes = useUtilityClasses(ownerState);

    const TabRoot: React.ElementType = slots.root ?? 'button';
    const tabRootProps: WithOptionalOwnerState<TabRootSlotProps> = useSlotProps({
        elementType: TabRoot,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef
        },
        ownerState,
        className: classes.root
    });

    return (
        <TabRoot {...tabRootProps}>
            {children}
            {borderProp && <span aria-hidden="true" className={classes.border}></span>}
        </TabRoot>
    );
}) as PolymorphicComponent<TabTypeMap>;

Tab.propTypes = {
    /**
     * A ref for imperative actions. It currently only supports `focusVisible()` action.
     */
    action: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.shape({
                focusVisible: PropTypes.func.isRequired
            })
        })
    ]),
    /**
     * @ignore
     */
    children: PropTypes.node,
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled: PropTypes.bool,
    /**
     * Display active border.
     * @default true
     */
    border: PropTypes.node,
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
     * The props used for each slot inside the Tab.
     * @default {}
     */
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the Tab.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    }),
    /**
     * You can provide your own value. Otherwise, it falls back to the child position index.
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
} as any;
