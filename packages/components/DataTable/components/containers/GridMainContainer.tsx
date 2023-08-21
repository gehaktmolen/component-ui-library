import * as React from 'react';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
// import { DataGridProcessedProps } from '../../models/props/DataGridProps';
import { useGridAriaAttributes } from '../../hooks/utils/useGridAriaAttributes';

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['relative flex-grow-1 flex flex-col overflow-hidden']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

export const GridMainContainer = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>((props, ref) => {
    const rootProps = useGridRootProps();
    const classes = useUtilityClasses();

    const getAriaAttributes = rootProps.experimentalFeatures?.ariaV7 // ariaV7 should never change
        ? useGridAriaAttributes
        : null;
    const ariaAttributes = typeof getAriaAttributes === 'function' ? getAriaAttributes() : null;

    return (
        <div ref={ref} className={classes.root} ownerState={rootProps} {...ariaAttributes}>
            {props.children}
        </div>
    );
});
