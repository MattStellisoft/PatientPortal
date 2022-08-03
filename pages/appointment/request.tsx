import Link from "next/link";
import Layout from "../../components/Layout";
import { verifyAuth } from "../../models/auth";
import { parseCookies } from "../../helpers/parseCookies";
import { getLanguage } from "../../models/languages";
import { contactApi } from "../../models/chad";
import { Errors, Breadcrumb } from "../../interfaces/interfaces";
import { getPatientOverview } from "../../models/patients";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
export default function request({
    breadCrumbs,
    query,
    languageStrings,
    debug,
    errors,
}) {
    return (
        <Layout
            page="Find an appointment"
            title="Find an appointment | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            breadCrumbs={breadCrumbs}
            languageStrings={languageStrings}
            query={query}
            debug={debug}
            errors={errors}
        >
            <main id="main" role="main" className="lg:col-span-9">
                <div className="flex items-start space-x-4">
                    <div className="min-w-0 flex-1">
                        {typeof errors.autoBookingDisabled != "undefined" ? (
                            <div className="my-4 flex items-center">
                                <div className="flex-shrink-0">
                                    <ExclamationCircleIcon
                                        className="h-10 w-10 text-black"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="ml-3">
                                    <p className="text-base font-bold">
                                        {errors.autoBookingDisabled.name}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <form className="space-y-8">
                                <div className="my-4 lg:my-0 px-4 py-5 sm:py-0 space-y-6 sm:p-6">
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                        <div className="sm:col-span-3">
                                            <div className="mb-4">
                                                <fieldset
                                                    role="group"
                                                    aria-describedby="hint"
                                                >
                                                    <legend className="mb-4 text-4xl font-bold">
                                                        <h1>
                                                            {
                                                                languageStrings[
                                                                    "heading"
                                                                ]
                                                            }
                                                        </h1>
                                                    </legend>
                                                    <div
                                                        id="hint"
                                                        className="mb-4 text-base"
                                                    >
                                                        {
                                                            languageStrings[
                                                                "prompt"
                                                            ]
                                                        }
                                                    </div>
                                                    <div id="dob">
                                                        <div className="inline-block mr-4 mb-0">
                                                            <div className="govuk-form-group">
                                                                <label
                                                                    className="govuk-label govuk-date-input__label"
                                                                    htmlFor="day"
                                                                >
                                                                    {
                                                                        languageStrings[
                                                                            "day"
                                                                        ]
                                                                    }
                                                                </label>
                                                                <input
                                                                    className="mt-4 focus:ring-blue-500 focus:border-blue-500 block max-w-xs min-w-0 sm:text-sm border-4 border-black"
                                                                    style={{
                                                                        maxWidth:
                                                                            "7ex",
                                                                    }}
                                                                    maxLength={
                                                                        2
                                                                    }
                                                                    id="day"
                                                                    name="day"
                                                                    type="text"
                                                                    inputMode="numeric"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="inline-block mr-4 mb-0">
                                                            <div className="govuk-form-group">
                                                                <label
                                                                    className="govuk-label govuk-date-input__label"
                                                                    htmlFor="month"
                                                                >
                                                                    {
                                                                        languageStrings[
                                                                            "month"
                                                                        ]
                                                                    }
                                                                </label>
                                                                <input
                                                                    className="mt-4 focus:ring-blue-500 focus:border-blue-500 block max-w-xs min-w-0 sm:text-sm border-4 border-black"
                                                                    style={{
                                                                        maxWidth:
                                                                            "7ex",
                                                                    }}
                                                                    maxLength={
                                                                        2
                                                                    }
                                                                    id="month"
                                                                    name="month"
                                                                    type="text"
                                                                    inputMode="numeric"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="inline-block mr-4 mb-0">
                                                            <div className="govuk-form-group">
                                                                <label
                                                                    className="govuk-label govuk-date-input__label"
                                                                    htmlFor="year"
                                                                >
                                                                    {
                                                                        languageStrings[
                                                                            "year"
                                                                        ]
                                                                    }
                                                                </label>
                                                                <input
                                                                    className="mt-4 focus:ring-blue-500 focus:border-blue-500 flex-grow block max-w-sm min-w-0 sm:text-sm border-4 border-black"
                                                                    style={{
                                                                        maxWidth:
                                                                            "10ex",
                                                                    }}
                                                                    maxLength={
                                                                        4
                                                                    }
                                                                    id="year"
                                                                    name="year"
                                                                    type="text"
                                                                    inputMode="numeric"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/appointments">
                                        <button
                                            type="submit"
                                            className=" bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            {languageStrings["submit"]}
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </Layout>
    );
}
export async function getServerSideProps(context) {
    const debug: boolean = context.query?.debug ? context.query?.debug : false;
    const authorisedUser = await verifyAuth(
        context,
        process.env.NEXT_PRODUCTION
    );
    console.log('authorisedUser', authorisedUser)
    if (authorisedUser == false) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
            props: {},
        };
    }
    let query: string = "";
    if (context.query.testuser) {
        query = "?testuser=" + context.query.testuser;
        if (context.query.usecher) {
            query += "&usecher=true";
        }
        if (context.query.debug) {
            query += "&debug=true";
        }
    }
    let errors: Errors = {};
    const { locale, req } = context;
    const data = parseCookies(req);
    let currentLocale: string = data.NEXT_LOCALE || locale;
    const localLanguageStrings = getLanguage("request", currentLocale);
    const globalLanguageStrings = getLanguage("global", currentLocale);
    const languageStrings = {
        ...localLanguageStrings,
        ...globalLanguageStrings,
    };
    if (
        typeof process.env.usecher != "undefined" ||
        (typeof context.query.usecher != "undefined" &&
            typeof context.query.testuser != "undefined")
    ) {
        const request = {
            Resource: "Overview",
            Endpoint: "Overview",
            Method: "Overview",
            Body: {
                requestJson: {
                    NHSNumber: context.query.testuser
                        ? context.query.testuser
                        : authorisedUser.nhs_number,
                },
            },
        };
        const { statusMessage, statusCode } = await contactApi(request);
        var results = {};
        //re-map "stages" array as dictionary for ease of lookup.
        statusMessage.stages.map((stage) => {
            results[stage.stage] = stage.Status;
        });
        if (statusMessage.autoBookingflag == "0") {
            errors["autoBookingDisabled"] = { name: "", description: "" };
            errors["autoBookingDisabled"]["name"] =
                languageStrings["autoBookingDisabled"];
        }
    } else {
        const endpoint: string =
            process.env.NEXT_URL +
            `/api/patient/${authorisedUser.nhs_number}/steps`;
        var { statusMessage } = await getPatientOverview(endpoint);
        var results = {};
        //re-map "stages" array as dictionary for ease of lookup.
        statusMessage.stages.map((stage) => {
            results[stage.stage] = stage.Status;
        });
        if (statusMessage.autoBookingflag == "0") {
            errors["autoBookingDisabled"] = { name: "", description: "" };
            errors["autoBookingDisabled"]["name"] =
                languageStrings["autoBookingDisabled"];
        }
    }
    const endpoint: string =
        process.env.NEXT_URL +
        `/api/patient/${authorisedUser.nhs_number}/accept`;
    //const appointment: object = await acceptAppointment(endpoint);
    //Either a prov appointment existed and has been confirmed or there is an error to display
    const breadCrumbs: Breadcrumb[] = [
        {
            key: "appointmentsPageName",
            href: "/appointments",
            current: false,
        },
        {
            key: "requestAppointmentPageName",
            href: "/appointment/request",
            current: true,
        },
    ];
    return {
        props: {
            breadCrumbs: breadCrumbs,
            query: query,
            languageStrings: languageStrings,
            errors: errors,
            debug: debug,
        },
    };
}
