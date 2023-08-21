import * as React from 'react';

export type AzrnBaseEvent = React.SyntheticEvent<HTMLElement> | DocumentEventMap[keyof DocumentEventMap] | {};

export type AzrnEvent<E extends AzrnBaseEvent = AzrnBaseEvent> = E & {
    defaultAzrnPrevented?: boolean;
};
