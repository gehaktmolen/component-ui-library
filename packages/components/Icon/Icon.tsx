import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent } from '../utils';
import composeClasses from '../composeClasses';
import useIcon from '../useIcon';
import { getIconUtilityClass } from './iconClasses';
import {
    IconProps,
    IconOwnerState,
    IconTypeMap,
    IconRootSlotProps,
} from './Icon.types';
import { WithOptionalOwnerState, useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, IconLookup, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const ICON_COLOR = Object.freeze({
    primary: 'text-primary-500 dark:text-primary-100',
    secondary: 'text-secondary-500 dark:text-secondary-100',
    success: 'text-success-500 dark:text-success-100',
    danger: 'text-danger-500 dark:text-danger-100',
    warning: 'text-warning-500 dark:text-warning-100',
    info: 'text-info-500 dark:text-info-100'
} as const);

const useUtilityClasses = (ownerState: IconOwnerState) => {
    const { color } = ownerState;

    let classes = '';

    if (color === 'inherit') {
        classes += ' [text:inherit]';
    } else if (color ) {
        classes += ` ${ICON_COLOR[color]}`;
    }

    const slots = {
        root: [
            classes
        ],
    };

    return composeClasses(slots, useClassNamesOverride(getIconUtilityClass));
};
/**
 *
 * API:
 *
 * - [Icon API](https://#icon)
 */
export const Icon = React.forwardRef(function Icon<RootComponentType extends React.ElementType>(
    props: IconProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>,
) {
    const {
        slotProps = {},
        slots = {},
        icon,
        ...other
    } = props;

    const {getRootProps} = useIcon({
        ...props,
    });

    const ownerState: IconOwnerState = {
        ...props,
    };

    const classes = useUtilityClasses(ownerState);

    const iconLookup: IconLookup = { prefix: 'fas', iconName: icon };
    const iconDefinition: IconDefinition = findIconDefinition(iconLookup);

    const rootProps: WithOptionalOwnerState<IconRootSlotProps> = useSlotProps({
        elementType: 'svg',
        getSlotProps: getRootProps,
        externalForwardedProps: other,
        externalSlotProps: slotProps.root,
        additionalProps: {
            ref: forwardedRef,
        },
        ownerState,
        className: classes.root,
    });

    return <FontAwesomeIcon icon={iconDefinition} fixedWidth {...rootProps} />;
}) as PolymorphicComponent<IconTypeMap>;

Icon.propTypes = {
    /**
     * The color of the component.
     * @default 'primary'
     */
    color: PropTypes.oneOfType([
        PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'danger', 'info', 'warning']),
        PropTypes.string
    ]),
    /**
     * The size of the component.
     * @default 'medium'
     */
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),
    /**
     * The props used for each slot inside the Badge.
     * @default {}
     */
    slotProps: PropTypes.shape({
        badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    }),
    /**
     * The components used for each slot inside the Badge.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        badge: PropTypes.elementType,
        root: PropTypes.elementType,
    }),
} as any;
