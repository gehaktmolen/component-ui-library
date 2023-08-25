import * as React from 'react';
import PropTypes from 'prop-types';
import type { SvgIconProps, SvgIconOwnerState, SvgIconRootSlotProps } from './SvgIcon.types';
import {
    generateUtilityClass,
    useClassNamesOverride,
    composeClasses,
    WithOptionalOwnerState,
    useSlotProps
} from '../../utils';

const useUtilityClasses = (ownerState: SvgIconOwnerState) => {
    const { color, fontSize, hasSvgAsChild } = ownerState;

    const slots = {
        root: [
            'select-none w-4 h-4 inline-block shrink-0 transition-colors duration-200 ease-in-out fill-current',
            hasSvgAsChild && 'fill-current',
            fontSize === 'inherit' && 'text-inherit',
            fontSize === 'small' && 'text-sm',
            fontSize === 'medium' && 'text-base',
            fontSize === 'large' && 'text-lg',
            color === 'inherit' && 'text-inherit',
            color === 'primary' && 'text-primary-600'
        ]
    };

    return composeClasses(
        slots,
        useClassNamesOverride((slot: string) => generateUtilityClass(slot))
    );
};

const SvgIcon = React.forwardRef(function SvgIcon<RootComponentType extends React.ElementType>(
    props: SvgIconProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>
) {
    const {
        children,
        color = 'inherit',
        component = 'svg',
        fontSize = 'medium',
        htmlColor,
        inheritViewBox = false,
        titleAccess,
        viewBox = '0 0 24 24',
        slotProps = {},
        slots = {},
        ...other
    } = props;

    const hasSvgAsChild = React.isValidElement(children) && children.type === 'svg';

    const ownerState: SvgIconOwnerState = {
        ...props,
        color,
        component,
        fontSize,
        instanceFontSize: props.fontSize,
        inheritViewBox,
        viewBox,
        hasSvgAsChild
    };

    const classes = useUtilityClasses(ownerState);

    const Root: React.ElementType = slots.root ?? 'svg';
    const rootProps: WithOptionalOwnerState<SvgIconRootSlotProps> = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
            ref: forwardedRef,
            color: htmlColor,
            focusable: false,
            ...(titleAccess && { role: 'img' }),
            ...(!titleAccess && { 'aria-hidden': true }),
            ...(!inheritViewBox && { viewBox }),
            ...(hasSvgAsChild && (children.props as Omit<React.SVGProps<SVGSVGElement>, 'ref'>))
        },
        ownerState,
        className: classes.root
    });

    return (
        <Root {...rootProps}>
            {hasSvgAsChild ? (children.props as React.SVGProps<SVGSVGElement>).children : children}
            {titleAccess ? <title>{titleAccess}</title> : null}
        </Root>
    );
});

SvgIcon.propTypes = {
    /**
     * Node passed into the SVG element.
     */
    children: PropTypes.node,
    /**
     * The color of the component.
     * @default 'inherit'
     */
    color: PropTypes.oneOfType([PropTypes.oneOf(['inherit', 'disabled', 'action']), PropTypes.string]),
    /**
     * The fontSize applied to the icon. Defaults to 24px, but can be configured to inherit font size.
     * @default 'medium'
     */
    fontSize: PropTypes.oneOfType([PropTypes.oneOf(['inherit', 'large', 'medium', 'small']), PropTypes.string]),
    /**
     * Applies a color attribute to the SVG element.
     */
    htmlColor: PropTypes.string,
    /**
     * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
     * prop will be ignored.
     * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
     * `component`'s viewBox to the root node.
     * @default false
     */
    inheritViewBox: PropTypes.bool,
    /**
     * The shape-rendering attribute. The behavior of the different options is described on the
     * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
     * If you are having issues with blurry icons you should investigate this prop.
     */
    shapeRendering: PropTypes.string,
    /**
     * Provides a human-readable title for the element that contains it.
     * https://www.w3.org/TR/SVG-access/#Equivalent
     */
    titleAccess: PropTypes.string,
    /**
     * Allows you to redefine what the coordinates without units mean inside an SVG element.
     * For example, if the SVG element is 500 (width) by 200 (height),
     * and you pass viewBox="0 0 50 20",
     * this means that the coordinates inside the SVG will go from the top left corner (0,0)
     * to bottom right (50,20) and each unit will be worth 10px.
     * @default '0 0 24 24'
     */
    viewBox: PropTypes.string,
    /**
     * The props used for each slot inside the SvgIcon.
     * @default {}
     */
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    }),
    /**
     * The components used for each slot inside the SvgIcon.
     * Either a string to use an HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        root: PropTypes.elementType
    })
};

export { SvgIcon };
