import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuButtonOwnerState, MenuButtonProps } from './MenuButton.types';
import { useSlotProps } from '../utils';
import { useMenuButton } from '../useMenuButton';
import composeClasses from '../composeClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import generateUtilityClass from '../generateUtilityClass';

const useUtilityClasses = (ownerState: MenuButtonOwnerState) => {
    const { active, disabled, endDecorator, open } = ownerState;

    const slots = {
        root: [
            'inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset',
            'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800',
            disabled && '',
            active && '',
            open && '',
            Boolean(endDecorator) && 'inline-flex items-center'
        ],
        endDecorator: ['flex items-center -mr-0.5 h-5 w-5']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

/**
 *
 * ## MenuButton API
 * - [MenuButton API](#menu-button)
 */
const MenuButton = React.forwardRef(function MenuButton(
    props: MenuButtonProps,
    forwardedRef: React.ForwardedRef<HTMLElement>
) {
    const {
        children,
        disabled = false,
        endDecorator: endDecoratorProp,
        label,
        slots = {},
        slotProps = {},
        focusableWhenDisabled = false,
        ...other
    } = props;

    const { getRootProps, open, active } = useMenuButton({
        disabled,
        focusableWhenDisabled,
        rootRef: forwardedRef
    });

    const ownerState: MenuButtonOwnerState = {
        ...props,
        open,
        active,
        disabled,
        focusableWhenDisabled,
        endDecorator: endDecoratorProp
    };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root || 'button';
    const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalForwardedProps: other,
        externalSlotProps: slotProps.root,
        additionalProps: {
            ref: forwardedRef,
            type: 'button'
        },
        ownerState,
        className: classes.root
    });

    const endDecorator = endDecoratorProp ? (
        <span className={classes.endDecorator}>{endDecoratorProp}</span>
    ) : (
        <span className={classes.endDecorator}>
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                />
            </svg>
        </span>
    );

    return (
        <Root {...rootProps}>
            {children}
            {endDecorator}
        </Root>
    );
});

MenuButton.propTypes = {
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
     * Element placed after the children.
     */
    endDecorator: PropTypes.node,
    /**
     * If `true`, allows a disabled button to receive focus.
     * @default false
     */
    focusableWhenDisabled: PropTypes.bool,
    /**
     * Label of the button
     */
    label: PropTypes.string,
    /**
     * The components used for each slot inside the MenuButton.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The props used for each slot inside the MenuButton.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    })
} as any;

export { MenuButton };
