import * as React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { useForkRef, createTransitions, reflow, getTransitionProps, elementAcceptingRef } from '../../utils';
import { FadeProps } from './Fade.types.ts';

const transitions = createTransitions({});

const styles: { [key: string]: object } = {
    entering: {
        opacity: 1
    },
    entered: {
        opacity: 1
    }
};

/**
 * The Fade transition is used by the [Modal](?path=/docs/feedback-modal--docs) component.
 * This transitions can be used to introduce some basic motion to your applications.
 *
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
 * ## API
 * - [Fade API](?path=/docs/transitions-fade--docs#api)
 * - inherits [Transition API](http://reactcommunity.org/react-transition-group/transition/#Transition-props)
 */
export const Fade = React.forwardRef(function Fade(props: FadeProps, forwardedRef: React.ForwardedRef<HTMLElement>) {
    const defaultTimeout = {
        enter: 200,
        exit: 150
    };

    const {
        addEndListener,
        appear = true,
        children,
        easing,
        in: inProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        style,
        timeout = defaultTimeout,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        TransitionComponent = Transition,
        ...other
    } = props;

    const enableStrictModeCompat = true;
    const nodeRef = React.useRef<HTMLElement | null>(null);
    // @ts-expect-error TODO upstream fix
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const handleRef = useForkRef(nodeRef, children.ref, forwardedRef);

    const normalizedTransitionCallback =
        (callback: ((node: HTMLElement, isAppearing: boolean) => void) | undefined) =>
        (maybeIsAppearing?: boolean): void => {
            if (callback) {
                const node: HTMLElement | null = nodeRef.current;

                // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
                if (node) {
                    if (maybeIsAppearing === undefined) {
                        callback(node, false);
                    } else {
                        callback(node, maybeIsAppearing);
                    }
                }
            }
        };

    const handleEntering = normalizedTransitionCallback(onEntering);

    const handleEnter = normalizedTransitionCallback((node, isAppearing): void => {
        if (!node) return;

        reflow(node); // So the animation always start from the start.

        const transitionProps = getTransitionProps(
            { style, timeout, easing },
            {
                mode: 'enter'
            }
        );

        node.style.transition = transitions.create!('opacity', transitionProps);

        if (onEnter) {
            onEnter(node, isAppearing);
        }
    });

    const handleEntered = normalizedTransitionCallback(onEntered);

    const handleExiting = normalizedTransitionCallback(onExiting);

    const handleExit = normalizedTransitionCallback((node: HTMLElement | null): void => {
        if (!node) return;

        const transitionProps = getTransitionProps(
            { style, timeout, easing },
            {
                mode: 'exit'
            }
        );

        node.style.transition = transitions.create!('opacity', transitionProps);

        if (onExit) {
            onExit(node);
        }
    });

    const handleExited = normalizedTransitionCallback(onExited);

    const handleAddEndListener = (next: () => void): void => {
        if (addEndListener && nodeRef.current) {
            // Old call signature before `react-transition-group` implemented `nodeRef`
            addEndListener(nodeRef.current, next);
        }
    };

    return (
        <TransitionComponent
            appear={appear}
            in={inProp}
            nodeRef={enableStrictModeCompat ? nodeRef : undefined}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onEntering={handleEntering}
            onExit={handleExit}
            onExited={handleExited}
            onExiting={handleExiting}
            addEndListener={handleAddEndListener}
            timeout={timeout}
            {...other}
        >
            {(state: string, childProps: (Partial<any> & React.Attributes) | undefined) => {
                return React.cloneElement(children, {
                    style: {
                        opacity: 0,
                        visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
                        ...styles[state],
                        ...style,
                        ...children.props.style
                    },
                    ref: handleRef,
                    ...childProps
                });
            }}
        </TransitionComponent>
    );
}) as React.ForwardRefExoticComponent<FadeProps & React.RefAttributes<HTMLElement>>;

Fade.propTypes = {
    /**
     * Add a custom transition end trigger. Called with the transitioning DOM
     * node and a done callback. Allows for more fine-grained transition end
     * logic. Note: Timeouts are still used as a fallback if provided.
     */
    addEndListener: PropTypes.func,
    /**
     * Perform the enter transition when it first mounts if `in` is also `true`.
     * Set this to `false` to disable this behavior.
     * @default true
     */
    appear: PropTypes.bool,
    /**
     * A single child content element.
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    children: elementAcceptingRef.isRequired,
    /**
     * The transition timing function.
     * You may specify a single easing or object containing enter and exit values.
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    easing: PropTypes.oneOfType([
        PropTypes.shape({
            enter: PropTypes.string,
            exit: PropTypes.string
        }),
        PropTypes.string
    ]),
    /**
     * If `true`, the component will transition in.
     */
    in: PropTypes.bool,
    /**
     * @ignore
     */
    onEnter: PropTypes.func,
    /**
     * @ignore
     */
    onEntered: PropTypes.func,
    /**
     * @ignore
     */
    onEntering: PropTypes.func,
    /**
     * @ignore
     */
    onExit: PropTypes.func,
    /**
     * @ignore
     */
    onExited: PropTypes.func,
    /**
     * @ignore
     */
    onExiting: PropTypes.func,
    /**
     * @ignore
     */
    style: PropTypes.object,
    /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     * @default {
     *   enter: 300,
     *   exit: 100,
     * }
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            appear: PropTypes.number,
            enter: PropTypes.number,
            exit: PropTypes.number
        })
    ])
};
