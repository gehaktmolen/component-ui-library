import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '../../utils';
import {
    SelectListboxSlotProps,
    SelectOwnerState,
    SelectPopperSlotProps,
    SelectProps,
    SelectRootSlotProps,
    SelectType
} from './Select.types';
import { useSelect, SelectValue } from '../useSelect';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import { Popper } from '../Popper';
import composeClasses from '../composeClasses';
import defaultOptionStringifier from '../useSelect/defaultOptionStringifier';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { SelectOption } from '../useOption';
import SelectProvider from '../useSelect/SelectProvider';
import generateUtilityClass from '../generateUtilityClass';

function defaultRenderValue<OptionValue>(
    selectedOptions: SelectOption<OptionValue> | SelectOption<OptionValue>[] | null
) {
    if (Array.isArray(selectedOptions)) {
        return <React.Fragment>{selectedOptions.map((o) => o.label).join(', ')}</React.Fragment>;
    }

    return selectedOptions?.label ?? '';
}

function defaultFormValueProvider<OptionValue>(
    selectedOption: SelectOption<OptionValue> | SelectOption<OptionValue>[] | null
) {
    if (Array.isArray(selectedOption)) {
        if (selectedOption.length === 0) {
            return '';
        }

        if (
            selectedOption.every(
                (o) => typeof o.value === 'string' || typeof o.value === 'number' || typeof o.value === 'boolean'
            )
        ) {
            return selectedOption.map((o) => String(o.value));
        }

        return JSON.stringify(selectedOption.map((o) => o.value));
    }

    if (selectedOption?.value == null) {
        return '';
    }

    if (typeof selectedOption.value === 'string' || typeof selectedOption.value === 'number') {
        return selectedOption.value;
    }

    return JSON.stringify(selectedOption.value);
}

