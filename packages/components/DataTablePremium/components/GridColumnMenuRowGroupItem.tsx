import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '../../MenuItem';
// Todo: Create ListItemIcon and ListItemText?
// import ListItemIcon from '../../../../../ListItemIcon';
// import ListItemText from '../../../../../ListItemText';
import { useGridSelector, gridColumnLookupSelector, GridColumnMenuItemProps } from '../../DataTablePro';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { gridRowGroupingSanitizedModelSelector } from '../hooks/features/rowGrouping/gridRowGroupingSelector';
import {
    getRowGroupingCriteriaFromGroupingField,
    GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD,
    isGroupingColumn
} from '../hooks/features/rowGrouping/gridRowGroupingUtils';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';

function GridColumnMenuRowGroupItem(props: GridColumnMenuItemProps) {
    const { colDef, onClick } = props;
    const apiRef = useGridApiContext();
    const rowGroupingModel = useGridSelector(apiRef, gridRowGroupingSanitizedModelSelector);
    const columnsLookup = useGridSelector(apiRef, gridColumnLookupSelector);
    const rootProps = useGridRootProps();

    const renderUnGroupingMenuItem = (field: string) => {
        const ungroupColumn = (event: React.MouseEvent<HTMLElement>) => {
            apiRef.current.removeRowGroupingCriteria(field);
            onClick(event);
        };

        const name = columnsLookup[field].headerName ?? field;
        return (
            <MenuItem onClick={ungroupColumn} key={field}>
                <i>
                    <rootProps.slots.columnMenuUngroupIcon fontSize="small" />
                </i>
                <span>{apiRef.current.getLocaleText('unGroupColumn')(name)}</span>
            </MenuItem>
        );
    };

    if (!colDef || !isGroupingColumn(colDef.field)) {
        return null;
    }

    if (colDef.field === GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD) {
        return <React.Fragment>{rowGroupingModel.map(renderUnGroupingMenuItem)}</React.Fragment>;
    }

    return renderUnGroupingMenuItem(getRowGroupingCriteriaFromGroupingField(colDef.field)!);
}

GridColumnMenuRowGroupItem.propTypes = {
    colDef: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
} as any;

export { GridColumnMenuRowGroupItem };
