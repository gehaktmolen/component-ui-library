import * as React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '../../../Skeleton';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';

export interface GridSkeletonCellProps {
    width: number;
    contentWidth: number;
    field: string;
    align: string;
}

type OwnerState = Pick<GridSkeletonCellProps, 'align'> & {
    classes?: DataGridProcessedProps['classes'];
};

const useUtilityClasses = (ownerState: OwnerState) => {
    const { align } = ownerState;

    const slots = {
        root: ['cell', 'cellSkeleton', `cell--text${align}`, 'withBorderColor']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

function GridSkeletonCell(props: React.HTMLAttributes<HTMLDivElement> & GridSkeletonCellProps) {
    const { field, align, width, contentWidth, ...other } = props;
    const rootProps = useGridRootProps();
    const ownerState = { classes: rootProps.classes, align };
    const classes = useUtilityClasses(ownerState);

    return (
        <div className={classes.root} style={{ width }} {...other}>
            <Skeleton width={`${contentWidth}%`} />
        </div>
    );
}

GridSkeletonCell.propTypes = {
    align: PropTypes.string.isRequired,
    contentWidth: PropTypes.number.isRequired,
    field: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
} as any;

export { GridSkeletonCell };
