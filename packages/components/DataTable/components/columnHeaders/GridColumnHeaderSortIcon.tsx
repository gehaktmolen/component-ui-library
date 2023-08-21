import * as React from 'react';
import PropTypes from 'prop-types';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
import { Badge } from '../../../Badge';
import { UncapitalizedGridSlotsComponent } from '../../models/gridSlotsComponent';
import { GridSortDirection } from '../../models/gridSortModel';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
// import { DataGridProcessedProps } from '../../models/props/DataGridProps';
import { GridIconButtonContainer } from './GridIconButtonContainer';

export interface GridColumnHeaderSortIconProps {
    direction: GridSortDirection;
    index: number | undefined;
    sortingOrder: GridSortDirection[];
}

// type OwnerState = GridColumnHeaderSortIconProps & {
//   classes?: DataGridProcessedProps['classes'];
// };

const useUtilityClasses = () => {
    const slots = {
        icon: ['sortIcon']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

function getIcon(
    icons: UncapitalizedGridSlotsComponent,
    direction: GridSortDirection,
    className: string,
    sortingOrder: GridSortDirection[]
) {
    let Icon;
    const iconProps: any = {};
    if (direction === 'asc') {
        Icon = icons.columnSortedAscendingIcon;
    } else if (direction === 'desc') {
        Icon = icons.columnSortedDescendingIcon;
    } else {
        Icon = icons.columnUnsortedIcon;
        iconProps.sortingOrder = sortingOrder;
    }
    return Icon ? <Icon fontSize="small" className={className} {...iconProps} /> : null;
}

function GridColumnHeaderSortIconRaw(props: GridColumnHeaderSortIconProps) {
    const { direction, index, sortingOrder } = props;
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();
    const ownerState = { ...props, classes: rootProps.classes };
    const classes = useUtilityClasses();

    const iconElement = getIcon(rootProps.slots, direction, classes.icon, sortingOrder);
    if (!iconElement) {
        return null;
    }

    const iconButton = (
        <rootProps.slots.baseIconButton
            tabIndex={-1}
            aria-label={apiRef.current.getLocaleText('columnHeaderSortIconLabel')}
            title={apiRef.current.getLocaleText('columnHeaderSortIconLabel')}
            size="small"
            {...rootProps.slotProps?.baseIconButton}
        >
            {iconElement}
        </rootProps.slots.baseIconButton>
    );

    return (
        <GridIconButtonContainer>
            {index != null && (
                <Badge badgeContent={index} color="default">
                    {iconButton}
                </Badge>
            )}

            {index == null && iconButton}
        </GridIconButtonContainer>
    );
}

const GridColumnHeaderSortIcon = React.memo(GridColumnHeaderSortIconRaw);

GridColumnHeaderSortIconRaw.propTypes = {
    direction: PropTypes.oneOf(['asc', 'desc']),
    index: PropTypes.number,
    sortingOrder: PropTypes.arrayOf(PropTypes.oneOf(['asc', 'desc'])).isRequired
} as any;

export { GridColumnHeaderSortIcon };
