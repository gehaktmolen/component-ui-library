import * as React from 'react';
import { PolymorphicComponent } from '../../utils';
import { TooltipProps, TooltipTypeMap } from './';

export const Tooltip = React.forwardRef(function Tabs<RootComponentType extends React.ElementType>(
    props: TooltipProps<RootComponentType>,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    forwardedRef: React.ForwardedRef<Element>
) {
    return <>{props.children}</>;
}) as PolymorphicComponent<TooltipTypeMap>;
