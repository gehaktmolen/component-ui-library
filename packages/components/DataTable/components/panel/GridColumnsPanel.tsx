import * as React from 'react';
import PropTypes from 'prop-types';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
import { Button } from '../../../Button';
import { FormControlLabel } from '../../../FormControlLabel';
import {
    gridColumnDefinitionsSelector,
    gridColumnVisibilityModelSelector
} from '../../hooks/features/columns/gridColumnsSelector';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { GridPanelContent } from './GridPanelContent';
import { GridPanelFooter } from './GridPanelFooter';
import { GridPanelHeader } from './GridPanelHeader';
import { GridPanelWrapper, GridPanelWrapperProps } from './GridPanelWrapper';
import { GRID_EXPERIMENTAL_ENABLED } from '../../constants/envConstants';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
// import type { DataGridProcessedProps } from '../../models/props/DataGridProps';
import type { GridColDef } from '../../models/colDef/gridColDef';

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['p-2 pr-0'],
        columnsPanelRow: ['flex justify-between py-1 px-2'],
        button: ['justify-end']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

export interface GridColumnsPanelProps extends GridPanelWrapperProps {
    /*
     * Changes how the options in the columns selector should be ordered.
     * If not specified, the order is derived from the `columns` prop.
     */
    sort?: 'asc' | 'desc';
    searchPredicate?: (column: GridColDef, searchValue: string) => boolean;
    /**
     * If `true`, the column search field will be focused automatically.
     * If `false`, the first column switch input will be focused automatically.
     * This helps to avoid input keyboard panel to popup automatically on touch devices.
     * @default true
     */
    autoFocusSearchField?: boolean;
    /**
     * If `true`, the `Hide all` button will not be displayed.
     * @default false
     */
    disableHideAllButton?: boolean;
    /**
     * If `true`, the `Show all` button will be disabled
     * @default false
     */
    disableShowAllButton?: boolean;
    /**
     * Returns the list of togglable columns.
     * If used, only those columns will be displayed in the panel
     * which are passed as the return value of the function.
     * @param {GridColDef[]} columns The `ColDef` list of all columns.
     * @returns {GridColDef['field'][]} The list of togglable columns' field names.
     */
    getTogglableColumns?: (columns: GridColDef[]) => GridColDef['field'][];
}

const collator = new Intl.Collator();

const defaultSearchPredicate: NonNullable<GridColumnsPanelProps['searchPredicate']> = (column, searchValue) => {
    return (column.headerName || column.field).toLowerCase().indexOf(searchValue) > -1;
};

