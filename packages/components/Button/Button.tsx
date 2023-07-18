import styles from './Button.module.scss';

import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent } from '../utils/PolymorphicComponent.ts';
import composeClasses from '../composeClasses';
import { getButtonUtilityClass } from './buttonClasses';
import { ButtonProps, ButtonTypeMap, ButtonRootSlotProps, ButtonOwnerState } from './Button.types';
import { useButton } from '../useButton';
import { WithOptionalOwnerState } from '../utils/types';
import { useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

const useUtilityClasses = (ownerState: ButtonOwnerState) => {
    const {
        active,
        disabled,
        focusVisible,
        variant
    } = ownerState;

    console.log('VARIAnt', variant, styles[variant]);

    const slots = {
        root: [
            styles.root,
            styles[variant],
            disabled && 'disabled',
            focusVisible && 'focusVisible',
            active && 'active',
        ],
    };

    return composeClasses(slots, useClassNamesOverride(getButtonUtilityClass));
};
/**
 * The foundation for building custom-styled buttons.
 *
 * Demos:
 *
 * - [Button](https:///)
 *
 * API:
 *
 * - [Button API](https://#button)
 */
export const Button = React.forwardRef(function Button<RootComponentType extends React.ElementType>(
    props: ButtonProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>,
) {
    const {
        action,
        children,
        disabled,
        focusableWhenDisabled = false,
        onFocusVisible,
        variant = 'contained',
        slotProps = {},
        slots = {},
        ...other
    } = props;

    const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();

    const {active, focusVisible, setFocusVisible, getRootProps} = useButton({
        ...props,
        focusableWhenDisabled,
    });

    React.useImperativeHandle(
        action,
        () => ({
            focusVisible: () => {
                setFocusVisible(true);
                buttonRef.current!.focus();
            },
        }),
        [setFocusVisible],
    );

    const ownerState: ButtonOwnerState = {
        ...props,
        active,
        focusableWhenDisabled,
        focusVisible,
        variant,
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
            ref: forwardedRef,
        },
        ownerState,
        className: classes.root,
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
                focusVisible: PropTypes.func.isRequired,
            }),
        }),
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
     * Defines the general style of the button.
     * @default contained
     */
    variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
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
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    }),
    /**
     * The components used for each slot inside the Button.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType,
    }),
    /**
     * @ignore
     */
    to: PropTypes.string,
} as any;
