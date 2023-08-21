import * as React from 'react';
import PropTypes from 'prop-types';
import { composeClasses, generateUtilityClass, useClassNamesOverride, useId } from '../../../../utils';
import { Badge } from '../../../Badge';
import { ButtonProps } from '../../../Button';
import { TooltipProps } from '../../../Tooltip';
import { gridColumnLookupSelector } from '../../hooks/features/columns/gridColumnsSelector';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { gridFilterActiveItemsSelector } from '../../hooks/features/filter/gridFilterSelector';
import { gridPreferencePanelStateSelector } from '../../hooks/features/preferencesPanel/gridPreferencePanelSelector';
import { GridPreferencePanelsValue } from '../../hooks/features/preferencesPanel/gridPreferencePanelsValue';
import { GridTranslationKeys } from '../../models/api/gridLocaleTextApi';
import { GridFilterItem } from '../../models/gridFilterItem';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
// import type { DataGridProcessedProps } from '../../models/props/DataGridProps';

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['m-1 mb-0.5 py-0 px-1']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

export interface GridToolbarFilterButtonProps extends Omit<TooltipProps, 'title' | 'children' | 'componentsProps'> {
    /**
     * The props used for each slot inside.
     * @default {}
     */
    componentsProps?: { button?: ButtonProps };
}

const GridToolbarFilterButton = React.forwardRef<HTMLButtonElement, GridToolbarFilterButtonProps>(
    function GridToolbarFilterButton(props, ref) {
        const { componentsProps = {}, ...other } = props;
        const buttonProps = componentsProps.button || {};
        const apiRef = useGridApiContext();
        const rootProps = useGridRootProps();
        const activeFilters = useGridSelector(apiRef, gridFilterActiveItemsSelector);
        const lookup = useGridSelector(apiRef, gridColumnLookupSelector);
        const preferencePanel = useGridSelector(apiRef, gridPreferencePanelStateSelector);
        const classes = useUtilityClasses();
        const filterButtonId = useId();
        const filterPanelId = useId();

        const tooltipContentNode = React.useMemo(() => {
            if (preferencePanel.open) {
                return apiRef.current.getLocaleText('toolbarFiltersTooltipHide') as React.ReactElement;
            }
            if (activeFilters.length === 0) {
                return apiRef.current.getLocaleText('toolbarFiltersTooltipShow') as React.ReactElement;
            }

            const getOperatorLabel = (item: GridFilterItem): string =>
                lookup[item.field!].filterOperators!.find((operator) => operator.value === item.operator)!.label ||
                apiRef.current.getLocaleText(`filterOperator${item.operator!}` as GridTranslationKeys)!.toString();

            const getFilterItemValue = (item: GridFilterItem): string => {
                const { getValueAsString } = lookup[item.field!].filterOperators!.find(
                    (operator) => operator.value === item.operator
                )!;

                return getValueAsString ? getValueAsString(item.value) : item.value;
            };

            return (
                <div>
                    {apiRef.current.getLocaleText('toolbarFiltersTooltipActive')(activeFilters.length)}
                    <ul className={classes.root} ownerState={rootProps}>
                        {activeFilters.map((item, index) => ({
                            ...(lookup[item.field!] && (
                                <li key={index}>
                                    {`${lookup[item.field!].headerName || item.field}
                  ${getOperatorLabel(item)}
                  ${
                      // implicit check for null and undefined
                      item.value != null ? getFilterItemValue(item) : ''
                  }`}
                                </li>
                            ))
                        }))}
                    </ul>
                </div>
            );
        }, [apiRef, rootProps, preferencePanel.open, activeFilters, lookup, classes]);

        const toggleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
            const { open, openedPanelValue } = preferencePanel;
            if (open && openedPanelValue === GridPreferencePanelsValue.filters) {
                apiRef.current.hidePreferences();
            } else {
                apiRef.current.showPreferences(GridPreferencePanelsValue.filters, filterPanelId, filterButtonId);
            }
            buttonProps.onClick?.(event);
        };

        // Disable the button if the corresponding is disabled
        if (rootProps.disableColumnFilter) {
            return null;
        }

        const isOpen = preferencePanel.open && preferencePanel.panelId === filterPanelId;
        return (
            <rootProps.slots.baseTooltip
                title={tooltipContentNode}
                enterDelay={1000}
                {...other}
                {...rootProps.slotProps?.baseTooltip}
            >
                <rootProps.slots.baseButton
                    ref={ref}
                    id={filterButtonId}
                    size="small"
                    aria-label={apiRef.current.getLocaleText('toolbarFiltersLabel')}
                    aria-controls={isOpen ? filterPanelId : undefined}
                    aria-expanded={isOpen}
                    aria-haspopup
                    startIcon={
                        <Badge badgeContent={activeFilters.length} color="primary">
                            <rootProps.slots.openFilterButtonIcon />
                        </Badge>
                    }
                    {...buttonProps}
                    onClick={toggleFilter}
                    {...rootProps.slotProps?.baseButton}
                >
                    {apiRef.current.getLocaleText('toolbarFilters')}
                </rootProps.slots.baseButton>
            </rootProps.slots.baseTooltip>
        );
    }
);

GridToolbarFilterButton.propTypes = {
    /**
     * The props used for each slot inside.
     * @default {}
     */
    componentsProps: PropTypes.object
} as any;

export { GridToolbarFilterButton };
