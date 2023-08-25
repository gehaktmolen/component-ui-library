import * as React from 'react';
import { ListState } from './List.types';

const ListContext = React.createContext<ListState | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
    ListContext.displayName = 'ListContext';
}

export default ListContext;
