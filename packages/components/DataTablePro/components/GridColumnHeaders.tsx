import * as React from 'react';
import PropTypes from 'prop-types';
import { composeClasses, generateUtilityClass, useClassNamesOverride, useEventCallback } from '../../../utils';
import { useGridApiEventHandler, GridColumnHeaderSeparatorSides } from '../../DataTable';
import { GridBaseColumnHeaders, GridColumnHeadersInner, UseGridColumnHeadersProps } from '../../DataTable/internals';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { DataGridProProcessedProps } from '../models/dataGridProProps';
import { GridPinnedPosition, GridPinnedColumns } from '../hooks/features/columnPinning';
import { useGridColumnHeaders } from '../hooks/features/columnHeaders/useGridColumnHeaders';
import { filterColumns } from './DataGridProVirtualScroller';
import { GridScrollArea } from './GridScrollArea';

type OwnerState = DataGridProProcessedProps & {
    leftPinnedColumns: GridPinnedColumns['left'];
    rightPinnedColumns: GridPinnedColumns['right'];
    showCellVerticalBorder: boolean;
};

const useUtilityClasses = (ownerState: OwnerState) => {
    const { leftPinnedColumns, rightPinnedColumns, showCellVerticalBorder } = ownerState;

    const slots = {
        leftPinnedColumns: [
            'absolute top-0 left-0 overflow-hidden z-10 flex flex-col box-border border-r border-solid border-gray-200 rounded-tl rounded-bl',
            'pinnedColumnHeaders',
            leftPinnedColumns && leftPinnedColumns.length > 0 && `pinnedColumnHeaders--left`
        ],
        rightPinnedColumns: [
            'absolute top-0 right-0 overflow-hidden z-10 flex flex-col box-border border-r border-solid border-gray-200 rounded-tl rounded-bl',
            'pinnedColumnHeaders',
            rightPinnedColumns && rightPinnedColumns.length > 0 && `pinnedColumnHeaders--right`,
            'withBorderColor',
            showCellVerticalBorder && 'border-left-1'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

interface DataGridProColumnHeadersProps
    extends React.HTMLAttributes<HTMLDivElement>,
        Omit<UseGridColumnHeadersProps, 'innerRef'> {
    innerRef?: React.Ref<HTMLDivElement>;
    pinnedColumns: GridPinnedColumns;
}

const GridColumnHeaders = React.forwardRef<HTMLDivElement, DataGridProColumnHeadersProps>(
    function GridColumnHeaders(props, ref) {
        const {
            style,
            className,
            innerRef,
            visibleColumns,
            sortColumnLookup,
            filterColumnLookup,
            columnPositions,
            columnHeaderTabIndexState,
            columnGroupHeaderTabIndexState,
            columnHeaderFocus,
            columnGroupHeaderFocus,
            densityFactor,
            headerGroupingMaxDepth,
            columnMenuState,
            columnVisibility,
            columnGroupsHeaderStructure,
            hasOtherElementInTabSequence,
            pinnedColumns,
            ...other
        } = props;
        const rootProps = useGridRootProps();
        const apiRef = useGridApiContext();
        const [scrollbarSize, setScrollbarSize] = React.useState(0);

        const handleContentSizeChange = useEventCallback(() => {
            const rootDimensions = apiRef.current.getRootDimensions();
            if (!rootDimensions) {
                return;
            }

            const newScrollbarSize = rootDimensions.hasScrollY ? rootDimensions.scrollBarSize : 0;
            if (scrollbarSize !== newScrollbarSize) {
                setScrollbarSize(newScrollbarSize);
            }
        });

        useGridApiEventHandler(apiRef, 'virtualScrollerContentSizeChange', handleContentSizeChange);

        const visibleColumnFields = React.useMemo(() => visibleColumns.map(({ field }) => field), [visibleColumns]);

        const [leftPinnedColumns, rightPinnedColumns] = filterColumns(pinnedColumns, visibleColumnFields, false);

        const {
            isDragging,
            renderContext,
            getRootProps,
            getInnerProps,
            getColumnHeaders,
            getColumnFilters,
            getColumnGroupHeaders
        } = useGridColumnHeaders({
            innerRef,
            visibleColumns,
            sortColumnLookup,
            filterColumnLookup,
            columnPositions,
            columnHeaderTabIndexState,
            hasOtherElementInTabSequence,
            columnGroupHeaderTabIndexState,
            columnHeaderFocus,
            columnGroupHeaderFocus,
            densityFactor,
            headerGroupingMaxDepth,
            columnMenuState,
            columnVisibility,
            columnGroupsHeaderStructure,
            minColumnIndex: leftPinnedColumns.length
        });

        const ownerState = {
            ...rootProps,
            leftPinnedColumns,
            rightPinnedColumns,
            classes: rootProps.classes
        };
        const classes = useUtilityClasses(ownerState);

        const leftRenderContext =
            renderContext && leftPinnedColumns.length
                ? {
                      ...renderContext,
                      firstColumnIndex: 0,
                      lastColumnIndex: leftPinnedColumns.length
                  }
                : null;

        const rightRenderContext =
            renderContext && rightPinnedColumns.length
                ? {
                      ...renderContext,
                      firstColumnIndex: visibleColumnFields.length - rightPinnedColumns.length,
                      lastColumnIndex: visibleColumnFields.length
                  }
                : null;

        const innerProps = getInnerProps();

        const pinnedColumnHeadersProps = {
            role: innerProps.role
        };

        return (
            <GridBaseColumnHeaders ref={ref} className={className} {...getRootProps(other)}>
                {leftRenderContext && (
                    <div
                        className={classes.leftPinnedColumns}
                        ownerState={{
                            ...ownerState,
                            side: GridPinnedPosition.left,
                            showCellVerticalBorder: rootProps.showCellVerticalBorder
                        }}
                        {...pinnedColumnHeadersProps}
                    >
                        {getColumnGroupHeaders({
                            renderContext: leftRenderContext,
                            minFirstColumn: leftRenderContext.firstColumnIndex,
                            maxLastColumn: leftRenderContext.lastColumnIndex
                        })}
                        {getColumnHeaders(
                            {
                                renderContext: leftRenderContext,
                                minFirstColumn: leftRenderContext.firstColumnIndex,
                                maxLastColumn: leftRenderContext.lastColumnIndex
                            },
                            { disableReorder: true }
                        )}

                        {getColumnFilters({
                            renderContext: leftRenderContext,
                            minFirstColumn: leftRenderContext.firstColumnIndex,
                            maxLastColumn: leftRenderContext.lastColumnIndex
                        })}
                    </div>
                )}

                <GridScrollArea scrollDirection="left" />
                <GridColumnHeadersInner isDragging={isDragging} {...innerProps}>
                    {getColumnGroupHeaders({
                        renderContext,
                        minFirstColumn: leftPinnedColumns.length,
                        maxLastColumn: visibleColumnFields.length - rightPinnedColumns.length
                    })}
                    {getColumnHeaders({
                        renderContext,
                        minFirstColumn: leftPinnedColumns.length,
                        maxLastColumn: visibleColumnFields.length - rightPinnedColumns.length
                    })}
                    {getColumnFilters({
                        renderContext,
                        minFirstColumn: leftPinnedColumns.length,
                        maxLastColumn: visibleColumnFields.length - rightPinnedColumns.length
                    })}
                </GridColumnHeadersInner>
                <GridScrollArea scrollDirection="right" />
                {rightRenderContext && (
                    <div
                        ownerState={{
                            ...ownerState,
                            side: GridPinnedPosition.right,
                            showCellVerticalBorder: rootProps.showCellVerticalBorder
                        }}
                        className={classes.rightPinnedColumns}
                        style={{ paddingRight: scrollbarSize }}
                        {...pinnedColumnHeadersProps}
                    >
                        {getColumnGroupHeaders({
                            renderContext: rightRenderContext,
                            minFirstColumn: rightRenderContext.firstColumnIndex,
                            maxLastColumn: rightRenderContext.lastColumnIndex
                        })}
                        {getColumnHeaders(
                            {
                                renderContext: rightRenderContext,
                                minFirstColumn: rightRenderContext.firstColumnIndex,
                                maxLastColumn: rightRenderContext.lastColumnIndex
                            },
                            { disableReorder: true, separatorSide: GridColumnHeaderSeparatorSides.Left }
                        )}

                        {getColumnFilters({
                            renderContext: rightRenderContext,
                            minFirstColumn: rightRenderContext.firstColumnIndex,
                            maxLastColumn: rightRenderContext.lastColumnIndex
                        })}
                    </div>
                )}
            </GridBaseColumnHeaders>
        );
    }
);

GridColumnHeaders.propTypes = {
    columnGroupHeaderFocus: PropTypes.shape({
        depth: PropTypes.number.isRequired,
        field: PropTypes.string.isRequired
    }),
    columnGroupHeaderTabIndexState: PropTypes.shape({
        depth: PropTypes.number.isRequired,
        field: PropTypes.string.isRequired
    }),
    columnGroupsHeaderStructure: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                columnFields: PropTypes.arrayOf(PropTypes.string).isRequired,
                groupId: PropTypes.string
            })
        )
    ).isRequired,
    columnHeaderFocus: PropTypes.shape({
        field: PropTypes.string.isRequired
    }),
    columnHeaderTabIndexState: PropTypes.shape({
        field: PropTypes.string.isRequired
    }),
    columnMenuState: PropTypes.shape({
        field: PropTypes.string,
        open: PropTypes.bool.isRequired
    }).isRequired,
    columnPositions: PropTypes.arrayOf(PropTypes.number).isRequired,
    columnVisibility: PropTypes.object.isRequired,
    densityFactor: PropTypes.number.isRequired,
    filterColumnLookup: PropTypes.object.isRequired,
    hasOtherElementInTabSequence: PropTypes.bool.isRequired,
    headerGroupingMaxDepth: PropTypes.number.isRequired,
    innerRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.object
        })
    ]),
    minColumnIndex: PropTypes.number,
    pinnedColumns: PropTypes.shape({
        left: PropTypes.arrayOf(PropTypes.string),
        right: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    sortColumnLookup: PropTypes.object.isRequired,
    visibleColumns: PropTypes.arrayOf(PropTypes.object).isRequired
} as any;

export { GridColumnHeaders };
