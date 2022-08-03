import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
export default function DebugBar({ languageStrings, data, errors, url }) {
    return (
        <div className="w-full">
            <div className="w-full bg-white">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between bg-blue-750 px-4 py-2 text-left text-base font-bold text-white hover:bg-blue-950 focus:outline-none focus-visible:ring focus-visible:ring-blue-750 focus-visible:ring-opacity-75">
                                <span>Language Strings</span>
                                <ChevronUpIcon
                                    className={`${
                                        open ? "rotate-180 transform" : ""
                                    } h-5 w-5 text-white`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                <pre>
                                    {JSON.stringify(languageStrings, null, 4)}
                                </pre>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between bg-blue-750 px-4 py-2 text-left text-base font-bold text-white hover:bg-blue-950 focus:outline-none focus-visible:ring focus-visible:ring-blue-750 focus-visible:ring-opacity-75">
                                <span>Page Data</span>
                                <ChevronUpIcon
                                    className={`${
                                        open ? "rotate-180 transform" : ""
                                    } h-5 w-5 text-white`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                {data ? (
                                    <pre>{JSON.stringify(data, null, 4)}</pre>
                                ) : (
                                    <p>No data</p>
                                )}
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                {typeof url != "undefined" && (
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between bg-blue-750 px-4 py-2 text-left text-base font-bold text-white hover:bg-blue-950 focus:outline-none focus-visible:ring focus-visible:ring-blue-750 focus-visible:ring-opacity-75">
                                    <span>Help</span>
                                    <ChevronUpIcon
                                        className={`${
                                            open ? "rotate-180 transform" : ""
                                        } h-5 w-5 text-white`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                    <div className="space-y-6">
                                        <h2 className="text-lg font-bold">
                                            NHS Login Test Credentials
                                        </h2>
                                        <a
                                            href={url + "/signin"}
                                            className="block hover:underline text-blue-600"
                                            target="_blank"
                                        >
                                            Click this link to open the sign in
                                            the page in a new window and then
                                            enter the following credentials
                                        </a>
                                        <table className="min-w-full table-fixed divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Email Address
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Password
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        OTP Code
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        IM1
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Proofing Level
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        NHS Number
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        testuserlive@demo.signin.nhs.uk
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        Passw0rd$1
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        190696
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        Yes
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        P9
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        9686368973
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        testuserlive+1@demo.signin.nhs.uk
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        Passw0rd$1
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        190696
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        No
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        P9
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        9686368906
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        testuserlive+3@demo.signin.nhs.uk
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        Passw0rd$1
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        190696
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        Yes
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        P9
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        9658218873
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        testuserlive+5@demo.signin.nhs.uk
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        Passw0rd$1
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        190696
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        No
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        P5
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        9658218873
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <h2 className="text-lg font-bold">
                                            Test user access
                                        </h2>
                                        <p>
                                            Select a test user with which to
                                            access the portal
                                        </p>
                                        <table className="min-w-full table-fixed divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Link
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        <a
                                                            href="/?testuser=968636876973"
                                                            className="block hover:underline text-blue-600"
                                                            target="_blank"
                                                        >
                                                            Test User 1
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        <a
                                                            href="/?testuser=968636876974"
                                                            className="block hover:underline text-blue-600"
                                                            target="_blank"
                                                        >
                                                            Test User 2
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        <a
                                                            href="/?testuser=968636876975"
                                                            className="block hover:underline text-blue-600"
                                                            target="_blank"
                                                        >
                                                            Test User 3
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <h2 className="text-lg font-bold">
                                            SSO Document View
                                        </h2>
                                        <a
                                            href={
                                                url +
                                                "/document/7282380E-39D2-4702-8097-35B474CD1D29?UUID=7282380E-39D2-4702-8097-35B474CD1D29"
                                            }
                                            className="block hover:underline text-blue-600"
                                            target="_blank"
                                        >
                                            Click this link to open the document
                                            page in a new window and then enter
                                            the following credentials
                                        </a>
                                        <table className="min-w-full table-fixed divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Field
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Value
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        DOB
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        15/08/1957
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        Postcode
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        HP235SB
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        Phone
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        07764589005
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <h2 className="text-lg font-bold">
                                            SSO Questionnaire Page
                                        </h2>
                                        <a
                                            href={
                                                url +
                                                "/questionnaires?UUID=4fc69c50-d4a6-4aa6-a7ad-92e1c321229e"
                                            }
                                            className="block hover:underline text-blue-600"
                                            target="_blank"
                                        >
                                            Click this link to open the
                                            questionnaire page for a test user
                                            in a new window.
                                        </a>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                )}
                <Disclosure as="div">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between bg-blue-750 px-4 py-2 text-left text-base font-bold text-white hover:bg-blue-950 focus:outline-none focus-visible:ring focus-visible:ring-blue-750 focus-visible:ring-opacity-75">
                                <span>Errors</span>
                                <ChevronUpIcon
                                    className={`${
                                        open ? "rotate-180 transform" : ""
                                    } h-5 w-5 text-white`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                {errors ? (
                                    <pre>{JSON.stringify(errors, null, 4)}</pre>
                                ) : (
                                    <p>No errors</p>
                                )}
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    );
}
