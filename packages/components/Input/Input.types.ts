import * as React from 'react';
import { Simplify, OverridableStringUnion } from '../../types';
import { FormControlState } from '../FormControl';
import { UseInputParameters, UseInputRootSlotProps } from '../useInput';
import { PolymorphicProps, SlotComponentProps } from '../utils';
import { ColorPaletteProp, VariantProp } from '../utils';

export interface InputRootSlotPropsOverrides {}
export interface InputSlotPropsOverrides {}
export interface InputPropsColorOverrides {}
export interface InputPropsVariantOverrides {}
export interface InputPropsSizeOverrides {}

export interface SingleLineInputProps {
    /**
     * Maximum number of rows to display when multiline option is set to true.
     */
    maxRows?: undefined;
    /**
     * Minimum number of rows to display when multiline option is set to true.
     */
    minRows?: undefined;
    /**
     * If `true`, a `textarea` element is rendered.
     * @default false
     */
    multiline?: false;
    /**
     * Number of rows to display when multiline option is set to true.
     */
    rows?: undefined;
    /**
     * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
     * @default 'text'
     */
    type?: React.HTMLInputTypeAttribute;
}

export interface MultiLineInputProps {
    /**
     * Maximum number of rows to display when multiline option is set to true.
     */
    maxRows?: number;
    /**
     * Minimum number of rows to display when multiline option is set to true.
     */
    minRows?: number;
    /**
     * If `true`, a `textarea` element is rendered.
     * @default false
     */
    multiline: true;
    /**
     * Number of rows to display when multiline option is set to true.
     */
    rows?: number;
    /**
     * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
     * @default 'text'
     */
    type?: undefined;
}

export type InputOwnProps = (SingleLineInputProps | MultiLineInputProps) &
    Omit<UseInputParameters, 'error'> & {
        'aria-describedby'?: string;
        'aria-label'?: string;
        'aria-labelledby'?: string;
        /**
         * This prop helps users to fill forms faster, especially on mobile devices.
         * The name can be confusing, as it's more like an autofill.
         * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
         */
        autoComplete?: string;
        /**
         * If `true`, the `input` element is focused during the first mount.
         */
        autoFocus?: boolean;
        /**
         * If `true`, the button will take up the full width of its container.
         * @default true
         */
        block?: boolean;
        /**
         * Class name applied to the root element.
         */
        className?: string;
        /**
         * The color of the component.
         * @default 'neutral'
         */
        color?: OverridableStringUnion<ColorPaletteProp, InputPropsColorOverrides>;
        /**
         * Trailing add on for this input.
         */
        endAddOn?: React.ReactNode;
        /**
         * Trailing adornment for this input.
         */
        endDecorator?: React.ReactNode;
        /**
         * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `Azrn-error` class on the root element.
         * The prop defaults to the value (`false`) inherited from the parent FormControl component.
         */
        error?: boolean;
        /**
         * The id of the `input` element.
         */
        id?: string;
        /**
         * Name attribute of the `input` element.
         */
        name?: string;
        onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
        onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
        /**
         * The short hint displayed in the `input` before the user enters a value.
         */
        placeholder?: string;
        /**
         * It prevents the user from changing the value of the field
         * (not from interacting with the field).
         */
        readOnly?: boolean;
        /**
         * The props used for each slot inside the Input.
         * @default {}
         */
        slotProps?: {
            root?: SlotComponentProps<'div', InputRootSlotPropsOverrides, InputOwnerState>;
            input?: SlotComponentProps<'input', InputSlotPropsOverrides, InputOwnerState>;
        };
        /**
         * The components used for each slot inside the InputBase.
         * Either a string to use a HTML element or a component.
         * @default {}
         */
        slots?: InputSlots;
        /**
         * The size of the component.
         * @default 'md'
         */
        size?: OverridableStringUnion<'sm' | 'md' | 'lg', InputPropsSizeOverrides>;
        /**
         * Leading add on for this input.
         */
        startAddOn?: React.ReactNode;
        /**
         * Leading adornment for this input.
         */
        startDecorator?: React.ReactNode;
        /**
         * The value of the `input` element, required for a controlled component.
         */
        value?: unknown;
        /**
         * The variant to use.
         * @default 'solid'
         */
        variant?: OverridableStringUnion<VariantProp, InputPropsVariantOverrides>;
    };

export interface InputSlots {
    /**
     * The component that renders the root.
     * @default 'div'
     */
    root?: React.ElementType;
    /**
     * The component that renders the input.
     * @default 'input'
     */
    input?: React.ElementType;
    /**
     * The component that renders the textarea.
     * @default 'textarea'
     */
    textarea?: React.ElementType;
}

export interface InputTypeMap<
    AdditionalProps = NonNullable<unknown>,
    RootComponentType extends React.ElementType = 'div'
> {
    props: InputOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}

export type InputProps<RootComponentType extends React.ElementType = InputTypeMap['defaultComponent']> =
    PolymorphicProps<InputTypeMap<NonNullable<unknown>, RootComponentType>, RootComponentType>;

export type InputOwnerState = Simplify<
    InputOwnProps & {
        formControlContext: FormControlState | undefined;
        focused: boolean;
        type: React.InputHTMLAttributes<HTMLInputElement>['type'] | undefined;
    }
>;

export type InputRootSlotProps = Simplify<
    UseInputRootSlotProps & {
        ownerState: InputOwnerState;
        className?: string;
        children?: React.ReactNode;
        ref?: React.Ref<HTMLDivElement>;
    }
>;

export type InputSlotProps = Simplify<
    Omit<UseInputRootSlotProps, 'onClick'> & {
        'aria-describedby': React.AriaAttributes['aria-describedby'];
        'aria-label': React.AriaAttributes['aria-label'];
        'aria-labelledby': React.AriaAttributes['aria-labelledby'];
        autoComplete: string | undefined;
        autoFocus: boolean | undefined;
        className?: string;
        id: string | undefined;
        name: string | undefined;
        onKeyDown: React.KeyboardEventHandler<HTMLInputElement> | undefined;
        onKeyUp: React.KeyboardEventHandler<HTMLInputElement> | undefined;
        ownerState: InputOwnerState;
        placeholder: string | undefined;
        readOnly: boolean | undefined;
        ref: React.Ref<HTMLInputElement>;
        type: React.HTMLInputTypeAttribute | undefined;
    }
>;
