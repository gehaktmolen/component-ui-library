import * as React from 'react';
import { PolymorphicComponent } from '../../utils';
import { TooltipProps, TooltipTypeMap } from './';

export const Tooltip = React.forwardRef(function Tabs<RootComponentType extends React.ElementType>(
    props: TooltipProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    console.log(props, forwardedRef);
    return <></>;
}) as PolymorphicComponent<TooltipTypeMap>;
