import * as React from 'react';
import PropTypes from 'prop-types';
import { generateUtilityClass, composeClasses, useSlotProps, useClassNamesOverride } from '../../utils';
import { type FormControlState, useFormControlContext } from '../FormControl';
import type { PolymorphicComponent, WithOptionalOwnerState } from '../../utils';
import type {
    FormHelperTextProps,
    FormHelperTextTypeMap,
    FormHelperTextRootSlotProps,
    FormHelperTextOwnerState
} from './FormHelperText.types';

function useUtilityClasses(ownerState: FormHelperTextOwnerState) {
    const { disabled, error, focused, required } = ownerState;

    const slots = {
        root: [
            'mt-2 text-sm',
            !error && 'text-gray-500 dark:text-gray-200',
            disabled && '',
            error && 'text-danger-500 dark:danger-danger-400',
            focused && '',
            required && ''
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
}

/**
 * To use an interactive element together with a CheckBox, you can wrap it with a FormControl and FormHelperText.
 *
 * ```jsx
 * <FormControl size="sm">
 *   <CheckBox
 *     label={
 *       <React.Fragment>
 *         I have read and agree to the terms and conditions.
 *       </React.Fragment>
 *     }
 *   />
 *   <FormHelperText>
 *     Read our <Link href="#link">terms and conditions</Link>.
 *   </FormHelperText>
 * </FormControl>
 * ```
 *
 * ## API
 * - [FormHelperText API](?path=/docs/utils-formhelpertext--docs#api)
 */
export const FormHelperText = React.forwardRef(function FormHelperText<RootComponentType extends React.ElementType>(
    props: FormHelperTextProps<RootComponentType>,
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

    const ownerState: FormHelperTextOwnerState = {
        disabled,
        error,
        focused,
        required,
        ...props
    };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'p';
    const rootProps: WithOptionalOwnerState<FormHelperTextRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef,
            id: formControlContext?.['aria-describedby']
        },
        ownerState,
        className: classes.root
    });

    return (
        <Root {...rootProps}>
            {children === ' ' ? (
                // notranslate needed while Google Translate will not fix zero-width space issue
                <span className="notranslate">&#8203;</span>
            ) : (
                children
            )}
        </Root>
    );
}) as PolymorphicComponent<FormHelperTextTypeMap>;

FormHelperText.propTypes = {
    /**
     * The badge will be added relative to this node.
     */
    children: PropTypes.node,
    /**
     * The props used for each slot inside the FormHelperText.
     * @default {}
     */
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the FormHelperText.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    })
} as any;
