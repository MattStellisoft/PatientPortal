import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
export default function Pagination({
    path,
    totalResults,
    offset,
    perPage,
    query,
}) {
    return (
        totalResults > perPage && (
            <div className="overflow-hidden">
                <div className="border-t border-black px-4 py-5 sm:p-0">
                    <nav className="" aria-label="Pagination">
                        <dl className="sm:divide-y sm:divide-black">
                            {Number(offset) > 1 && (
                                <div className="p-4 sm:py-5 flex justify-between">
                                    <Link
                                        href={
                                            path +
                                            query +
                                            "&page=" +
                                            (Number(offset) - 1)
                                        }
                                    >
                                        <dt className="cursor-pointer text-base text-blue-750">
                                            <div className="flex items-center">
                                                <ArrowLeftIcon
                                                    className="mr-4 w-5 h-5 text-black"
                                                    aria-hidden="true"
                                                />
                                                <span className="font-extrabold">
                                                    {"Previous page"}
                                                </span>
                                            </div>
                                            <div className="ml-9 hover:underline">
                                                {Number(offset) - 1}{" "}
                                                {" of " +
                                                    Math.ceil(
                                                        totalResults / perPage
                                                    )}
                                            </div>
                                        </dt>
                                    </Link>
                                    <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2"></dd>
                                </div>
                            )}
                            {Number(offset) <
                                Math.ceil(totalResults / perPage) && (
                                <div className="p-4 sm:py-5 flex justify-between">
                                    <Link
                                        href={
                                            path +
                                            query +
                                            "&page=" +
                                            (Number(offset) + 1)
                                        }
                                    >
                                        <dt className="cursor-pointer text-base text-blue-750">
                                            <div className="flex items-center">
                                                <ArrowRightIcon
                                                    className="mr-4 w-5 h-5 text-black"
                                                    aria-hidden="true"
                                                />
                                                <span className="font-extrabold">
                                                    {"Next page"}
                                                </span>
                                            </div>
                                            <div className="ml-9 hover:underline">
                                                {Number(offset) + 1}{" "}
                                                {" of " +
                                                    Math.ceil(
                                                        totalResults / perPage
                                                    )}
                                            </div>
                                        </dt>
                                    </Link>
                                    <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2"></dd>
                                </div>
                            )}
                        </dl>
                    </nav>
                </div>
            </div>
        )
    );
}
