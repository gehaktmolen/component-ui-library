import * as React from 'react';
import PropTypes from 'prop-types';
import { Input, InputProps } from '../../../Input';
import { composeClasses, debounce, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { gridQuickFilterValuesSelector } from '../../hooks/features/filter';
import { GridFilterModel } from '../../models/gridFilterModel';
// import type { DataGridProcessedProps } from '../../models/props/DataGridProps';
import { isDeepEqual } from '../../utils/utils';

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['w-auto pb-0.5']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const defaultSearchValueParser = (searchText: string) => searchText.split(' ').filter((word) => word !== '');

const defaultSearchValueFormatter = (values: string[]) => values.join(' ');

export type GridToolbarQuickFilterProps = InputProps & {
    /**
     * Function responsible for parsing text input in an array of independent values for quick filtering.
     * @param {string} input The value entered by the user
     * @returns {any[]} The array of value on which quick filter is applied
     */
    quickFilterParser?: (input: string) => any[];
    /**
     * Function responsible for formatting values of quick filter in a string when the model is modified
     * @param {any[]} values The new values passed to the quick filter model
     * @returns {string} The string to display in the text field
     */
    quickFilterFormatter?: (values: NonNullable<GridFilterModel['quickFilterValues']>) => string;
    /**
     * The debounce time in milliseconds.
     * @default 150
     */
    debounceMs?: number;
};

function GridToolbarQuickFilter(props: GridToolbarQuickFilterProps) {
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();
    const quickFilterValues = useGridSelector(apiRef, gridQuickFilterValuesSelector);
    const classes = useUtilityClasses();

    const {
        quickFilterParser = defaultSearchValueParser,
        quickFilterFormatter = defaultSearchValueFormatter,
        debounceMs = rootProps.filterDebounceMs,
        ...other
    } = props;

    const [searchValue, setSearchValue] = React.useState(() => quickFilterFormatter(quickFilterValues ?? []));

    const prevQuickFilterValuesRef = React.useRef(quickFilterValues);

    React.useEffect(() => {
        if (!isDeepEqual(prevQuickFilterValuesRef.current, quickFilterValues)) {
            // The model of quick filter value has been updated
            prevQuickFilterValuesRef.current = quickFilterValues;

            // Update the input value if needed to match the new model
            setSearchValue((prevSearchValue) =>
                isDeepEqual(quickFilterParser(prevSearchValue), quickFilterValues)
                    ? prevSearchValue
                    : quickFilterFormatter(quickFilterValues ?? [])
            );
        }
    }, [quickFilterValues, quickFilterFormatter, quickFilterParser]);

    const updateSearchValue = React.useCallback(
        (newSearchValue: string) => {
            const newQuickFilterValues = quickFilterParser(newSearchValue);
            prevQuickFilterValuesRef.current = newQuickFilterValues;
            apiRef.current.setQuickFilterValues(newQuickFilterValues);
        },
        [apiRef, quickFilterParser]
    );

    const debouncedUpdateSearchValue = React.useMemo(
        () => debounce(updateSearchValue, debounceMs),
        [updateSearchValue, debounceMs]
    );

    const handleSearchValueChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newSearchValue = event.target.value;
            setSearchValue(newSearchValue);
            debouncedUpdateSearchValue(newSearchValue);
        },
        [debouncedUpdateSearchValue]
    );

    const handleSearchReset = React.useCallback(() => {
        setSearchValue('');
        updateSearchValue('');
    }, [updateSearchValue]);

    return (
        <Input
            as={rootProps.slots.baseInputField}
            ownerState={rootProps}
            className={classes.root}
            variant="standard"
            value={searchValue}
            onChange={handleSearchValueChange}
            placeholder={apiRef.current.getLocaleText('toolbarQuickFilterPlaceholder')}
            aria-label={apiRef.current.getLocaleText('toolbarQuickFilterLabel')}
            type="search"
            {...other}
            InputProps={{
                startAdornment: <rootProps.slots.quickFilterIcon fontSize="small" />,
                endAdornment: (
                    <rootProps.slots.baseIconButton
                        aria-label={apiRef.current.getLocaleText('toolbarQuickFilterDeleteIconLabel')}
                        size="small"
                        sx={{ visibility: searchValue ? 'visible' : 'hidden' }}
                        onClick={handleSearchReset}
                        {...rootProps.slotProps?.baseIconButton}
                    >
                        <rootProps.slots.quickFilterClearIcon fontSize="small" />
                    </rootProps.slots.baseIconButton>
                ),
                ...other.InputProps
            }}
            {...rootProps.slotProps?.baseInputField}
        />
    );
}

GridToolbarQuickFilter.propTypes = {
    /**
     * The debounce time in milliseconds.
     * @default 150
     */
    debounceMs: PropTypes.number,
    /**
     * Function responsible for formatting values of quick filter in a string when the model is modified
     * @param {any[]} values The new values passed to the quick filter model
     * @returns {string} The string to display in the text field
     */
    quickFilterFormatter: PropTypes.func,
    /**
     * Function responsible for parsing text input in an array of independent values for quick filtering.
     * @param {string} input The value entered by the user
     * @returns {any[]} The array of value on which quick filter is applied
     */
    quickFilterParser: PropTypes.func
} as any;

export { GridToolbarQuickFilter };