const useUtilityClasses = <OptionValue extends NonNullable<unknown>, Multiple extends boolean>(
    ownerState: SelectOwnerState<OptionValue, Multiple>
) => {
    const { active, disabled, open, focusVisible } = ownerState;

    const slots = {
        root: [
            'relative block max-w-xs w-full h-8 cursor-default rounded-md px-2.5 py-1.5 text-sm text-left shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2',
            'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ring-gray-300 dark:ring-gray-600 focus:ring-primary-600',
            'text-ellipsis overflow-hidden whitespace-nowrap',
            disabled &&
                'disabled:cursor-not-allowed disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-600 disabled:ring-gray-200 dark:disabled:ring-gray-800',
            focusVisible && '',
            active && '',
            open && ''
        ],
        listbox: [
            'relative block min-w-listbox mt-1 max-h-60 overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm',
            'bg-gray-100 dark:bg-gray-900 ring-gray-300 dark:ring-gray-600'
        ],
        popper: ['z-10']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

/**
 * The foundation for building custom-styled select components.
 *
 * ## API:
 * - [Select API](?path=/docs/inputs-select--docs#api)
 */
export const Select = React.forwardRef(function Select<
    OptionValue extends NonNullable<unknown>,
    Multiple extends boolean,
    RootComponentType extends React.ElementType
>(props: SelectProps<OptionValue, Multiple, RootComponentType>, forwardedRef: React.ForwardedRef<Element>) {
    const {
        areOptionsEqual,
        autoFocus,
        children,
        defaultValue,
        defaultListboxOpen = false,
        disabled: disabledProp,
        getSerializedValue = defaultFormValueProvider,
        listboxId,
        listboxOpen: listboxOpenProp,
        multiple = false as Multiple,
        name,
        onChange,
        onListboxOpenChange,
        getOptionAsString = defaultOptionStringifier,
        renderValue: renderValueProp,
        slotProps = {},
        slots = {},
        value: valueProp,
        ...other
    } = props;

    const renderValue: (option: SelectValue<SelectOption<OptionValue>, Multiple>) => React.ReactNode =
        renderValueProp ?? defaultRenderValue;

    const [buttonDefined, setButtonDefined] = React.useState(false);
    const buttonRef = React.useRef<HTMLElement | null>(null);
    const listboxRef = React.useRef<HTMLElement>(null);

    const Button = slots.root ?? 'button';
    const ListboxRoot = slots.listbox ?? 'ul';
    const PopperComponent = slots.popper ?? Popper;

    const handleButtonRefChange = React.useCallback((element: HTMLElement | null) => {
        setButtonDefined(element != null);
    }, []);

    const handleButtonRef = useForkRef(forwardedRef, buttonRef, handleButtonRefChange);

    React.useEffect(() => {
        if (autoFocus) {
            buttonRef.current!.focus();
        }
    }, [autoFocus]);

    const {
        buttonActive,
        buttonFocusVisible,
        contextValue,
        disabled,
        getButtonProps,
        getListboxProps,
        getOptionMetadata,
        value,
        open
    } = useSelect({
        areOptionsEqual,
        buttonRef: handleButtonRef,
        defaultOpen: defaultListboxOpen,
        defaultValue,
        disabled: disabledProp,
        listboxId,
        multiple,
        open: listboxOpenProp,
        onChange,
        onOpenChange: onListboxOpenChange,
        getOptionAsString,
        value: valueProp
    });

    const ownerState: SelectOwnerState<OptionValue, Multiple> = {
        ...props,
        active: buttonActive,
        defaultListboxOpen,
        disabled,
        focusVisible: buttonFocusVisible,
        open,
        multiple,
        renderValue,
        value
    };

    const classes = useUtilityClasses(ownerState);

    const buttonProps: WithOptionalOwnerState<SelectRootSlotProps<OptionValue, Multiple>> = useSlotProps({
        elementType: Button,
        getSlotProps: getButtonProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        ownerState,
        className: classes.root
    });

    const listboxProps: WithOptionalOwnerState<SelectListboxSlotProps<OptionValue, Multiple>> = useSlotProps({
        elementType: ListboxRoot,
        getSlotProps: getListboxProps,
        externalSlotProps: slotProps.listbox,
        additionalProps: {
            ref: listboxRef
        },
        ownerState,
        className: classes.listbox
    });

    const popperProps: WithOptionalOwnerState<SelectPopperSlotProps<OptionValue, Multiple>> = useSlotProps({
        elementType: PopperComponent,
        externalSlotProps: slotProps.popper,
        additionalProps: {
            anchorEl: buttonRef.current,
            keepMounted: true,
            open,
            placement: 'bottom-start' as const,
            role: undefined
        },
        ownerState,
        className: classes.popper
    });

    let selectedOptionsMetadata: SelectValue<SelectOption<OptionValue>, Multiple>;
    if (multiple) {
        selectedOptionsMetadata = (value as OptionValue[])
            .map((v) => getOptionMetadata(v))
            .filter((o) => o !== undefined) as SelectValue<SelectOption<OptionValue>, Multiple>;
    } else {
        selectedOptionsMetadata = (getOptionMetadata(value as OptionValue) ?? null) as SelectValue<
            SelectOption<OptionValue>,
            Multiple
        >;
    }

    return (
        <React.Fragment>
            <Button {...buttonProps}>{renderValue(selectedOptionsMetadata)}</Button>
            {buttonDefined && (
                <PopperComponent {...popperProps}>
                    <ListboxRoot {...listboxProps}>
                        <SelectProvider value={contextValue}>{children}</SelectProvider>
                    </ListboxRoot>
                </PopperComponent>
            )}

            {name && <input type="hidden" name={name} value={getSerializedValue(selectedOptionsMetadata)} />}
        </React.Fragment>
    );
}) as SelectType;

Select.propTypes = {
    /**
     * A function used to determine if two options' values are equal.
     * By default, reference equality is used.
     *
     * There is a performance impact when using the `areOptionsEqual` prop (proportional to the number of options).
     * Therefore, it's recommended to use the default reference equality comparison whenever possible.
     */
    areOptionsEqual: PropTypes.func,
    /**
     * If `true`, the select element is focused during the first mount
     * @default false
     */
    autoFocus: PropTypes.bool,
    /**
     * @ignore
     */
    children: PropTypes.node,
    /**
     * If `true`, the select will be initially open.
     * @default false
     */
    defaultListboxOpen: PropTypes.bool,
    /**
     * The default selected value. Use when the component is not controlled.
     */
    defaultValue: PropTypes.any,
    /**
     * If `true`, the select is disabled.
     * @default false
     */
    disabled: PropTypes.bool,
    /**
     * A function used to convert the option label to a string.
     * It's useful when labels are elements and need to be converted to plain text
     * to enable navigation using character keys on a keyboard.
     *
     * @default defaultOptionStringifier
     */
    getOptionAsString: PropTypes.func,
    /**
     * A function to convert the currently selected value to a string.
     * Used to set a value of a hidden input associated with the select,
     * so that the selected value can be posted with a form.
     */
    getSerializedValue: PropTypes.func,
    /**
     * `id` attribute of the listbox element.
     */
    listboxId: PropTypes.string,
    /**
     * Controls the open state of the select listbox.
     * @default undefined
     */
    listboxOpen: PropTypes.bool,
    /**
     * If `true`, selecting multiple values is allowed.
     * This affects the type of the `value`, `defaultValue`, and `onChange` props.
     *
     * @default false
     */
    multiple: PropTypes.bool,
    /**
     * Name of the element. For example used by the server to identify the fields in form submits.
     * If the name is provided, the component will render a hidden input element that can be submitted to a server.
     */
    name: PropTypes.string,
    /**
     * Callback fired when an option is selected.
     */
    onChange: PropTypes.func,
    /**
     * Callback fired when the component requests to be opened.
     * Use in controlled mode (see listboxOpen).
     */
    onListboxOpenChange: PropTypes.func,
    /**
     * Function that customizes the rendering of the selected value.
     */
    renderValue: PropTypes.func,
    /**
     * The props used for each slot inside the Input.
     * @default {}
     */
    slotProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
        listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        popper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the Select.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots: PropTypes /* @typescript-to-proptypes-ignore */.shape({
        listbox: PropTypes.elementType,
        popper: PropTypes.elementType,
        root: PropTypes.elementType
    }),
    /**
     * The selected value.
     * Set to `null` to deselect all options.
     */
    value: PropTypes.any
} as any;
