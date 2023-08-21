import * as React from 'react';
import PropTypes from 'prop-types';
import {
    GridGenericColumnMenu,
    GridColumnMenuProps,
    GRID_COLUMN_MENU_SLOTS,
    GRID_COLUMN_MENU_SLOT_PROPS
} from '../../DataTable';
import { GridColumnMenuPinningItem } from './GridColumnMenuPinningItem';

export const GRID_COLUMN_MENU_SLOTS_PRO = {
    ...GRID_COLUMN_MENU_SLOTS,
    columnMenuPinningItem: GridColumnMenuPinningItem
};

export const GRID_COLUMN_MENU_SLOT_PROPS_PRO = {
    ...GRID_COLUMN_MENU_SLOT_PROPS,
    columnMenuPinningItem: {
        displayOrder: 15
    }
};

const GridProColumnMenu = React.forwardRef<HTMLUListElement, GridColumnMenuProps>(
    function GridProColumnMenu(props, ref) {
        return (
            <GridGenericColumnMenu
                ref={ref}
                {...props}
                defaultSlots={GRID_COLUMN_MENU_SLOTS_PRO}
                defaultSlotProps={GRID_COLUMN_MENU_SLOT_PROPS_PRO}
            />
        );
    }
);

GridProColumnMenu.propTypes = {
    colDef: PropTypes.object.isRequired,
    hideMenu: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
} as any;

export { GridProColumnMenu };
