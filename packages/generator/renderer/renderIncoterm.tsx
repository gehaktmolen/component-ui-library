import * as React from 'react';
import { Tooltip } from '../../components/Tooltip';
import { GridRenderCellParams } from '../../components/DataTable';

interface IncotermProps {
    value: string | null | undefined;
}

const Incoterm = React.memo(function Incoterm(props: IncotermProps) {
    const { value } = props;

    if (!value) {
        return null;
    }

    const valueStr = value.toString();
    const tooltip = valueStr.slice(valueStr.indexOf('(') + 1, valueStr.indexOf(')'));
    const code = valueStr.slice(0, valueStr.indexOf('(')).trim();

    return (
        <div className="flex items-center justify-between">
            <span>{code}</span>
            <Tooltip title={tooltip}>info icon</Tooltip>
        </div>
    );
});

export function renderIncoterm(params: GridRenderCellParams<any, string | null, any>) {
    return <Incoterm value={params.value} />;
}
