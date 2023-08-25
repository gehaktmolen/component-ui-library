import * as React from 'react';
import PropTypes from 'prop-types';
import type { DividerProps, DividerOwnerState, DividerRootSlotProps } from './Divider.types';
import {
    generateUtilityClass,
    useClassNamesOverride,
    composeClasses,
    WithOptionalOwnerState,
    useSlotProps
} from '../../utils';

const useUtilityClasses = (ownerState: DividerOwnerState) => {
    const { orientation } = ownerState;

    const slots = {
        root: [
            'relative py-2',
            // Todo: Handle divider orientation styling.
            orientation === 'vertical' ? '' : ''
        ],
        borderContainer: ['absolute inset-0 flex items-center'],
        border: ['w-full border-t border-gray-300'],
        childContainer: ['relative flex justify-center'],
        child: ['bg-gray-100 px-2 text-sm text-gray-500']
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const Divider = React.forwardRef(function Divider<RootComponentType extends React.ElementType>(
    props: DividerProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const { children, orientation = 'horizontal', role = 'separator', slotProps = {}, slots = {}, ...other } = props;

    const ownerState: DividerOwnerState = {
        ...props,
        orientation,
        role
    };

    const classes = useUtilityClasses(ownerState);

    const Root: React.ElementType = slots.root ?? 'div';
    const rootProps: WithOptionalOwnerState<DividerRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef,
            role,
            ...(role === 'separator' &&
                orientation === 'vertical' && {
                    // The implicit aria-orientation of separator is 'horizontal'
                    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role
                    'aria-orientation': 'vertical'
                })
        },
        ownerState,
        className: classes.root
    });

    return (
        <Root {...rootProps}>
            <div className={classes.borderContainer} aria-hidden="true">
                <div className={classes.border} />
            </div>
            {children && (
                <div className={classes.childContainer}>
                    <span className={classes.child}>{children}</span>
                </div>
            )}
        </Root>
    );
});

Divider.propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: PropTypes.elementType,
    /**
     * @ignore
     */
    role: PropTypes.string,
    /**
     * The props used for each slot inside.
     * @default {}
     */
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    })
};

export { Divider };
