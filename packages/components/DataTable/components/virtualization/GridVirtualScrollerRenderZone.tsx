import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';

const useUtilityClasses = () => {
    const slots = {
        root: ['absolute flex flex-col']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const GridVirtualScrollerRenderZone = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function GridVirtualScrollerRenderZone(props, ref) {
        const { className, ...other } = props;
        const rootProps = useGridRootProps();
        const classes = useUtilityClasses();

        return <div ref={ref} className={twMerge(classes.root, className)} ownerState={rootProps} {...other} />;
    }
);

export { GridVirtualScrollerRenderZone };
