import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '../../MenuItem';
import { ListItemIcon } from '../../ListItemIcon';
import { ListItemText } from '../../ListItemText';
import { gridColumnLookupSelector, useGridSelector, GridColumnMenuItemProps } from '../../DataTablePro';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { gridRowGroupingSanitizedModelSelector } from '../hooks/features/rowGrouping/gridRowGroupingSelector';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';

function GridColumnMenuRowUngroupItem(props: GridColumnMenuItemProps) {
    const { colDef, onClick } = props;
    const apiRef = useGridApiContext();
    const rowGroupingModel = useGridSelector(apiRef, gridRowGroupingSanitizedModelSelector);
    const columnsLookup = useGridSelector(apiRef, gridColumnLookupSelector);
    const rootProps = useGridRootProps();

    if (!colDef.groupable) {
        return null;
    }

    const ungroupColumn = (event: React.MouseEvent<HTMLElement>) => {
        apiRef.current.removeRowGroupingCriteria(colDef.field);
        onClick(event);
    };

    const groupColumn = (event: React.MouseEvent<HTMLElement>) => {
        apiRef.current.addRowGroupingCriteria(colDef.field);
        onClick(event);
    };

    const name = columnsLookup[colDef.field].headerName ?? colDef.field;

    if (rowGroupingModel.includes(colDef.field)) {
        return (
            <MenuItem onClick={ungroupColumn}>
                <ListItemIcon>
                    <rootProps.slots.columnMenuUngroupIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{apiRef.current.getLocaleText('unGroupColumn')(name)}</ListItemText>
            </MenuItem>
        );
    }

    return (
        <MenuItem onClick={groupColumn}>
            <ListItemIcon>
                <rootProps.slots.columnMenuGroupIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{apiRef.current.getLocaleText('groupColumn')(name)}</ListItemText>
        </MenuItem>
    );
}

GridColumnMenuRowUngroupItem.propTypes = {
    colDef: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
} as any;

export { GridColumnMenuRowUngroupItem };
