import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '../../MenuItem';
import { ListItemIcon } from '../../ListItemIcon';
import { ListItemText } from '../../ListItemText';
import { GridColumnMenuItemProps } from '../../DataTable';
import { GridPinnedPosition } from '../hooks/features/columnPinning';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';

function GridColumnMenuPinningItem(props: GridColumnMenuItemProps) {
    const { colDef, onClick } = props;
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();

    const pinColumn = React.useCallback(
        (side: GridPinnedPosition) => (event: React.MouseEvent<HTMLElement>) => {
            apiRef.current.pinColumn(colDef.field, side);
            onClick(event);
        },
        [apiRef, colDef.field, onClick]
    );

    const unpinColumn = (event: React.MouseEvent<HTMLElement>) => {
        apiRef.current.unpinColumn(colDef.field);
        onClick(event);
    };
    const pinToLeftMenuItem = (
        <MenuItem onClick={pinColumn(GridPinnedPosition.left)}>
            <ListItemIcon>
                <rootProps.slots.columnMenuPinLeftIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{apiRef.current.getLocaleText('pinToLeft')}</ListItemText>
        </MenuItem>
    );

    const pinToRightMenuItem = (
        <MenuItem onClick={pinColumn(GridPinnedPosition.right)}>
            <ListItemIcon>
                <rootProps.slots.columnMenuPinRightIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{apiRef.current.getLocaleText('pinToRight')}</ListItemText>
        </MenuItem>
    );

    if (!colDef) {
        return null;
    }

    const side = apiRef.current.isColumnPinned(colDef.field);

    if (side) {
        const otherSide = side === GridPinnedPosition.right ? GridPinnedPosition.left : GridPinnedPosition.right;
        const label = otherSide === GridPinnedPosition.right ? 'pinToRight' : 'pinToLeft';
        const Icon =
            side === GridPinnedPosition.right
                ? rootProps.slots.columnMenuPinLeftIcon
                : rootProps.slots.columnMenuPinRightIcon;
        return (
            <React.Fragment>
                <MenuItem onClick={pinColumn(otherSide)}>
                    <ListItemIcon>
                        <Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{apiRef.current.getLocaleText(label)}</ListItemText>
                </MenuItem>
                <MenuItem onClick={unpinColumn}>
                    <ListItemIcon />
                    <ListItemText>{apiRef.current.getLocaleText('unpin')}</ListItemText>
                </MenuItem>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {pinToLeftMenuItem}
            {pinToRightMenuItem}
        </React.Fragment>
    );
}

GridColumnMenuPinningItem.propTypes = {
    colDef: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
} as any;

export { GridColumnMenuPinningItem };