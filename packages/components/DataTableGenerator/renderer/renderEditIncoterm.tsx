import * as React from 'react';
import { GridRenderEditCellParams, useGridApiContext } from '../../DataTablePremium';
import { Select, SelectProps } from '../../Select';
import { MenuProps } from '../../Menu';
import { MenuItem } from '../../MenuItem';
// Todo: Create ListItemIcon and ListItemText?
// import ListItemIcon from '../../../../../ListItemIcon';
// import ListItemText from '../../../../../ListItemText';
import { INCOTERM_OPTIONS } from '../services/static-data';

function EditIncoterm(props: GridRenderEditCellParams<any, string | null>) {
  const { id, value, field } = props;

  const apiRef = useGridApiContext();

  const handleChange: SelectProps['onChange'] = async (event) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value as any }, event);
    apiRef.current.stopCellEditMode({ id, field });
  };

  const handleClose: MenuProps['onClose'] = (event, reason) => {
    if (reason === 'backdropClick') {
      apiRef.current.stopCellEditMode({ id, field });
    }
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      slotProps={{
        root: () => ({
          onClose: handleClose,
        }),
      }}
      className="flex items-center pl-1"
      autoFocus
      fullWidth
      open
    >
      {INCOTERM_OPTIONS.map((option) => {
        const tooltip = option.slice(option.indexOf('(') + 1, option.indexOf(')'));
        const code = option.slice(0, option.indexOf('(')).trim();

        return (
          <MenuItem key={option} value={option}>
            <i className="min-w-[20px]">{code}</i>
            <span className="overflow-hidden">{tooltip}</span>
          </MenuItem>
        );
      })}
    </Select>
  );
}

export function renderEditIncoterm(params: GridRenderEditCellParams<any, string | null>) {
  return <EditIncoterm {...params} />;
}
