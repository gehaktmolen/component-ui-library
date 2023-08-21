// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as React from 'react';
import { SvgIcon } from '../../components/SvgIcon';

export function createSvgIcon(path, displayName: string) {
    function Component(props, ref) {
        return (
            <SvgIcon data-testid={`${displayName}Icon`} ref={ref} {...props}>
                {path}
            </SvgIcon>
        );
    }

    if (process.env.NODE_ENV !== 'production') {
        // Need to set `displayName` on the inner component for React.memo.
        // React prior to 16.14 ignores `displayName` on the wrapper.
        Component.displayName = `${displayName}Icon`;
    }

    return React.memo(React.forwardRef(Component));
}
