import * as React from 'react';
import { EventHandlers } from '../utils';

export interface UseIconRootSlotOwnProps {
  'aria-hidden'?: React.AriaAttributes['aria-hidden'];
  ref: React.RefCallback<Element> | null;
}

export type UseIconRootSlotProps<TOther = NonNullable<unknown>> = TOther & UseIconRootSlotOwnProps;

export interface UseIconParameters {
  rootRef?: React.Ref<Element>;
}

export interface UseIconReturnValue {
  /**
   * Resolver for the root slot's props.
   * @param otherHandlers event handlers for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <TOther extends EventHandlers = NonNullable<unknown>>(otherHandlers?: TOther) => UseIconRootSlotProps<TOther>;
  /**
   * A ref to the component's root DOM element.
   */
  rootRef: React.RefCallback<Element> | null;
}
