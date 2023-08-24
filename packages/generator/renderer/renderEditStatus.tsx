import * as React from 'react';
import {
    GridRenderEditCellParams,
    useGridApiContext,
    useGridRootProps,
    GridEditModes
} from '../../components/DataTablePremium';
import { Select, SelectProps } from '../../components/Select';
import { MenuItem } from '../../components/MenuItem';
// Todo: Create ListItemIcon and ListItemText?
// import ListItemIcon from '../../../../../ListItemIcon';
// import ListItemText from '../../../../../ListItemText';
import { MenuProps } from '../../components/Menu';
import { STATUS_OPTIONS } from '../services/static-data';

function EditStatus(props: GridRenderEditCellParams<any, string>) {
    const { id, value, field } = props;
    const rootProps = useGridRootProps();
    const apiRef = useGridApiContext();

    const handleChange: SelectProps['onChange'] = async (event) => {
        const isValid = await apiRef.current.setEditCellValue({ id, field, value: event.target.value });

        if (isValid && rootProps.editMode === GridEditModes.Cell) {
            apiRef.current.stopCellEditMode({ id, field, cellToFocusAfter: 'below' });
        }
    };

    const handleClose: MenuProps['onClose'] = (event, reason) => {
        if (reason === 'backdropClick') {
            apiRef.current.stopCellEditMode({ id, field, ignoreModifications: true });
        }
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            slotProps={{
                root: () => ({
                    onClose: handleClose
                })
            }}
            className="flex items-center pl-1"
            autoFocus
            fullWidth
            open
        >
            {STATUS_OPTIONS.map((option) => {
                let IconComponent: any = null;
                if (option === 'Rejected') {
                    IconComponent = 'ReportProblemIcon';
                } else if (option === 'Open') {
                    IconComponent = 'InfoIcon';
                } else if (option === 'PartiallyFilled') {
                    IconComponent = 'AutorenewIcon';
                } else if (option === 'Filled') {
                    IconComponent = 'DoneIcon';
                }

                let label = option;
                if (option === 'PartiallyFilled') {
                    label = 'Partially Filled';
                }

                return (
                    <MenuItem key={option} value={option}>
                        <i className="min-w-[20px]">
                            <IconComponent />
                        </i>
                        <span className="overflow-hidden">{label}</span>
                    </MenuItem>
                );
            })}
        </Select>
    );
}

export function renderEditStatus(params: GridRenderEditCellParams<any, string>) {
    return <EditStatus {...params} />;
}
