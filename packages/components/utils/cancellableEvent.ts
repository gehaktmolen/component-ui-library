type CancellableEvent = {
    defaultPrevented?: boolean;
};

export default CancellableEvent;

export type CancellableEventHandler<Event> = (event: Event & CancellableEvent) => void;
