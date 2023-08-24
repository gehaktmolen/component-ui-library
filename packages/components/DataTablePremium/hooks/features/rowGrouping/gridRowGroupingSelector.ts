import { gridColumnLookupSelector } from '../../../../DataTablePro';
import { createSelector, createSelectorMemoized } from '../../../../DataTable/internals';
import { GridStatePremium } from '../../../models/gridStatePremium';

const gridRowGroupingStateSelector = (state: GridStatePremium) => state.rowGrouping;

export const gridRowGroupingModelSelector = createSelector(
    gridRowGroupingStateSelector,
    (rowGrouping) => rowGrouping.model
);

export const gridRowGroupingSanitizedModelSelector = createSelectorMemoized(
    gridRowGroupingModelSelector,
    gridColumnLookupSelector,
    (model, columnsLookup) => model.filter((field) => !!columnsLookup[field] && columnsLookup[field].groupable)
);
