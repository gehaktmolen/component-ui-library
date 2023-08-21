import * as React from 'react';
import { useGridSelector } from '../hooks/utils/useGridSelector';
import { gridTopLevelRowCountSelector } from '../hooks/features/rows/gridRowsSelector';
import { selectedGridRowsCountSelector } from '../hooks/features/rowSelection/gridRowSelectionSelector';
import { gridFilteredTopLevelRowCountSelector } from '../hooks/features/filter/gridFilterSelector';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { GridRowCount } from './GridRowCount';
import { GridSelectedRowCount } from './GridSelectedRowCount';
import { GridFooterContainer, GridFooterContainerProps } from './containers/GridFooterContainer';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';

const GridFooter = React.forwardRef<HTMLDivElement, GridFooterContainerProps>(function GridFooter(props, ref) {
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();
    const totalTopLevelRowCount = useGridSelector(apiRef, gridTopLevelRowCountSelector);
    const selectedRowCount = useGridSelector(apiRef, selectedGridRowsCountSelector);
    const visibleTopLevelRowCount = useGridSelector(apiRef, gridFilteredTopLevelRowCountSelector);

    const selectedRowCountElement =
        !rootProps.hideFooterSelectedRowCount && selectedRowCount > 0 ? (
            <GridSelectedRowCount selectedRowCount={selectedRowCount} />
        ) : (
            <div />
        );

    const rowCountElement =
        !rootProps.hideFooterRowCount && !rootProps.pagination ? (
            <GridRowCount rowCount={totalTopLevelRowCount} visibleRowCount={visibleTopLevelRowCount} />
        ) : null;

    const paginationElement = rootProps.pagination && !rootProps.hideFooterPagination && rootProps.slots.pagination && (
        <rootProps.slots.pagination {...rootProps.slotProps?.pagination} />
    );

    return (
        <GridFooterContainer ref={ref} {...props}>
            {selectedRowCountElement}
            {rowCountElement}
            {paginationElement}
        </GridFooterContainer>
    );
});

export { GridFooter };
