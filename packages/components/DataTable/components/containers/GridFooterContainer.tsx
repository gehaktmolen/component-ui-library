import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
// import type { DataGridProcessedProps } from '../../models/props/DataGridProps';

export type GridFooterContainerProps = React.HTMLAttributes<HTMLDivElement>;

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: [
            'footerContainer',
            'flex space-between items-center min-h-[52px] box-border border border-l-0 border-b-0 border-r-0',
            'border-primary-700'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const GridFooterContainer = React.forwardRef<HTMLDivElement, GridFooterContainerProps>(function GridFooterContainer(
    props: GridFooterContainerProps,
    ref
) {
    const { className, ...other } = props;
    const rootProps = useGridRootProps();
    const classes = useUtilityClasses();

    return <div ref={ref} className={twMerge(classes.root, className)} ownerState={rootProps} {...other} />;
});

export { GridFooterContainer };
