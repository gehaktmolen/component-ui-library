export interface Easing {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    sharp: string;
}

export interface Duration {
    shortest: number;
    shorter: number;
    short: number;
    standard: number;
    complex: number;
    enteringScreen: number;
    leavingScreen: number;
}

export interface TransitionsOptions {
    easing?: Partial<Easing>;
    duration?: Partial<Duration>;
    create?: (props: string | string[], options?: CreateOptions) => string;
    getAutoHeightDuration?: (height: number) => number;
}

export type CreateOptions = Partial<{ duration: number | string; easing: string; delay: number | string }>;

export interface Transitions {
    easing: Easing;
    duration: Duration;
    create: TransitionsOptions['create'];
    getAutoHeightDuration: TransitionsOptions['getAutoHeightDuration'];
}
