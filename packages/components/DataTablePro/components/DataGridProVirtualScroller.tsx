import * as React from 'react';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../utils';
import {
    useGridSelector,
    gridVisibleColumnFieldsSelector,
    gridRowsMetaSelector,
    useGridApiEventHandler,
    GridRowId,
    GridOverlays
} from '../../DataTable';
import {
    GridVirtualScroller,
    GridVirtualScrollerContent,
    GridVirtualScrollerRenderZone,
    useGridVirtualScroller,
    calculatePinnedRowsHeight
} from '../../DataTable/internals';
import { useGridPrivateApiContext } from '../hooks/utils/useGridPrivateApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { DataGridProProcessedProps } from '../models/dataGridProProps';
import { gridPinnedColumnsSelector, GridPinnedColumns, GridPinnedPosition } from '../hooks/features/columnPinning';
import {
    gridDetailPanelExpandedRowsContentCacheSelector,
    gridDetailPanelExpandedRowsHeightCacheSelector,
    gridDetailPanelExpandedRowIdsSelector
} from '../hooks/features/detailPanel';
import { GridDetailPanel } from './GridDetailPanel';
import { gridPinnedRowsSelector } from '../hooks/features/rowPinning/gridRowPinningSelector';

export const filterColumns = (
    pinnedColumns: GridPinnedColumns,
    columns: string[],
    invert?: boolean
): [string[], string[]] => {
    if (!Array.isArray(pinnedColumns.left) && !Array.isArray(pinnedColumns.right)) {
        return [[], []];
    }

    if (pinnedColumns.left?.length === 0 && pinnedColumns.right?.length === 0) {
        return [[], []];
    }

    const filter = (newPinnedColumns: any[] | undefined, remainingColumns: string[]) => {
        if (!Array.isArray(newPinnedColumns)) {
            return [];
        }
        return newPinnedColumns.filter((field) => remainingColumns.includes(field));
    };

    const leftPinnedColumns = filter(pinnedColumns.left, columns);
    const columnsWithoutLeftPinnedColumns = columns.filter(
        // Filter out from the remaining columns those columns already pinned to the left
        (field) => !leftPinnedColumns.includes(field)
    );
    const rightPinnedColumns = filter(pinnedColumns.right, columnsWithoutLeftPinnedColumns);
    if (invert) {
        return [rightPinnedColumns, leftPinnedColumns];
    }
    return [leftPinnedColumns, rightPinnedColumns];
};

type OwnerState = DataGridProProcessedProps;

