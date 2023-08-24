import { GridRenderCellParams } from '../../DataTablePro';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';

function GridGroupingColumnLeafCell(props: GridRenderCellParams) {
  const { rowNode } = props;
  const rootProps = useGridRootProps();

  console.log('groupingColumnLeafCell', rowNode, rootProps);

  return (
    <div
      // sx={{
      //   ml:
      //     rootProps.rowGroupingColumnMode === 'multiple'
      //       ? 1
      //       : (theme) =>
      //           `calc(var(--DataGrid-cellOffsetMultiplier) * ${theme.spacing(rowNode.depth)})`,
      // }}
    >
      {props.formattedValue ?? props.value}
    </div>
  );
}

export { GridGroupingColumnLeafCell };
