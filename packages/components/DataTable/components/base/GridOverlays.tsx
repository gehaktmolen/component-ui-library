import * as React from 'react';
import { composeClasses, generateUtilityClass, useClassNamesOverride, useEnhancedEffect } from '../../../../utils';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { gridExpandedRowCountSelector } from '../../hooks/features/filter/gridFilterSelector';
import { gridRowCountSelector, gridRowsLoadingSelector } from '../../hooks/features/rows/gridRowsSelector';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { getMinimalContentHeight } from '../../hooks/features/rows/gridRowsUtils';
// import { DataGridProcessedProps } from '../../models/props/DataGridProps';

// type OwnerState = { classes: DataGridProcessedProps['classes'] };

const useUtilityClasses = () => {
    const slots = {
        root: ['sticky z-40 w-0 h-0 top-0 left-0'],
        inner: ['']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

function GridOverlayWrapper(props: React.PropsWithChildren<{}>) {
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();

    const [viewportInnerSize, setViewportInnerSize] = React.useState(
        () => apiRef.current.getRootDimensions()?.viewportInnerSize ?? null
    );

    const handleViewportSizeChange = React.useCallback(() => {
        setViewportInnerSize(apiRef.current.getRootDimensions()?.viewportInnerSize ?? null);
    }, [apiRef]);

    useEnhancedEffect(() => {
        return apiRef.current.subscribeEvent('viewportInnerSizeChange', handleViewportSizeChange);
    }, [apiRef, handleViewportSizeChange]);

    let height: React.CSSProperties['height'] = viewportInnerSize?.height ?? 0;
    if (rootProps.autoHeight && height === 0) {
        height = getMinimalContentHeight(apiRef, rootProps.rowHeight); // Give room to show the overlay when there are no rows.
    }

    const classes = useUtilityClasses();

    if (!viewportInnerSize) {
        return null;
    }

    return (
        <div className={classes.root}>
            <div
                className={classes.inner}
                style={{
                    height,
                    width: viewportInnerSize?.width ?? 0
                }}
                {...props}
            />
        </div>
    );
}

export function GridOverlays() {
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();

    const totalRowCount = useGridSelector(apiRef, gridRowCountSelector);
    const visibleRowCount = useGridSelector(apiRef, gridExpandedRowCountSelector);
    const loading = useGridSelector(apiRef, gridRowsLoadingSelector);

    const showNoRowsOverlay = !loading && totalRowCount === 0;
    const showNoResultsOverlay = !loading && totalRowCount > 0 && visibleRowCount === 0;

    let overlay: React.JSX.Element | null = null;

    if (showNoRowsOverlay) {
        overlay = <rootProps.slots.noRowsOverlay {...rootProps.slotProps?.noRowsOverlay} />;
    }

    if (showNoResultsOverlay) {
        overlay = <rootProps.slots.noResultsOverlay {...rootProps.slotProps?.noResultsOverlay} />;
    }

    if (loading) {
        overlay = <rootProps.slots.loadingOverlay {...rootProps.slotProps?.loadingOverlay} />;
    }

    if (overlay === null) {
        return null;
    }

    return <GridOverlayWrapper>{overlay}</GridOverlayWrapper>;
}
