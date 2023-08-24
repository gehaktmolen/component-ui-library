import * as React from 'react';
import { GridRenderEditCellParams, useGridApiContext } from '../../components/DataTablePremium';
import { ComboBox, ComboBoxProps } from '../../components/ComboBox';
import { Input } from '../../components/Input';
import { COUNTRY_ISO_OPTIONS, CountryIsoOption } from '../services/static-data';

function EditCountry(props: GridRenderEditCellParams<CountryIsoOption>) {
    const { id, value, field } = props;

    const apiRef = useGridApiContext();

    const handleChange = React.useCallback<
        NonNullable<ComboBoxProps<CountryIsoOption, false, true, false>['onChange']>
    >(
        async (event, newValue) => {
            await apiRef.current.setEditCellValue({ id, field, value: newValue }, event);
            apiRef.current.stopCellEditMode({ id, field });
        },
        [apiRef, field, id]
    );

    return (
        <ComboBox<CountryIsoOption, false, true, false>
            className="h-full py-1 px-0"
            value={value}
            onChange={handleChange}
            options={COUNTRY_ISO_OPTIONS}
            getOptionLabel={(option: any) => option.label}
            autoHighlight
            fullWidth
            open
            disableClearable
            renderOption={(optionProps, option: any) => (
                <li {...optionProps}>
                    <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                        className="mr-0.5 flex-shrink-0"
                    />
                    {option.label}
                </li>
            )}
            renderInput={(params) => (
                <Input
                    autoFocus
                    fullWidth
                    id={params.id}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password' // disable autocomplete and autofill
                    }}
                    {...params.InputProps}
                />
            )}
        />
    );
}

export function renderEditCountry(params: GridRenderEditCellParams<CountryIsoOption>) {
    return <EditCountry {...params} />;
}
