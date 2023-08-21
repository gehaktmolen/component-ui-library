import * as React from 'react';
import PropTypes from 'prop-types';
import { Select, SelectProps } from '../../../../Select';
// Todo: Should be AutoComplete/ ComboBox.
// import { ComboBox, ComboBoxProps, createFilterOptions } from '../../../../ComboBox';
import { useId } from '../../../../../utils';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { GridFilterInputValueProps } from './GridFilterInputValueProps';
import { InputProps } from '../../../../Input';

export type GridFilterInputMultipleValueProps = {
    type?: 'text' | 'number';
} & GridFilterInputValueProps &
    Omit<SelectProps<string, true, false, true>, 'options' | 'renderInput'>;

function GridFilterInputMultipleValue(props: GridFilterInputMultipleValueProps) {
    const { item, applyValue, type, apiRef, focusElementRef, color, error, helperText, size, variant, ...other } =
        props;
    const InputProps = {
        color,
        error,
        helperText,
        size,
        variant
    };

    const [filterValueState, setFilterValueState] = React.useState(item.value || []);
    const id = useId();

    const rootProps = useGridRootProps();

    React.useEffect(() => {
        const itemValue = item.value ?? [];
        setFilterValueState(itemValue.map(String));
    }, [item.value]);

    const handleChange = React.useCallback<NonNullable<SelectProps<string, true, false, true>['onChange']>>(
        (event, value) => {
            setFilterValueState(value.map(String));
            applyValue({ ...item, value: [...value] });
        },
        [applyValue, item]
    );

    return (
        <Select<string, true, false, true>
            multiple
            freeSolo
            options={[]}
            filterOptions={(options, params) => {
                const { inputValue } = params;
                return inputValue == null || inputValue === '' ? [] : [inputValue];
            }}
            id={id}
            value={filterValueState}
            onChange={handleChange}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <rootProps.slots.baseChip
                        variant="outlined"
                        size="small"
                        label={option}
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderInput={(params) => (
                <rootProps.slots.baseInputField
                    {...params}
                    label={apiRef.current.getLocaleText('filterPanelFormLabel')}
                    placeholder={apiRef.current.getLocaleText('filterPanelInputPlaceholder')}
                    FormLabelProps={{
                        ...params.FormLabelProps,
                        shrink: true
                    }}
                    inputRef={focusElementRef}
                    type={type || 'text'}
                    {...InputProps}
                    {...rootProps.slotProps?.baseInputField}
                />
            )}
            {...other}
        />
    );
}

GridFilterInputMultipleValue.propTypes = {
    apiRef: PropTypes.shape({
        current: PropTypes.object.isRequired
    }).isRequired,
    applyValue: PropTypes.func.isRequired,
    focusElementRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    item: PropTypes.shape({
        field: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        operator: PropTypes.string.isRequired,
        value: PropTypes.any
    }).isRequired,
    type: PropTypes.oneOf(['number', 'text'])
} as any;

export { GridFilterInputMultipleValue };
