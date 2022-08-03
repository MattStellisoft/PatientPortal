/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Steps({ patientSteps }) {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="overflow-hidden">
                {patientSteps.map((step, stepIdx) => (
                    <Disclosure key={stepIdx}>
                        {({ open }) => (
                            <li
                                key={step.name}
                                className={classNames(
                                    stepIdx !== patientSteps.length - 1
                                        ? "pb-10"
                                        : "",
                                    "relative"
                                )}
                            >
                                {step.status === "complete" ? (
                                    <>
                                        {stepIdx !== patientSteps.length - 1 ? (
                                            <div
                                                className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-blue-750"
                                                aria-hidden="true"
                                            />
                                        ) : null}
                                        <span className="relative flex items-start group">
                                            <span className="h-9 flex items-center">
                                                <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-blue-750 rounded-full group-hover:bg-blue-950">
                                                    <CheckIcon
                                                        className="w-5 h-5 text-white"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </span>
                                            <span>
                                                <span className="ml-4 min-w-0">
                                                    <Disclosure.Button className="text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                        <span className="flex flex-col mb-4">
                                                            <span className="text-2xl font-extrabold tracking-wide">
                                                                {step.name}
                                                            </span>
                                                            <span className="text-lg font-bold text-black">
                                                                {
                                                                    step.description
                                                                }
                                                            </span>
                                                        </span>
                                                        <span className="flex items-center">
                                                            <span className="inline-flex items-center border-2 border-blue-750 text-blue-950 rounded-full">
                                                                <ChevronUpIcon
                                                                    className={`${
                                                                        open
                                                                            ? "rotate-180 transform"
                                                                            : ""
                                                                    } h-5 w-5`}
                                                                />
                                                            </span>
                                                            <span className="ml-2 text-lg text-blue-750">
                                                                {open
                                                                    ? "Hide"
                                                                    : "Show"}
                                                            </span>
                                                        </span>
                                                    </Disclosure.Button>
                                                </span>
                                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-lg text-black">
                                                    {step.information}
                                                </Disclosure.Panel>
                                            </span>
                                        </span>
                                    </>
                                ) : step.status === "current" ? (
                                    <>
                                        {stepIdx !== patientSteps.length - 1 ? (
                                            <div
                                                className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                                                aria-hidden="true"
                                            />
                                        ) : null}
                                        <span className="relative flex items-start group">
                                            <span className="h-9 flex items-center">
                                                <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-800">
                                                    <CheckIcon
                                                        className="w-5 h-5 text-white"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </span>
                                            <span>
                                                <span className="ml-4 min-w-0">
                                                    <Disclosure.Button className="text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                        <span className="flex flex-col">
                                                            <span className="text-2xl font-semibold tracking-wide uppercase">
                                                                {step.name}
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                {
                                                                    step.description
                                                                }
                                                            </span>
                                                        </span>
                                                        <span className="flex items-center">
                                                            <span className="inline-flex items-center border-2 border-blue-600 text-blue-600 rounded-full">
                                                                <ChevronUpIcon
                                                                    className={`${
                                                                        open
                                                                            ? "rotate-180 transform"
                                                                            : ""
                                                                    } h-5 w-5`}
                                                                />
                                                            </span>
                                                            <span className="ml-2 text-lg text-blue-600">
                                                                {open
                                                                    ? "Hide"
                                                                    : "Show"}
                                                            </span>
                                                        </span>
                                                    </Disclosure.Button>
                                                </span>
                                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                                    {step.information}
                                                </Disclosure.Panel>
                                            </span>
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        {stepIdx !== patientSteps.length - 1 ? (
                                            <div
                                                className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                                                aria-hidden="true"
                                            />
                                        ) : null}
                                        <span className="relative flex items-start group">
                                            <span className="h-9 flex items-center">
                                                <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-800">
                                                    <CheckIcon
                                                        className="w-5 h-5 text-white"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </span>
                                            <span>
                                                <span className="ml-4 min-w-0">
                                                    <Disclosure.Button className="text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                        <span className="flex flex-col">
                                                            <span className="text-2xl font-semibold tracking-wide uppercase">
                                                                {step.name}
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                {
                                                                    step.description
                                                                }
                                                            </span>
                                                        </span>
                                                        <span className="flex items-center">
                                                            <span className="inline-flex items-center border-2 border-blue-600 text-blue-600 rounded-full">
                                                                <ChevronUpIcon
                                                                    className={`${
                                                                        open
                                                                            ? "rotate-180 transform"
                                                                            : ""
                                                                    } h-5 w-5`}
                                                                />
                                                            </span>
                                                            <span className="ml-2 text-lg text-blue-600">
                                                                {open
                                                                    ? "Hide"
                                                                    : "Show"}
                                                            </span>
                                                        </span>
                                                    </Disclosure.Button>
                                                </span>
                                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                                    {step.information}
                                                </Disclosure.Panel>
                                            </span>
                                        </span>
                                    </>
                                )}
                            </li>
                        )}
                    </Disclosure>
                ))}
            </ol>
        </nav>
    );
}
