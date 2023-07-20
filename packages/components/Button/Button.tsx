import styles from './Button.module.scss';

import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '../composeClasses';
import { getButtonUtilityClass } from './buttonClasses';
import { ButtonProps, ButtonTypeMap, ButtonRootSlotProps, ButtonOwnerState } from './Button.types';
import { useButton } from '../useButton';
import { PolymorphicComponent, WithOptionalOwnerState, useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

const useUtilityClasses = (ownerState: ButtonOwnerState) => {
    const { active, disabled, focusVisible, variant, color, size, flat, fullWidth } = ownerState;

    const slots = {
        root: [
            styles.root,
            variant && styles[variant],
            color && styles[color],
            size && styles[size],
            flat && styles['flat'],
            fullWidth && styles['full-width'],
            disabled && styles.disabled,
            focusVisible && styles.focus,
            active && 'active'
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
        variant,
        color,
        flat,
        fullWidth,
        slotProps = {},
        slots = {},
        ...other
    } = props;

    const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();

    const { active, focusVisible, setFocusVisible, getRootProps } = useButton({
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
        variant,
        color,
        flat,
        fullWidth
    };

    const classes = useUtilityClasses(ownerState);

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

    return <Root {...rootProps}>{children}</Root>;
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
    variant: PropTypes.oneOfType([PropTypes.oneOf(['contained', 'outlined', 'text']), PropTypes.string]),
    /**
     * The color of the component.
     * @default 'primary'
     */
    color: PropTypes.oneOfType([
        PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
        PropTypes.string
    ]),
    /**
     * Element placed before the children.
     */
    startIcon: PropTypes.node,
    /**
     * The size of the component.
     * `small` is equivalent to the dense button styling.
     * @default 'medium'
     */
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),
    /**
     * If `true`, the button will take up the full width of its container.
     * @default false
     */
    fullWidth: PropTypes.bool,
    /**
     * Element placed after the children.
     */
    endIcon: PropTypes.node,
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
