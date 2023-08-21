import * as React from 'react';
import { TablePagination, TablePaginationProps } from '../../TablePagination';
import { useGridSelector } from '../hooks/utils/useGridSelector';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { gridFilteredTopLevelRowCountSelector } from '../hooks/features/filter';
import { gridPaginationModelSelector } from '../hooks/features/pagination/gridPaginationSelector';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../utils';

const useUtilityClasses = () => {
    const slots = {
        root: ['']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

export const GridPagination = React.forwardRef<HTMLDivElement, Partial<TablePaginationProps>>(
    function GridPagination(props, ref) {
        const apiRef = useGridApiContext();
        const rootProps = useGridRootProps();
        const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
        const visibleTopLevelRowCount = useGridSelector(apiRef, gridFilteredTopLevelRowCountSelector);
        const classes = useUtilityClasses();

        const rowCount = React.useMemo(
            () => rootProps.rowCount ?? visibleTopLevelRowCount ?? 0,
            [rootProps.rowCount, visibleTopLevelRowCount]
        );

        const lastPage = React.useMemo(
            () => Math.floor(rowCount / (paginationModel.pageSize || 1)),
            [rowCount, paginationModel.pageSize]
        );

        const handlePageSizeChange = React.useCallback(
            (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                const pageSize = Number(event.target.value);
                apiRef.current.setPageSize(pageSize);
            },
            [apiRef]
        );

        const handlePageChange = React.useCallback<TablePaginationProps['onPageChange']>(
            (_, page) => {
                apiRef.current.setPage(page);
            },
            [apiRef]
        );

        const isPageSizeIncludedInPageSizeOptions = (pageSize: number) => {
            for (let i = 0; i < rootProps.pageSizeOptions.length; i += 1) {
                const option = rootProps.pageSizeOptions[i];
                if (typeof option === 'number') {
                    if (option === pageSize) {
                        return true;
                    }
                } else if (option.value === pageSize) {
                    return true;
                }
            }
            return false;
        };

        if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const warnedOnceMissingInPageSizeOptions = React.useRef(false);

            const pageSize = rootProps.paginationModel?.pageSize ?? paginationModel.pageSize;
            if (
                !warnedOnceMissingInPageSizeOptions.current &&
                !rootProps.autoPageSize &&
                !isPageSizeIncludedInPageSizeOptions(pageSize)
            ) {
                console.warn(
                    [
                        `Azrn: The page size \`${paginationModel.pageSize}\` is not preset in the \`pageSizeOptions\``,
                        `Add it to show the pagination select.`
                    ].join('\n')
                );

                warnedOnceMissingInPageSizeOptions.current = true;
            }
        }

        const pageSizeOptions = isPageSizeIncludedInPageSizeOptions(paginationModel.pageSize)
            ? rootProps.pageSizeOptions
            : [];

        return (
            <TablePagination
                ref={ref}
                component="div"
                className={classes.root}
                count={rowCount}
                page={paginationModel.page <= lastPage ? paginationModel.page : lastPage}
                rowsPerPageOptions={pageSizeOptions}
                rowsPerPage={paginationModel.pageSize}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handlePageSizeChange}
                {...apiRef.current.getLocaleText('AzrnTablePagination')}
                {...props}
            />
        );
    }
);
