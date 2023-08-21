import * as React from 'react';
import PropTypes from 'prop-types';
import { FocusTrap, type FocusTrapProps } from '../../../FocusTrap';
import { composeClasses } from '../../../../utils';
// import type { DataGridProcessedProps } from '../../models/props/DataGridProps';
// import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { generateUtilityClass, useClassNamesOverride } from '../../../../utils';

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['flex flex-col flex-1 focus:outline-none']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const isEnabled = () => true;

export interface GridPanelWrapperProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
    slotProps?: {
        FocusTrap?: FocusTrapProps;
    };
}

const GridPanelWrapper = React.forwardRef<HTMLDivElement, GridPanelWrapperProps>(function GridPanelWrapper(props, ref) {
    const { className, slotProps = {}, ...other } = props;
    const rootProps = useGridRootProps();
    const classes = useUtilityClasses();

    return (
        <FocusTrap open disableEnforceFocus isEnabled={isEnabled} {...slotProps.FocusTrap}>
            <div ref={ref} tabIndex={-1} className={classes.root} ownerState={rootProps} {...other} />
        </FocusTrap>
    );
});

GridPanelWrapper.propTypes = {
    slotProps: PropTypes.object
} as any;

export { GridPanelWrapper };
