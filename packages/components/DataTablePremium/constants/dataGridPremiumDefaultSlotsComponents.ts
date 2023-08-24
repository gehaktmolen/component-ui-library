import { DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS } from '../../DataTablePro/internals';
import type { GridPremiumSlotsComponent } from '../models';
import { GridPremiumColumnMenu } from '../components/GridPremiumColumnMenu';
import materialSlots from '../azrn';

export const DATA_GRID_PREMIUM_DEFAULT_SLOTS_COMPONENTS: GridPremiumSlotsComponent = {
    ...DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS,
    ...materialSlots,
    ColumnMenu: GridPremiumColumnMenu
};
