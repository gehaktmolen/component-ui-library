import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../utils';
import { GridColDef, GridColumnHeaderParams, GridColumnHeaderTitle } from '../../DataTable';
import { getAggregationFunctionLabel } from '../hooks/features/aggregation/gridAggregationUtils';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { DataGridPremiumProcessedProps } from '../models/dataGridPremiumProps';

interface OwnerState extends DataGridPremiumProcessedProps {
    classes: DataGridPremiumProcessedProps['classes'];
    colDef: GridColDef;
}

// const GridAggregationHeaderRoot = styled(Box, {
//   name: 'MuiDataGrid',
//   slot: 'AggregationColumnHeader',
//   overridesResolver: (_, styles) => styles.aggregationColumnHeader,
// })<{ ownerState: OwnerState }>({
//   display: 'flex',
//   flexDirection: 'column',
//   [`&.${gridClasses['aggregationColumnHeader--alignRight']}`]: {
//     alignItems: 'flex-end',
//   },
//   [`&.${gridClasses['aggregationColumnHeader--alignCenter']}`]: {
//     alignItems: 'center',
//   },
// });

// const GridAggregationFunctionLabel = styled('div', {
//   name: 'MuiDataGrid',
//   slot: 'AggregationColumnHeaderLabel',
//   overridesResolver: (_, styles) => styles.aggregationColumnHeaderLabel,
// })<{ ownerState: OwnerState }>(({ theme }) => {
//   return {
//     fontSize: theme.typography.caption.fontSize,
//     lineHeight: theme.typography.caption.fontSize,
//     position: 'absolute',
//     bottom: 4,
//     fontWeight: theme.typography.fontWeightMedium,
//     color: (theme.vars || theme).palette.primary.dark,
//     textTransform: 'uppercase',
//   };
// });

const useUtilityClasses = (ownerState: OwnerState) => {
    const { colDef } = ownerState;

    const slots = {
        root: [
            'aggregationColumnHeader',
            colDef.headerAlign === 'left' && 'aggregationColumnHeader--alignLeft',
            colDef.headerAlign === 'center' && 'aggregationColumnHeader--alignCenter',
            colDef.headerAlign === 'right' && 'aggregationColumnHeader--alignRight'
        ],
        aggregationLabel: ['aggregationColumnHeaderLabel']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

function GridAggregationHeader(props: GridColumnHeaderParams) {
    const { colDef, aggregation } = props;

    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();

    const ownerState = { ...rootProps, classes: rootProps.classes, colDef };
    const classes = useUtilityClasses(ownerState);

    if (!aggregation) {
        return null;
    }

    const aggregationLabel = getAggregationFunctionLabel({
        apiRef,
        aggregationRule: aggregation.aggregationRule
    });

    return (
        <div ownerState={ownerState} className={classes.root}>
            <GridColumnHeaderTitle
                label={colDef.headerName ?? colDef.field}
                description={colDef.description}
                columnWidth={colDef.computedWidth}
            />
            <div ownerState={ownerState} className={classes.aggregationLabel}>
                {aggregationLabel}
            </div>
        </div>
    );
}

export { GridAggregationHeader };