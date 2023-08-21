import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '../../MenuItem';
// Todo: Create ListItemIcon and ListItemText?
// import ListItemIcon from '../../ListItemIcon';
// import ListItemText from '../../ListItemText';
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
            <i>
                <rootProps.slots.columnMenuPinLeftIcon fontSize="small" />
            </i>
            <span>{apiRef.current.getLocaleText('pinToLeft')}</span>
        </MenuItem>
    );

    const pinToRightMenuItem = (
        <MenuItem onClick={pinColumn(GridPinnedPosition.right)}>
            <i>
                <rootProps.slots.columnMenuPinRightIcon fontSize="small" />
            </i>
            <span>{apiRef.current.getLocaleText('pinToRight')}</span>
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
                    <i>
                        <Icon fontSize="small" />
                    </i>
                    <span>{apiRef.current.getLocaleText(label)}</span>
                </MenuItem>
                <MenuItem onClick={unpinColumn}>
                    <i />
                    <span>{apiRef.current.getLocaleText('unpin')}</span>
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
