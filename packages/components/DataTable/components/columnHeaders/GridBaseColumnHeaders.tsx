import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';

const useUtilityClasses = () => {
    const slots = {
        root: [
            'baseColumnHeaders',
            'relative overflow-hidden flex items-center box-border border border-l-0 border-t-0 border-r-0 rounded-tl-lg rounded-tr-lg',
            'border-primary-500'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

interface GridBaseColumnHeadersProps extends React.HTMLAttributes<HTMLDivElement> {}

export const GridBaseColumnHeaders = React.forwardRef<HTMLDivElement, GridBaseColumnHeadersProps>(
    function GridColumnHeaders(props, ref) {
        const { className, ...other } = props;
        const rootProps = useGridRootProps();

        const classes = useUtilityClasses();

        return (
            <div
                ref={ref}
                className={twMerge(className, classes.root)}
                ownerState={rootProps}
                {...other}
                role="presentation"
            />
        );
    }
);
