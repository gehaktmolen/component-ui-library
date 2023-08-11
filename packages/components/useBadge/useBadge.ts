import * as React from 'react';
import { usePreviousProps } from '../../utils';
import { UseBadgeParameters, UseBadgeReturnValue } from './useBadge.types';

/**
 *
 * ## useBadge API
 * - [useBadge API](?path=/docs/data-display-badge--docs#usebadge-api-hook)
 */
export function useBadge(parameters: UseBadgeParameters): UseBadgeReturnValue {
    const {
        badgeContent: badgeContentProp,
        invisible: invisibleProp = false,
        max: maxProp = 99,
        showZero = false
    } = parameters;

    const prevProps = usePreviousProps({
        badgeContent: badgeContentProp,
        max: maxProp
    });

    let invisible = invisibleProp;

    if (!invisibleProp && badgeContentProp === 0 && !showZero) {
        invisible = true;
    }

    const { badgeContent, max = maxProp } = invisible ? prevProps : parameters;

    const displayValue: React.ReactNode = badgeContent && Number(badgeContent) > max ? `${max}+` : badgeContent;

    return {
        badgeContent,
        invisible,
        max,
        displayValue
    };
}
