import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface IconClasses {
    /** Class name applied to the root element. */
    root: string;
    /** State class applied to the root `button` element if `active={true}`. */
    active: string;
    /** State class applied to the root `button` element if `disabled={true}`. */
    disabled: string;
    /** State class applied to the root `button` element if `focusVisible={true}`. */
    focusVisible: string;
}

export type IconClassKey = keyof IconClasses;

// Todo: We use module css now, so we don't need to generate utility classes like this.

export function getIconUtilityClass(slot: string): string {
    return generateUtilityClass('', slot, '');
}

export const iconClasses: IconClasses = generateUtilityClasses('Icon', ['root', 'active', 'disabled', 'focusVisible']);
