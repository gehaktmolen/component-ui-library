import * as React from 'react';
import { CheckBoxProps } from '../../CheckBox';
import { InputProps } from '../../Input';
import { FormControlProps } from '../../FormControl';
import { SelectProps } from '../../Select';
import { ToggleProps } from '../../Toggle';
import { ButtonProps } from '../../Button';
import { IconButtonProps } from '../../IconButton';
import { TooltipProps } from '../../Tooltip';
import type { FormLabelProps } from '../../FormLabel';
import { PopperProps } from '../../Popper';
import { TablePaginationProps } from '../../TablePagination';
import { ChipProps } from '../../Chip';
import { GridToolbarProps } from '../components/toolbar/GridToolbar';
import { ColumnHeaderFilterIconButtonProps } from '../components/columnHeaders/GridColumnHeaderFilterIconButton';
import { GridColumnMenuProps } from '../components/menu/columnMenu/GridColumnMenuProps';
import { GridColumnsPanelProps } from '../components/panel/GridColumnsPanel';
import { GridFilterPanelProps } from '../components/panel/filterPanel/GridFilterPanel';
import { GridFooterContainerProps } from '../components/containers/GridFooterContainer';
import { GridOverlayProps } from '../components/containers/GridOverlay';
import { GridPanelProps } from '../components/panel/GridPanel';
import type { GridRowProps } from '../components/GridRow';
import type { GridCellProps } from '../components/cell/GridCell';

// Overrides for module augmentation
export interface BaseCheckBoxPropsOverrides {}
export interface BaseInputPropsOverrides {}
export interface BaseFormControlPropsOverrides {}
export interface BaseSelectPropsOverrides {}
export interface BaseTogglePropsOverrides {}
export interface BaseButtonPropsOverrides {}
export interface BaseIconButtonPropsOverrides {}
export interface BaseTooltipPropsOverrides {}
export interface BasePopperPropsOverrides {}
export interface BaseFormLabelPropsOverrides {}
export interface BaseSelectOptionPropsOverrides {}
export interface BaseChipPropsOverrides {}
export interface CellPropsOverrides {}
export interface ToolbarPropsOverrides {}
export interface ColumnHeaderFilterIconButtonPropsOverrides {}
export interface ColumnMenuPropsOverrides {}
export interface ColumnsPanelPropsOverrides {}
export interface FilterPanelPropsOverrides {}
export interface FooterPropsOverrides {}
export interface PaginationPropsOverrides {}
export interface LoadingOverlayPropsOverrides {}
export interface NoResultsOverlayPropsOverrides {}
export interface NoRowsOverlayPropsOverrides {}
export interface PanelPropsOverrides {}
export interface PreferencesPanelPropsOverrides {}
export interface RowPropsOverrides {}

type SlotProps<Props, Overrides> = Partial<Props & Overrides>;

/**
 * Overridable components props dynamically passed to the component at rendering.
 */
export interface GridSlotsComponentsProps {
    baseCheckBox?: SlotProps<CheckBoxProps, BaseCheckBoxPropsOverrides>;
    baseInput?: SlotProps<InputProps, BaseInputPropsOverrides>;
    baseFormControl?: SlotProps<FormControlProps, BaseFormControlPropsOverrides>;
    baseSelect?: SlotProps<SelectProps, BaseSelectPropsOverrides>;
    baseToggle?: SlotProps<ToggleProps, BaseTogglePropsOverrides>;
    baseButton?: SlotProps<ButtonProps, BaseButtonPropsOverrides>;
    baseIconButton?: SlotProps<IconButtonProps, BaseIconButtonPropsOverrides>;
    basePopper?: SlotProps<PopperProps, BasePopperPropsOverrides>;
    baseTooltip?: SlotProps<TooltipProps, BaseTooltipPropsOverrides>;
    baseFormLabel?: SlotProps<FormLabelProps, BaseFormLabelPropsOverrides>;
    baseSelectOption?: SlotProps<
        { native: boolean; value: any; children?: React.ReactNode },
        BaseSelectOptionPropsOverrides
    >;
    baseChip?: SlotProps<ChipProps, BaseChipPropsOverrides>;
    cell?: SlotProps<GridCellProps, CellPropsOverrides>;
    columnHeaderFilterIconButton?: SlotProps<
        ColumnHeaderFilterIconButtonProps,
        ColumnHeaderFilterIconButtonPropsOverrides
    >;
    columnMenu?: SlotProps<GridColumnMenuProps, ColumnMenuPropsOverrides>;
    columnsPanel?: SlotProps<GridColumnsPanelProps, ColumnsPanelPropsOverrides>;
    filterPanel?: SlotProps<GridFilterPanelProps, FilterPanelPropsOverrides>;
    footer?: SlotProps<GridFooterContainerProps, FooterPropsOverrides>;
    loadingOverlay?: SlotProps<GridOverlayProps, LoadingOverlayPropsOverrides>;
    noResultsOverlay?: SlotProps<GridOverlayProps, NoResultsOverlayPropsOverrides>;
    noRowsOverlay?: SlotProps<GridOverlayProps, NoRowsOverlayPropsOverrides>;
    pagination?: SlotProps<TablePaginationProps, PaginationPropsOverrides>;
    panel?: SlotProps<GridPanelProps, PanelPropsOverrides>;
    preferencesPanel?: SlotProps<React.HTMLAttributes<HTMLDivElement>, PreferencesPanelPropsOverrides>;
    row?: SlotProps<GridRowProps, RowPropsOverrides>;
    toolbar?: SlotProps<GridToolbarProps, ToolbarPropsOverrides>;
}
