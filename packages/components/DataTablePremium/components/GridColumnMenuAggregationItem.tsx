import * as React from 'react';
import PropTypes from 'prop-types';
import { GridColumnMenuItemProps, useGridSelector } from '../../DataTablePro';
import { MenuItem } from '../../MenuItem';
// Todo: Create ListItemIcon and ListItemText?
// import ListItemIcon from '../../../../../ListItemIcon';
// import ListItemText from '../../../../../ListItemText';
import { FormControl } from '../../FormControl';
import { FormLabel } from '../../FormLabel';
import { useId } from '../../../utils';
import { Select } from '../../Select';
import { SelectChangeEvent } from '../../useSelect';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import {
    canColumnHaveAggregationFunction,
    getAggregationFunctionLabel,
    getAvailableAggregationFunctions
} from '../hooks/features/aggregation/gridAggregationUtils';
import { gridAggregationModelSelector } from '../hooks/features/aggregation/gridAggregationSelectors';
import { GridAggregationModel } from '../hooks/features/aggregation/gridAggregationInterfaces';

function GridColumnMenuAggregationItem(props: GridColumnMenuItemProps) {
    const { colDef } = props;
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();
    const id = useId();
    const aggregationModel = useGridSelector(apiRef, gridAggregationModelSelector);

    const availableAggregationFunctions = React.useMemo(
        () =>
            getAvailableAggregationFunctions({
                aggregationFunctions: rootProps.aggregationFunctions,
                colDef
            }),
        [colDef, rootProps.aggregationFunctions]
    );

    const selectedAggregationRule = React.useMemo(() => {
        if (!colDef || !aggregationModel[colDef.field]) {
            return '';
        }

        const aggregationFunctionName = aggregationModel[colDef.field];
        if (
            canColumnHaveAggregationFunction({
                colDef,
                aggregationFunctionName,
                aggregationFunction: rootProps.aggregationFunctions[aggregationFunctionName]
            })
        ) {
            return aggregationFunctionName;
        }

        return '';
    }, [rootProps.aggregationFunctions, aggregationModel, colDef]);

    const handleAggregationItemChange = (event: SelectChangeEvent<string | undefined>) => {
        const newAggregationItem = event.target?.value || undefined;
        const currentModel = gridAggregationModelSelector(apiRef);
        const { [colDef.field]: columnItem, ...otherColumnItems } = currentModel;
        const newModel: GridAggregationModel =
            newAggregationItem == null
                ? otherColumnItems
                : { ...otherColumnItems, [colDef?.field]: newAggregationItem };

        apiRef.current.setAggregationModel(newModel);
        apiRef.current.hideColumnMenu();
    };

    const label = apiRef.current.getLocaleText('aggregationMenuItemHeader');

    return (
        <MenuItem>
            <i>
                <rootProps.slots.columnMenuAggregationIcon fontSize="small" />
            </i>
            <span>
                <FormControl size="small" fullWidth sx={{ minWidth: 150 }}>
                    <FormLabel id={`${id}-label`}>{label}</FormLabel>
                    <Select
                        labelId={`${id}-label`}
                        id={`${id}-input`}
                        value={selectedAggregationRule}
                        label={label}
                        color="primary"
                        onChange={handleAggregationItemChange}
                        onBlur={(e) => e.stopPropagation()}
                        fullWidth
                    >
                        <MenuItem value="">...</MenuItem>
                        {availableAggregationFunctions.map((aggFunc) => (
                            <MenuItem key={aggFunc} value={aggFunc}>
                                {getAggregationFunctionLabel({
                                    apiRef,
                                    aggregationRule: {
                                        aggregationFunctionName: aggFunc,
                                        aggregationFunction: rootProps.aggregationFunctions[aggFunc]
                                    }
                                })}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </span>
        </MenuItem>
    );
}

GridColumnMenuAggregationItem.propTypes = {
    colDef: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
} as any;

export { GridColumnMenuAggregationItem };
