import * as React from 'react';
import type {
    Meta
    // StoryObj
} from '@storybook/react';

import { TablePagination } from './TablePagination';
import { Button } from '../Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Navigation/WIP/TablePagination',
    component: TablePagination,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof TablePagination>;

export default meta;
// type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const Primary: Story = {
//     args: {
//     },
//     render: (args) => <TablePagination {...args} />
// };

export function TableCustomized() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="py-10 overflow-hidden shadow sm:rounded-lg bg-gray-100 dark:bg-gray-900 ">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100">Users</h1>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            A list of all the users in your account including their name, title, email and role.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Button type="button">Add user</Button>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table
                                className="min-w-full divide-y divide-gray-300 dark:divide-gray-700"
                                aria-label="custom pagination table"
                            >
                                <thead>
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-0">
                                            Dessert
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                            Calories
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                            Fat
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {(rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                    ).map((row) => (
                                        <tr key={row.name}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100 sm:pl-0">
                                                {row.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                {row.calories}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                {row.fat}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <Button type="button" variant="soft">
                                                    Edit<span className="sr-only">, Lindsay Walton</span>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}

                                    {emptyRows > 0 && (
                                        <tr style={{ height: 65 * emptyRows }}>
                                            <td
                                                className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                                colSpan={4}
                                            />
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr className="border border-solid border-gray-200 dark:border-gray-800 text-left p-1.5">
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            slotProps={{
                                                select: {
                                                    'aria-label': 'rows per page'
                                                    // className: 'p-0.5 border border-solid border-gray-200 dark:border-gray-800 rounded-3xl bg-transparent hover:bg-gray-20 hover:dark:bg-gray-800 focus:outline-0 focus:shadow-outline-purple-xs',
                                                },
                                                actions: {
                                                    showFirstButton: true,
                                                    showLastButton: true
                                                    // className: 'p-0.5 border border-solid border-gray-200 dark:border-gray-800 rounded-3xl text-center [&>button]:my-0 [&>button]:mx-2 [&>button]:border-transparent [&>button]:rounded-sm [&>button]:bg-transparent [&>button:hover]:bg-gray-50 [&>button:hover]:dark:bg-gray-800 [&>button:focus]:outline-0 [&>button:focus]:shadow-outline-purple-xs',
                                                },
                                                spacer: {
                                                    // className: 'hidden',
                                                },
                                                toolbar: {
                                                    // className: 'flex flex-col items-start gap-2.5 md:flex-row md:items-center',
                                                },
                                                selectLabel: {
                                                    // className: 'm-0',
                                                },
                                                displayedRows: {
                                                    className: 'text-gray-500'
                                                }
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function createData(name: string, calories: number, fat: number) {
    return { name, calories, fat };
}

const rows = [
    createData('Cupcake', 305, 3.7),
    createData('Donut', 452, 25.0),
    createData('Eclair', 262, 16.0),
    createData('Frozen yoghurt', 159, 6.0),
    createData('Gingerbread', 356, 16.0),
    createData('Honeycomb', 408, 3.2),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0)
].sort((a, b) => (a.calories < b.calories ? -1 : 1));
