import * as React from 'react';
// import PropTypes from 'prop-types';
import { composeClasses } from '../../../../utils';
// import type { DataGridProcessedProps } from '../../models/props/DataGridProps';
// import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { generateUtilityClass, useClassNamesOverride } from '../../../../utils';

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['flex justify-between p-4']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

function GridPanelFooter(props: React.HTMLAttributes<HTMLDivElement>) {
    const { className, ...other } = props;
    const rootProps = useGridRootProps();
    const classes = useUtilityClasses();

    return <div className={classes.root} ownerState={rootProps} {...other} />;
}

export { GridPanelFooter };
