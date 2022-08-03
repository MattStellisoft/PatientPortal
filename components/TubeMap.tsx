/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";
import { pluralise } from "../helpers/pluralise";

function classNameNames(...classNamees) {
    return classNamees.filter(Boolean).join(" ");
}

export default function TubeMap({ patientSteps, languageStrings }) {
    return (
        <main
            id="main"
            role="main"
            className="relative lg:col-span-9 px-6 py-5 sm:px-0 gutter-spacious"
        >
            {/* Intro */}
            <div
                className="relative z-20 mx-auto wide-block js-section"
                id="home-code"
                data-color-mode="dark"
                data-light-theme="light"
                data-dark-theme="dark"
            >
                <div className="container-xl p-responsive">
                    <div className="flex flex-col gutter gutter-spacious">
                        <div className="col-11 col-sm-10 offset-1">
                            <ul className="home-git-log-dark relative flex gutter gutter-spacious flex-col list-style-none pb-5">
                                <li className="col-12 flex items-center relative text-gray-700 unselectable">
                                    {/* <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        height="28"
                                        viewBox="0 0 28 20"
                                        width="28"
                                        aria-hidden="true"
                                        className="home-git-icon home-git-item float-left mr-n6 relative z-10"
                                    >
                                        <circle
                                            cx="14"
                                            cy="10"
                                            fill="#fff"
                                            r="5"
                                            stroke="#d0d6df"
                                            strokeWidth="2"
                                        ></circle>
                                    </svg> */}
                                    <svg
                                        aria-hidden="true"
                                        className="home-git-icon mr-3 bg-gray-50 rounded-full home-git-item float-left w-8 h-8 mr-n6 relative z-10 text-blue-750"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="61.878"
                                        width="61.792"
                                        viewBox="0 0 70 70"
                                        fill="currentColor"
                                    >
                                        <path d="M22.913 61.065C.89 54.34-7.296 27.455 7.441 10.239c1.95-2.278 6.242-5.467 9.652-7.17C22.23.5 24.403 0 30.395 0c4.073 0 9.288.723 12.09 1.676C49.093 3.923 57.96 12.73 60.177 19.25L61.792 24H37.913v-6.045c0-5.086-.39-6.436-2.454-8.5-2.95-2.95-5.514-3.11-8.685-.543-2.335 1.89-2.36 2.125-2.36 21.395 0 17.91.157 19.657 1.948 21.637 1.434 1.584 2.882 2.074 5.477 1.855 4.477-.38 6.04-3.228 6.06-11.049l.014-5.75h23.86l-.884 3.084c-2.644 9.22-10.946 17.523-20.407 20.41-5.198 1.587-13.37 1.853-17.569.57Z" />
                                        <path d="M25.97 61.346C17.9 60.265 9.41 54.276 4.712 46.35c-5.422-9.147-5.846-20.297-1.13-29.68 2.189-4.354 4.124-6.697 7.987-9.67C18.14 1.946 25.253-.312 32.666.305c9.121.759 13.216 2.44 19.01 7.805 4.302 3.983 6.957 7.77 8.577 12.232l1.24 3.414h-23.16l-.032-3.734c-.054-6.574-.6-8.57-2.95-10.761-2.85-2.658-4.363-2.96-7.227-1.44-3.678 1.95-3.699 2.075-3.695 22.228.001 10.098.221 18.445.514 19.498.281 1.013 1.11 2.403 1.842 3.09 1.102 1.035 1.85 1.247 4.344 1.232 5.134-.03 6.531-2.227 7.037-11.07l.323-5.651h23.09l-.356 1.158C59.281 44.63 57.1 48.312 52.753 52.6c-6.927 6.83-16.86 10.074-26.782 8.746z" />
                                    </svg>
                                    <h3 className="font-bold">
                                        {languageStrings[patientSteps["KCI 1"]]}
                                    </h3>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* Questionnaires */}
            {patientSteps["KCI 2"] && (
                <div className="relative z-20 mx-auto wide-block">
                    <div className="container-xl p-responsive">
                        <div className="flex flex-col gutter gutter-spacious">
                            <div className="col-11 col-sm-10 offset-1">
                                <ul className="relative home-git-log-dark flex gutter gutter-spacious flex-col list-style-none pt-5">
                                    <li
                                        className="col-12 flex items-center relative text-gray-700 py-2 unselectable"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            height="22"
                                            width="28"
                                            aria-hidden="true"
                                            className="home-git-icon home-git-item flex-shrink-0 mr-3 relative z-10"
                                        >
                                            <path
                                                d="m2.5 10a1 1 0 1 0 0 2zm23 2a1 1 0 1 0 0-2zm-23 0h23v-2h-23z"
                                                fill="#465061"
                                            ></path>
                                            <circle
                                                cx="14"
                                                cy="11"
                                                fill="#FFF"
                                                r="5"
                                                stroke="#465061"
                                                strokeWidth="2"
                                            ></circle>
                                        </svg>
                                        <span className="truncate">
                                            {languageStrings["kci2_heading"]}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Questionnaire reminder */}
            <div className="overflow-hidden w-full relative z-10">
                <div className="container-xl p-responsive mx-auto">
                    <div className="flex flex-col relative gutter-spacious">
                        <div className="home-git-log-light relative width-full offset-md-1 col-12">
                            <div className="flex flex-col mx-6 gutter-spacious ">
                                {/* KCI 2: Pre-appointment questionnaire */}
                                <div className="home-branch-container relative text-gray-700 z-1">
                                    {patientSteps["KCI 2"] && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            stroke="#dadfe9"
                                            fill="none"
                                            preserveAspectRatio="none"
                                            viewBox="0 0 110 142"
                                            className="d-none d-md-block relative home-branch offset-n1"
                                        >
                                            <path
                                                d="m1-8c0 75 108 75 108 150"
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                            ></path>
                                        </svg>
                                    )}
                                </div>
                                {patientSteps["KCI 2"] && (
                                    <>
                                        <div className="home-git-log-light relative col-10 offset-1 pb-5 pb-md-6 pt-6 pt-md-0">
                                            <div className="col-6-max">
                                                <div className=" mb-md-6 mt-n3">
                                                    <div
                                                        className="flex items-center relative z-10 unselectable"
                                                        aria-hidden="true"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            height="20"
                                                            viewBox="0 0 28 20"
                                                            width="28"
                                                            className="home-git-icon home-git-item flex-shrink-0 mr-3 relative z-10"
                                                        >
                                                            <circle
                                                                cx="14"
                                                                cy="10"
                                                                fill="#fff"
                                                                r="5"
                                                                stroke="#d0d6df"
                                                                strokeWidth="2"
                                                            ></circle>
                                                        </svg>
                                                        <span className="">
                                                            {
                                                                languageStrings[
                                                                    "questionnaires_outstanding_1"
                                                                ]
                                                            }{" "}
                                                            {
                                                                patientSteps[
                                                                    "KCI 2"
                                                                ]
                                                            }{" "}
                                                            {pluralise(
                                                                patientSteps[
                                                                    "KCI 2"
                                                                ],
                                                                languageStrings[
                                                                    "questionnaires_outstanding_2"
                                                                ]
                                                            )}{" "}
                                                            {
                                                                languageStrings[
                                                                    "questionnaires_outstanding_3"
                                                                ]
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {patientSteps["KCI 2.1"] && (
                                            <div className="col-12 offset-1 relative">
                                                <ul className="home-git-log-light relative flex gutter gutter-spacious flex-col list-style-none ">
                                                    <li className="col-11 col-sm-10 col-lg-12">
                                                        <div
                                                            className="flex flex-col flex-lg-row items-center gutter gutter-spacious"
                                                            style={{
                                                                padding:
                                                                    "8% 0 10.5%",
                                                            }}
                                                        >
                                                            <div className="col-12 col-lg-5">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    height="28"
                                                                    viewBox="0 0 28 20"
                                                                    width="28"
                                                                    className="home-git-icon home-git-item float-left mr-n6 relative z-10"
                                                                >
                                                                    <circle
                                                                        cx="14"
                                                                        cy="10"
                                                                        fill="#fff"
                                                                        r="5"
                                                                        stroke="#d0d6df"
                                                                        strokeWidth="2"
                                                                    ></circle>
                                                                </svg>
                                                                <h3 className="js-build-in-item build-in-slideX-left f2-mktg text-gray-mktg lh-condensed text-semibold  mb-lg-0 col-5-max">
                                                                    {
                                                                        patientSteps[
                                                                            "KCI 2.1"
                                                                        ]
                                                                    }
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                        <div className="home-branch-container relative z-10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                stroke="#dadfe9"
                                                preserveAspectRatio="none"
                                                viewBox="0 0 110 142"
                                                aria-hidden="true"
                                                className="d-none d-md-block relative home-branch offset-n1"
                                                style={{
                                                    transform: "scaleX(-1)",
                                                }}
                                            >
                                                <path
                                                    d="m1-8c0 75 108 75 108 150"
                                                    strokeWidth="2"
                                                    vectorEffect="non-scaling-stroke"
                                                ></path>
                                            </svg>
                                            {/* <div
                                        className="flex items-center"
                                        style={{ marginLeft: "-2.3125rem" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            height="20"
                                            viewBox="0 0 28 20"
                                            width="28"
                                            aria-hidden="true"
                                            className="home-git-icon flex-shrink-0 mr-3 d-none d-md-block"
                                        >
                                            <circle
                                                cx="14"
                                                cy="10"
                                                fill="#fff"
                                                r="5"
                                                stroke="#d0d6df"
                                                strokeWidth="2"
                                            ></circle>
                                        </svg>
                                    </div> */}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Appointment Booking */}
            {patientSteps["KCI 3"] && (
                <div className="relative z-20 mx-auto wide-block">
                    <div className="container-xl p-responsive">
                        <div className="flex flex-col gutter gutter-spacious">
                            <div className="col-11 col-sm-10 offset-1">
                                <ul className="relative home-git-log-dark flex gutter gutter-spacious flex-col list-style-none pt-5">
                                    <li
                                        className="col-12 flex items-center relative text-gray-700 py-2 unselectable"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            height="22"
                                            width="28"
                                            aria-hidden="true"
                                            className="home-git-icon home-git-item flex-shrink-0 mr-3 relative z-10"
                                        >
                                            <path
                                                d="m2.5 10a1 1 0 1 0 0 2zm23 2a1 1 0 1 0 0-2zm-23 0h23v-2h-23z"
                                                fill="#465061"
                                            ></path>
                                            <circle
                                                cx="14"
                                                cy="11"
                                                fill="#FFF"
                                                r="5"
                                                stroke="#465061"
                                                strokeWidth="2"
                                            ></circle>
                                        </svg>
                                        <span className="truncate">
                                            {languageStrings["kci3_heading"]}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Appointment Confirmation */}
            <div className="overflow-hidden w-full relative z-10">
                <div className="container-xl p-responsive mx-auto">
                    <div className="flex flex-col relative gutter-spacious">
                        <div className="home-git-log-light relative width-full offset-md-1 col-12">
                            <div className="flex flex-col mx-6 gutter-spacious ">
                                {/* KCI 3: Initiate appointment booking */}
                                <div className="home-branch-container relative text-gray-700 z-1">
                                    {patientSteps["KCI 3"] == "booked" && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            stroke="#dadfe9"
                                            fill="none"
                                            preserveAspectRatio="none"
                                            viewBox="0 0 110 142"
                                            className="d-none d-md-block relative home-branch offset-n1"
                                        >
                                            <path
                                                d="m1-8c0 75 108 75 108 150"
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                            ></path>
                                        </svg>
                                    )}
                                </div>
                                {patientSteps["KCI 3"] == "booked" && (
                                    <>
                                        <div className="home-git-log-light relative col-10 offset-1 pb-5 pb-md-6 pt-6 pt-md-0">
                                            <div className="col-6-max">
                                                <div className=" mb-md-6 mt-n3">
                                                    <div
                                                        className="flex items-center relative z-10 unselectable"
                                                        aria-hidden="true"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            height="20"
                                                            viewBox="0 0 28 20"
                                                            width="28"
                                                            className="home-git-icon home-git-item flex-shrink-0 mr-3 relative z-10"
                                                        >
                                                            <circle
                                                                cx="14"
                                                                cy="10"
                                                                fill="#fff"
                                                                r="5"
                                                                stroke="#d0d6df"
                                                                strokeWidth="2"
                                                            ></circle>
                                                        </svg>
                                                        {
                                                            languageStrings[
                                                                "kci31_heading"
                                                            ]
                                                        }
                                                    </div>
                                                </div>
                                                <p>
                                                    Please go to the
                                                    appointments page to review
                                                    and confirm/ reject your
                                                    appointment.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="home-branch-container relative z-10 ">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                stroke="#dadfe9"
                                                preserveAspectRatio="none"
                                                viewBox="0 0 110 142"
                                                aria-hidden="true"
                                                className="d-none d-md-block relative home-branch offset-n1"
                                                style={{
                                                    transform: "scaleX(-1)",
                                                }}
                                            >
                                                <path
                                                    d="m1-8c0 75 108 75 108 150"
                                                    strokeWidth="2"
                                                    vectorEffect="non-scaling-stroke"
                                                ></path>
                                            </svg>

                                            {/* <div
                                        className="flex items-center"
                                        style={{ marginLeft: "-2.3125rem" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            height="20"
                                            viewBox="0 0 28 20"
                                            width="28"
                                            aria-hidden="true"
                                            className="home-git-icon flex-shrink-0 mr-3 d-none d-md-block"
                                        >
                                            <circle
                                                cx="14"
                                                cy="10"
                                                fill="#fff"
                                                r="5"
                                                stroke="#d0d6df"
                                                strokeWidth="2"
                                            ></circle>
                                        </svg>
                                    </div> */}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Appointment Reminder */}
            {patientSteps["KCI 4"] && (
                <div className="relative z-20 mx-auto wide-block">
                    <div className="container-xl p-responsive">
                        <div className="flex flex-col gutter gutter-spacious">
                            <div className="col-11 col-sm-10 offset-1">
                                <ul className="relative home-git-log-dark flex gutter gutter-spacious flex-col list-style-none pt-5">
                                    <li
                                        className="col-12 flex items-center relative text-gray-700 py-2 unselectable"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            height="22"
                                            width="28"
                                            aria-hidden="true"
                                            className="home-git-icon home-git-item flex-shrink-0 mr-3 relative z-10"
                                        >
                                            <path
                                                d="m2.5 10a1 1 0 1 0 0 2zm23 2a1 1 0 1 0 0-2zm-23 0h23v-2h-23z"
                                                fill="#465061"
                                            ></path>
                                            <circle
                                                cx="14"
                                                cy="11"
                                                fill="#FFF"
                                                r="5"
                                                stroke="#465061"
                                                strokeWidth="2"
                                            ></circle>
                                        </svg>
                                        <span className="truncate">
                                            {languageStrings["kci4_heading"]}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="overflow-hidden w-full relative z-10">
                <div className="container-xl p-responsive mx-auto">
                    <div className="flex flex-col relative gutter-spacious">
                        <div className="home-git-log-light relative width-full offset-md-1 col-12">
                            <div className="flex flex-col mx-6 gutter-spacious ">
                                {/* KCI 4: Appointment reminder */}
                                <div className="home-branch-container relative text-gray-700 z-1">
                                    {(patientSteps["KCI 3"] == "Confirmed" ||
                                        patientSteps["KCI 3"] ==
                                            "CancelledByPcc") && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            stroke="#dadfe9"
                                            fill="none"
                                            preserveAspectRatio="none"
                                            viewBox="0 0 110 142"
                                            className="d-none d-md-block relative home-branch offset-n1"
                                        >
                                            <path
                                                d="m1-8c0 75 108 75 108 150"
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                            ></path>
                                        </svg>
                                    )}
                                </div>
                                {(patientSteps["KCI 3"] == "Confirmed" ||
                                    patientSteps["KCI 3"] ==
                                        "CancelledByPcc") && (
                                    <>
                                        <div className="home-git-log-light relative col-10 offset-1 pb-5 pb-md-6 pt-6 pt-md-0">
                                            <div className="col-6-max">
                                                <div className=" mb-md-6 mt-n3">
                                                    <div
                                                        className="flex items-center relative z-10 unselectable"
                                                        aria-hidden="true"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            height="20"
                                                            viewBox="0 0 28 20"
                                                            width="28"
                                                            className="home-git-icon home-git-item flex-shrink-0 mr-3 relative z-10"
                                                        >
                                                            <circle
                                                                cx="14"
                                                                cy="10"
                                                                fill="#fff"
                                                                r="5"
                                                                stroke="#d0d6df"
                                                                strokeWidth="2"
                                                            ></circle>
                                                        </svg>
                                                        {
                                                            languageStrings[
                                                                "kci41_heading"
                                                            ]
                                                        }
                                                    </div>
                                                </div>
                                                <p>
                                                    We're sorry to inform you
                                                    that we have cancelled your
                                                    appointment.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="home-branch-container relative z-10 ">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                stroke="#dadfe9"
                                                preserveAspectRatio="none"
                                                viewBox="0 0 110 142"
                                                aria-hidden="true"
                                                className="d-none d-md-block relative home-branch offset-n1"
                                                style={{
                                                    transform: "scaleX(-1)",
                                                }}
                                            >
                                                <path
                                                    d="m1-8c0 75 108 75 108 150"
                                                    strokeWidth="2"
                                                    vectorEffect="non-scaling-stroke"
                                                ></path>
                                            </svg>

                                            {/* <div
                                        className="flex items-center"
                                        style={{ marginLeft: "-2.3125rem" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            height="20"
                                            viewBox="0 0 28 20"
                                            width="28"
                                            aria-hidden="true"
                                            className="home-git-icon flex-shrink-0 mr-3 d-none d-md-block"
                                        >
                                            <circle
                                                cx="14"
                                                cy="10"
                                                fill="#fff"
                                                r="5"
                                                stroke="#d0d6df"
                                                strokeWidth="2"
                                            ></circle>
                                        </svg>
                                    </div> */}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Appointment referral */}
            {patientSteps["KCI 5"] && (
                <div className="relative z-20 mx-auto wide-block">
                    <div className="container-xl p-responsive">
                        <div className="flex flex-col gutter gutter-spacious">
                            <div className="col-11 col-sm-10 offset-1">
                                <ul className="relative home-git-log-dark flex gutter gutter-spacious flex-col list-style-none pt-5">
                                    <li
                                        className="col-12 flex items-center relative text-gray-700 py-2 unselectable"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            height="22"
                                            width="28"
                                            aria-hidden="true"
                                            className="home-git-icon home-git-item flex-shrink-0 mr-3 relative z-10"
                                        >
                                            <path
                                                d="m2.5 10a1 1 0 1 0 0 2zm23 2a1 1 0 1 0 0-2zm-23 0h23v-2h-23z"
                                                fill="#465061"
                                            ></path>
                                            <circle
                                                cx="14"
                                                cy="11"
                                                fill="#FFF"
                                                r="5"
                                                stroke="#465061"
                                                strokeWidth="2"
                                            ></circle>
                                        </svg>
                                        <span className="truncate">
                                            {languageStrings["kci5_heading"]}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="overflow-hidden w-full relative z-10">
                <div className="container-xl p-responsive mx-auto">
                    <div className="flex flex-col relative gutter-spacious">
                        <div className="home-git-log-light relative width-full offset-md-1 col-12">
                            <div className="flex flex-col mx-6 gutter-spacious ">
                                {/* KCI 5: Post appointment messaging */}
                                <div className="home-branch-container relative text-gray-700 z-1">
                                    {patientSteps["KCI 5.1"] && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            stroke="#dadfe9"
                                            fill="none"
                                            preserveAspectRatio="none"
                                            viewBox="0 0 110 142"
                                            className="d-none d-md-block relative home-branch offset-n1"
                                        >
                                            <path
                                                d="m1-8c0 75 108 75 108 150"
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                            ></path>
                                        </svg>
                                    )}
                                </div>
                                {patientSteps["KCI 5.1"] && (
                                    <>
                                        <div className="home-git-log-light relative col-10 offset-1 pb-5 pb-md-6 pt-6 pt-md-0">
                                            <div className="col-6-max">
                                                <div className=" mb-md-6 mt-n3">
                                                    <div
                                                        className="flex items-center relative z-10 unselectable"
                                                        aria-hidden="true"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            height="20"
                                                            viewBox="0 0 28 20"
                                                            width="28"
                                                            className="home-git-icon home-git-item flex-shrink-0 mr-3 relative z-10"
                                                        >
                                                            <circle
                                                                cx="14"
                                                                cy="10"
                                                                fill="#fff"
                                                                r="5"
                                                                stroke="#d0d6df"
                                                                strokeWidth="2"
                                                            ></circle>
                                                        </svg>
                                                        {
                                                            languageStrings[
                                                                "kci51_heading"
                                                            ]
                                                        }
                                                    </div>
                                                </div>
                                                <p>{patientSteps["KCI 5.1"]}</p>
                                            </div>
                                        </div>

                                        <div className="col-12 offset-1 relative">
                                            <ul className="home-git-log-light relative flex gutter gutter-spacious flex-col list-style-none ">
                                                <li className="col-11 col-sm-10 col-lg-12">
                                                    <div
                                                        className="flex flex-col flex-lg-row items-center gutter gutter-spacious"
                                                        style={{
                                                            padding:
                                                                "8% 0 10.5%",
                                                        }}
                                                    >
                                                        <div className="col-12 col-lg-5">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                height="28"
                                                                viewBox="0 0 28 20"
                                                                width="28"
                                                                className="home-git-icon home-git-item float-left mr-n6 relative z-10"
                                                            >
                                                                <circle
                                                                    cx="14"
                                                                    cy="10"
                                                                    fill="#fff"
                                                                    r="5"
                                                                    stroke="#d0d6df"
                                                                    strokeWidth="2"
                                                                ></circle>
                                                            </svg>
                                                            <h3 className="js-build-in-item build-in-slideX-left f2-mktg text-gray-mktg lh-condensed text-semibold  mb-lg-0 col-5-max">
                                                                {
                                                                    languageStrings[
                                                                        "kci52_heading"
                                                                    ]
                                                                }
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                                <div className="home-branch-container relative z-10 ">
                                    {patientSteps["KCI 5.1"] && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            stroke="#dadfe9"
                                            preserveAspectRatio="none"
                                            viewBox="0 0 110 142"
                                            aria-hidden="true"
                                            className="d-none d-md-block relative home-branch offset-n1"
                                            style={{ transform: "scaleX(-1)" }}
                                        >
                                            <path
                                                d="m1-8c0 75 108 75 108 150"
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                            ></path>
                                        </svg>
                                    )}

                                    {/* <div
                                        className="flex items-center"
                                        style={{ marginLeft: "-2.3125rem" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            height="20"
                                            viewBox="0 0 28 20"
                                            width="28"
                                            aria-hidden="true"
                                            className="home-git-icon flex-shrink-0 mr-3 d-none d-md-block"
                                        >
                                            <circle
                                                cx="14"
                                                cy="10"
                                                fill="#fff"
                                                r="5"
                                                stroke="#d0d6df"
                                                strokeWidth="2"
                                            ></circle>
                                        </svg>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {patientSteps["KCI 6"] && (
                <div className="relative z-20 mx-auto wide-block">
                    <div className="container-xl p-responsive">
                        <div className="flex flex-col gutter gutter-spacious">
                            <div className="col-11 col-sm-10 offset-1">
                                <ul className="relative home-git-log-dark flex gutter gutter-spacious flex-col list-style-none pt-5">
                                    <li
                                        className="col-12 flex items-center relative text-gray-700 py-2 unselectable"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            height="22"
                                            width="28"
                                            aria-hidden="true"
                                            className="home-git-icon home-git-item flex-shrink-0 mr-3 relative z-10"
                                        >
                                            <path
                                                d="m2.5 10a1 1 0 1 0 0 2zm23 2a1 1 0 1 0 0-2zm-23 0h23v-2h-23z"
                                                fill="#465061"
                                            ></path>
                                            <circle
                                                cx="14"
                                                cy="11"
                                                fill="#FFF"
                                                r="5"
                                                stroke="#465061"
                                                strokeWidth="2"
                                            ></circle>
                                        </svg>
                                        <span className="truncate">
                                            {languageStrings["kci6_heading"]}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="overflow-hidden w-full relative z-10">
                <div className="container-xl p-responsive mx-auto">
                    <div className="flex flex-col relative gutter-spacious">
                        <div className="home-git-log-light relative width-full offset-md-1 col-12">
                            <div className="flex flex-col mx-6 gutter-spacious ">
                                {/* KCI 6: Discharge */}
                                <div className="home-branch-container relative text-gray-700 z-1">
                                    {patientSteps["KCI 6.1"] && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            stroke="#dadfe9"
                                            fill="none"
                                            preserveAspectRatio="none"
                                            viewBox="0 0 110 142"
                                            className="d-none d-md-block relative home-branch offset-n1"
                                        >
                                            <path
                                                d="m1-8c0 75 108 75 108 150"
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                            ></path>
                                        </svg>
                                    )}
                                </div>
                                {patientSteps["KCI 6.1"] && (
                                    <>
                                        <div className="home-git-log-light relative col-10 offset-1 pb-5 pb-md-6 pt-6 pt-md-0">
                                            <div className="col-6-max">
                                                <div className=" mb-md-6 mt-n3">
                                                    <div
                                                        className="flex items-center relative z-10 unselectable"
                                                        aria-hidden="true"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            height="20"
                                                            viewBox="0 0 28 20"
                                                            width="28"
                                                            className="home-git-icon home-git-item flex-shrink-0 mr-3 relative z-10"
                                                        >
                                                            <circle
                                                                cx="14"
                                                                cy="10"
                                                                fill="#fff"
                                                                r="5"
                                                                stroke="#d0d6df"
                                                                strokeWidth="2"
                                                            ></circle>
                                                        </svg>
                                                        {
                                                            languageStrings[
                                                                "kci61_heading"
                                                            ]
                                                        }
                                                    </div>
                                                </div>
                                                <p>{patientSteps[21]}</p>
                                            </div>
                                        </div>

                                        <div className="col-12 offset-1 relative">
                                            <ul className="home-git-log-light relative flex gutter gutter-spacious flex-col list-style-none ">
                                                <li className="col-11 col-sm-10 col-lg-12">
                                                    <div
                                                        className="flex flex-col flex-lg-row items-center gutter gutter-spacious"
                                                        style={{
                                                            padding:
                                                                "8% 0 10.5%",
                                                        }}
                                                    >
                                                        <div className="col-12 col-lg-5">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                height="28"
                                                                viewBox="0 0 28 20"
                                                                width="28"
                                                                className="home-git-icon home-git-item float-left mr-n6 relative z-10"
                                                            >
                                                                <circle
                                                                    cx="14"
                                                                    cy="10"
                                                                    fill="#fff"
                                                                    r="5"
                                                                    stroke="#d0d6df"
                                                                    strokeWidth="2"
                                                                ></circle>
                                                            </svg>
                                                            <h3 className="js-build-in-item build-in-slideX-left f2-mktg text-gray-mktg lh-condensed text-semibold  mb-lg-0 col-5-max">
                                                                {
                                                                    languageStrings[
                                                                        "kci62_heading"
                                                                    ]
                                                                }
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                                <div className="home-branch-container relative z-10 ">
                                    {patientSteps["KCI 6.1"] && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            stroke="#dadfe9"
                                            preserveAspectRatio="none"
                                            viewBox="0 0 110 142"
                                            aria-hidden="true"
                                            className="d-none d-md-block relative home-branch offset-n1"
                                            style={{ transform: "scaleX(-1)" }}
                                        >
                                            <path
                                                d="m1-8c0 75 108 75 108 150"
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                            ></path>
                                        </svg>
                                    )}

                                    {/* <div
                                        className="flex items-center"
                                        style={{ marginLeft: "-2.3125rem" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            height="20"
                                            viewBox="0 0 28 20"
                                            width="28"
                                            aria-hidden="true"
                                            className="home-git-icon flex-shrink-0 mr-3 d-none d-md-block"
                                        >
                                            <circle
                                                cx="14"
                                                cy="10"
                                                fill="#fff"
                                                r="5"
                                                stroke="#d0d6df"
                                                strokeWidth="2"
                                            ></circle>
                                        </svg>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Discharged */}
            <div className="relative z-20 mx-auto wide-block">
                <div className="container-xl p-responsive">
                    <div className="flex flex-col gutter gutter-spacious">
                        <div className="col-11 col-sm-10 offset-1">
                            <ul className="relative home-git-log-dark flex gutter gutter-spacious flex-col list-style-none pt-5 pb-8 pb-md-9">
                                <li
                                    className="col-12 flex items-center relative f6-mktg text-gray-700 py-2 unselectable"
                                    aria-hidden="true"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        height="22"
                                        width="28"
                                        aria-hidden="true"
                                        className="home-git-icon home-git-item flex-shrink-0 mr-3 relative z-10"
                                    >
                                        <path
                                            d="m2.5 10a1 1 0 1 0 0 2zm23 2a1 1 0 1 0 0-2zm-23 0h23v-2h-23z"
                                            fill="#465061"
                                        ></path>
                                        <circle
                                            cx="14"
                                            cy="11"
                                            fill="#FFF"
                                            r="5"
                                            stroke="#465061"
                                            strokeWidth="2"
                                        ></circle>
                                    </svg>
                                    <span className="truncate">
                                        {languageStrings["discharged_heading"]}
                                    </span>
                                </li>

                                <li className="col-12 col-md-9 col-lg-12">
                                    <div className="d-flex flex-col flex-lg-row flex-lg-row-reverse items-center gutter gutter-spacious my-4">
                                        <div className="col-12 col-lg-6 py-5 js-build-in build-in-slideX-left build-in-animate">
                                            <h2 className="mb-3">
                                                If you haven't already done so,
                                                we recommend you read our{" "}
                                                <a
                                                    className="text-blue-750 hover:underline"
                                                    href="https://www.connecthealth.co.uk/patient-faqs/"
                                                    target="_blank"
                                                >
                                                    Patient FAQs.
                                                </a>
                                            </h2>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
