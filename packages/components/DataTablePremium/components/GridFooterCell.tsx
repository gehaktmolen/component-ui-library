import { GridRenderCellParams } from '../../DataTable';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../utils';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
// import { DataGridPremiumProcessedProps } from '../models/dataGridPremiumProps';

interface GridFooterCellProps extends GridRenderCellParams {}

// type OwnerState = DataGridPremiumProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['footerCell']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

function GridFooterCell(props: GridFooterCellProps) {
    const {
        formattedValue,
        colDef,
        cellMode,
        row,
        api,
        id,
        value,
        rowNode,
        field,
        focusElementRef,
        hasFocus,
        tabIndex,
        isEditable,
        ...other
    } = props;
    const rootProps = useGridRootProps();

    const ownerState = rootProps;
    const classes = useUtilityClasses(ownerState);

    return (
        <div ownerState={ownerState} className={classes.root} {...other}>
            {formattedValue}
        </div>
    );
}

export { GridFooterCell };
