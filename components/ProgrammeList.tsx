import Link from "next/link";
export default function ProgrammeList({ programmes, status, query }) {
    return (
        <div className="overflow-hidden">
            <div className="border-t border-black">
                <dl className="sm:divide-y sm:divide-black">
                    {programmes.map((programme, index) => (
                        <div
                            key={index}
                            className="py-4 px-5 flex items-center justify-between"
                        >
                            <dt className="text-base font-bold text-blue-750">
                                <Link
                                    href={
                                        "/exercises/" +
                                        programme.access_code +
                                        query
                                    }
                                >
                                    {programme.name}
                                </Link>
                            </dt>
                            {/* <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
                                <span className="inline-flex items-center px-2 py-1 font-bold bg-blue-750 text-white">
                                    {programme.access_code}
                                </span>
                            </dd> */}
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}
