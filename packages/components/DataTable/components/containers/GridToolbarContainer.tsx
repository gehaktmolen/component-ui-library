import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { composeClasses } from '../../../../utils';
// import type { DataGridProcessedProps } from '../../models/props/DataGridProps';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { generateUtilityClass, useClassNamesOverride } from '../../../../utils';

export type GridToolbarContainerProps = React.HTMLAttributes<HTMLDivElement>;

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['GridToolbarContainer', 'flex items-center flex-wrap gap-1 p-0.5']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const GridToolbarContainer = React.forwardRef<HTMLDivElement, GridToolbarContainerProps>(
    function GridToolbarContainer(props, ref) {
        const { className, children, ...other } = props;
        const rootProps = useGridRootProps();
        const classes = useUtilityClasses();
        if (!children) {
            return null;
        }

        return (
            <div ref={ref} className={twMerge(className, classes.root)} ownerState={rootProps} {...other}>
                {children}
            </div>
        );
    }
);

export { GridToolbarContainer };
