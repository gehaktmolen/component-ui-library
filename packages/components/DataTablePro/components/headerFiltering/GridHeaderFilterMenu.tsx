import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '../../../Menu';
import { MenuItem } from '../../../MenuItem';
import { HTMLElementType } from '../../../../utils';
import { useGridApiContext, GridMenu, GridFilterOperator, GridFilterItem, GridColDef } from '../../../DataTable';

interface GridHeaderFilterMenuProps {
    field: GridColDef['field'];
    applyFilterChanges: (item: GridFilterItem) => void;
    operators: GridFilterOperator<any, any, any>[];
    item: GridFilterItem;
    open: boolean;
    id: string;
    labelledBy: string;
    target: HTMLElement | null;
}

function GridHeaderFilterMenu({
    open,
    field,
    target,
    applyFilterChanges,
    operators,
    item,
    id,
    labelledBy
}: GridHeaderFilterMenuProps) {
    const apiRef = useGridApiContext();

    const hideMenu = React.useCallback(() => {
        apiRef.current.hideHeaderFilterMenu();
    }, [apiRef]);

    const handleListKeyDown = React.useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Tab') {
                event.preventDefault();
            }
            if (event.key === 'Escape' || event.key === 'Tab') {
                hideMenu();
            }
        },
        [hideMenu]
    );

    if (!target) {
        return null;
    }

    return (
        <GridMenu
            placement="bottom-end"
            open={open}
            target={target as HTMLElement}
            onClickAway={hideMenu}
            onExited={hideMenu}
        >
            <Menu aria-labelledby={labelledBy} id={id} onKeyDown={handleListKeyDown}>
                {operators.map((op, i) => {
                    const label =
                        op?.headerLabel ??
                        apiRef.current.getLocaleText(
                            `headerFilterOperator${op.value}` as 'headerFilterOperatorContains'
                        );

                    return (
                        <MenuItem
                            onClick={() => {
                                applyFilterChanges({ ...item, operator: op.value });
                                hideMenu();
                            }}
                            autoFocus={i === 0 ? open : false}
                            selected={op.value === item.operator}
                            key={`${field}-${op.value}`}
                        >
                            {label}
                        </MenuItem>
                    );
                })}
            </Menu>
        </GridMenu>
    );
}

GridHeaderFilterMenu.propTypes = {
    applyFilterChanges: PropTypes.func.isRequired,
    field: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    item: PropTypes.shape({
        field: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        operator: PropTypes.string.isRequired,
        value: PropTypes.any
    }).isRequired,
    labelledBy: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    operators: PropTypes.arrayOf(
        PropTypes.shape({
            getApplyFilterFn: PropTypes.func.isRequired,
            getApplyFilterFnV7: PropTypes.func,
            getValueAsString: PropTypes.func,
            headerLabel: PropTypes.string,
            InputComponent: PropTypes.elementType,
            InputComponentProps: PropTypes.object,
            label: PropTypes.string,
            requiresFilterValue: PropTypes.bool,
            value: PropTypes.string.isRequired
        })
    ).isRequired,
    target: HTMLElementType
} as any;

export { GridHeaderFilterMenu };
