import * as React from 'react';
import { GridRenderEditCellParams, useGridApiContext } from '../../DataTablePremium';
import { ComboBox, ComboBoxProps } from '../../ComboBox';
import { Input } from '../../Input';
import { CURRENCY_OPTIONS } from '../services/static-data';

function EditCurrency(props: GridRenderEditCellParams<any, string>) {
  const { id, value, field } = props;

  const apiRef = useGridApiContext();

  const handleChange = React.useCallback<
    NonNullable<ComboBoxProps<string, false, true, false>['onChange']>
  >(
    async (event, newValue) => {
      await apiRef.current.setEditCellValue({ id, field, value: newValue.toUpperCase() }, event);
      apiRef.current.stopCellEditMode({ id, field });
    },
    [apiRef, field, id],
  );

  return (
    <ComboBox<string, false, true, false>
        className="'h-full py-1 px-0"
      value={value}
      onChange={handleChange}
      options={CURRENCY_OPTIONS}
      autoHighlight
      fullWidth
      open
      disableClearable
      renderOption={(optionProps, option: any) => (
        <li
          {...optionProps}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.slice(0, -1).toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.slice(0, -1).toLowerCase()}.png 2x`}
            alt=""
            className="mr-0.5 flex-shrink-0"
          />
          {option}
        </li>
      )}
      renderInput={(params) => (
        <Input
          autoFocus
          fullWidth
          id={params.id}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          {...params.InputProps}
        />
      )}
    />
  );
}

export function renderEditCurrency(params: GridRenderEditCellParams<any, string>) {
  return <EditCurrency {...params} />;
}
