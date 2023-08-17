import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { CheckIcon } from '@heroicons/react/24/solid';

const steps = [
    { name: 'Create account', href: '#', status: 'complete' },
    { name: 'Profile information', href: '#', status: 'current' },
    { name: 'Finance', href: '#', status: 'upcoming' },
    { name: 'Preview', href: '#', status: 'upcoming' }
];

export function Stepper() {
    return (
        <div className="px-4 py-12 sm:px-6 lg:px-8">
            <nav className="flex justify-center" aria-label="Progress">
                <ol role="list" className="space-y-6">
                    {steps.map((step) => (
                        <li key={step.name}>
                            {step.status === 'complete' ? (
                                <a href={step.href} className="group">
                                    <span className="flex items-start">
                                        <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                                            <CheckCircleIcon
                                                className="h-full w-full text-primary-600 group-hover:text-primary-800"
                                                aria-hidden="true"
                                            />
                                        </span>
                                        <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                                            {step.name}
                                        </span>
                                    </span>
                                </a>
                            ) : step.status === 'current' ? (
                                <a href={step.href} className="flex items-start" aria-current="step">
                                    <span
                                        className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
                                        aria-hidden="true"
                                    >
                                        <span className="absolute h-4 w-4 rounded-full bg-primary-200" />
                                        <span className="relative block h-2 w-2 rounded-full bg-primary-600" />
                                    </span>
                                    <span className="ml-3 text-sm font-medium text-primary-600">{step.name}</span>
                                </a>
                            ) : (
                                <a href={step.href} className="group">
                                    <div className="flex items-start">
                                        <div
                                            className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
                                            aria-hidden="true"
                                        >
                                            <div className="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-gray-400" />
                                        </div>
                                        <p className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                                            {step.name}
                                        </p>
                                    </div>
                                </a>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
}

const stepsAlternative = [
    { id: '01', name: 'Campaign', href: '#', status: 'complete' },
    { id: '02', name: 'Line Item', href: '#', status: 'current' },
    { id: '03', name: 'Placement', href: '#', status: 'upcoming' }
];

export function StepperAlternative() {
    return (
        <nav aria-label="Progress">
            <ol
                role="list"
                className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
            >
                {stepsAlternative.map((step, stepIdx) => (
                    <li key={step.name} className="relative md:flex md:flex-1">
                        {step.status === 'complete' ? (
                            <a href={step.href} className="group flex w-full items-center">
                                <span className="flex items-center px-6 py-4 text-sm font-medium">
                                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 group-hover:bg-primary-800">
                                        <CheckIcon className="h-6 w-6 text-gray-100" aria-hidden="true" />
                                    </span>
                                    <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                                </span>
                            </a>
                        ) : step.status === 'current' ? (
                            <a
                                href={step.href}
                                className="flex items-center px-6 py-4 text-sm font-medium"
                                aria-current="step"
                            >
                                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary-600">
                                    <span className="text-primary-600">{step.id}</span>
                                </span>
                                <span className="ml-4 text-sm font-medium text-primary-600">{step.name}</span>
                            </a>
                        ) : (
                            <a href={step.href} className="group flex items-center">
                                <span className="flex items-center px-6 py-4 text-sm font-medium">
                                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                                        <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
                                    </span>
                                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                                        {step.name}
                                    </span>
                                </span>
                            </a>
                        )}

                        {stepIdx !== stepsAlternative.length - 1 ? (
                            <>
                                {/* Arrow separator for lg screens and up */}
                                <div className="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
                                    <svg
                                        className="h-full w-full text-gray-300"
                                        viewBox="0 0 22 80"
                                        fill="none"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            d="M0 -2L20 40L0 82"
                                            vectorEffect="non-scaling-stroke"
                                            stroke="currentcolor"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </>
                        ) : null}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
