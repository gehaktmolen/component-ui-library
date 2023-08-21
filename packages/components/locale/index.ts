import { TablePaginationProps } from '../TablePagination';

export interface Localization {
    components?: {
        AzrnTablePagination?: {
            defaultProps: Pick<TablePaginationProps, 'labelRowsPerPage' | 'labelDisplayedRows' | 'getItemAriaLabel'>;
        };
        // The core package has no dependencies on the @mui/lab components.
        // We can't use ComponentsPropsList, we have to duplicate and inline the definitions.
        AzrnPagination?: {
            defaultProps: NonNullable<unknown>;
            // defaultProps: Pick<ComponentsPropsList['MuiPagination'], 'aria-label' | 'getItemAriaLabel'>;
        };
    };
}

// default
export const enUS: Localization = {
    /*
  components: {
    AzrnTablePagination: { defaultProps: {
      getItemAriaLabel: (type) => {
        if (type === 'first') {
          return 'Go to first page';
        }
        if (type === 'last') {
          return 'Go to last page';
        }
        if (type === 'next') {
          return 'Go to next page';
        }
        // if (type === 'previous') {
        return 'Go to previous page';
      },
      labelRowsPerPage: 'Rows per page:',
      labelDisplayedRows: ({ from, to, count }) =>
  `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`,
    }},
    AzrnPagination: {  defaultProps: {
      'aria-label': 'Pagination navigation',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Go to '}page ${page}`;
        }
        if (type === 'first') {
          return 'Go to first page';
        }
        if (type === 'last') {
          return 'Go to last page';
        }
        if (type === 'next') {
          return 'Go to next page';
        }
        // if (type === 'previous') {
        return 'Go to previous page';
      },
    }},
  },
*/
};
