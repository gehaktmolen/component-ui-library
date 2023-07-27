import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface FormLabelClasses {
    /** Class applied to the root element. */
    root: string;
    /** State class applied to the root element if `error={true}`. */
    error: string;
    /** State class applied to the root element if `required={true}`. */
    required: string;
}

export type FormLabelClassKey = keyof FormLabelClasses;

export function getFormLabelUtilityClass(slot: string): string {
    return generateUtilityClass('', slot);
}

const formLabelClasses: FormLabelClasses = generateUtilityClasses('FormLabel', ['root', 'error', 'required']);

export default formLabelClasses;
