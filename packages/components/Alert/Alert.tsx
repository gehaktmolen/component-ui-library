export function Alert() {
    return (
        <div className="rounded-md bg-danger-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0 text-danger-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-danger-800">There were 2 errors with your submission</h3>
                    <div className="mt-2 text-sm text-danger-700">
                        <ul role="list" className="list-disc space-y-1 pl-5">
                            <li>Your password must be at least 8 characters</li>
                            <li>Your password must include at least one pro wrestling finishing move</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
