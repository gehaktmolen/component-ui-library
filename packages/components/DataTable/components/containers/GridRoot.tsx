import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import {
    useForkRef,
    useEnhancedEffect,
    composeClasses,
    useClassNamesOverride,
    generateUtilityClass
} from '../../../../utils';
import { GridRootContainerRef } from '../../models/gridRootContainerRef';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { useGridPrivateApiContext } from '../../hooks/utils/useGridPrivateApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { gridDensityValueSelector } from '../../hooks/features/density/densitySelector';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';
import { GridDensity } from '../../models/gridDensity';
import { useGridAriaAttributes } from '../../hooks/utils/useGridAriaAttributes';

export interface GridRootProps extends React.HTMLAttributes<HTMLDivElement> {}

type OwnerState = DataGridProcessedProps & {
    density: GridDensity;
};

const useUtilityClasses = (ownerState: OwnerState) => {
    const { autoHeight, density } = ownerState;

    const slots = {
        root: [
            'root', // TODO: Convert GridRootStyles.ts to tailwind.
            autoHeight && 'autoHeight',
            `root--density${density}`,
            'withBorderColor'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const GridRoot = React.forwardRef<HTMLDivElement, GridRootProps>(function GridRoot(props, ref) {
    const rootProps = useGridRootProps();
    const { children, className, ...other } = props;
    const apiRef = useGridPrivateApiContext();
    const densityValue = useGridSelector(apiRef, gridDensityValueSelector);
    const rootContainerRef: GridRootContainerRef = React.useRef<HTMLDivElement>(null);
    const handleRef = useForkRef(rootContainerRef, ref);

    const getAriaAttributes = rootProps.experimentalFeatures?.ariaV7 // ariaV7 should never change
        ? null
        : useGridAriaAttributes;
    const ariaAttributes = typeof getAriaAttributes === 'function' ? getAriaAttributes() : null;

    const ownerState = {
        ...rootProps,
        density: densityValue
    };

    const classes = useUtilityClasses(ownerState);

    apiRef.current.register('public', { rootElementRef: rootContainerRef });

    // Our implementation of <NoSsr />
    const [mountedState, setMountedState] = React.useState(false);
    useEnhancedEffect(() => {
        setMountedState(true);
    }, []);

    if (!mountedState) {
        return null;
    }

    return (
        <div
            ref={handleRef}
            className={twMerge(className, classes.root)}
            ownerState={ownerState}
            {...ariaAttributes}
            {...other}
        >
            {children}
        </div>
    );
});

export { GridRoot };
