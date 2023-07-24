import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface InputAdornmentClasses {
    /** Class applied to the root element. */
    root: string;
    /** State class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** State class applied to the root element if `error={true}`. */
    error: string;
    /** State class applied to the root element if the inner input has value. */
    filled: string;
    /** State class applied to the root element if the inner input is focused. */
    focused: string;
    /** State class applied to the root element if `required={true}`. */
    required: string;
}

export type InputAdornmentClassKey = keyof InputAdornmentClasses;

export function getInputAdornmentUtilityClass(slot: string): string {
    return generateUtilityClass('', slot);
}

const inputAdornmentClasses: InputAdornmentClasses = generateUtilityClasses('InputAdornment', [
    'root',
    'disabled',
    'error',
    'filled',
    'focused',
    'required'
]);

export default inputAdornmentClasses;