const useUtilityClasses = (ownerState: OwnerState) => {
    const { side, showCellVerticalBorder, position } = ownerState;
    const slots = {
        leftPinnedColumns: [
            'sticky overflow-hidden z-10 float-left left-0 shadow-xl bg-danger-500',
            side === GridPinnedPosition.right && 'right-0 float-right shadow-xl',
            side === GridPinnedPosition.left && 'left-0 float-left shadow-xl',
            'pinnedColumns',
            'pinnedColumns--left'
        ],
        rightPinnedColumns: [
            'sticky overflow-hidden z-10 float-left left-0 shadow-xl bg-danger-700',
            side === GridPinnedPosition.right && 'right-0 float-right shadow-xl',
            side === GridPinnedPosition.left && 'left-0 float-left shadow-xl',
            'pinnedColumns',
            'pinnedColumns--right',
            'withBorderColor',
            showCellVerticalBorder && 'showCellVerticalBorder'
        ],
        topPinnedRows: [
            'sticky z-30 bg-primary-500',
            position === 'top' && 'top-0 shadow-xl',
            position === PinnedRowsPosition.bottom && 'bottom-0 shadow-xl',
            'pinnedRows',
            'pinnedRows--top'
        ],
        bottomPinnedRows: [
            'sticky z-30 bg-primary-700',
            position === 'top' && 'top-0 shadow-xl',
            position === PinnedRowsPosition.bottom && 'bottom-0 shadow-xl',
            'pinnedRows',
            'pinnedRows--bottom'
        ],
        pinnedRowsRenderZone: ['absolute', 'pinnedRowsRenderZone'],
        detailPanels: ['relative detailPanels'],
        detailPanel: ['relative detailPanel']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

enum PinnedRowsPosition {
    top = 'top',
    bottom = 'bottom'
}

interface DataGridProVirtualScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
    disableVirtualization?: boolean;
}

const DataGridProVirtualScroller = React.forwardRef<HTMLDivElement, DataGridProVirtualScrollerProps>(
    function DataGridProVirtualScroller(props, ref) {
        const { className, disableVirtualization, ...other } = props;
        const apiRef = useGridPrivateApiContext();
        const rootProps = useGridRootProps();
        const visibleColumnFields = useGridSelector(apiRef, gridVisibleColumnFieldsSelector);
        const expandedRowIds = useGridSelector(apiRef, gridDetailPanelExpandedRowIdsSelector);
        const detailPanelsContent = useGridSelector(apiRef, gridDetailPanelExpandedRowsContentCacheSelector);
        const detailPanelsHeights = useGridSelector(apiRef, gridDetailPanelExpandedRowsHeightCacheSelector);
        const leftColumns = React.useRef<HTMLDivElement>(null);
        const rightColumns = React.useRef<HTMLDivElement>(null);
        const topPinnedRowsRenderZoneRef = React.useRef<HTMLDivElement>(null);
        const bottomPinnedRowsRenderZoneRef = React.useRef<HTMLDivElement>(null);

        const handleRenderZonePositioning = React.useCallback(({ top, left }: { top: number; left: number }) => {
            if (leftColumns.current) {
                leftColumns.current!.style.transform = `translate3d(0px, ${top}px, 0px)`;
            }
            if (rightColumns.current) {
                rightColumns.current!.style.transform = `translate3d(0px, ${top}px, 0px)`;
            }
            if (topPinnedRowsRenderZoneRef.current) {
                topPinnedRowsRenderZoneRef.current!.style.transform = `translate3d(${left}px, 0px, 0px)`;
            }
            if (bottomPinnedRowsRenderZoneRef.current) {
                bottomPinnedRowsRenderZoneRef.current!.style.transform = `translate3d(${left}px, 0px, 0px)`;
            }
        }, []);

        // Create a lookup for faster check if the row is expanded
        const expandedRowIdsLookup = React.useMemo(() => {
            const lookup: Set<GridRowId> = new Set();
            expandedRowIds.forEach((id: GridRowId) => {
                lookup.add(id);
            });
            return lookup;
        }, [expandedRowIds]);

        const getRowProps = React.useCallback(
            (id: GridRowId) => {
                if (!expandedRowIdsLookup.has(id)) {
                    return null;
                }
                const height = detailPanelsHeights[id];
                return { style: { marginBottom: height } };
            },
            [detailPanelsHeights, expandedRowIdsLookup]
        );

        const pinnedColumns = useGridSelector(apiRef, gridPinnedColumnsSelector);
        const [leftPinnedColumns, rightPinnedColumns] = filterColumns(pinnedColumns, visibleColumnFields, false);

        const pinnedRows = useGridSelector(apiRef, gridPinnedRowsSelector);
        const topPinnedRowsData = React.useMemo(() => pinnedRows?.top || [], [pinnedRows?.top]);
        const bottomPinnedRowsData = React.useMemo(() => pinnedRows?.bottom || [], [pinnedRows?.bottom]);

        const ownerState = { ...rootProps, classes: rootProps.classes };
        const classes = useUtilityClasses(ownerState);

        const { renderContext, getRows, getRootProps, getContentProps, getRenderZoneProps, updateRenderZonePosition } =
            useGridVirtualScroller({
                ref,
                renderZoneMinColumnIndex: leftPinnedColumns.length,
                renderZoneMaxColumnIndex: visibleColumnFields.length - rightPinnedColumns.length,
                onRenderZonePositioning: handleRenderZonePositioning,
                getRowProps,
                ...props
            });

        const refreshRenderZonePosition = React.useCallback(() => {
            if (renderContext) {
                updateRenderZonePosition(renderContext);
            }
        }, [renderContext, updateRenderZonePosition]);

        useGridApiEventHandler(apiRef, 'columnWidthChange', refreshRenderZonePosition);
        useGridApiEventHandler(apiRef, 'columnOrderChange', refreshRenderZonePosition);
        useGridApiEventHandler(apiRef, 'rowOrderChange', refreshRenderZonePosition);

        const leftRenderContext =
            renderContext && leftPinnedColumns.length > 0
                ? {
                      ...renderContext,
                      firstColumnIndex: 0,
                      lastColumnIndex: leftPinnedColumns.length
                  }
                : null;

        const rightRenderContext =
            renderContext && rightPinnedColumns.length > 0
                ? {
                      ...renderContext,
                      firstColumnIndex: visibleColumnFields.length - rightPinnedColumns.length,
                      lastColumnIndex: visibleColumnFields.length
                  }
                : null;

        const getDetailPanel = (rowId: GridRowId): React.ReactNode => {
            const rowsMeta = gridRowsMetaSelector(apiRef.current.state);
            const content = detailPanelsContent[rowId];

            // Check if the id exists in the current page
            const rowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(rowId);
            const exists = rowIndex !== undefined;

            if (React.isValidElement(content) && exists) {
                const hasAutoHeight = apiRef.current.detailPanelHasAutoHeight(rowId);
                const height = hasAutoHeight ? 'auto' : detailPanelsHeights[rowId];

                const sizes = apiRef.current.unstable_getRowInternalSizes(rowId);
                const spacingTop = sizes?.spacingTop || 0;
                const top = rowsMeta.positions[rowIndex] + apiRef.current.unstable_getRowHeight(rowId) + spacingTop;

                return (
                    <GridDetailPanel
                        key={rowId}
                        rowId={rowId}
                        style={{ top }}
                        height={height}
                        className={classes.detailPanel}
                    >
                        {content}
                    </GridDetailPanel>
                );
            }
            return null;
        };

        const detailPanels: React.ReactNode[] = [];
        const topPinnedRows = getRows({ renderContext, rows: topPinnedRowsData, position: 'center' });

        const pinnedRowsHeight = calculatePinnedRowsHeight(apiRef);

        const mainRows = getRows({
            renderContext,
            rowIndexOffset: topPinnedRowsData.length,
            position: 'center',
            onRowRender: (rowId: GridRowId) => {
                if (rootProps.getDetailPanelContent == null) {
                    return;
                }
                if (!expandedRowIdsLookup.has(rowId)) {
                    return;
                }

                const detailPanel = getDetailPanel(rowId);
                if (detailPanel) {
                    detailPanels.push(detailPanel);
                }
            }
        });

        const bottomPinnedRows = getRows({
            renderContext,
            rows: bottomPinnedRowsData,
            rowIndexOffset: topPinnedRowsData.length + (mainRows ? mainRows.length : 0),
            position: 'center'
        });

        const contentProps = getContentProps();

        const pinnedColumnsStyle = { minHeight: contentProps.style.minHeight };

        if (contentProps.style.minHeight && contentProps.style.minHeight === '100%') {
            contentProps.style.minHeight = `calc(100% - ${pinnedRowsHeight.top}px - ${pinnedRowsHeight.bottom}px)`;
        }

        return (
            <GridVirtualScroller {...getRootProps(other)}>
                <GridOverlays />
                {topPinnedRowsData.length > 0 ? (
                    <div
                        className={classes.topPinnedRows}
                        ownerState={{ ...ownerState, position: PinnedRowsPosition.top }}
                        style={{ width: contentProps.style.width, height: pinnedRowsHeight.top }}
                        role="rowgroup"
                    >
                        {leftRenderContext && (
                            <div
                                className={classes.leftPinnedColumns}
                                ownerState={{
                                    ...ownerState,
                                    side: GridPinnedPosition.left,
                                    showCellVerticalBorder: rootProps.showCellVerticalBorder
                                }}
                            >
                                {getRows({
                                    renderContext: leftRenderContext,
                                    minFirstColumn: leftRenderContext.firstColumnIndex,
                                    maxLastColumn: leftRenderContext.lastColumnIndex,
                                    availableSpace: 0,
                                    rows: topPinnedRowsData,
                                    position: 'left'
                                })}
                            </div>
                        )}
                        <div
                            className={classes.pinnedRowsRenderZone}
                            ref={topPinnedRowsRenderZoneRef}
                            role="presentation"
                        >
                            {topPinnedRows}
                        </div>
                        {rightRenderContext && (
                            <div
                                className={classes.rightPinnedColumns}
                                ownerState={{
                                    ...ownerState,
                                    side: GridPinnedPosition.right,
                                    showCellVerticalBorder: rootProps.showCellVerticalBorder
                                }}
                            >
                                {getRows({
                                    renderContext: rightRenderContext,
                                    minFirstColumn: rightRenderContext.firstColumnIndex,
                                    maxLastColumn: rightRenderContext.lastColumnIndex,
                                    availableSpace: 0,
                                    rows: topPinnedRowsData,
                                    position: 'right'
                                })}
                            </div>
                        )}
                    </div>
                ) : null}
                <GridVirtualScrollerContent {...contentProps}>
                    {leftRenderContext && (
                        <div
                            ref={leftColumns}
                            className={classes.leftPinnedColumns}
                            ownerState={{
                                ...ownerState,
                                side: GridPinnedPosition.left,
                                showCellVerticalBorder: rootProps.showCellVerticalBorder
                            }}
                            style={pinnedColumnsStyle}
                        >
                            {getRows({
                                renderContext: leftRenderContext,
                                minFirstColumn: leftRenderContext.firstColumnIndex,
                                maxLastColumn: leftRenderContext.lastColumnIndex,
                                availableSpace: 0,
                                rowIndexOffset: topPinnedRowsData.length,
                                position: 'left'
                            })}
                        </div>
                    )}
                    <GridVirtualScrollerRenderZone {...getRenderZoneProps()}>{mainRows}</GridVirtualScrollerRenderZone>
                    {rightRenderContext && (
                        <div
                            ref={rightColumns}
                            ownerState={{
                                ...ownerState,
                                side: GridPinnedPosition.right,
                                showCellVerticalBorder: rootProps.showCellVerticalBorder
                            }}
                            className={classes.rightPinnedColumns}
                            style={pinnedColumnsStyle}
                        >
                            {getRows({
                                renderContext: rightRenderContext,
                                minFirstColumn: rightRenderContext.firstColumnIndex,
                                maxLastColumn: rightRenderContext.lastColumnIndex,
                                availableSpace: 0,
                                rowIndexOffset: topPinnedRowsData.length,
                                position: 'right'
                            })}
                        </div>
                    )}
                    {detailPanels.length > 0 && (
                        <div className={classes.detailPanels} ownerState={ownerState}>
                            {detailPanels}
                        </div>
                    )}
                </GridVirtualScrollerContent>
                {bottomPinnedRowsData.length > 0 ? (
                    <div
                        className={classes.bottomPinnedRows}
                        ownerState={{ ...ownerState, position: PinnedRowsPosition.bottom }}
                        style={{ width: contentProps.style.width, height: pinnedRowsHeight.bottom }}
                        role="rowgroup"
                    >
                        {leftRenderContext && (
                            <div
                                className={classes.leftPinnedColumns}
                                ownerState={{
                                    ...ownerState,
                                    side: GridPinnedPosition.left,
                                    showCellVerticalBorder: rootProps.showCellVerticalBorder
                                }}
                            >
                                {getRows({
                                    renderContext: leftRenderContext,
                                    minFirstColumn: leftRenderContext.firstColumnIndex,
                                    maxLastColumn: leftRenderContext.lastColumnIndex,
                                    availableSpace: 0,
                                    rows: bottomPinnedRowsData,
                                    rowIndexOffset: topPinnedRowsData.length + (mainRows ? mainRows.length : 0),
                                    position: 'left'
                                })}
                            </div>
                        )}
                        <div
                            className={classes.pinnedRowsRenderZone}
                            ref={bottomPinnedRowsRenderZoneRef}
                            role="presentation"
                        >
                            {bottomPinnedRows}
                        </div>
                        {rightRenderContext && (
                            <div
                                className={classes.rightPinnedColumns}
                                ownerState={{
                                    ...ownerState,
                                    side: GridPinnedPosition.right,
                                    showCellVerticalBorder: rootProps.showCellVerticalBorder
                                }}
                            >
                                {getRows({
                                    renderContext: rightRenderContext,
                                    minFirstColumn: rightRenderContext.firstColumnIndex,
                                    maxLastColumn: rightRenderContext.lastColumnIndex,
                                    availableSpace: 0,
                                    rows: bottomPinnedRowsData,
                                    rowIndexOffset: topPinnedRowsData.length + (mainRows ? mainRows.length : 0),
                                    position: 'right'
                                })}
                            </div>
                        )}
                    </div>
                ) : null}
            </GridVirtualScroller>
        );
    }
);

export { DataGridProVirtualScroller };
