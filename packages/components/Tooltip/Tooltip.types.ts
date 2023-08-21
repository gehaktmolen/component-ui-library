import * as React from 'react';
import { PolymorphicProps } from '../../utils';

export interface TooltipOwnProps {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
}

export interface TooltipTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'div'
> {
    props: TooltipOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type TooltipProps<RootComponentType extends React.ElementType = TooltipTypeMap['defaultComponent']> =
    PolymorphicProps<TooltipTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;
