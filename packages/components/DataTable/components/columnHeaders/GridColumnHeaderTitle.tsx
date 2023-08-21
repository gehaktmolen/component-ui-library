import * as React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
import { isOverflown } from '../../utils/domUtils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
// import { DataGridProcessedProps } from '../../models/props/DataGridProps';

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['text-ellipsis overflow-hidden whitespace-nowrap font-medium']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const ColumnHeaderInnerTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function ColumnHeaderInnerTitle(props, ref) {
        const { className, ...other } = props;
        const rootProps = useGridRootProps();
        const classes = useUtilityClasses();

        return <div ref={ref} className={twMerge(classes.root, className)} ownerState={rootProps} {...other} />;
    }
);

export interface GridColumnHeaderTitleProps {
    label: string;
    columnWidth: number;
    description?: React.ReactNode;
}

// No React.memo here as if we display the sort icon, we need to recalculate the isOver
function GridColumnHeaderTitle(props: GridColumnHeaderTitleProps) {
    const { label, description } = props;
    const rootProps = useGridRootProps();
    const titleRef = React.useRef<HTMLDivElement>(null);
    const [tooltip, setTooltip] = React.useState('');

    const handleMouseOver = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
        if (!description && titleRef?.current) {
            const isOver = isOverflown(titleRef.current);
            if (isOver) {
                setTooltip(label);
            } else {
                setTooltip('');
            }
        }
    }, [description, label]);

    return (
        <rootProps.slots.baseTooltip title={description || tooltip} {...rootProps.slotProps?.baseTooltip}>
            <ColumnHeaderInnerTitle onMouseOver={handleMouseOver} ref={titleRef}>
                {label}
            </ColumnHeaderInnerTitle>
        </rootProps.slots.baseTooltip>
    );
}

GridColumnHeaderTitle.propTypes = {
    columnWidth: PropTypes.number.isRequired,
    description: PropTypes.node,
    label: PropTypes.string.isRequired
} as any;

export { GridColumnHeaderTitle };
