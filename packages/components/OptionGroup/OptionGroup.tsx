import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent } from '../utils';
import composeClasses from '../composeClasses';
import {
    OptionGroupLabelSlotProps,
    OptionGroupListSlotProps,
    OptionGroupProps,
    OptionGroupRootSlotProps,
    OptionGroupTypeMap
} from './OptionGroup.types';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import generateUtilityClass from '../generateUtilityClass';

function useUtilityClasses(disabled: boolean) {
    const slots = {
        root: ['', disabled && ''],
        label: ['block uppercase px-3 pt-3.5 pb-2.5 text-xs text-gray-500 dark:text-gray-400 tracking-wide'],
        list: ['']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
}

/**
 * An un-styled option group to be used within a Select.
 *
 * API:
 *
 * - [OptionGroup API](https://docs/inputs-select--docs#grouping-options)
 */
export const OptionGroup = React.forwardRef(function OptionGroup<RootComponentType extends React.ElementType>(
    props: OptionGroupProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const { disabled = false, slotProps = {}, slots = {}, ...other } = props;

    const Root = slots?.root || 'li';
    const Label = slots?.label || 'span';
    const List = slots?.list || 'ul';

    const classes = useUtilityClasses(disabled);

    const rootProps: WithOptionalOwnerState<OptionGroupRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef
        },
        ownerState: props,
        className: classes.root
    });

    const labelProps: WithOptionalOwnerState<OptionGroupLabelSlotProps> = useSlotProps({
        elementType: Label,
        externalSlotProps: slotProps.label,
        ownerState: props,
        className: classes.label
    });

    const listProps: WithOptionalOwnerState<OptionGroupListSlotProps> = useSlotProps({
        elementType: List,
        externalSlotProps: slotProps.list,
        ownerState: props,
        className: classes.list
    });

    return (
        <Root {...rootProps}>
            <Label {...labelProps}>{props.label}</Label>
            <List {...listProps}>{props.children}</List>
        </Root>
    );
}) as PolymorphicComponent<OptionGroupTypeMap>;

OptionGroup.propTypes = {
    /**
     * @ignore
     */
    children: PropTypes.node,
    /**
     * If `true` all the options in the group will be disabled.
     * @default false
     */
    disabled: PropTypes.bool,
    /**
     * The human-readable description of the group.
     */
    label: PropTypes.node,
    /**
     * The props used for each slot inside the Input.
     * @default {}
     */
    slotProps: PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        list: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the OptionGroup.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        label: PropTypes.elementType,
        list: PropTypes.elementType,
        root: PropTypes.elementType
    })
} as any;
