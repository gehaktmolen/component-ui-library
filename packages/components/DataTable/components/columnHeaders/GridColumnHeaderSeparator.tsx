import * as React from 'react';
import PropTypes from 'prop-types';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';

enum GridColumnHeaderSeparatorSides {
    Left = 'left',
    Right = 'right'
}

export interface GridColumnHeaderSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    resizable: boolean;
    resizing: boolean;
    height: number;
    side?: GridColumnHeaderSeparatorSides;
}

type OwnerState = GridColumnHeaderSeparatorProps & {
    classes?: DataGridProcessedProps['classes'];
};

const useUtilityClasses = (ownerState: OwnerState) => {
    const { resizable, resizing, side } = ownerState;

    const slots = {
        root: [
            'columnSeparator',
            resizable && 'columnSeparator--resizable',
            resizing && 'columnSeparator--resizing',
            side && `columnSeparator--side${side}`
        ],
        icon: ['iconSeparator']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

function GridColumnHeaderSeparatorRaw(props: GridColumnHeaderSeparatorProps) {
    const { resizable, resizing, height, side = GridColumnHeaderSeparatorSides.Right, ...other } = props;
    const rootProps = useGridRootProps();
    const ownerState = { ...props, side, classes: rootProps.classes };
    const classes = useUtilityClasses(ownerState);

    const stopClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
            className={classes.root}
            style={{ minHeight: height, opacity: rootProps.showColumnVerticalBorder ? 0 : 1 }}
            {...other}
            onClick={stopClick}
        >
            <rootProps.slots.columnResizeIcon className={classes.icon} />
        </div>
    );
}

const GridColumnHeaderSeparator = React.memo(GridColumnHeaderSeparatorRaw);

GridColumnHeaderSeparatorRaw.propTypes = {
    height: PropTypes.number.isRequired,
    resizable: PropTypes.bool.isRequired,
    resizing: PropTypes.bool.isRequired,
    side: PropTypes.oneOf(['left', 'right'])
} as any;

export { GridColumnHeaderSeparator, GridColumnHeaderSeparatorSides };
