import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { composeClasses } from '../../../../utils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
// import { DataGridProcessedProps } from '../../models/props/DataGridProps';
import { generateUtilityClass, useClassNamesOverride } from '../../../../utils';

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['virtualScroller', 'overflow-auto h-full relative']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const GridVirtualScroller = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function GridVirtualScroller(props, ref) {
        const rootProps = useGridRootProps();
        const classes = useUtilityClasses();

        return <div ref={ref} {...props} className={twMerge(classes.root, props.className)} ownerState={rootProps} />;
    }
);

export { GridVirtualScroller };
