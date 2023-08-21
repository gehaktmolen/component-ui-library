import * as React from 'react';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../../utils';
import { GridColDef } from '../../../../DataTable';
import { GridPipeProcessor, useGridRegisterPipeProcessor } from '../../../../DataTable/internals';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
import { GRID_REORDER_COL_DEF } from './gridRowReorderColDef';
import { GridPrivateApiPro } from '../../../models/gridApiPro';

type OwnerState = { classes: DataGridProProcessedProps['classes'] };

const useUtilityClasses = (ownerState: OwnerState) => {
    const { classes } = ownerState;

    return React.useMemo(() => {
        const slots = {
            rowReorderCellContainer: ['rowReorderCellContainer'],
            columnHeaderReorder: ['columnHeaderReorder']
        };

        return composeClasses(
            slots,
            useClassNamesOverride((slot: string) => generateUtilityClass(slot))
        );
    }, [classes]);
};

export const useGridRowReorderPreProcessors = (
    privateApiRef: React.MutableRefObject<GridPrivateApiPro>,
    props: DataGridProProcessedProps
) => {
    const ownerState = { classes: props.classes };
    const classes = useUtilityClasses(ownerState);

    const updateReorderColumn = React.useCallback<GridPipeProcessor<'hydrateColumns'>>(
        (columnsState) => {
            const reorderColumn: GridColDef = {
                ...GRID_REORDER_COL_DEF,
                cellClassName: classes.rowReorderCellContainer,
                headerClassName: classes.columnHeaderReorder,
                headerName: privateApiRef.current.getLocaleText('rowReorderingHeaderName')
            };

            const shouldHaveReorderColumn = props.rowReordering;
            const haveReorderColumn = columnsState.lookup[reorderColumn.field] != null;

            if (shouldHaveReorderColumn && haveReorderColumn) {
                return columnsState;
            }

            if (shouldHaveReorderColumn && !haveReorderColumn) {
                columnsState.lookup[reorderColumn.field] = reorderColumn;
                columnsState.orderedFields = [reorderColumn.field, ...columnsState.orderedFields];
            } else if (!shouldHaveReorderColumn && haveReorderColumn) {
                delete columnsState.lookup[reorderColumn.field];
                columnsState.orderedFields = columnsState.orderedFields.filter(
                    (field) => field !== reorderColumn.field
                );
            }

            return columnsState;
        },
        [privateApiRef, classes, props.rowReordering]
    );

    useGridRegisterPipeProcessor(privateApiRef, 'hydrateColumns', updateReorderColumn);
};
