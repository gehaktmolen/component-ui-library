import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { GridDimensions } from '../../hooks/features/dimensions/gridDimensionsApi';

type OwnerState = DataGridProcessedProps &
    Pick<GridColumnHeadersInnerProps, 'isDragging'> & { hasScrollX: GridDimensions['hasScrollX'] };

const useUtilityClasses = (ownerState: OwnerState) => {
    const { isDragging, hasScrollX } = ownerState;

    const slots = {
        root: [
            'flex items-center flex-col',
            isDragging && 'columnHeaderDropZone',
            hasScrollX && 'columnHeadersInner--scrollable'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

interface GridColumnHeadersInnerProps extends React.HTMLAttributes<HTMLDivElement> {
    isDragging: boolean;
}

export const GridColumnHeadersInner = React.forwardRef<HTMLDivElement, GridColumnHeadersInnerProps>(
    function GridColumnHeadersInner(props, ref) {
        const { isDragging, className, ...other } = props;
        const apiRef = useGridApiContext();
        const rootProps = useGridRootProps();

        const ownerState = {
            ...rootProps,
            isDragging,
            hasScrollX: apiRef.current.getRootDimensions()?.hasScrollX ?? false
        };
        const classes = useUtilityClasses(ownerState);

        return <div ref={ref} className={twMerge(className, classes.root)} ownerState={ownerState} {...other} />;
    }
);
