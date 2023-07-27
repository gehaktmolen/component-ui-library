import * as React from 'react';
import { FormControlState } from '../FormControl';

export interface UseFormLabelParameters {
    /**
     * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    error?: boolean;
    onClick?: React.MouseEventHandler;
    rootRef?: React.Ref<HTMLLabelElement>;
    /**
     * If `true`, the `input` element is required.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    required?: boolean;
}

export interface UseFormLabelRootSlotOwnProps {
    onClick: React.MouseEventHandler | undefined;
}

export type UseFormLabelRootSlotProps<TOther = NonNullable<unknown>> = Omit<
    TOther,
    keyof UseFormLabelRootSlotOwnProps
> &
    UseFormLabelRootSlotOwnProps;

export interface UseFormLabelSlotOwnProps {
    ref: React.RefCallback<HTMLLabelElement> | null;
    required: boolean;
}

export type UseFormLabelSlotProps<TOther = NonNullable<unknown>> = Omit<TOther, keyof UseFormLabelSlotOwnProps> &
    UseFormLabelSlotOwnProps;

export interface UseFormLabelReturnValue {
    /**
     * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute.
     */
    error: boolean;
    /**
     * Return value from the `useFormControlContext` hook.
     */
    formControlContext: FormControlState | undefined;
    /**
     * Resolver for the root slot's props.
     * @param externalProps props for the root slot
     * @returns props that should be spread on the root slot
     */
    getRootProps: <TOther extends Record<string, any> = NonNullable<unknown>>(
        externalProps?: TOther
    ) => UseFormLabelRootSlotProps<TOther>;
    rootRef: React.RefCallback<HTMLLabelElement> | null;
    /**
     * If `true`, the `input` will indicate that it's required.
     */
    required: boolean;
}
