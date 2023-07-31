import * as React from 'react';

export interface MessageBus {
    // eslint-disable-next-line @typescript-eslint/ban-types
    subscribe(topic: string, callback: Function): () => void;
    publish(topic: string, ...args: unknown[]): void;
}

export function createMessageBus(): MessageBus {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const listeners = new Map<string, Set<Function>>();

    // eslint-disable-next-line @typescript-eslint/ban-types
    function subscribe(topic: string, callback: Function) {
        let topicListeners = listeners.get(topic);
        if (!topicListeners) {
            topicListeners = new Set([callback]);
            listeners.set(topic, topicListeners);
        } else {
            topicListeners.add(callback);
        }

        return () => {
            topicListeners!.delete(callback);
            if (topicListeners!.size === 0) {
                listeners.delete(topic);
            }
        };
    }

    function publish(topic: string, ...args: unknown[]) {
        const topicListeners = listeners.get(topic);
        if (topicListeners) {
            topicListeners.forEach((callback) => callback(...args));
        }
    }

    return { subscribe, publish };
}

/**
 * @ignore - internal hook.
 */
export default function useMessageBus() {
    const bus = React.useRef<MessageBus>();
    if (!bus.current) {
        bus.current = createMessageBus();
    }

    return bus.current;
}
