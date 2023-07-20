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
    const { active, disabled, focusVisible, variant, color, size, flat, block } = ownerState;

    const slots = {
        root: [
            styles.root,
            variant && styles[variant],
            (variant && color) && styles[`${variant}__${color}`],
            (variant && size) && styles[`${variant}__${size}`],
            color === 'inherit' && styles['color-inherit'],
            flat && styles.flat,
            block && styles.block,
            disabled && styles.disabled,
            focusVisible && styles.focus,
            active && styles.active,
        ],
        appendIcon: [
            styles['append-icon'],
            size && styles['append-icon__' + size]
        ],
        prependIcon: [
            styles['prepend-icon'],
            size && styles['append-icon__' + size]
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
        prependIcon: prependIconProp,
        appendIcon: appendIconProp,
        variant = 'solid',
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
    };

    const classes = useUtilityClasses(ownerState);

    const prependIcon = prependIconProp && (
        <span className={classes.prependIcon}>
            {prependIconProp}
        </span>
    );

    const appendIcon = appendIconProp && (
        <span className={classes.appendIcon}>
            {appendIconProp}
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
            {prependIcon}
            {children}
            {appendIcon}
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
    prependIcon: PropTypes.node,
    /**
     * Element placed after the children.
     */
    appendIcon: PropTypes.node,
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
