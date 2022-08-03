import { ChevronRightIcon } from "@heroicons/react/solid";

export default function Breadcrumbs({ breadCrumbs, languageStrings, query }) {
    return (
        <nav className="bg-gray-100 border-b border-gray-400">
            <div className="max-w-6xl m-auto px-6 py-4 sm:flex sm:items-center sm:justify-between lg:px-8">
                <div className="flex-1 min-w-0">
                    <div className="flex overflow-x-auto" aria-label="Breadcrumb">
                        <ol role="list" className="flex sm:items-center space-x-4">
                            <li>
                                <div>
                                    <a
                                        href={"/" + query}
                                        className="font-bold text-blue-750 hover:text-blue-950"
                                    >
                                        <span>{languageStrings.homepageName}</span>
                                    </a>
                                </div>
                            </li>
                            {breadCrumbs.map((page) => (
                                <li key={page.key}>
                                    <div className="flex flex-nowrap items-center">
                                        <ChevronRightIcon
                                            className="flex-shrink-0 h-5 w-5 text-blue-750"
                                            aria-hidden="true"
                                        />
                                        <a
                                            href={page.href + query}
                                            className="ml-4 font-bold whitespace-nowrap text-blue-750 hover:text-blue-950"
                                            aria-current={page.current ? "page" : undefined}
                                        >
                                            {languageStrings[page.key]}
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </nav>
    );
}
