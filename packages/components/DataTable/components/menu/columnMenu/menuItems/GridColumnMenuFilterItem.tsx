import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '../../../../../MenuItem';
import { ListItemIcon } from '../../../../../ListItemIcon';
import { ListItemText } from '../../../../../ListItemText';
import { useGridApiContext } from '../../../../hooks/utils/useGridApiContext';
import { GridColumnMenuItemProps } from '../GridColumnMenuItemProps';
import { useGridRootProps } from '../../../../hooks/utils/useGridRootProps';

function GridColumnMenuFilterItem(props: GridColumnMenuItemProps) {
    const { colDef, onClick } = props;
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();

    const showFilter = React.useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            onClick(event);
            apiRef.current.showFilterPanel(colDef.field);
        },
        [apiRef, colDef.field, onClick]
    );

    if (rootProps.disableColumnFilter || !colDef.filterable) {
        return null;
    }

    return (
        <MenuItem onClick={showFilter}>
            <ListItemIcon>
                <rootProps.slots.columnMenuFilterIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{apiRef.current.getLocaleText('columnMenuFilter')}</ListItemText>
        </MenuItem>
    );
}

GridColumnMenuFilterItem.propTypes = {
    colDef: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
} as any;

export { GridColumnMenuFilterItem };
