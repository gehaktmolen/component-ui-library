const people = [
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' },
    { name: 'Someone', title: 'Front-end Developer', email: 'someone@azerion.com', role: 'Member' }

    // More people...
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export function Table() {
    return (
        <table className="min-w-full border-separate border-spacing-0">
            <thead>
                <tr>
                    <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-100 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                        Name
                    </th>
                    <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-100 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                        Title
                    </th>
                    <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-100 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                        Email
                    </th>
                    <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-100 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                        Role
                    </th>
                    <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-100 bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {people.map((person, personIdx) => (
                    <tr key={person.email}>
                        <td
                            className={classNames(
                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                            )}
                        >
                            {person.name}
                        </td>
                        <td
                            className={classNames(
                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                            )}
                        >
                            {person.title}
                        </td>
                        <td
                            className={classNames(
                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                            )}
                        >
                            {person.email}
                        </td>
                        <td
                            className={classNames(
                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                            )}
                        >
                            {person.role}
                        </td>
                        <td
                            className={classNames(
                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                            )}
                        >
                            <a href="#" className="text-primary-600 hover:text-primary-900">
                                Edit<span className="sr-only">, {person.name}</span>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
