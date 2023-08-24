import PropTypes from 'prop-types';
import { MenuItem } from '../../MenuItem';
import { GridExportMenuItemProps } from '../../DataTablePro';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { GridExcelExportOptions } from '../hooks/features/export';

export type GridExcelExportMenuItemProps = GridExportMenuItemProps<GridExcelExportOptions>;

function GridExcelExportMenuItem(props: GridExcelExportMenuItemProps) {
    const apiRef = useGridApiContext();
    const { hideMenu, options, ...other } = props;

    return (
        <MenuItem
            onClick={() => {
                apiRef.current.exportDataAsExcel(options);
                hideMenu?.();
            }}
            {...other}
        >
            {apiRef.current.getLocaleText('toolbarExportExcel')}
        </MenuItem>
    );
}

GridExcelExportMenuItem.propTypes = {
    hideMenu: PropTypes.func,
    options: PropTypes.shape({
        allColumns: PropTypes.bool,
        columnsStyles: PropTypes.object,
        disableToolbarButton: PropTypes.bool,
        exceljsPostProcess: PropTypes.func,
        exceljsPreProcess: PropTypes.func,
        fields: PropTypes.arrayOf(PropTypes.string),
        fileName: PropTypes.string,
        getRowsToExport: PropTypes.func,
        includeColumnGroupsHeaders: PropTypes.bool,
        includeHeaders: PropTypes.bool,
        valueOptionsSheetName: PropTypes.string,
        worker: PropTypes.func
    })
} as any;

export { GridExcelExportMenuItem };
