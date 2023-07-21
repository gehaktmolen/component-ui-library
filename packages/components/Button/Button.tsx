import styles from './Button.module.scss';

import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '../composeClasses';
import { getButtonUtilityClass } from './buttonClasses';
import { ButtonProps, ButtonTypeMap, ButtonRootSlotProps, ButtonOwnerState } from './Button.types';
import { useButton } from '../useButton';
import { PolymorphicComponent, WithOptionalOwnerState, useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

const BUTTON_SOLID = Object.freeze({
    primary: 'bg-primary-500 dark:bg-primary-100',
    secondary: 'bg-secondary-500 dark:bg-secondary-100',
    success: 'bg-success-500 dark:bg-success-100',
    danger: 'bg-danger-500 dark:bg-danger-100',
    warning: 'bg-warning-500 dark:bg-warning-100',
    info: 'bg-info-500 dark:bg-info-100'
} as const);

const BUTTON_OUTLINED = Object.freeze({
    primary: 'bg-primary-500 dark:bg-primary-100 text-primary-500 dark:text-amber-500',
    secondary: 'bg-secondary-500 dark:bg-secondary-100 text-secondary-500 dark:text-amber-500' ,
    success: 'bg-success-500 dark:bg-success-100 text-success-500 dark:text-amber-500',
    danger: 'bg-danger-500 dark:bg-danger-100 text-danger-500 dark:text-amber-500',
    warning: 'bg-warning-500 dark:bg-warning-100 text-warning-500 dark:text-amber-500',
    info: 'bg-info-500 dark:bg-info-100 text-info-500 dark:text-amber-500'
} as const);

const useUtilityClasses = (ownerState: ButtonOwnerState) => {
    const {active, disabled, focusVisible, variant, color, size, flat, block} = ownerState;

    let classes = 'px-[16px] py-[6px] min-w-[64px] rounded-md transition hover:no-underline';

    if (color === 'inherit') {
        classes += ' [text:inherit] border-current';
    } else if (disabled) {
        classes += ' text-gray-50 dark:text-gray-50 bg-gray-400 dark:bg-gray-500';
    }

    switch (variant) {
        case 'solid':
            classes += ' shadow-md hover:drop-shadow-xl active:drop-shadow-2xl';

            if (color && color !== 'inherit' && !disabled) {
                classes += ` ${BUTTON_SOLID[color]}`;
            }

            if (size === 'small') {
                classes += ' py-[4px] px-[10px] text-sm';
            } else if (size === 'large') {
                classes += ' py-[8px] px-[20px] text-lg';
            }

            break;
        case 'outlined':
            classes += ' py-[5px] px-[15px] border border-current hover:bg-opacity-10'

            if (color && color !== 'inherit' && !disabled) {
                classes += ` ${BUTTON_OUTLINED[color]} bg-opacity-0 dark:bg-opacity-0`;
            }

            if (size === 'small') {
                classes += ' py-[3px] px-[9px] text-sm';
            } else if (size === 'large') {
                classes += ' py-[7px] px-[21px] text-lg';
            }

            break;
        case 'plain':
            classes += ' bg-transparent';

            if (color && color !== 'inherit' && !disabled) {
                classes += ` ${BUTTON_SOLID[color]}`;
            }

            if (size === 'small') {
                classes += ' py-[4px] px-[5px] text-sm';
            } else if (size === 'large') {
                classes += ' py-[8px] px-[11px] text-lg';
            }

            break;
    }

    const slots = {
        root: [
            styles.root,
            classes,
            flat && 'drop-shadow-none hover:drop-shadow-none active:drop-shadow-none',
            block && 'w-full',
            disabled && 'drop-shadow-none',
            focusVisible && 'bg-emerald-500 drop-shadow-none',
            active && 'bg-amber-500',
        ],
        startDecorator: [
            '[display:inherit] mr-2',
            (size && size === 'small') && 'ml[-2px] text-lg',
            (size && size === 'large') && 'ml-[-4px] text-2xl',
        ],
        endDecorator: [
            '[display:inherit] ml-2',
            (size && size === 'small') && 'mr-[-2px] text-lg',
            (size && size === 'large') && 'mr-[-4px] text-2xl',
        ]
    };

    return composeClasses(slots, useClassNamesOverride(getButtonUtilityClass));
};
/**
 * The Button component replaces the standard html button with a multitude of options.
 * A staple for any application. It is used for everything from navigation to form submission;
 * and can be styled in a multitude of ways.
 *
 * API:
 * - [Button API](https://#button)
 */
export const Button = React.forwardRef(function Button<RootComponentType extends React.ElementType>(
    props: ButtonProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const {
        action,
        children,
        disabled,
        focusableWhenDisabled = false,
        onFocusVisible,
        startDecorator: startDecoratorProp,
        endDecorator: endDecoratorProp,
        variant = 'solid',
        slotProps = {},
        slots = {},
        ...other
    } = props;

    const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();

    const {active, focusVisible, setFocusVisible, getRootProps} = useButton({
        ...props,
        focusableWhenDisabled
    });

    React.useImperativeHandle(
        action,
        () => ({
            focusVisible: () => {
                setFocusVisible(true);
                buttonRef.current!.focus();
            }
        }),
        [setFocusVisible]
    );

    const ownerState: ButtonOwnerState = {
        ...props,
        active,
        focusableWhenDisabled,
        focusVisible,
    };

    const classes = useUtilityClasses(ownerState);

    const startDecorator = startDecoratorProp && (
        <span className={classes.startDecorator}>
            {startDecoratorProp}
        </span>
    );

    const endDecorator = endDecoratorProp && (
        <span className={classes.endDecorator}>
            {endDecoratorProp}
        </span>
    );

    const defaultElement = other.href || other.to ? 'a' : 'button';
    const Root: React.ElementType = slots.root ?? defaultElement;
    const rootProps: WithOptionalOwnerState<ButtonRootSlotProps> = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalForwardedProps: other,
        externalSlotProps: slotProps.root,
        additionalProps: {
            ref: forwardedRef
        },
        ownerState,
        className: classes.root
    });

    return (
        <Root {...rootProps}>
            {startDecorator}
            {children}
            {endDecorator}
        </Root>
    );
}) as PolymorphicComponent<ButtonTypeMap>;

Button.propTypes = {
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
     * If `true`, allows a disabled button to receive focus.
     * @default false
     */
    focusableWhenDisabled: PropTypes.bool,
    /**
     * The variant to use.
     * @default 'text'
     */
    variant: PropTypes.oneOfType([PropTypes.oneOf(['solid', 'outlined', 'plain']), PropTypes.string]),
    /**
     * The color of the component.
     * @default 'primary'
     */
    color: PropTypes.oneOfType([
        PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'danger', 'info', 'warning']),
        PropTypes.string
    ]),
    /**
     * Element placed before the children.
     */
    startDecorator: PropTypes.node,
    /**
     * Element placed after the children.
     */
    endDecorator: PropTypes.node,
    /**
     * The size of the component.
     * @default 'medium'
     */
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),
    /**
     * If `true`, the button will take up the full width of its container.
     * @default false
     */
    block: PropTypes.bool,
    /**
     * Removes the button box shadow.
     * @default false
     */
    flat: PropTypes.bool,
    /**
     * @ignore
     */
    href: PropTypes.string,
    /**
     * @ignore
     */
    onFocusVisible: PropTypes.func,
    /**
     * The props used for each slot inside the Button.
     * @default {}
     */
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the Button.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    }),
    /**
     * @ignore
     */
    to: PropTypes.string
} as any;
