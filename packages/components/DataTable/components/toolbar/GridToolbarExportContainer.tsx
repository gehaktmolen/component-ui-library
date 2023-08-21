import * as React from 'react';
import { useId, useForkRef } from '../../../../utils';
import { Menu } from '../../../Menu';
import { ButtonProps } from '../../../Button';
import { isHideMenuKey, isTabKey } from '../../utils/keyboardUtils';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { GridMenu, GridMenuProps } from '../menu/GridMenu';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';

export const GridToolbarExportContainer = React.forwardRef<HTMLButtonElement, ButtonProps>(
    function GridToolbarExportContainer(props, ref) {
        const { children, onClick, ...other } = props;

        const apiRef = useGridApiContext();
        const rootProps = useGridRootProps();
        const exportButtonId = useId();
        const exportMenuId = useId();

        const [open, setOpen] = React.useState(false);
        const buttonRef = React.useRef<HTMLButtonElement>(null);
        const handleRef = useForkRef(ref, buttonRef);

        const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
            setOpen((prevOpen) => !prevOpen);
            onClick?.(event);
        };

        const handleMenuClose = () => setOpen(false);

        const handleListKeyDown = (event: React.KeyboardEvent) => {
            if (isTabKey(event.key)) {
                event.preventDefault();
            }
            if (isHideMenuKey(event.key)) {
                handleMenuClose();
            }
        };

        const handleMenuClickAway: GridMenuProps['onClickAway'] = (event) => {
            if (
                buttonRef.current === event.target ||
                // if user clicked on the icon
                buttonRef.current?.contains(event.target as Element)
            ) {
                return;
            }
            setOpen(false);
        };

        if (children == null) {
            return null;
        }

        return (
            <React.Fragment>
                <rootProps.slots.baseButton
                    ref={handleRef}
                    size="small"
                    startIcon={<rootProps.slots.exportIcon />}
                    aria-expanded={open}
                    aria-label={apiRef.current.getLocaleText('toolbarExportLabel')}
                    aria-haspopup="menu"
                    aria-controls={open ? exportMenuId : undefined}
                    id={exportButtonId}
                    {...other}
                    onClick={handleMenuOpen}
                    {...rootProps.slotProps?.baseButton}
                >
                    {apiRef.current.getLocaleText('toolbarExport')}
                </rootProps.slots.baseButton>
                <GridMenu
                    open={open}
                    target={buttonRef.current}
                    onClickAway={handleMenuClickAway}
                    position="bottom-start"
                >
                    <Menu
                        id={exportMenuId}
                        className="menuList"
                        aria-labelledby={exportButtonId}
                        onKeyDown={handleListKeyDown}
                        autoFocusItem={open}
                    >
                        {React.Children.map(children, (child) => {
                            if (!React.isValidElement(child)) {
                                return child;
                            }
                            return React.cloneElement<any>(child, { hideMenu: handleMenuClose });
                        })}
                    </Menu>
                </GridMenu>
            </React.Fragment>
        );
    }
);
