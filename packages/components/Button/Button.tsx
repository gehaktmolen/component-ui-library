import * as React from 'react';
import PropTypes from 'prop-types';
import {
    generateUtilityClass,
    composeClasses,
    useSlotProps,
    useColorInversion,
    useClassNamesOverride
} from '../../utils';
import { useButton } from '../useButton';
import type { PolymorphicComponent, WithOptionalOwnerState } from '../../utils';
import type { ButtonProps, ButtonTypeMap, ButtonRootSlotProps, ButtonOwnerState } from './Button.types';

const useUtilityClasses = (ownerState: ButtonOwnerState) => {
    const { active, disabled, endDecorator, focusVisible, variant, color, startDecorator, size, flat, block } =
        ownerState;
    const slots = {
        root: [
            size === 'sm' && 'px-2 py-1 text-xs',
            size === 'md' && 'px-2.5 py-1.5 text-sm',
            size === 'lg' && 'px-3.5 py-2.5 text-sm',
            variant === 'solid' &&
                'rounded-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
            variant === 'solid' &&
                color === 'primary' &&
                'shadow-sm bg-primary-600 dark:bg-primary-500 text-gray-100 hover:bg-primary-500 dark:hover:bg-primary-400 focus-visible:outline-primary-600 dark:focus-visible:outline-primary-500',
            variant === 'solid' &&
                color === 'neutral' &&
                'shadow-sm bg-gray-100 dark:bg-gray-100/10 text-gray-900 dark:text-gray-100 ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-100/20 focus-visible:outline-gray-600 dark:focus-visible:outline-gray-500',
            variant === 'solid' &&
                color === 'danger' &&
                'shadow-sm bg-danger-600 dark:bg-danger-500 text-gray-100 hover:bg-danger-500 dark:hover:bg-danger-400 focus-visible:outline-danger-600 dark:focus-visible:outline-danger-500',
            variant === 'soft' && 'rounded-md font-semibold shadow-sm',
            variant === 'soft' &&
                color === 'primary' &&
                'bg-primary-50 dark:bg-gray-100/10 text-primary-600 dark:text-primary-500 hover:bg-primary-100 dark:hover:bg-gray-100/20',
            variant === 'soft' &&
                color === 'neutral' &&
                'bg-gray-500 dark:bg-gray/10 text-gray-900 dark:text-gray-500 hover:bg-gray-400 dark:hover:bg-gray/20',
            variant === 'soft' &&
                color === 'danger' &&
                'bg-danger-50 dark:bg-gray-100/10 text-danger-600 dark:text-danger-500 hover:bg-danger-100 dark:hover:bg-gray-100/20',
            flat && 'drop-shadow-none hover:drop-shadow-none active:drop-shadow-none',
            block && 'w-full',
            disabled &&
                'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 ring-gray-200 dark:ring-gray-800 drop-shadow-none cursor-not-allowed',
            focusVisible && '',
            active && '',
            (Boolean(startDecorator) || Boolean(endDecorator)) && 'inline-flex items-center',
            (Boolean(startDecorator) || Boolean(endDecorator)) && size === 'lg' ? 'gap-x-2' : 'gap-x-1.5'
        ],
        startDecorator: ['flex items-center -ml-0.5 h-5 w-5'],
        endDecorator: ['flex items-center -mr-0.5 h-5 w-5']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};
/**
 * The Button component replaces the standard html button with a multitude of options.
 * A staple for any application. It is used for everything from navigation to form submission;
 * and can be styled in a multitude of ways.
 *
 * ## API
 * - [Button API](?path=/docs/inputs-button--docs#api)
 */
export const Button = React.forwardRef(function Button<RootComponentType extends React.ElementType>(
    props: ButtonProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const {
        action,
        children,
        color: colorProp = 'primary',
        disabled,
        focusableWhenDisabled = false,
        onFocusVisible,
        startDecorator: startDecoratorProp,
        endDecorator: endDecoratorProp,
        slotProps = {},
        slots = {},
        size: sizeProp = 'md',
        variant = 'solid',
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

    const size = props.size ?? sizeProp;
    const { getColor } = useColorInversion(variant);
    const color = getColor(props.color, colorProp);

    const ownerState: ButtonOwnerState = {
        ...props,
        active,
        color,
        endDecoratorProp,
        focusableWhenDisabled,
        focusVisible,
        startDecoratorProp,
        size,
        variant
    };

    const classes = useUtilityClasses(ownerState);

    const startDecorator = startDecoratorProp && <span className={classes.startDecorator}>{startDecoratorProp}</span>;

    const endDecorator = endDecoratorProp && <span className={classes.endDecorator}>{endDecoratorProp}</span>;

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
     * If `true`, the button will take up the full width of its container.
     * @default false
     */
    block: PropTypes.bool,
    /**
     * @ignore
     */
    children: PropTypes.node,
    /**
     * The color of the component.
     * @default 'primary'
     */
    color: PropTypes.oneOfType([PropTypes.oneOf(['neutral', 'primary', 'danger']), PropTypes.string]),
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
     * Removes the button box shadow.
     * @default false
     */
    flat: PropTypes.bool,
    /**
     * If `true`, allows a disabled button to receive focus.
     * @default false
     */
    focusableWhenDisabled: PropTypes.bool,
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
    to: PropTypes.string,
    /**
     * Element placed before the children.
     */
    startDecorator: PropTypes.node,
    /**
     * The size of the component.
     * @default 'md'
     */
    size: PropTypes.oneOfType([PropTypes.oneOf(['sm', 'md', 'lg']), PropTypes.string]),
    /**
     * The variant to use.
     * @default 'solid'
     */
    variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
        PropTypes.oneOf(['soft', 'solid']),
        PropTypes.string
    ])
} as any;
