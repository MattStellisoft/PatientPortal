import Link from "next/link";
import { useRouter } from "next/router";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
export default function Sidebar({ query, languageStrings }) {
    const router = useRouter();
    return (
        <nav aria-label="Sidebar" className="sticky top-4">
            <div className="pb-8 space-y-1">
                {typeof languageStrings.navigation != "undefined" &&
                    languageStrings.navigation.map((item) => (
                        <Link href={item.href + query} key={item.key}>
                            <a
                                className={classNames(
                                    item.href == router.pathname
                                        ? "bg-gray-200"
                                        : "text-black hover:bg-gray-200",
                                    "group flex flex-col justify-center px-4 py-2 text-sm font-bold"
                                )}
                                aria-current={item.href ? "page" : undefined}
                            >
                                <p className="text-base text-blue-950">
                                    {languageStrings[item.key]}
                                </p>
                                <p className="text-sm text-blue-750">
                                    {languageStrings[item.description]}
                                </p>
                            </a>
                        </Link>
                    ))}
            </div>
        </nav>
    );
}
