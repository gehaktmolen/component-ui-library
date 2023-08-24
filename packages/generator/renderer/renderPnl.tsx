import * as React from 'react';
import { GridRenderCellParams } from '../../components/DataTable';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../utils';

const useUtilityClasses = (props) => {
    const { value } = props;

    const slots = {
        root: ['w-full', value > 0 && 'text-primary-500', value < 0 && 'text-danger-500']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

function pnlFormatter(value: number) {
    return value < 0 ? `(${Math.abs(value).toLocaleString()})` : value.toLocaleString();
}

interface PnlProps {
    value: number;
}

const Pnl = React.memo(function Pnl(props: PnlProps) {
    const { value } = props;
    const classes = useUtilityClasses(value);

    return <div className={classes.root}>{pnlFormatter(value)}</div>;
});

export function renderPnl(params: GridRenderCellParams<any, number, any>) {
    if (params.value == null) {
        return '';
    }

    return <Pnl value={params.value} />;
}
