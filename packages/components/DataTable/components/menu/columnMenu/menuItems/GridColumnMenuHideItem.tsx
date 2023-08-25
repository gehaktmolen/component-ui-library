import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '../../../../../MenuItem';
import { ListItemIcon } from '../../../../../ListItemIcon';
import { ListItemText } from '../../../../../ListItemText';
import { GridColumnMenuItemProps } from '../GridColumnMenuItemProps';
import { useGridApiContext } from '../../../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../../../hooks/utils/useGridRootProps';
import { gridVisibleColumnDefinitionsSelector } from '../../../../hooks/features/columns';

function GridColumnMenuHideItem(props: GridColumnMenuItemProps) {
    const { colDef, onClick } = props;
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();

    const visibleColumns = gridVisibleColumnDefinitionsSelector(apiRef);
    const columnsWithMenu = visibleColumns.filter((col) => col.disableColumnMenu !== true);
    // do not allow to hide the last column with menu
    const disabled = columnsWithMenu.length === 1;

    const toggleColumn = React.useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            /**
             * Disabled `MenuItem` would trigger `click` event
             * after imperative `.click()` call on HTML element.
             * Also, click is triggered in testing environment as well.
             */
            if (disabled) {
                return;
            }
            apiRef.current.setColumnVisibility(colDef.field, false);
            onClick(event);
        },
        [apiRef, colDef.field, onClick, disabled]
    );

    if (rootProps.disableColumnSelector) {
        return null;
    }

    if (colDef.hideable === false) {
        return null;
    }

    return (
        <MenuItem onClick={toggleColumn} disabled={disabled}>
            <ListItemIcon>
                <rootProps.slots.columnMenuHideIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{apiRef.current.getLocaleText('columnMenuHideColumn')}</ListItemText>
        </MenuItem>
    );
}

GridColumnMenuHideItem.propTypes = {
    colDef: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
} as any;

export { GridColumnMenuHideItem };
