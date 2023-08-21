import * as React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { Menu } from '../../../../Menu';
import { isHideMenuKey, isTabKey } from '../../../utils/keyboardUtils';
import { GridColumnMenuContainerProps } from './GridColumnMenuProps';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../../utils';

const useUtilityClasses = () => {
    const slots = {
        root: ['min-w-[248px]']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const GridColumnMenuContainer = React.forwardRef<HTMLUListElement, GridColumnMenuContainerProps>(
    function GridColumnMenuContainer(props, ref) {
        const { hideMenu, colDef, id, labelledby, className, children, open, ...other } = props;
        const classes = useUtilityClasses();

        const handleListKeyDown = React.useCallback(
            (event: React.KeyboardEvent) => {
                if (isTabKey(event.key)) {
                    event.preventDefault();
                }
                if (isHideMenuKey(event.key)) {
                    hideMenu(event);
                }
            },
            [hideMenu]
        );

        return (
            <Menu
                id={id}
                ref={ref}
                className={twMerge(classes.root, className)}
                aria-labelledby={labelledby}
                onKeyDown={handleListKeyDown}
                autoFocus={open}
                {...other}
            >
                {children}
            </Menu>
        );
    }
);

GridColumnMenuContainer.propTypes = {
    colDef: PropTypes.object.isRequired,
    hideMenu: PropTypes.func.isRequired,
    id: PropTypes.string,
    labelledby: PropTypes.string,
    open: PropTypes.bool.isRequired
} as any;

export { GridColumnMenuContainer };
