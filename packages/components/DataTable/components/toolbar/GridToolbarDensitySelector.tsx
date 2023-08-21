import * as React from 'react';
import { useId, useForkRef } from '../../../../utils';
import { Menu } from '../../../Menu';
import { ButtonProps } from '../../../Button';
import { MenuItem } from '../../../MenuItem';
// import { ListItemIcon } from '../../../ListItemIcon';
import { gridDensityValueSelector } from '../../hooks/features/density/densitySelector';
import { GridDensity } from '../../models/gridDensity';
import { isHideMenuKey, isTabKey } from '../../utils/keyboardUtils';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { GridDensityOption } from '../../models/api/gridDensityApi';
import { GridMenu, GridMenuProps } from '../menu/GridMenu';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';

export const GridToolbarDensitySelector = React.forwardRef<HTMLButtonElement, ButtonProps>(
    function GridToolbarDensitySelector(props, ref) {
        const { onClick, ...other } = props;
        const apiRef = useGridApiContext();
        const rootProps = useGridRootProps();
        const densityValue = useGridSelector(apiRef, gridDensityValueSelector);
        const densityButtonId = useId();
        const densityMenuId = useId();

        const [open, setOpen] = React.useState(false);
        const buttonRef = React.useRef<HTMLButtonElement>(null);
        const handleRef = useForkRef(ref, buttonRef);

        const densityOptions: GridDensityOption[] = [
            {
                icon: <rootProps.slots.densityCompactIcon />,
                label: apiRef.current.getLocaleText('toolbarDensityCompact'),
                value: 'compact'
            },
            {
                icon: <rootProps.slots.densityStandardIcon />,
                label: apiRef.current.getLocaleText('toolbarDensityStandard'),
                value: 'standard'
            },
            {
                icon: <rootProps.slots.densityComfortableIcon />,
                label: apiRef.current.getLocaleText('toolbarDensityComfortable'),
                value: 'comfortable'
            }
        ];

        const startIcon = React.useMemo<React.ReactElement>(() => {
            switch (densityValue) {
                case 'compact':
                    return <rootProps.slots.densityCompactIcon />;
                case 'comfortable':
                    return <rootProps.slots.densityComfortableIcon />;
                default:
                    return <rootProps.slots.densityStandardIcon />;
            }
        }, [densityValue, rootProps]);

        const handleDensitySelectorOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
            setOpen((prevOpen) => !prevOpen);
            onClick?.(event);
        };
        const handleDensitySelectorClickAway: GridMenuProps['onClickAway'] = (event) => {
            if (
                buttonRef.current === event.target ||
                // if user clicked on the icon
                buttonRef.current?.contains(event.target as Element)
            ) {
                return;
            }
            setOpen(false);
        };
        const handleDensityUpdate = (newDensity: GridDensity) => {
            apiRef.current.setDensity(newDensity);
            setOpen(false);
        };

        const handleListKeyDown = (event: React.KeyboardEvent) => {
            if (isTabKey(event.key)) {
                event.preventDefault();
            }
            if (isHideMenuKey(event.key)) {
                setOpen(false);
            }
        };

        // Disable the button if the corresponding is disabled
        if (rootProps.disableDensitySelector) {
            return null;
        }

        const densityElements = densityOptions.map<React.ReactElement>((option, index) => (
            <MenuItem
                key={index}
                onClick={() => handleDensityUpdate(option.value)}
                selected={option.value === densityValue}
            >
                <i>{option.icon}</i>
                {option.label}
            </MenuItem>
        ));

        return (
            <React.Fragment>
                <rootProps.slots.baseButton
                    ref={handleRef}
                    size="small"
                    startIcon={startIcon}
                    aria-label={apiRef.current.getLocaleText('toolbarDensityLabel')}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    aria-controls={open ? densityMenuId : undefined}
                    id={densityButtonId}
                    {...other}
                    onClick={handleDensitySelectorOpen}
                    {...rootProps.slotProps?.baseButton}
                >
                    {apiRef.current.getLocaleText('toolbarDensity')}
                </rootProps.slots.baseButton>
                <GridMenu
                    open={open}
                    target={buttonRef.current}
                    onClickAway={handleDensitySelectorClickAway}
                    position="bottom-start"
                >
                    <Menu
                        id={densityMenuId}
                        aria-labelledby={densityButtonId}
                        onKeyDown={handleListKeyDown}
                        autoFocusItem={open}
                    >
                        {densityElements}
                    </Menu>
                </GridMenu>
            </React.Fragment>
        );
    }
);