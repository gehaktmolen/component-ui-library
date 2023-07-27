import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import {
    FormLabelProps,
    FormLabelTypeMap,
    FormLabelRootSlotProps,
    FormLabelOwnerState,
    FormLabelAsteriskSlotProps
} from './FormLabel.types';
import composeClasses from '../composeClasses';
import { getFormLabelUtilityClass } from './formLabelClasses.ts';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { useFormLabel } from '../useFormLabel';

function useUtilityClasses(ownerState: FormLabelOwnerState) {
    const { error, required } = ownerState;

    const slots = {
        root: [
            'flex flex-row flex-wrap content-center items-center mb-1 mt-0 mx-0',
            required && 'required',
            error && 'error'
        ],
        asterisk: [error && 'error', error && 'text-danger-500 dark:text-danger-400']
    };

    return composeClasses(slots, useClassNamesOverride(getFormLabelUtilityClass));
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
 * API:
 *
 * - [FormLabel API](https:///#form-label)
 */
export const FormLabel = React.forwardRef(function FormLabel<RootComponentType extends React.ElementType>(
    props: FormLabelProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    console.log('FormLabel props', props);
    const { children, error, slotProps = {}, slots = {}, required, ...other } = props;

    const {
        error: errorState,
        formControlContext,
        getRootProps,
        required: requiredState
    } = useFormLabel({
        error,
        required,
        ...props
    });

    const ownerState: FormLabelOwnerState = {
        ...props,
        error: errorState,
        required: requiredState,
        formControlContext
    };

    console.log('ownerState props', ownerState);

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'label';
    const rootProps: WithOptionalOwnerState<FormLabelRootSlotProps> = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalForwardedProps: other,
        externalSlotProps: slotProps.root,
        additionalProps: {
            ref: forwardedRef
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
            {requiredState && (
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
