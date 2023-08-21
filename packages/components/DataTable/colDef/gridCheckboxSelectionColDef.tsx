import * as React from 'react';
import { GridCellCheckBoxRenderer } from '../components/columnSelection/GridCellCheckBoxRenderer';
import { GridHeaderCheckBox } from '../components/columnSelection/GridHeaderCheckBox';
import { selectedIdsLookupSelector } from '../hooks/features/rowSelection/gridRowSelectionSelector';
import { GridColDef } from '../models/colDef/gridColDef';
import { GRID_BOOLEAN_COL_DEF } from './gridBooleanColDef';

export const GRID_CHECKBOX_SELECTION_FIELD = '__check__';

export const GRID_CHECKBOX_SELECTION_COL_DEF: GridColDef = {
    ...GRID_BOOLEAN_COL_DEF,
    field: GRID_CHECKBOX_SELECTION_FIELD,
    type: 'checkboxSelection',
    width: 50,
    resizable: false,
    sortable: false,
    filterable: false,
    // @ts-ignore
    aggregable: false,
    disableColumnMenu: true,
    disableReorder: true,
    disableExport: true,
    getApplyQuickFilterFn: undefined,
    getApplyQuickFilterFnV7: undefined,
    valueGetter: (params) => {
        const selectionLookup = selectedIdsLookupSelector(params.api.state, params.api.instanceId);
        return selectionLookup[params.id] !== undefined;
    },
    renderHeader: (params) => <GridHeaderCheckBox {...params} />,
    renderCell: (params) => <GridCellCheckBoxRenderer {...params} />
};