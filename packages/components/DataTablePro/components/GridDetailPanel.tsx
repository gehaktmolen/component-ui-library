import * as React from 'react';
import { GridRowId } from '../../DataTable';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { useGridPrivateApiContext } from '../hooks/utils/useGridPrivateApiContext';
// import { DataGridProProcessedProps } from '../models/dataGridProProps';
import { composeClasses, generateUtilityClass, useClassNamesOverride } from '../../../utils';

// type OwnerState = DataGridProProcessedProps;

const useUtilityClasses = () => {
    const slots = {
        root: ['z-20 w-full absolute bg-white overflow-auto']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

interface GridDetailPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The panel height.
     */
    height: number | 'auto';
    /**
     * The row ID that this panel belongs to.
     */
    rowId: GridRowId;
}

function GridDetailPanel(props: GridDetailPanelProps) {
    const { rowId, height, style: styleProp = {}, ...other } = props;
    const apiRef = useGridPrivateApiContext();
    const ref = React.useRef<HTMLDivElement>();
    const rootProps = useGridRootProps();
    const ownerState = rootProps;
    const classes = useUtilityClasses();

    React.useLayoutEffect(() => {
        if (height === 'auto' && typeof ResizeObserver === 'undefined') {
            // Fallback for IE
            apiRef.current.storeDetailPanelHeight(rowId, ref.current!.clientHeight);
        }
    }, [apiRef, height, rowId]);

    React.useLayoutEffect(() => {
        const hasFixedHeight = height !== 'auto';
        if (hasFixedHeight || typeof ResizeObserver === 'undefined') {
            return undefined;
        }

        const resizeObserver = new ResizeObserver((entries) => {
            const [entry] = entries;
            const observedHeight =
                entry.borderBoxSize && entry.borderBoxSize.length > 0
                    ? entry.borderBoxSize[0].blockSize
                    : entry.contentRect.height;

            apiRef.current.storeDetailPanelHeight(rowId, observedHeight);
        });

        resizeObserver.observe(ref.current!);

        return () => resizeObserver.disconnect();
    }, [apiRef, height, rowId]);

    const style = { ...styleProp, height };

    return <div ref={ref} className={classes.root} ownerState={ownerState} style={style} {...other} />;
}

export { GridDetailPanel };
