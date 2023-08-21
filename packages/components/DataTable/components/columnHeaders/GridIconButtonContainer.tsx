import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
// import type { DataGridProcessedProps } from '../../models/props/DataGridProps';

export type GridIconButtonContainerProps = React.HTMLAttributes<HTMLDivElement>;

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['flex visibility-hidden w-0']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

export const GridIconButtonContainer = React.forwardRef<HTMLDivElement, GridIconButtonContainerProps>(
    function GridIconButtonContainer(props: GridIconButtonContainerProps, ref) {
        const { className, ...other } = props;
        const rootProps = useGridRootProps();
        const classes = useUtilityClasses();

        return <div ref={ref} className={twMerge(classes.root, className)} ownerState={rootProps} {...other} />;
    }
);
