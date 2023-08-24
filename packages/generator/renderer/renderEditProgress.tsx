import * as React from 'react';
import { GridRenderEditCellParams, useGridApiContext } from '../../components/DataTablePremium';
import { Slider, SliderProps } from '../../components/Slider';
import { Tooltip } from '../../components/Tooltip';
import { composeClasses, debounce, generateUtilityClass, useClassNamesOverride } from '../../utils';

const useUtilityClasses = (props) => {
    const { valueState } = props;

    const slots = {
        root: [
            'w-full',
            valueState < 0.3 && 'text-primary-500',
            valueState >= 0.3 && valueState <= 0.7 && 'text-danger-500',
            valueState > 0.7 && 'text-success-200'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

function ValueLabelComponent(props: any) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

function EditProgress(props: GridRenderEditCellParams<any, number>) {
    const { id, value, field } = props;
    const [valueState, setValueState] = React.useState(Number(value));
    const classes = useUtilityClasses(valueState);

    const apiRef = useGridApiContext();

    const updateCellEditProps = React.useCallback(
        (newValue: number) => {
            apiRef.current.setEditCellValue({ id, field, value: newValue });
        },
        [apiRef, field, id]
    );

    const debouncedUpdateCellEditProps = React.useMemo(() => debounce(updateCellEditProps, 60), [updateCellEditProps]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValueState(newValue as number);
        debouncedUpdateCellEditProps(newValue as number);
    };

    React.useEffect(() => {
        setValueState(Number(value));
    }, [value]);

    const handleRef: SliderProps['ref'] = (element) => {
        if (element) {
            element.querySelector<HTMLElement>('[type="range"]')!.focus();
        }
    };

    return (
        <Slider
            ref={handleRef}
            value={valueState}
            max={1}
            step={0.00001}
            slots={{ valueLabel: ValueLabelComponent }}
            onChange={handleChange}
            className={classes.root}
            valueLabelFormat={(newValue) => `${(newValue * 100).toLocaleString()} %`}
        />
    );
}

export function renderEditProgress(params: GridRenderEditCellParams<any, number>) {
    return <EditProgress {...params} />;
}
