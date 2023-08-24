import type { GridPremiumIconSlotsComponent } from '../models';
import { GridWorkspacesIcon, GridGroupWorkIcon, GridFunctionsIcon } from './icons';

const iconsSlots: GridPremiumIconSlotsComponent = {
  ColumnMenuUngroupIcon: GridWorkspacesIcon,
  ColumnMenuGroupIcon: GridGroupWorkIcon,
  ColumnMenuAggregationIcon: GridFunctionsIcon,
};

const slots = {
  ...iconsSlots,
};

export default slots;
