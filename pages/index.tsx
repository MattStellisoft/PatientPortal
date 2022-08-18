import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Layout from '../components/Layout';
import { verifyAuth } from '../models/auth';
import { getPatientOverview } from '../models/patients';
import Tag from '../components/Tag';
import Notification from '../components/Notification';
import {
    StatusMessageInterface,
    Errors,
    Breadcrumb,
} from '../interfaces/interfaces';
import { contactApi } from '../models/chad';
import { parseCookies } from '../helpers/parseCookies';
import { getLanguage } from '../models/languages';
import { contactChApi } from '../models/chapi';
import { ExclamationCircleIcon, XIcon } from '@heroicons/react/solid';
import {
    AcademicCapIcon,
    BadgeCheckIcon,
    CashIcon,
    ClockIcon,
    ReceiptRefundIcon,
    UsersIcon,
} from '@heroicons/react/outline';
const actions = [
    {
        title: 'Edit your profile',
        description:
            'Ensure your contact details are up-to-date across NHS services',
        href: '/profile',
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iY3VycmVudENvbG9yIj4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMCA5YTMgMyAwIDEwMC02IDMgMyAwIDAwMCA2em0tNyA5YTcgNyAwIDExMTQgMEgzeiIgY2xpcC1ydWxlPSJldmVub2RkIiAvPgo8L3N2Zz4=',
        iconForeground: 'text-purple-700',
        iconBackground: 'bg-purple-50',
    },
    {
        title: 'Accessibility',
        description:
            'Learn about the various ways in which patients can access our services.',
        href: '#',
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjIiPgogICA8cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMSw5SDE1VjIySDEzVjE2SDExVjIySDlWOUgzVjdIMjFNMTIsMkEyLDIgMCAwLDEgMTQsNEEyLDIgMCAwLDEgMTIsNkMxMC44OSw2IDEwLDUuMSAxMCw0QzEwLDIuODkgMTAuODksMiAxMiwyWiIgLz4KPC9zdmc+',
        iconForeground: 'text-sky-700',
        iconBackground: 'bg-sky-50',
    },
    {
        title: "What's new",
        href: '#',
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMTkgMjBINWEyIDIgMCAwMS0yLTJWNmEyIDIgMCAwMTItMmgxMGEyIDIgMCAwMTIgMnYxbTIgMTNhMiAyIDAgMDEtMi0yVjdtMiAxM2EyIDIgMCAwMDItMlY5YTIgMiAwIDAwLTItMmgtMm0tNC0zSDlNNyAxNmg2TTcgOGg2djRIN1Y4eiIgLz4KPC9zdmc+',
        iconForeground: 'text-yellow-700',
        iconBackground: 'bg-yellow-50',
    },
    {
        title: 'Waiting Well',
        description: 'Supporting you whilst you wait for your appointment',
        href: '#',
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMTIgOHY0bDMgM202LTNhOSA5IDAgMTEtMTggMCA5IDkgMCAwMTE4IDB6IiAvPgo8L3N2Zz4=',
        iconForeground: 'text-rose-700',
        iconBackground: 'bg-rose-50',
    },
    {
        title: 'Find your local service',
        description:
            'Find out about all you need to know about the services we provide in your area.',
        href: 'https://www.connecthealth.co.uk/contact/',
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNOSAyMGwtNS40NDctMi43MjRBMSAxIDAgMDEzIDE2LjM4MlY1LjYxOGExIDEgMCAwMTEuNDQ3LS44OTRMOSA3bTAgMTNsNi0zbS02IDNWN202IDEwbDQuNTUzIDIuMjc2QTEgMSAwIDAwMjEgMTguMzgyVjcuNjE4YTEgMSAwIDAwLS41NTMtLjg5NEwxNSA0bTAgMTNWNG0wIDBMOSA3IiAvPgo8L3N2Zz4=',
        iconForeground: 'text-indigo-700',
        iconBackground: 'bg-indigo-50',
    },
];
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
type Props = {
    patientSteps?: StatusMessageInterface;
    errors: Errors;
    debug: boolean;
    url: string;
    languageStrings: string[];
    breadCrumbs?: Breadcrumb[];
    query?: string;
};
const IndexPage = ({
    patientSteps,
    query,
    debug,
    url,
    breadCrumbs,
    errors,
    languageStrings,
}: Props) => {
    const [hideErrorBanner, setErrorBannerHide] = useState(false);
    const hideBanner = () => setErrorBannerHide(true);
    return (
        <Layout
            page="Homepage"
            title="Homepage | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            breadCrumbs={breadCrumbs}
            query={query}
            url={url}
            data={patientSteps}
            debug={debug}
            languageStrings={languageStrings}
        >
            <main id="main" role="main" className="lg:col-span-12">
                {Object.keys(errors).length > 0 && hideErrorBanner == false && (
                    <div className="fixed inset-x-0 bottom-0 xl:top-0 z-40">
                        {Object.keys(errors).map((key, index) => (
                            <div key={index} className="bg-yellow-400">
                                <div className="max-w-6xl mx-auto py-3 px-3 sm:px-4 lg:px-4">
                                    <div className="flex items-center justify-between flex-wrap">
                                        <div className="w-0 flex-1 flex items-center">
                                            <p className="ml-3 font-medium">
                                                <p>
                                                    {errors[key].name}{' '}
                                                    {errors[key].contact && (
                                                        <a
                                                            href="https://www.connecthealth.co.uk/contact/#services"
                                                            target="_blank"
                                                            className="underline"
                                                        >
                                                            {
                                                                languageStrings[
                                                                    'contactServiceLinkText'
                                                                ]
                                                            }
                                                        </a>
                                                    )}
                                                </p>
                                                <p>
                                                    Error description:{' '}
                                                    {errors[key].description}
                                                </p>
                                            </p>
                                        </div>
                                        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                                            <button
                                                onClick={hideBanner}
                                                type="button"
                                                className="-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black sm:-mr-2"
                                            >
                                                <XIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                                <span className="sr-only">
                                                    Dismiss
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="px-4 sm:px-6 lg:px-0">
                    <div className="pt-4 lg:pt-0 pb-5">
                        <h2 className="mb-4 text-2xl font-extrabold sm:tracking-tight lg:text-4xl">
                            {languageStrings['pathwayPageName']}
                        </h2>
                        <p className="mb-4 text-xl">
                            {languageStrings['pathwayPageDescription']}
                        </p>
                        {patientSteps.autoBookingflag == '1' ? (
                            <Notification
                                link={'/appointment/request'}
                                query={query}
                                title={
                                    languageStrings[
                                        'requestAppointmentAvailable'
                                    ]
                                }
                                message={
                                    languageStrings[
                                        'requestAppointmentAvailableMessage'
                                    ]
                                }
                            ></Notification>
                        ) : (
                            ''
                        )}

                        {typeof patientSteps.stages[0] == 'undefined' ? (
                            <Notification
                                link={'/physionow'}
                                query={query}
                                title={languageStrings['noActiveReferralTitle']}
                                message={
                                    languageStrings['noActiveReferralMessage']
                                }
                            ></Notification>
                        ) : (
                            ''
                        )}

                        <p className="mb-4 text-base">
                            {typeof patientSteps.stages[0] != 'undefined' &&
                            patientSteps.stages[0].Status == 'KCI1'
                                ? languageStrings['pathwayPageStatus'] +
                                  'awaiting your first appointment. '
                                : ''}
                            {languageStrings['pathwayPageExplanation']}
                        </p>

                        <div className="hidden md:block">
                            <ol className="items-center sm:flex">
                                <li className="flex-1 relative mb-6 sm:mb-0">
                                    <a
                                        href={'/appointments' + query}
                                        className="flex items-center"
                                    >
                                        <div className="flex z-10 justify-center items-center w-14 h-14  shrink-0">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                preserveAspectRatio="xMidYMid meet"
                                                aria-hidden="true"
                                                focusable="false"
                                                viewBox="0 0 16 16"
                                                className="w-14 h-14 text-blue-750"
                                            >
                                                <path
                                                    fill={
                                                        patientSteps.stages[0]
                                                            .Appointment == true
                                                            ? 'currentColor'
                                                            : ''
                                                    }
                                                    d="M8,16l-6.9-4V4L8,0l6.9,4v8L8,16z M2,11.5L8,15l6-3.5v-7L8,1L2,4.5V11.5z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="hidden sm:flex w-full bg-black h-0.5 dark:bg-gray-700"></div>
                                    </a>
                                </li>
                                <li className="flex-1 relative mb-6 sm:mb-0">
                                    <a
                                        href={'/documents' + query}
                                        className="flex items-center"
                                    >
                                        <div className="flex z-10 justify-center items-center w-14 h-14  shrink-0">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                preserveAspectRatio="xMidYMid meet"
                                                aria-hidden="true"
                                                focusable="false"
                                                viewBox="0 0 16 16"
                                                className="w-14 h-14 text-blue-750"
                                            >
                                                <path
                                                    fill={
                                                        patientSteps.stages[0]
                                                            .Document == true
                                                            ? 'currentColor'
                                                            : ''
                                                    }
                                                    d="M8,16l-6.9-4V4L8,0l6.9,4v8L8,16z M2,11.5L8,15l6-3.5v-7L8,1L2,4.5V11.5z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="hidden sm:flex w-full bg-black h-0.5 dark:bg-gray-700"></div>
                                    </a>
                                </li>
                                <li className="flex-1 relative mb-6 sm:mb-0">
                                    <a
                                        href={'/questionnaires' + query}
                                        className="flex items-center"
                                    >
                                        <div className="flex z-10 justify-center items-center w-14 h-14  shrink-0">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                preserveAspectRatio="xMidYMid meet"
                                                aria-hidden="true"
                                                focusable="false"
                                                viewBox="0 0 16 16"
                                                className="w-14 h-14 text-blue-600 dark:text-blue-300"
                                            >
                                                <path
                                                    fill={
                                                        patientSteps.stages[0]
                                                            .Questionnaire ==
                                                        true
                                                            ? 'currentColor'
                                                            : ''
                                                    }
                                                    d="M8,16l-6.9-4V4L8,0l6.9,4v8L8,16z M2,11.5L8,15l6-3.5v-7L8,1L2,4.5V11.5z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="hidden sm:flex w-full bg-black h-0.5 dark:bg-gray-700"></div>
                                    </a>
                                </li>
                                <li className="flex-1 relative mb-6 sm:mb-0">
                                    <a
                                        href={'/questionnaires' + query}
                                        className="flex items-center"
                                    >
                                        <div className="flex z-10 justify-center items-center w-14 h-14  shrink-0">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                preserveAspectRatio="xMidYMid meet"
                                                aria-hidden="true"
                                                focusable="false"
                                                viewBox="0 0 16 16"
                                                className="w-14 h-14 text-blue-600 dark:text-blue-300"
                                            >
                                                <path
                                                    fill={
                                                        patientSteps.stages[0]
                                                            .Physionow == true
                                                            ? 'currentColor'
                                                            : ''
                                                    }
                                                    d="M8,16l-6.9-4V4L8,0l6.9,4v8L8,16z M2,11.5L8,15l6-3.5v-7L8,1L2,4.5V11.5z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="hidden sm:flex w-full bg-black h-0.5 dark:bg-gray-700"></div>
                                    </a>
                                </li>
                            </ol>

                            <ol className="sm:flex">
                                <li className="flex-1 relative mb-6 sm:mb-0">
                                    <a href={'/appointments' + query}>
                                        <div className="mt-3 sm:pr-8">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Your Appointments
                                            </h3>
                                            {typeof patientSteps.stages[0] !=
                                                'undefined' &&
                                            patientSteps.stages[0]
                                                .Appointment == true ? (
                                                <Tag
                                                    text={
                                                        languageStrings[
                                                            'appointmentsActionRequired'
                                                        ]
                                                    }
                                                    bgColour="bg-yellow-400"
                                                    textColour="text-black"
                                                    textSize="text-base"
                                                    uppercase={false}
                                                ></Tag>
                                            ) : (
                                                <p className="text-base font-normal">
                                                    {
                                                        languageStrings[
                                                            'appointmentsNoActionRequired'
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </a>
                                </li>
                                <li className="flex-1 relative mb-6 sm:mb-0">
                                    <a href={'/documents' + query}>
                                        <div className="mt-3 sm:pr-8">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Your Documents
                                            </h3>
                                            {typeof patientSteps.stages[0] !=
                                                'undefined' &&
                                            patientSteps.stages[0].Document ==
                                                true ? (
                                                <Tag
                                                    text={
                                                        languageStrings[
                                                            'documentsActionRequired'
                                                        ]
                                                    }
                                                    bgColour="bg-yellow-500"
                                                    textColour="text-blue-950"
                                                    textSize="text-base"
                                                    uppercase="true"
                                                ></Tag>
                                            ) : (
                                                <p className="text-base font-normal">
                                                    {
                                                        languageStrings[
                                                            'documentsNoActionRequired'
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </a>
                                </li>
                                <li className="flex-1 relative mb-6 sm:mb-0">
                                    <a href={'/questionnaires' + query}>
                                        <div className="mt-3 sm:pr-8">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Your Questionnaires
                                            </h3>
                                            {typeof patientSteps.stages[0] !=
                                                'undefined' &&
                                            patientSteps.stages[0]
                                                .Questionnaire == true ? (
                                                <Tag
                                                    text={
                                                        languageStrings[
                                                            'questionnairesActionRequired'
                                                        ]
                                                    }
                                                    bgColour="bg-yellow-500"
                                                    textColour="text-blue-950"
                                                    textSize="text-base"
                                                    uppercase="true"
                                                ></Tag>
                                            ) : (
                                                <p className="text-base font-normal">
                                                    {
                                                        languageStrings[
                                                            'questionnairesNoActionRequired'
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </a>
                                </li>
                                <li className="flex-1 relative mb-6 sm:mb-0">
                                    <a href={'/programmes' + query}>
                                        <div className="mt-3 sm:pr-8">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Your Exercises
                                            </h3>
                                            {typeof patientSteps.stages[0] !=
                                                'undefined' &&
                                            patientSteps.stages[0].Physionow ==
                                                true ? (
                                                <Tag
                                                    text={
                                                        languageStrings[
                                                            'exercisesActionRequired'
                                                        ]
                                                    }
                                                    bgColour="bg-yellow-500"
                                                    textColour="text-blue-950"
                                                    textSize="text-base"
                                                    uppercase="true"
                                                ></Tag>
                                            ) : (
                                                <p className="text-base font-normal">
                                                    {
                                                        languageStrings[
                                                            'exercisesNoActionRequired'
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </a>
                                </li>
                            </ol>
                        </div>

                        <div className="block md:hidden">
                            <ol role="list" className="">
                                <li className="pb-10">
                                    <a
                                        className="relative flex items-start group"
                                        href={'/appointments' + query}
                                    >
                                        <span className="flex items-center">
                                            <span className="relative z-10 w-14 h-14 flex items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    preserveAspectRatio="xMidYMid meet"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    viewBox="0 0 16 16"
                                                    className="w-14 h-14 text-blue-600 dark:text-blue-300"
                                                >
                                                    <path d="M8,16l-6.9-4V4L8,0l6.9,4v8L8,16z M2,11.5L8,15l6-3.5v-7L8,1L2,4.5V11.5z"></path>
                                                </svg>
                                            </span>
                                        </span>
                                        <span className="ml-4 min-w-0 flex flex-col">
                                            <span className="text-lg font-medium">
                                                Your Appointments
                                            </span>
                                            {typeof patientSteps.stages[0] !=
                                                'undefined' &&
                                            patientSteps.stages[0]
                                                .Appointment == true ? (
                                                <Tag
                                                    text="Action required"
                                                    bgColour="bg-yellow-500"
                                                    textColour="text-blue-950"
                                                    textSize="text-base"
                                                    uppercase={false}
                                                ></Tag>
                                            ) : (
                                                <p className="text-base font-normal">
                                                    No action required.
                                                </p>
                                            )}
                                        </span>
                                    </a>
                                </li>
                                <li className="pb-10">
                                    <a
                                        href={'/documents' + query}
                                        className="relative flex items-start group"
                                    >
                                        <span className="flex items-center">
                                            <span className="relative z-10 w-14 h-14 flex items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    preserveAspectRatio="xMidYMid meet"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    viewBox="0 0 16 16"
                                                    className="w-14 h-14 text-blue-600 dark:text-blue-300"
                                                >
                                                    <path d="M8,16l-6.9-4V4L8,0l6.9,4v8L8,16z M2,11.5L8,15l6-3.5v-7L8,1L2,4.5V11.5z"></path>
                                                </svg>
                                            </span>
                                        </span>
                                        <span className="ml-4 min-w-0 flex flex-col">
                                            <span className="text-lg font-medium">
                                                Your Documents
                                            </span>
                                            {typeof patientSteps.stages[0] !=
                                                'undefined' &&
                                            patientSteps.stages[0].Document ==
                                                true ? (
                                                <Tag
                                                    text="Action required"
                                                    bgColour="bg-yellow-500"
                                                    textColour="text-blue-950"
                                                    textSize="text-base"
                                                    uppercase="true"
                                                ></Tag>
                                            ) : (
                                                <p className="text-base font-normal">
                                                    No action required.
                                                </p>
                                            )}
                                        </span>
                                    </a>
                                </li>
                                <li className="pb-10">
                                    <a
                                        href={'/questionnaires' + query}
                                        className="relative flex items-start group"
                                    >
                                        <span className="flex items-center">
                                            <span className="relative z-10 w-14 h-14 flex items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    preserveAspectRatio="xMidYMid meet"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    viewBox="0 0 16 16"
                                                    className="w-14 h-14 text-blue-600 dark:text-blue-300"
                                                >
                                                    <path d="M8,16l-6.9-4V4L8,0l6.9,4v8L8,16z M2,11.5L8,15l6-3.5v-7L8,1L2,4.5V11.5z"></path>
                                                </svg>
                                            </span>
                                        </span>
                                        <span className="ml-4 min-w-0 flex flex-col">
                                            <span className="text-lg font-medium">
                                                Your Questionnaires
                                            </span>
                                            {typeof patientSteps.stages[0] !=
                                                'undefined' &&
                                            patientSteps.stages[0]
                                                .Questionnaire == true ? (
                                                <Tag
                                                    text="Action required"
                                                    bgColour="bg-yellow-500"
                                                    textColour="text-blue-950"
                                                    textSize="text-base"
                                                    uppercase="true"
                                                ></Tag>
                                            ) : (
                                                <p className="text-base font-normal">
                                                    No action required.
                                                </p>
                                            )}
                                        </span>
                                    </a>
                                </li>
                                <li className="pb-10">
                                    <a
                                        href={'/programmes' + query}
                                        className="relative flex items-start group"
                                    >
                                        <span className="flex items-center">
                                            <span className="relative z-10 w-14 h-14 flex items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    preserveAspectRatio="xMidYMid meet"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    viewBox="0 0 16 16"
                                                    className="w-14 h-14 text-blue-600 dark:text-blue-300"
                                                >
                                                    <path d="M8,16l-6.9-4V4L8,0l6.9,4v8L8,16z M2,11.5L8,15l6-3.5v-7L8,1L2,4.5V11.5z"></path>
                                                </svg>
                                            </span>
                                        </span>
                                        <span className="ml-4 min-w-0 flex flex-col">
                                            <span className="text-lg font-medium">
                                                Your Exercises
                                            </span>
                                            {typeof patientSteps.stages[0] !=
                                                'undefined' &&
                                            patientSteps.stages[0].Physionow ==
                                                true ? (
                                                <Tag
                                                    text="Action required"
                                                    bgColour="bg-yellow-500"
                                                    textColour="text-blue-950"
                                                    textSize="text-base"
                                                    uppercase="true"
                                                ></Tag>
                                            ) : (
                                                <p className="text-base font-normal">
                                                    No action required.
                                                </p>
                                            )}
                                        </span>
                                    </a>
                                </li>
                            </ol>
                        </div>

                        <h3 className="mt-12 mb-4 text-xl font-extrabold sm:tracking-tight lg:text-2xl">
                            {languageStrings['pathwayPageQuickLinksHeading']}
                        </h3>

                        <div className="overflow-hidden sm:divide-y-0 sm:grid sm:grid-cols-2 gap-4 mt-10">
                            {actions.map((action, actionIdx) => (
                                <div
                                    key={action.title}
                                    className="relative rounded-lg group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-750 mb-4 sm:mb-0"
                                >
                                    <div>
                                        <span className="relative inline-flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                preserveAspectRatio="xMidYMid meet"
                                                aria-hidden="true"
                                                focusable="false"
                                                viewBox="0 0 16 16"
                                                className="h-14 w-14"
                                            >
                                                <path d="M8,16l-6.9-4V4L8,0l6.9,4v8L8,16z M2,11.5L8,15l6-3.5v-7L8,1L2,4.5V11.5z"></path>
                                            </svg>
                                            <img
                                                src={action.icon}
                                                alt="GP Appointments Data Dashboard"
                                                className="absolute align-center"
                                                width="25"
                                                height="25"
                                            ></img>
                                        </span>
                                    </div>
                                    <div className="mt-8">
                                        <h3 className="text-lg font-medium">
                                            <a
                                                href={action.href + query}
                                                className="focus:outline-none"
                                            >
                                                {/* Extend touch target to entire panel */}
                                                <span
                                                    className="absolute inset-0"
                                                    aria-hidden="true"
                                                />
                                                {action.title}
                                            </a>
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            {action.description}
                                        </p>
                                    </div>
                                    <span
                                        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            className="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                        </svg>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};
export const getServerSideProps: GetServerSideProps = async ({
    req,
    locale,
    query,
}) => {
    const debug: boolean = query?.debug ? Boolean(query?.debug) : false;
    if (typeof req.cookies.session_id == 'undefined') {
        var authorisedUser = await verifyAuth(
            req,
            query,
            process.env.NEXT_PRODUCTION,
        );
        if (authorisedUser == false) {
            return {
                redirect: {
                    destination: '/signin',
                    permanent: false,
                },
                props: {},
            };
        }
    }
    let errors: Errors = {};
    //Build a querystring that will persist the test user params across the application (when applicable).
    let queryString: string = '';
    if (query.testuser) {
        queryString = '?testuser=' + query.testuser;
        if (query.usecher) {
            queryString += '&usecher=true';
        }
        if (query.debug) {
            queryString += '&debug=true';
        }
    }
    //Fetch language strings using current locale.
    let currentLocale: string = req.cookies.NEXT_LOCALE || locale;
    const localLanguageStrings = getLanguage('index', currentLocale);
    const globalLanguageStrings = getLanguage('global', currentLocale);
    const languageStrings = {
        ...localLanguageStrings,
        ...globalLanguageStrings,
    };
    if (
        typeof process.env.usecher != 'undefined' ||
        (typeof query.usecher != 'undefined' &&
            typeof query.testuser != 'undefined')
    ) {
        const request = {
            Resource: 'Overview',
            Endpoint: 'Overview',
            Method: 'Overview',
            Body: {
                requestJson: {
                    NHSNumber: query.testuser
                        ? query.testuser
                        : authorisedUser.nhs_number,
                },
            },
        };
        var { statusMessage, statusCode } = await contactApi(request);
    } else if (typeof req.cookies.session_id != 'undefined') {
        let url = new URL(
            process.env.NEXT_URL + process.env.NEXT_API_PATH + 'overview',
        );
        const options: RequestInit = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                sessionId: req.cookies.session_id,
            }),
        };
        const response = await fetch(url, options);
        var { statusMessage, statusCode } = await response.json();
    }
    if (
        typeof statusMessage != 'undefined' &&
        statusMessage.autoBookingflag == '0'
    ) {
        errors['autoBookingDisabled'] = {
            name: '',
            description: '',
            contact: false,
        };
        errors['autoBookingDisabled']['name'] =
            languageStrings['autoBookingDisabled'];
    }
    if (typeof query?.error != 'undefined') {
        const error: string = query?.error.toString();
        errors[error] = { name: '', description: '', contact: false };
        if (typeof languageStrings[error] != 'undefined') {
            if (error == 'generic_contact_us') {
                errors[error]['contact'] = true;
            }
            errors[error]['name'] = languageStrings[error];
        }
        if (typeof query?.errorMessage != 'undefined') {
            errors[error].description = query?.errorMessage.toString();
        }
    }
    const breadCrumbs: Breadcrumb[] = [];
    return {
        props: {
            url: process.env.NEXT_URL,
            debug: debug,
            patientSteps:
                typeof statusMessage != 'undefined'
                    ? statusMessage
                    : { stages: [] },
            errors: errors,
            query: queryString,
            breadCrumbs: breadCrumbs,
            languageStrings: languageStrings,
        },
    };
};
export default IndexPage;
