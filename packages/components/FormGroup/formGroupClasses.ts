import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface FormGroupClasses {
    /** Class applied to the root element. */
    root: string;
    /** State class applied to the root element if `error={true}`. */
    error: string;
}

export type FormGroupClassKey = keyof FormGroupClasses;

export function getFormGroupUtilityClass(slot: string): string {
    return generateUtilityClass('', slot);
}

const formGroupClasses: FormGroupClasses = generateUtilityClasses('FormGroup', ['root', 'error']);

export default formGroupClasses;
