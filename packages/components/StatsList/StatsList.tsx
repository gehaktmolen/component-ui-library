import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

const stats = [
    { name: 'Total Subscribers', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
    { name: 'Avg. Open Rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
    { name: 'Avg. Click Rate', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' }
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export function StatsList() {
    return (
        <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>
            <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-50 shadow md:grid-cols-3 md:divide-x md:divide-y-0">
                {stats.map((item) => (
                    <div key={item.name} className="px-4 py-5 sm:p-6">
                        <dt className="text-base font-normal text-gray-900">{item.name}</dt>
                        <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                            <div className="flex items-baseline text-2xl font-semibold text-primary-600">
                                {item.stat}
                                <span className="ml-2 text-sm font-medium text-gray-500">from {item.previousStat}</span>
                            </div>

                            <div
                                className={classNames(
                                    item.changeType === 'increase'
                                        ? 'bg-primary-100 text-primary-800'
                                        : 'bg-danger-100 text-danger-800',
                                    'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                                )}
                            >
                                {item.changeType === 'increase' ? (
                                    <ArrowUpIcon
                                        className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-primary-500"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <ArrowDownIcon
                                        className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-danger-500"
                                        aria-hidden="true"
                                    />
                                )}

                                <span className="sr-only">
                                    {' '}
                                    {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by{' '}
                                </span>
                                {item.change}
                            </div>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
