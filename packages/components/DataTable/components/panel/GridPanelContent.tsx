import * as React from 'react';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
// import type { DataGridProcessedProps } from '../../models/props/DataGridProps';
// import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['flex flex-col overflow-auto flex-1 max-h-400']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

function GridPanelContent(props: React.HTMLAttributes<HTMLDivElement>) {
    const { className, ...other } = props;
    const rootProps = useGridRootProps();
    const classes = useUtilityClasses();

    return <div className={classes.root} ownerState={rootProps} {...other} />;
}

export { GridPanelContent };
