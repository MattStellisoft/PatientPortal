export default function Summary(summary: { summary: object }) {
    return (
        <div className="overflow-hidden sm:rounded-lg">
            <div className="border-t border-black px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-black">
                    {Object.keys(summary.summary).map((name) => (
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-black">
                                {name}
                            </dt>
                            <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
                                {summary.summary[name]}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}
