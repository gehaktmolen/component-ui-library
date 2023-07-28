export type GlobalStateSlot =
    | 'active'
    | 'checked'
    | 'completed'
    | 'disabled'
    | 'readOnly'
    | 'error'
    | 'expanded'
    | 'focused'
    | 'focusVisible'
    | 'required'
    | 'selected';

const globalStateClassesMapping: Record<GlobalStateSlot, string> = {
    active: 'active',
    checked: 'checked',
    completed: 'completed',
    disabled: 'disabled',
    readOnly: 'readOnly',
    error: 'error',
    expanded: 'expanded',
    focused: 'focused',
    focusVisible: 'focusVisible',
    required: 'required',
    selected: 'selected'
};

export default function generateUtilityClass(slot: string): string {
    const globalStateClass = globalStateClassesMapping[slot as GlobalStateSlot];
    return globalStateClass ? globalStateClass : slot;
}
