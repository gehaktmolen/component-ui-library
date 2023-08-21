import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { composeClasses } from '../../../../utils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { generateUtilityClass, useClassNamesOverride } from '../../../../utils';

const useUtilityClasses = (overflowedContent: boolean) => {
    const slots = {
        root: ['virtualScrollerContent', overflowedContent && 'virtualScrollerContent--overflowed']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const GridVirtualScrollerContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function GridVirtualScrollerContent(props, ref) {
        const rootProps = useGridRootProps();
        const overflowedContent = !rootProps.autoHeight && props.style?.minHeight === 'auto';
        const classes = useUtilityClasses(overflowedContent);

        return <div ref={ref} {...props} ownerState={rootProps} className={twMerge(classes.root, props.className)} />;
    }
);

export { GridVirtualScrollerContent };
