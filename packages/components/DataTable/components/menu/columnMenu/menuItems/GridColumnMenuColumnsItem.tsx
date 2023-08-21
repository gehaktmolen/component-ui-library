import * as React from 'react';
import PropTypes from 'prop-types';
import { GridColumnMenuItemProps } from '../GridColumnMenuItemProps';
import { GridColumnMenuHideItem } from './GridColumnMenuHideItem';
import { GridColumnMenuManageItem } from './GridColumnMenuManageItem';

function GridColumnMenuColumnsItem(props: GridColumnMenuItemProps) {
    return (
        <React.Fragment>
            <GridColumnMenuHideItem {...props} />
            <GridColumnMenuManageItem {...props} />
        </React.Fragment>
    );
}

GridColumnMenuColumnsItem.propTypes = {
    colDef: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
} as any;

export { GridColumnMenuColumnsItem };
