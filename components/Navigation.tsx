import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
export default function Navigation({ query, languageStrings }) {
    const router = useRouter();
    return (
        <Disclosure as="nav" className="bg-white">
            {({ open }) => (
                <>
                    <div className="bg-white border-b-4 border-blue-750">
                        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
                            <div className="relative flex justify-between h-14">
                                <div className="flex-1 flex items-center">
                                    <Link href={"/" + query}>
                                        <div className="flex-shrink-0 flex items-center cursor-pointer">
                                            <img
                                                className="h-8 w-auto"
                                                src="/connect-logo.png"
                                                alt="Connect Logo"
                                            />
                                        </div>
                                    </Link>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <form method="post" action="/signin">
                                        <input
                                            name="Signout"
                                            value={languageStrings["signOut"]}
                                            type="submit"
                                            className="p-2 text-blue-950 font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-750"
                                        />
                                    </form>
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="ml-3 lg:hidden inline-flex items-center justify-center p-2 rounded-md text-blue-750 hover:text-blue-950 hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-750">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <MenuIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="lg:hidden">
                        <div className="pt-2 pb-4 space-y-1">
                            {typeof languageStrings.navigation != "undefined" &&
                                languageStrings.navigation.map((item) => (
                                    <Link
                                        href={item.href + query}
                                        key={item.key}
                                    >
                                        <a
                                            className={classNames(
                                                item.href == router.pathname
                                                    ? "bg-blue-750 border-blue-950 text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                                    : "border-transparent text-black hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                            )}
                                        >
                                            {languageStrings[item.key]}
                                        </a>
                                    </Link>
                                ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
