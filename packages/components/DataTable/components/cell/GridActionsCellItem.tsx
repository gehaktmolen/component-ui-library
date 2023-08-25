import * as React from 'react';
import PropTypes from 'prop-types';
import { ButtonProps } from '../../../Button';
import { MenuItem, MenuItemProps } from '../../../MenuItem';
import { ListItemIcon } from '../../../ListItemIcon';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';

export type GridActionsCellItemProps = {
    label: string;
    icon?: React.ReactElement;
} & (({ showInMenu?: false; icon: React.ReactElement } & ButtonProps) | ({ showInMenu: true } & MenuItemProps));

const GridActionsCellItem = React.forwardRef<HTMLButtonElement, GridActionsCellItemProps>((props, ref) => {
    const { label, icon, showInMenu, onClick, ...other } = props;

    const rootProps = useGridRootProps();

    const handleClick = (event: any) => {
        if (onClick) {
            onClick(event);
        }
    };

    if (!showInMenu) {
        return (
            <rootProps.slots.baseButton
                ref={ref}
                size="small"
                role="menuitem"
                aria-label={label}
                {...(other as any)}
                onClick={handleClick}
                {...rootProps.slotProps?.baseButton}
            >
                {React.cloneElement(icon!, { fontSize: 'small' })}
            </rootProps.slots.baseButton>
        );
    }

    return (
        <MenuItem ref={ref} {...(other as any)} onClick={onClick}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            {label}
        </MenuItem>
    );
});

GridActionsCellItem.propTypes = {
    icon: PropTypes.element,
    label: PropTypes.string.isRequired,
    showInMenu: PropTypes.bool
} as any;

export { GridActionsCellItem };
