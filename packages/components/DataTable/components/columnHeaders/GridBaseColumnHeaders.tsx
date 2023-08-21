import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';

const useUtilityClasses = () => {
    const slots = {
        root: [
            'relative overflow-hidden flex items-center box-border border-b border-solid border-gray-200 rounded-tl rounded-tr'
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
