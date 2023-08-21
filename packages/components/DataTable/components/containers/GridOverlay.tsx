import * as React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
// import type { DataGridProcessedProps } from '../../models/props/DataGridProps';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';

export type GridOverlayProps = React.HTMLAttributes<HTMLDivElement>;

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: [
            'GridOverlayContainer',
            'w-full h-full flex self-center items-center justify-center bg-gray-100 dark:bg-gray-800'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const GridOverlay = React.forwardRef<HTMLDivElement, GridOverlayProps>(function GridOverlay(
    props: GridOverlayProps,
    ref
) {
    const { className, ...other } = props;
    const rootProps = useGridRootProps();
    const classes = useUtilityClasses();

    return <div ref={ref} className={twMerge(classes.root, className)} ownerState={rootProps} {...other} />;
});

GridOverlay.propTypes = {
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
        PropTypes.func,
        PropTypes.object
    ])
} as any;

export { GridOverlay };
