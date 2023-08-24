import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '../../MenuItem';
// Todo: Create ListItemIcon and ListItemText?
// import ListItemIcon from '../../../../../ListItemIcon';
// import ListItemText from '../../../../../ListItemText';
import {
  gridColumnLookupSelector,
  useGridSelector,
  GridColumnMenuItemProps,
} from '../../DataTablePro';
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
        <i>
          <rootProps.slots.columnMenuUngroupIcon fontSize="small" />
        </i>
        <span>{apiRef.current.getLocaleText('unGroupColumn')(name)}</span>
      </MenuItem>
    );
  }

  return (
    <MenuItem onClick={groupColumn}>
      <i>
        <rootProps.slots.columnMenuGroupIcon fontSize="small" />
      </i>
      <span>{apiRef.current.getLocaleText('groupColumn')(name)}</span>
    </MenuItem>
  );
}

GridColumnMenuRowUngroupItem.propTypes = {
  colDef: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
} as any;

export { GridColumnMenuRowUngroupItem };
