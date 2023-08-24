import * as React from 'react';
import { GridRenderCellParams } from '../../DataTablePremium';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from "../../../utils";

interface ProgressBarProps {
  value: number;
}

const useUtilityClasses = (props) => {
  const { valueInPercent } = props;

  const slots = {
    value: [
      'w-full',
      valueInPercent < 30 && 'bg-primary-500',
      (valueInPercent >= 30 && valueInPercent <= 70) && 'bg-danger-500',
      valueInPercent > 70 && 'bg-success-200'
    ],
  };

  return composeClasses(
      slots,
      useClassNamesOverride((slot: string) => generateUtilityClass(slot))
  );
};

const ProgressBar = React.memo(function ProgressBar(props: ProgressBarProps) {
  const { value } = props;
  const valueInPercent = value * 100;
  const classes = useUtilityClasses(valueInPercent);

  return (
    <div className="border border-gray-300 relative overflow-hidden w-full height-[26px] rounded-lg">
      <div className="absolute w-full flex justify-center">{`${valueInPercent.toLocaleString()} %`}</div>
      <div
          className={classes.value}
        style={{ maxWidth: `${valueInPercent}%` }}
      />
    </div>
  );
});

export function renderProgress(params: GridRenderCellParams<any, number, any>) {
  if (params.value == null) {
    return '';
  }

  // If the aggregated value does not have the same unit as the other cell
  // Then we fall back to the default rendering based on `valueGetter` instead of rendering a progress bar.
  if (params.aggregation && !params.aggregation.hasCellUnit) {
    return null;
  }

  return <ProgressBar value={params.value} />;
}
