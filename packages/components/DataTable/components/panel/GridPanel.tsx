import * as React from 'react';
import PropTypes from 'prop-types';
import { ClickAwayListener } from '../../../ClickAwayListener';
import { Popper } from '../../../Popper';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { isEscapeKey } from '../../utils/keyboardUtils';
// import type { DataGridProcessedProps } from '../../models/props/DataGridProps';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../../utils';
import { Simplify } from '../../../../types';

// type OwnerState = DataGridProcessedProps;

export interface GridPanelClasses {
    /** Styles applied to the root element. */
    panel: string;
    /** Styles applied to the paper element. */
    paper: string;
}

export interface GridPanelProps extends Partial<React.ComponentProps<any>> {
    children?: React.ReactNode;
    className?: string;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<GridPanelClasses>;
    open: boolean;
}

export type GridPanelOwnerState = Simplify<GridPanelProps & NonNullable<unknown>>;

function useUtilityClasses(ownerState: GridPanelOwnerState) {
    const { open } = ownerState;
    const slots = {
        root: ['z-10', open && ''],
        paper: ['min-w-[300px] max-h-[450px] flex', 'bg-gray-100 dark:bg-gray-900']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
}

const GridPanel = React.forwardRef<HTMLDivElement, GridPanelProps>((props, ref) => {
    const { children, className, classes: classesProp, ...other } = props;
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();

    // const classes = gridPanelClasses;
    const [isPlaced, setIsPlaced] = React.useState(false);

    const ownerState: GridPanelOwnerState = { ...props };
    const classes = useUtilityClasses(ownerState);

    const handleClickAway = React.useCallback(() => {
        apiRef.current.hidePreferences();
    }, [apiRef]);

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent) => {
            if (isEscapeKey(event.key)) {
                apiRef.current.hidePreferences();
            }
        },
        [apiRef]
    );

    const modifiers = React.useMemo(
        () => [
            {
                name: 'flip',
                enabled: false
            },
            {
                name: 'isPlaced',
                enabled: true,
                phase: 'main' as const,
                fn: () => {
                    setIsPlaced(true);
                },
                effect: () => () => {
                    setIsPlaced(false);
                }
            }
        ],
        []
    );

    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

    React.useEffect(() => {
        const columnHeadersElement = apiRef.current.rootElementRef?.current?.querySelector('.columnHeaders');

        if (columnHeadersElement) {
            setAnchorEl(columnHeadersElement);
        }
    }, [apiRef]);

    if (!anchorEl) {
        return null;
    }

    return (
        <Popper
            ref={ref}
            placement="bottom-start"
            className={classes.root}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            /* @ts-ignore */
            ownerState={rootProps}
            anchorEl={anchorEl}
            modifiers={modifiers}
            {...other}
        >
            <ClickAwayListener mouseEvent="onMouseUp" onClickAway={handleClickAway}>
                <div
                    className={classes.paper}
                    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                    /* @ts-ignore */
                    ownerState={rootProps}
                    onKeyDown={handleKeyDown}
                >
                    {isPlaced && children}
                </div>
            </ClickAwayListener>
        </Popper>
    );
});

GridPanel.propTypes = {
    /**
     * Popper render function or node.
     */
    children: PropTypes.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object,
    /**
     * If `true`, the component is shown.
     */
    open: PropTypes.bool.isRequired,
    ownerState: PropTypes.object
} as any;

export { GridPanel };
