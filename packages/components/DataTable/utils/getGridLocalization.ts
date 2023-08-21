import { Localization as CoreLocalization } from '../../locale';
import { GridLocaleText } from '../models/api/gridLocaleTextApi';

export interface Localization {
    components: {
        AzrnDataGrid: {
            defaultProps: {
                localeText: Partial<GridLocaleText>;
            };
        };
    };
}

export const getGridLocalization = (
    gridTranslations: Partial<GridLocaleText>,
    coreTranslations?: CoreLocalization
): Localization => ({
    components: {
        AzrnDataGrid: {
            defaultProps: {
                localeText: {
                    ...gridTranslations,
                    AzrnTablePagination: coreTranslations?.components?.AzrnTablePagination?.defaultProps || {}
                }
            }
        }
    }
});
