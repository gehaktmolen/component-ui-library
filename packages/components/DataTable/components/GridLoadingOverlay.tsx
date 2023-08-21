import * as React from 'react';
import { Progress } from '../../Progress';
import { GridOverlay, GridOverlayProps } from './containers/GridOverlay';

const GridLoadingOverlay = React.forwardRef<HTMLDivElement, GridOverlayProps>(function GridLoadingOverlay(props, ref) {
    return (
        <GridOverlay ref={ref} {...props}>
            <Progress />
        </GridOverlay>
    );
});

export { GridLoadingOverlay };
