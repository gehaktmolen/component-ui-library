import { AzrnBaseEvent, AzrnEvent } from '../muiEvent';
import { GridCallbackDetails } from '../api/gridCallbackDetails';
import { GridEventLookup, GridEvents } from './gridEventLookup';

export type GridEventListener<E extends GridEvents> = (
    params: GridEventLookup[E] extends { params: any } ? GridEventLookup[E]['params'] : undefined,
    event: GridEventLookup[E] extends { event: AzrnBaseEvent } ? AzrnEvent<GridEventLookup[E]['event']> : AzrnEvent<{}>,
    details: GridCallbackDetails
) => void;
