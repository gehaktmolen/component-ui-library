import { GridRenderCellParams } from '../../DataTablePro';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { GridFooterCell } from './GridFooterCell';

function GridGroupingColumnFooterCell(props: GridRenderCellParams) {
    const rootProps = useGridRootProps();
    console.log('GridFooterCell', rootProps);

    // const sx: SxProps<Theme> = { ml: 0 };
    // if (props.rowNode.parent == null) {
    //   sx.ml = 0;
    // } else if (rootProps.rowGroupingColumnMode === 'multiple') {
    //   sx.ml = 2;
    // } else {
    //   sx.ml = (theme) =>
    //     `calc(var(--DataGrid-cellOffsetMultiplier) * ${theme.spacing(props.rowNode.depth)})`;
    // }

    return <GridFooterCell {...props} />;
}

export { GridGroupingColumnFooterCell };
