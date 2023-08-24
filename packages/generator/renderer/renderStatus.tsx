import * as React from 'react';
import { Chip } from '../../components/Chip';
import { GridRenderCellParams } from '../../components/DataTablePremium';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../utils';

const useUtilityClasses = (props) => {
    const { status } = props;

    const slots = {
        root: [
            'w-full',
            status === 'Rejected' && 'text-primary-100',
            status === 'Open' && 'text-primary-200',
            status === 'PartiallyFilled' && 'text-primary-400',
            status === 'Filled' && 'text-primary-600'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

interface StatusProps {
    status: string;
}

const Status = React.memo((props: StatusProps) => {
    const { status } = props;
    const classes = useUtilityClasses(status);

    let label: string = status;
    if (status === 'PartiallyFilled') {
        label = 'Partially Filled';
    }

    return <Chip className={classes.root} size="small" label={label} variant="outlined" />;
});

export function renderStatus(params: GridRenderCellParams<any, string>) {
    if (params.value == null) {
        return '';
    }

    return <Status status={params.value} />;
}
