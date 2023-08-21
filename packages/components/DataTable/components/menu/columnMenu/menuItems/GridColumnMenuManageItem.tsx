import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '../../../../../MenuItem';
// Todo: Create ListItemIcon and ListItemText?
// import ListItemIcon from '../../../../../ListItemIcon';
// import ListItemText from '../../../../../ListItemText';
import { GridPreferencePanelsValue } from '../../../../hooks/features/preferencesPanel/gridPreferencePanelsValue';
import { useGridApiContext } from '../../../../hooks/utils/useGridApiContext';
import { GridColumnMenuItemProps } from '../GridColumnMenuItemProps';
import { useGridRootProps } from '../../../../hooks/utils/useGridRootProps';

function GridColumnMenuManageItem(props: GridColumnMenuItemProps) {
    const { onClick } = props;
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();

    const showColumns = React.useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            onClick(event); // hide column menu
            apiRef.current.showPreferences(GridPreferencePanelsValue.columns);
        },
        [apiRef, onClick]
    );

    if (rootProps.disableColumnSelector) {
        return null;
    }

    return (
        <MenuItem onClick={showColumns}>
            <i>
                <rootProps.slots.columnMenuManageColumnsIcon fontSize="small" />
            </i>
            <span>{apiRef.current.getLocaleText('columnMenuManageColumns')}</span>
        </MenuItem>
    );
}

GridColumnMenuManageItem.propTypes = {
    colDef: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
} as any;

export { GridColumnMenuManageItem };
