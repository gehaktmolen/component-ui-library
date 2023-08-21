import { createSelector } from '../../../../DataTable/internals';
import { GridStatePro } from '../../../models/gridStatePro';

export const gridColumnResizeSelector = (state: GridStatePro) => state.columnResize;

export const gridResizingColumnFieldSelector = createSelector(
    gridColumnResizeSelector,
    (columnResize) => columnResize.resizingColumnField
);
