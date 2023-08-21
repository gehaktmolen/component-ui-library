import * as React from 'react';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../../utils';
import { GridColDef } from '../../../models/colDef/gridColDef';
import { GridPipeProcessor, useGridRegisterPipeProcessor } from '../../core/pipeProcessing';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GRID_CHECKBOX_SELECTION_COL_DEF, GRID_CHECKBOX_SELECTION_FIELD } from '../../../colDef';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';

type OwnerState = { classes: DataGridProcessedProps['classes'] };

const useUtilityClasses = (ownerState: OwnerState) => {
    const { classes } = ownerState;

    return React.useMemo(() => {
        const slots = {
            cellCheckBox: ['cellCheckBox'],
            columnHeaderCheckBox: ['columnHeaderCheckBox']
        };

        return composeClasses(
            slots,
            useClassNamesOverride((slot: string) => generateUtilityClass(slot))
        );
    }, [classes]);
};

export const useGridRowSelectionPreProcessors = (
    apiRef: React.MutableRefObject<GridPrivateApiCommunity>,
    props: DataGridProcessedProps
) => {
    const ownerState = { classes: props.classes };
    const classes = useUtilityClasses(ownerState);

    const updateSelectionColumn = React.useCallback<GridPipeProcessor<'hydrateColumns'>>(
        (columnsState) => {
            const selectionColumn: GridColDef = {
                ...GRID_CHECKBOX_SELECTION_COL_DEF,
                cellClassName: classes.cellCheckBox,
                headerClassName: classes.columnHeaderCheckBox,
                headerName: apiRef.current.getLocaleText('checkboxSelectionHeaderName')
            };

            const shouldHaveSelectionColumn = props.checkboxSelection;
            const haveSelectionColumn = columnsState.lookup[GRID_CHECKBOX_SELECTION_FIELD] != null;

            if (shouldHaveSelectionColumn && !haveSelectionColumn) {
                columnsState.lookup[GRID_CHECKBOX_SELECTION_FIELD] = selectionColumn;
                columnsState.orderedFields = [GRID_CHECKBOX_SELECTION_FIELD, ...columnsState.orderedFields];
            } else if (!shouldHaveSelectionColumn && haveSelectionColumn) {
                delete columnsState.lookup[GRID_CHECKBOX_SELECTION_FIELD];
                columnsState.orderedFields = columnsState.orderedFields.filter(
                    (field) => field !== GRID_CHECKBOX_SELECTION_FIELD
                );
            } else if (shouldHaveSelectionColumn && haveSelectionColumn) {
                columnsState.lookup[GRID_CHECKBOX_SELECTION_FIELD] = {
                    ...selectionColumn,
                    ...columnsState.lookup[GRID_CHECKBOX_SELECTION_FIELD]
                };
            }

            return columnsState;
        },
        [apiRef, classes, props.checkboxSelection]
    );

    useGridRegisterPipeProcessor(apiRef, 'hydrateColumns', updateSelectionColumn);
};