function GridColumnsPanel(props: GridColumnsPanelProps) {
    const apiRef = useGridApiContext();
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const columns = useGridSelector(apiRef, gridColumnDefinitionsSelector);
    const columnVisibilityModel = useGridSelector(apiRef, gridColumnVisibilityModelSelector);
    const rootProps = useGridRootProps();
    const [searchValue, setSearchValue] = React.useState('');
    const classes = useUtilityClasses();

    const {
        sort,
        searchPredicate = defaultSearchPredicate,
        autoFocusSearchField = true,
        disableHideAllButton = false,
        disableShowAllButton = false,
        getTogglableColumns,
        ...other
    } = props;

    const sortedColumns = React.useMemo(() => {
        switch (sort) {
            case 'asc':
                return [...columns].sort((a, b) => collator.compare(a.headerName || a.field, b.headerName || b.field));

            case 'desc':
                return [...columns].sort((a, b) => -collator.compare(a.headerName || a.field, b.headerName || b.field));

            default:
                return columns;
        }
    }, [columns, sort]);

    const toggleColumn = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { name: field } = event.target as HTMLInputElement;
        apiRef.current.setColumnVisibility(field, columnVisibilityModel[field] === false);
    };

    const toggleAllColumns = React.useCallback(
        (isVisible: boolean) => {
            const currentModel = gridColumnVisibilityModelSelector(apiRef);
            const newModel = { ...currentModel };
            const togglableColumns = getTogglableColumns ? getTogglableColumns(columns) : null;

            columns.forEach((col) => {
                if (col.hideable && (togglableColumns == null || togglableColumns.includes(col.field))) {
                    if (isVisible) {
                        // delete the key from the model instead of setting it to `true`
                        delete newModel[col.field];
                    } else {
                        newModel[col.field] = false;
                    }
                }
            });

            return apiRef.current.setColumnVisibilityModel(newModel);
        },
        [apiRef, columns, getTogglableColumns]
    );

    const handleSearchValueChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }, []);

    const currentColumns = React.useMemo(() => {
        const togglableColumns = getTogglableColumns ? getTogglableColumns(sortedColumns) : null;

        const togglableSortedColumns = togglableColumns
            ? sortedColumns.filter(({ field }) => togglableColumns.includes(field))
            : sortedColumns;

        if (!searchValue) {
            return togglableSortedColumns;
        }

        return togglableSortedColumns.filter((column) => searchPredicate(column, searchValue.toLowerCase()));
    }, [sortedColumns, searchValue, searchPredicate, getTogglableColumns]);

    const firstToggleRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (autoFocusSearchField) {
            searchInputRef.current!.focus();
        } else if (firstToggleRef.current && typeof firstToggleRef.current.focus === 'function') {
            firstToggleRef.current.focus();
        }
    }, [autoFocusSearchField]);

    let firstHideableColumnFound = false;
    const isFirstHideableColumn = (column: GridColDef) => {
        if (firstHideableColumnFound === false && column.hideable !== false) {
            firstHideableColumnFound = true;
            return true;
        }
        return false;
    };

    return (
        <GridPanelWrapper {...other}>
            <GridPanelHeader>
                <rootProps.slots.baseInputField
                    label={apiRef.current.getLocaleText('columnsPanelTextFieldLabel')}
                    placeholder={apiRef.current.getLocaleText('columnsPanelTextFieldPlaceholder')}
                    inputRef={searchInputRef}
                    value={searchValue}
                    onChange={handleSearchValueChange}
                    variant="standard"
                    fullWidth
                    {...rootProps.slotProps?.baseInputField}
                />
            </GridPanelHeader>
            <GridPanelContent>
                <div className={classes.root} ownerState={rootProps}>
                    {currentColumns.map((column) => (
                        <div className={classes.columnsPanelRow} ownerState={rootProps} key={column.field}>
                            <FormControlLabel
                                control={
                                    <rootProps.slots.baseToggle
                                        disabled={column.hideable === false}
                                        checked={columnVisibilityModel[column.field] !== false}
                                        onClick={toggleColumn}
                                        name={column.field}
                                        size="small"
                                        inputRef={isFirstHideableColumn(column) ? firstToggleRef : undefined}
                                        {...rootProps.slotProps?.baseToggle}
                                    />
                                }
                                label={column.headerName || column.field}
                            />
                            {!rootProps.disableColumnReorder && GRID_EXPERIMENTAL_ENABLED && (
                                <Button
                                    draggable
                                    aria-label={apiRef.current.getLocaleText('columnsPanelDragIconLabel')}
                                    title={apiRef.current.getLocaleText('columnsPanelDragIconLabel')}
                                    size="small"
                                    disabled
                                    className={classes.button}
                                >
                                    <rootProps.slots.columnReorderIcon />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </GridPanelContent>
            {disableShowAllButton && disableHideAllButton ? null : (
                <GridPanelFooter>
                    {!disableHideAllButton ? (
                        <rootProps.slots.baseButton
                            onClick={() => toggleAllColumns(false)}
                            {...rootProps.slotProps?.baseButton}
                            disabled={disableHideAllButton}
                        >
                            {apiRef.current.getLocaleText('columnsPanelHideAllButton')}
                        </rootProps.slots.baseButton>
                    ) : (
                        <span />
                    )}

                    {!disableShowAllButton ? (
                        <rootProps.slots.baseButton
                            onClick={() => toggleAllColumns(true)}
                            {...rootProps.slotProps?.baseButton}
                            disabled={disableShowAllButton}
                        >
                            {apiRef.current.getLocaleText('columnsPanelShowAllButton')}
                        </rootProps.slots.baseButton>
                    ) : null}
                </GridPanelFooter>
            )}
        </GridPanelWrapper>
    );
}

GridColumnsPanel.propTypes = {
    /**
     * If `true`, the column search field will be focused automatically.
     * If `false`, the first column switch input will be focused automatically.
     * This helps to avoid input keyboard panel to popup automatically on touch devices.
     * @default true
     */
    autoFocusSearchField: PropTypes.bool,
    /**
     * If `true`, the `Hide all` button will not be displayed.
     * @default false
     */
    disableHideAllButton: PropTypes.bool,
    /**
     * If `true`, the `Show all` button will be disabled
     * @default false
     */
    disableShowAllButton: PropTypes.bool,
    /**
     * Returns the list of togglable columns.
     * If used, only those columns will be displayed in the panel
     * which are passed as the return value of the function.
     * @param {GridColDef[]} columns The `ColDef` list of all columns.
     * @returns {GridColDef['field'][]} The list of togglable columns' field names.
     */
    getTogglableColumns: PropTypes.func,
    searchPredicate: PropTypes.func,
    slotProps: PropTypes.object,
    sort: PropTypes.oneOf(['asc', 'desc'])
} as any;

export { GridColumnsPanel };
