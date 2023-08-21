import * as React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../utils';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
// import { DataGridProcessedProps } from '../models/props/DataGridProps';

interface RowCountProps {
    rowCount: number;
    visibleRowCount: number;
}

type GridRowCountProps = React.HTMLAttributes<HTMLDivElement> & RowCountProps;

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['selectedRowCount', 'flex items-center my-0 mx-4 visible w-auto h-auto']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const GridRowCount = React.forwardRef<HTMLDivElement, GridRowCountProps>(function GridRowCount(props, ref) {
    const { className, rowCount, visibleRowCount, ...other } = props;
    const apiRef = useGridApiContext();
    const ownerState = useGridRootProps();
    const classes = useUtilityClasses();

    if (rowCount === 0) {
        return null;
    }

    const text =
        visibleRowCount < rowCount
            ? apiRef.current.getLocaleText('footerTotalVisibleRows')(visibleRowCount, rowCount)
            : rowCount.toLocaleString();

    return (
        <div ref={ref} className={twMerge(classes.root, className)} ownerState={ownerState} {...other}>
            {apiRef.current.getLocaleText('footerTotalRows')} {text}
        </div>
    );
});

GridRowCount.propTypes = {
    rowCount: PropTypes.number.isRequired,
    visibleRowCount: PropTypes.number.isRequired
} as any;

export { GridRowCount };
