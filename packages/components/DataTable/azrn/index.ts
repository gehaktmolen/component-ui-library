import { CheckBox } from '../../CheckBox';
import { Input } from '../../Input';
import { FormControl } from '../../FormControl';
import { Select } from '../../Select';
import { Toggle } from '../../Toggle';
import { Button } from '../../Button';
import { IconButton } from '../../IconButton';
import { Tooltip } from '../../Tooltip';
import { Popper } from '../../Popper';
import { FormLabel } from '../../FormLabel';
import { Chip } from '../../Chip';
import { GridColumnUnsortedIcon } from './icons/GridColumnUnsortedIcon';
import {
    GridAddIcon,
    GridArrowDownwardIcon,
    GridArrowUpwardIcon,
    GridCheckIcon,
    GridCloseIcon,
    GridColumnIcon,
    GridDragIcon,
    GridExpandMoreIcon,
    GridFilterAltIcon,
    GridFilterListIcon,
    GridKeyboardArrowRight,
    GridMoreVertIcon,
    GridRemoveIcon,
    GridSaveAltIcon,
    GridSearchIcon,
    GridSeparatorIcon,
    GridTableRowsIcon,
    GridTripleDotsVerticalIcon,
    GridViewHeadlineIcon,
    GridViewStreamIcon,
    GridVisibilityOffIcon,
    GridViewColumnIcon,
    GridClearIcon,
    GridLoadIcon,
    GridDeleteForeverIcon
} from './icons';
import type { GridIconSlotsComponent } from '../models';
import type { GridBaseSlots } from '../models/gridSlotsComponent';
import { SelectOption } from './components/SelectOption';

const iconSlots: GridIconSlotsComponent = {
    BooleanCellTrueIcon: GridCheckIcon,
    BooleanCellFalseIcon: GridCloseIcon,
    ColumnMenuIcon: GridTripleDotsVerticalIcon,
    OpenFilterButtonIcon: GridFilterListIcon,
    FilterPanelDeleteIcon: GridCloseIcon,
    ColumnFilteredIcon: GridFilterAltIcon,
    ColumnSelectorIcon: GridColumnIcon,
    ColumnUnsortedIcon: GridColumnUnsortedIcon,
    ColumnSortedAscendingIcon: GridArrowUpwardIcon,
    ColumnSortedDescendingIcon: GridArrowDownwardIcon,
    ColumnResizeIcon: GridSeparatorIcon,
    DensityCompactIcon: GridViewHeadlineIcon,
    DensityStandardIcon: GridTableRowsIcon,
    DensityComfortableIcon: GridViewStreamIcon,
    ExportIcon: GridSaveAltIcon,
    MoreActionsIcon: GridMoreVertIcon,
    TreeDataCollapseIcon: GridExpandMoreIcon,
    TreeDataExpandIcon: GridKeyboardArrowRight,
    GroupingCriteriaCollapseIcon: GridExpandMoreIcon,
    GroupingCriteriaExpandIcon: GridKeyboardArrowRight,
    DetailPanelExpandIcon: GridAddIcon,
    DetailPanelCollapseIcon: GridRemoveIcon,
    RowReorderIcon: GridDragIcon,
    QuickFilterIcon: GridSearchIcon,
    QuickFilterClearIcon: GridCloseIcon,
    ColumnMenuHideIcon: GridVisibilityOffIcon,
    ColumnMenuSortAscendingIcon: GridArrowUpwardIcon,
    ColumnMenuSortDescendingIcon: GridArrowDownwardIcon,
    ColumnMenuFilterIcon: GridFilterAltIcon,
    ColumnMenuManageColumnsIcon: GridViewColumnIcon,
    ColumnMenuClearIcon: GridClearIcon,
    LoadIcon: GridLoadIcon,
    FilterPanelAddIcon: GridAddIcon,
    FilterPanelRemoveAllIcon: GridDeleteForeverIcon,
    ColumnReorderIcon: GridDragIcon
};

const slots: GridBaseSlots & GridIconSlotsComponent = {
    ...iconSlots,
    BaseCheckBox: CheckBox,
    BaseInput: Input,
    BaseFormControl: FormControl,
    BaseSelect: Select,
    BaseToggle: Toggle,
    BaseButton: Button,
    BaseIconButton: IconButton,
    BaseTooltip: Tooltip,
    BasePopper: Popper,
    BaseFormLabel: FormLabel,
    BaseSelectOption: SelectOption,
    BaseChip: Chip
};

export default slots;
