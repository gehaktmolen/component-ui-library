const items = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
    // More items...
];

export function List() {
    return (
        <main className="py-10 min-w-[400px]">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-md bg-gray-50 shadow">
                    <ul role="list" className="divide-y divide-gray-200">
                        {items.map((item) => (
                            <li key={item.id} className="px-6 py-4">
                                {/* Your content */}
                                <div className="relative h-16 overflow-hidden rounded border border-dashed border-gray-400 opacity-75">
                                    <svg className="absolute inset-0 h-full w-full stroke-gray-900/10" fill="none">
                                        <defs>
                                            <pattern
                                                id="pattern-91490595-fbd3-4496-beae-7777d695b0ad"
                                                x="0"
                                                y="0"
                                                width="10"
                                                height="10"
                                                patternUnits="userSpaceOnUse"
                                            >
                                                <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                                            </pattern>
                                        </defs>
                                        <rect
                                            stroke="none"
                                            fill="url(#pattern-91490595-fbd3-4496-beae-7777d695b0ad)"
                                            width="100%"
                                            height="100%"
                                        ></rect>
                                    </svg>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}
