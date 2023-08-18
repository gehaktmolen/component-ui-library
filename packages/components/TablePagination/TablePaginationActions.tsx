import * as React from 'react';
import { useSlotProps } from '../../utils';
import type { PolymorphicComponent, WithOptionalOwnerState } from '../../utils';
import type {
    TablePaginationActionsButtonSlotProps,
    TablePaginationActionsProps,
    TablePaginationActionsRootSlotProps,
    TablePaginationActionsTypeMap
} from './TablePaginationActions.types';
import type { ItemAriaLabelType } from './common.types';

function LastPageIconDefault() {
    return (
        <div className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            <span className="sr-only">Last</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path
                    fillRule="evenodd"
                    d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
}
function FirstPageIconDefault() {
    return (
        <div className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            <span className="sr-only">First</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path
                    fillRule="evenodd"
                    d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
}
function NextPageIconDefault() {
    return (
        <div className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            <span className="sr-only">Last</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path
                    fillRule="evenodd"
                    d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
}
function BackPageIconDefault() {
    return (
        <div className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            <span className="sr-only">Last</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path
                    fillRule="evenodd"
                    d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
}

function defaultGetAriaLabel(type: ItemAriaLabelType) {
    return `Go to ${type} page`;
}

/**
 * @ignore - internal component.
 */
const TablePaginationActions = React.forwardRef(function TablePaginationActions<
    RootComponentType extends React.ElementType
>(props: TablePaginationActionsProps<RootComponentType>, forwardedRef: React.ForwardedRef<Element>) {
    const {
        count,
        getItemAriaLabel = defaultGetAriaLabel,
        onPageChange,
        page,
        rowsPerPage,
        showFirstButton = false,
        showLastButton = false,
        direction,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ownerState: ownerStateProp,
        slotProps = {},
        slots = {},
        ...other
    } = props;

    const ownerState = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    const Root = slots.root ?? 'div';
    const rootProps: WithOptionalOwnerState<TablePaginationActionsRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: { ref: forwardedRef },
        ownerState
    });

    const FirstButton = slots.firstButton ?? 'button';
    const firstButtonProps: WithOptionalOwnerState<TablePaginationActionsButtonSlotProps> = useSlotProps({
        elementType: FirstButton,
        externalSlotProps: slotProps.firstButton,
        additionalProps: {
            onClick: handleFirstPageButtonClick,
            disabled: page === 0,
            'aria-label': getItemAriaLabel('first', page),
            title: getItemAriaLabel('first', page)
        },
        ownerState
    });

    const LastButton = slots.lastButton ?? 'button';
    const lastButtonProps: WithOptionalOwnerState<TablePaginationActionsButtonSlotProps> = useSlotProps({
        elementType: LastButton,
        externalSlotProps: slotProps.lastButton,
        additionalProps: {
            onClick: handleLastPageButtonClick,
            disabled: page >= Math.ceil(count / rowsPerPage) - 1,
            'aria-label': getItemAriaLabel('last', page),
            title: getItemAriaLabel('last', page)
        },
        ownerState
    });

    const NextButton = slots.nextButton ?? 'button';
    const nextButtonProps: WithOptionalOwnerState<TablePaginationActionsButtonSlotProps> = useSlotProps({
        elementType: NextButton,
        externalSlotProps: slotProps.nextButton,
        additionalProps: {
            onClick: handleNextButtonClick,
            disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
            'aria-label': getItemAriaLabel('next', page),
            title: getItemAriaLabel('next', page)
        },
        ownerState
    });

    const BackButton = slots.backButton ?? 'button';
    const backButtonProps: WithOptionalOwnerState<TablePaginationActionsButtonSlotProps> = useSlotProps({
        elementType: BackButton,
        externalSlotProps: slotProps.backButton,
        additionalProps: {
            onClick: handleBackButtonClick,
            disabled: page === 0,
            'aria-label': getItemAriaLabel('previous', page),
            title: getItemAriaLabel('previous', page)
        },
        ownerState
    });

    const LastPageIcon = slots.lastPageIcon ?? LastPageIconDefault;
    const FirstPageIcon = slots.firstPageIcon ?? FirstPageIconDefault;
    const NextPageIcon = slots.nextPageIcon ?? NextPageIconDefault;
    const BackPageIcon = slots.backPageIcon ?? BackPageIconDefault;

    return (
        <Root {...rootProps}>
            {showFirstButton && (
                <FirstButton {...firstButtonProps}>
                    {direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </FirstButton>
            )}
            <BackButton {...backButtonProps}>{direction === 'rtl' ? <NextPageIcon /> : <BackPageIcon />}</BackButton>
            <NextButton {...nextButtonProps}>{direction === 'rtl' ? <BackPageIcon /> : <NextPageIcon />}</NextButton>
            {showLastButton && (
                <LastButton {...lastButtonProps}>
                    {direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </LastButton>
            )}
        </Root>
    );
}) as PolymorphicComponent<TablePaginationActionsTypeMap>;

export { TablePaginationActions };
