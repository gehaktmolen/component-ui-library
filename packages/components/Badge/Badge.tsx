import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent } from '../utils';
import composeClasses from '../composeClasses';
import { useBadge } from '../useBadge';
import { BadgeProps, BadgeOwnerState, BadgeTypeMap, BadgeRootSlotProps, BadgeBadgeSlotProps } from './Badge.types';
import { WithOptionalOwnerState, useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import generateUtilityClass from '../generateUtilityClass';

const useUtilityClasses = (ownerState: BadgeOwnerState) => {
    const { invisible, color, variant, anchorOrigin, overlap } = ownerState;

    let classes = '';

    if (anchorOrigin!.vertical === 'top' && anchorOrigin!.horizontal === 'right') {
        classes += ' -translate-y-1/3 translate-x-1/3';

        if (overlap === 'rectangular') {
            classes += ' top-0 right-0';
        } else {
            classes += ' top-1 right-1';
        }
    } else if (anchorOrigin!.vertical === 'bottom' && anchorOrigin!.horizontal === 'right') {
        classes += ' translate-y-1/3 translate-x-1/3';

        if (overlap === 'rectangular') {
            classes += ' bottom-0 right-0';
        } else {
            classes += ' bottom-1 right-1';
        }
    } else if (anchorOrigin!.vertical === 'top' && anchorOrigin!.horizontal === 'left') {
        classes += ' -translate-y-1/3 -translate-x-1/3';

        if (overlap === 'rectangular') {
            classes += ' top-0 left-0';
        } else {
            classes += ' top-1 left-1';
        }
    } else if (anchorOrigin!.vertical === 'bottom' && anchorOrigin!.horizontal === 'left') {
        classes += ' translate-y-1/3 -translate-x-1/3';

        if (overlap === 'rectangular') {
            classes += ' bottom-0 left-0';
        } else {
            classes += ' bottom-1 left-1';
        }
    }

    const slots = {
        root: ['relative inline-flex align-middle shrink-0'],
        badge: [
            'flex flex-row flex-wrap justify-center content-center items-center absolute box-border z-1 rounded-[20px] transition-transform origin-center',
            'text-gray-100',
            color === 'primary' && 'bg-primary-600 dark:bg-primary-500',
            color === 'danger' && 'bg-danger-600 dark:bg-danger-500',
            color === 'neutral' && 'bg-gray-600 dark:bg-gray-500 text-gray-100',
            variant === 'dot' ? 'h-2 w-2' : 'text-[10px] leading-none h-[20px] min-w-[20px] px-1.5',
            invisible ? 'scale-0' : 'scale-100',
            classes
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};
/**
 *
 * API:
 *
 * - [Badge API](?path=/docs/data-display-badge--docs#api)
 */
export const Badge = React.forwardRef(function Badge<RootComponentType extends React.ElementType>(
    props: BadgeProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const {
        badgeContent: badgeContentProp,
        children,
        invisible: invisibleProp,
        max: maxProp = 99,
        slotProps = {},
        slots = {},
        showZero = false,
        color = 'neutral',
        variant = 'standard',
        anchorOrigin = {
            vertical: 'top',
            horizontal: 'right'
        },
        overlap = 'rectangular',
        ...other
    } = props;

    const { badgeContent, max, displayValue, invisible } = useBadge({
        ...props,
        max: maxProp
    });

    const ownerState: BadgeOwnerState = {
        ...props,
        badgeContent,
        invisible,
        max,
        showZero,
        color,
        variant,
        anchorOrigin,
        overlap
    };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'span';
    const rootProps: WithOptionalOwnerState<BadgeRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef
        },
        ownerState,
        className: classes.root
    });

    const BadgeComponent = slots.badge ?? 'span';
    const badgeProps: WithOptionalOwnerState<BadgeBadgeSlotProps> = useSlotProps({
        elementType: BadgeComponent,
        externalSlotProps: slotProps.badge,
        ownerState,
        className: classes.badge
    });

    return (
        <Root {...rootProps}>
            {children}
            <BadgeComponent {...badgeProps}>{variant === 'standard' && displayValue}</BadgeComponent>
        </Root>
    );
}) as PolymorphicComponent<BadgeTypeMap>;

Badge.propTypes = {
    /**
     * The anchor of the badge.
     * @default {
     *   vertical: 'top',
     *   horizontal: 'right',
     * }
     */
    anchorOrigin: PropTypes.shape({
        horizontal: PropTypes.oneOf(['left', 'right']).isRequired,
        vertical: PropTypes.oneOf(['bottom', 'top']).isRequired
    }),
    /**
     * The content rendered within the badge.
     */
    badgeContent: PropTypes.node,
    /**
     * The badge will be added relative to this node.
     */
    children: PropTypes.node,
    /**
     * The color of the component.
     * @default 'neutral'
     */
    color: PropTypes.oneOfType([PropTypes.oneOf(['neutral', 'primary', 'danger']), PropTypes.string]),
    /**
     * If `true`, the badge is invisible.
     * @default false
     */
    invisible: PropTypes.bool,
    /**
     * Max count to show.
     * @default 99
     */
    max: PropTypes.number,
    /**
     * Wrapped shape the badge should overlap.
     * @default 'rectangular'
     */
    overlap: PropTypes.oneOf(['circular', 'rectangular']),
    /**
     * Controls whether the badge is hidden when `badgeContent` is zero.
     * @default false
     */
    showZero: PropTypes.bool,
    /**
     * The props used for each slot inside the Badge.
     * @default {}
     */
    slotProps: PropTypes.shape({
        badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the Badge.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        badge: PropTypes.elementType,
        root: PropTypes.elementType
    }),
    /**
     * The variant to use.
     * @default 'standard'
     */
    variant: PropTypes.oneOfType([PropTypes.oneOf(['dot', 'standard']), PropTypes.string])
} as any;
