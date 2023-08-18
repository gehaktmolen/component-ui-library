export type CancellableEvent = {
    defaultPrevented?: boolean;
};

export type CancellableEventHandler<Event> = (event: Event & CancellableEvent) => void;
