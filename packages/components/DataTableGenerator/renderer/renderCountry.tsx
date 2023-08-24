import * as React from 'react';
import { GridRenderCellParams } from '../../DataTablePremium';
import { CountryIsoOption } from '../services/static-data';

interface CountryProps {
  value: CountryIsoOption;
}

const Country = React.memo(function Country(props: CountryProps) {
  const { value } = props;

  return (
    <div className="w-full flex items-center">
      <img
          className="mr-0.5 flex-shrink-0 w-[20px]"
        loading="lazy"
        width="20"
        src={`https://flagcdn.com/w20/${value.code.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w40/${value.code.toLowerCase()}.png 2x`}
        alt=""
      />
      <span className="overflow-hidden text-ellipsis">
        {value.label}
      </span>
    </div>
  );
});

export function renderCountry(params: GridRenderCellParams<CountryIsoOption, any, any>) {
  if (params.value == null) {
    return '';
  }

  // If the aggregated value does not have the same unit as the other cell
  // Then we fall back to the default rendering based on `valueGetter` instead of rendering the total price UI.
  if (params.aggregation && !params.aggregation.hasCellUnit) {
    return null;
  }

  return <Country value={params.value} />;
}
