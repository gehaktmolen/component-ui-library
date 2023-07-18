import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface ButtonClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `button` element if `active={true}`. */
  active: string;
  /** State class applied to the root `button` element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root `button` element if `focusVisible={true}`. */
  focusVisible: string;
}

export type ButtonClassKey = keyof ButtonClasses;

export function getButtonUtilityClass(slot: string): string {
  return generateUtilityClass('', slot, '');
}

export const buttonClasses: ButtonClasses = generateUtilityClasses('Button', [
  'root',
  'active',
  'disabled',
  'focusVisible',
]);
