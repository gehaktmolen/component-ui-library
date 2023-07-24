import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface FormGroupClasses {
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

export type FormGroupClassKey = keyof FormGroupClasses;

export function getFormGroupUtilityClass(slot: string): string {
    return generateUtilityClass('', slot);
}

const formGroupClasses: FormGroupClasses = generateUtilityClasses('FormGroup', [
    'root',
    'disabled',
    'error',
    'filled',
    'focused',
    'required'
]);

export default formGroupClasses;
