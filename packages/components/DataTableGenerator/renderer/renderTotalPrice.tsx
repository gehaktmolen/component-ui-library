import * as React from 'react';
import { GridRenderCellParams } from '../../DataTablePremium';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from "../../../utils";

const useUtilityClasses = (props) => {
  const { value } = props;

  const slots = {
    root: [
      'w-full h-full pr-2 flex items-center justify-end',
      value > 1000000 && 'bg-primary-100',
      value < 1000000 && 'bg-primary-500',
    ],
  };

  return composeClasses(
      slots,
      useClassNamesOverride((slot: string) => generateUtilityClass(slot))
  );
};

interface TotalPriceProps {
  value: number;
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const TotalPrice = React.memo(function TotalPrice(props: TotalPriceProps) {
  const { value } = props;
  const classes = useUtilityClasses(value);
  return (
    <div className={classes.root}>
      {currencyFormatter.format(value)}
    </div>
  );
});

export function renderTotalPrice(params: GridRenderCellParams<any, number>) {
  if (params.value == null) {
    return '';
  }

  // If the aggregated value does not have the same unit as the other cell
  // Then we fall back to the default rendering based on `valueGetter` instead of rendering the total price UI.
  if (params.aggregation && !params.aggregation.hasCellUnit) {
    return null;
  }

  return <TotalPrice value={params.value} />;
}
