import * as React from 'react';
import PropTypes from 'prop-types';
import { refType } from '../../utils';
import { PolymorphicComponent } from '../utils';
import { MenuOwnerState, MenuProps, MenuRootSlotProps, MenuTypeMap } from './Menu.types';
import { useMenu } from '../useMenu';
import { MenuProvider } from '../useMenu';
import composeClasses from '../composeClasses';
import { Popper } from '../Popper';
import { useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { WithOptionalOwnerState } from '../utils';
import { ListActionTypes } from '../useList';
import generateUtilityClass from '../generateUtilityClass';

function useUtilityClasses(ownerState: MenuOwnerState) {
    const { open } = ownerState;
    const slots = {
        root: ['z-10', open && ''],
        listbox: [
            'relative block min-w-listbox mt-1 max-h-60 overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm',
            'bg-gray-100 dark:bg-gray-900 ring-gray-300 dark:ring-gray-600',
            open && ''
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
}

/**
 *
 * ## Menu API
 * - [Menu API](#menu)
 */
const Menu = React.forwardRef(function Menu<RootComponentType extends React.ElementType>(
    props: MenuProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const { actions, children, onItemsChange, slotProps = {}, slots = {}, ...other } = props;

    const { contextValue, getListboxProps, dispatch, open, triggerElement } = useMenu({
        onItemsChange
    });

    React.useImperativeHandle(
        actions,
        () => ({
            dispatch,
            resetHighlight: () => dispatch({ type: ListActionTypes.resetHighlight, event: null })
        }),
        [dispatch]
    );

    const ownerState: MenuOwnerState = { ...props, open };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'div';
    const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef,
            role: undefined
        },
        className: classes.root,
        ownerState
    });

    const Listbox = slots.listbox ?? 'ul';
    const listboxProps: WithOptionalOwnerState<MenuRootSlotProps> = useSlotProps({
        elementType: Listbox,
        getSlotProps: getListboxProps,
        externalSlotProps: slotProps.listbox,
        className: classes.listbox,
        ownerState
    });

    if (open === true && triggerElement == null) {
        return (
            <Root {...rootProps}>
                <Listbox {...listboxProps}>
                    <MenuProvider value={contextValue}>{children}</MenuProvider>
                </Listbox>
            </Root>
        );
    }

    return (
        <Popper {...rootProps} open={open} anchorEl={triggerElement} slots={{ root: Root }}>
            <Listbox {...listboxProps}>
                <MenuProvider value={contextValue}>{children}</MenuProvider>
            </Listbox>
        </Popper>
    );
}) as PolymorphicComponent<MenuTypeMap>;

Menu.propTypes = {
    /**
     * A ref with imperative actions that can be performed on the menu.
     */
    actions: refType,
    /**
     * @ignore
     */
    children: PropTypes.node,
    /**
     * Function called when the items displayed in the menu change.
     */
    onItemsChange: PropTypes.func,
    /**
     * The props used for each slot inside the Menu.
     * @default {}
     */
    slotProps: PropTypes.shape({
        listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the Menu.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        listbox: PropTypes.elementType,
        root: PropTypes.elementType
    })
} as any;

export { Menu };
