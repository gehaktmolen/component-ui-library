import * as React from 'react';
import PropTypes from 'prop-types';
import { generateUtilityClass, composeClasses, useSlotProps, useClassNamesOverride } from '../../utils';
import type { PolymorphicComponent, WithOptionalOwnerState } from '../../utils';
import type {
    FormLabelProps,
    FormLabelTypeMap,
    FormLabelRootSlotProps,
    FormLabelOwnerState,
    FormLabelAsteriskSlotProps
} from './FormLabel.types';
import { type FormControlState, useFormControlContext } from '../FormControl';

function useUtilityClasses(ownerState: FormLabelOwnerState) {
    const { disabled, error, focused, required } = ownerState;

    const slots = {
        root: [
            'block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200',
            disabled && '',
            error && '',
            focused && '',
            required && ''
        ],
        asterisk: [error && 'text-danger-500 dark:text-danger-400']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
}

/**
 * ```jsx
 * <FormControl>
 *   <FormLabel>Label</FormLabel>
 *   <Input placeholder="Placeholder" />
 *   <FormHelperText>This is a helper text.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ## API
 * - [FormLabel API](?path=/docs/utils-formlabel--docs#api)
 */
export const FormLabel = React.forwardRef(function FormLabel<RootComponentType extends React.ElementType>(
    props: FormLabelProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const formControlContext: FormControlState | undefined = useFormControlContext();
    const {
        children,
        disabled: disabledProp = false,
        error: errorProp = false,
        focused: focusedProp = false,
        required: requiredProp = false,
        slotProps = {},
        slots = {},
        ...other
    } = props;

    const disabled = formControlContext?.disabled ?? disabledProp;
    const error = formControlContext?.error ?? errorProp;
    const focused = formControlContext?.focused ?? focusedProp;
    const required = formControlContext?.required ?? requiredProp;

    const ownerState: FormLabelOwnerState = {
        disabled,
        error,
        focused,
        required,
        ...props
    };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'label';
    const rootProps: WithOptionalOwnerState<FormLabelRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef,
            htmlFor: formControlContext?.htmlFor,
            id: formControlContext?.labelId
        },
        ownerState,
        className: classes.root
    });

    const Asterisk: React.ElementType = slots.asterisk === null ? () => null : slots.asterisk ?? 'span';
    const asteriskProps: WithOptionalOwnerState<FormLabelAsteriskSlotProps> = useSlotProps({
        elementType: Asterisk,
        externalSlotProps: slotProps.asterisk,
        ownerState,
        className: classes.asterisk
    });

    return (
        <Root {...rootProps}>
            {children}
            {required && (
                <Asterisk aria-hidden {...asteriskProps}>
                    &thinsp;{'*'}
                </Asterisk>
            )}
        </Root>
    );
}) as PolymorphicComponent<FormLabelTypeMap>;

FormLabel.propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * If `true`, the `label` will indicate an error by setting the `asterisk` attribute on the label.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    error: PropTypes.bool,
    /**
     * @ignore
     */
    onClick: PropTypes.func,
    /**
     * The props used for each slot inside.
     * @default {}
     */
    slotProps: PropTypes.shape({
        asterisk: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside.
     * @default {}
     */
    slots: PropTypes.shape({
        asterisk: PropTypes.elementType,
        root: PropTypes.elementType
    }),
    /**
     * If `true`, the label will indicate that the `input` is required.
     * @default false
     */
    required: PropTypes.bool
} as any;
