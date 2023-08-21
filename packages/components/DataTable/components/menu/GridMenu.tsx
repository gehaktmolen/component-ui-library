import * as React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { ClickAwayListener, ClickAwayListenerProps } from '../../../ClickAwayListener';
import { composeClasses, generateUtilityClass, HTMLElementType, useClassNamesOverride } from '../../../../utils';
import { Fade, FadeProps } from '../../../Fade';
import { Popper, PopperProps } from '../../../Popper';
// import type { DataGridProcessedProps } from '../../models/props/DataGridProps';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';

type MenuPosition =
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top'
    | undefined;

// type OwnerState = DataGridProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['z-10']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

export interface GridMenuProps extends Omit<PopperProps, 'onKeyDown' | 'children'> {
    open: boolean;
    target: HTMLElement | null;
    onClickAway: ClickAwayListenerProps['onClickAway'];
    position?: MenuPosition;
    onExited?: FadeProps['onExited'];
    children: React.ReactNode;
}

const transformOrigin = {
    'bottom-start': 'top left',
    'bottom-end': 'top right'
};

function GridMenu(props: GridMenuProps) {
    const { open, target, onClickAway, children, position, className, onExited, ...other } = props;
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();
    const classes = useUtilityClasses();

    React.useEffect(() => {
        // Emit menuOpen or menuClose events
        const eventName = open ? 'menuOpen' : 'menuClose';
        apiRef.current.publishEvent(eventName, { target });
    }, [apiRef, open, target]);

    const handleExited = (popperOnExited: (() => void) | undefined) => (node: HTMLElement) => {
        if (popperOnExited) {
            popperOnExited();
        }

        if (onExited) {
            onExited(node);
        }
    };

    return (
        <Popper
            as={rootProps.slots.basePopper}
            className={twMerge(className, classes.root)}
            ownerState={rootProps}
            open={open}
            anchorEl={target as any}
            transition
            placement={position}
            {...other}
            {...rootProps.slotProps?.basePopper}
        >
            {({ TransitionProps, placement }) => (
                <ClickAwayListener onClickAway={onClickAway} mouseEvent="onMouseDown">
                    <Fade
                        {...TransitionProps}
                        style={{ transformOrigin: transformOrigin[placement as keyof typeof transformOrigin] }}
                        onExited={handleExited(TransitionProps?.onExited)}
                    >
                        <div>{children}</div>
                    </Fade>
                </ClickAwayListener>
            )}
        </Popper>
    );
}

GridMenu.propTypes = {
    children: PropTypes.node,
    onClickAway: PropTypes.func.isRequired,
    onExited: PropTypes.func,
    /**
     * If `true`, the component is shown.
     */
    open: PropTypes.bool.isRequired,
    position: PropTypes.oneOf([
        'bottom-end',
        'bottom-start',
        'bottom',
        'left-end',
        'left-start',
        'left',
        'right-end',
        'right-start',
        'right',
        'top-end',
        'top-start',
        'top'
    ]),
    target: HTMLElementType
} as any;

export { GridMenu };
