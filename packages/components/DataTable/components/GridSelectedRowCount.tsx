import * as React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../utils';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
// import { DataGridProcessedProps } from '../models/props/DataGridProps';

interface SelectedRowCountProps {
    selectedRowCount: number;
}

type GridSelectedRowCountProps = React.HTMLAttributes<HTMLDivElement> & SelectedRowCountProps;

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['flex items-center my-0 mx-2 invisible w-0 h-0 sm:visible sm:w-auto sm:h-auto']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const GridSelectedRowCount = React.forwardRef<HTMLDivElement, GridSelectedRowCountProps>(
    function GridSelectedRowCount(props, ref) {
        const { className, selectedRowCount, ...other } = props;
        const apiRef = useGridApiContext();
        const ownerState = useGridRootProps();
        const classes = useUtilityClasses();
        const rowSelectedText = apiRef.current.getLocaleText('footerRowSelected')(selectedRowCount);

        return (
            <div ref={ref} className={twMerge(classes.root, className)} ownerState={ownerState} {...other}>
                {rowSelectedText}
            </div>
        );
    }
);

GridSelectedRowCount.propTypes = {
    selectedRowCount: PropTypes.number.isRequired
} as any;

export { GridSelectedRowCount };
