import { MenuItem } from '../../../MenuItem';
import type { GridSlotsComponentsProps } from '../../models/gridSlotsComponentsProps';

export function SelectOption({ native, ...props }: NonNullable<GridSlotsComponentsProps['baseSelectOption']>) {
    if (native) {
        return <option {...props} />;
    }
    return <MenuItem {...props} />;
}
