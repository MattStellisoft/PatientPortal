import Layout from "../../../components/Layout";
import { verifyAuth } from "../../../models/auth";
import { rejectAppointment, rejectReason } from "../../../models/appointments";
import bodyParser from "body-parser";
import { promisify } from "util";
const getBody = promisify(bodyParser.urlencoded());
import { parseCookies } from "../../../helpers/parseCookies";
import { getLanguage } from "../../../models/languages";
export default function Cancel({ breadCrumbs, query, languageStrings }) {
    return (
        <Layout
            page="Cancel your appointment"
            title="Cancel your appointment | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            breadCrumbs={breadCrumbs}
            query={query}
            languageStrings={languageStrings}
        >
            <main
                id="main"
                role="main"
                className="lg:col-span-9 sm:px-6 lg:px-0 py-6 lg:py-0"
            >
                <div className="flex items-start space-x-4">
                    <div className="min-w-0 flex-1">
                        <form method="POST" className="relative">
                            <fieldset>
                                <legend className="text-2xl font-bold text-black">
                                    {
                                        languageStrings[
                                            "cancellationReasonQuestion"
                                        ]
                                    }
                                </legend>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            id="reschedule"
                                            name="reason"
                                            value="reschedule"
                                            type="radio"
                                            className="focus:ring-blue-750 h-8 w-8 text-blue-600 border-black border-4"
                                            required
                                        />
                                        <label
                                            htmlFor="reschedule"
                                            className="ml-3"
                                        >
                                            <span className="block text-sm font-bold text-black">
                                                {
                                                    languageStrings[
                                                        "requestReschedule"
                                                    ]
                                                }
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="error"
                                            name="reason"
                                            value="error"
                                            type="radio"
                                            className="focus:ring-blue-750 h-8 w-8 text-blue-600 border-black border-4"
                                        />
                                        <label htmlFor="error" className="ml-3">
                                            <span className="block text-sm font-bold text-black">
                                                {
                                                    languageStrings[
                                                        "bookedInError"
                                                    ]
                                                }
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="error"
                                            name="reason"
                                            value="selfDischarge"
                                            type="radio"
                                            className="focus:ring-blue-750 h-8 w-8 text-blue-600 border-black border-4"
                                        />
                                        <label htmlFor="error" className="ml-3">
                                            <span className="block text-sm font-bold text-black">
                                                {
                                                    languageStrings[
                                                        "selfDischarge"
                                                    ]
                                                }
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="undisclosed"
                                            name="reason"
                                            value="undisclosed"
                                            type="radio"
                                            className="focus:ring-blue-750 h-8 w-8 text-blue-600 border-black border-4"
                                        />
                                        <label
                                            htmlFor="undisclosed"
                                            className="ml-3"
                                        >
                                            <span className="block text-sm font-bold text-black">
                                                {languageStrings["undisclosed"]}
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="none"
                                            name="reason"
                                            value="none"
                                            type="radio"
                                            className="focus:ring-blue-750 h-8 w-8 text-blue-600 border-black border-4"
                                        />
                                        <label htmlFor="none" className="ml-3">
                                            <span className="block text-sm font-bold text-black">
                                                {languageStrings["noneOfAbove"]}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="mt-4 border-4 border-black overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-750">
                                <label htmlFor="comment" className="sr-only">
                                    {languageStrings["explainReason"]}
                                </label>
                                <textarea
                                    rows={3}
                                    name="explanation"
                                    id="explanation"
                                    className="block w-full py-3 border-0 resize-none focus:ring-0"
                                    placeholder="Please explain why you need to cancel your appointment (Optional)"
                                    defaultValue={""}
                                />
                                {/* Spacer element to match the height of the toolbar */}
                                <div className="py-2" aria-hidden="true">
                                    {/* Matches height of button in toolbar (1px border + 36px content height) */}
                                    <div className="py-px">
                                        <div className="h-9" />
                                    </div>
                                </div>
                            </div>
                            <button
                                name="save"
                                value="save"
                                type="submit"
                                className="mt-4 bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-750"
                            >
                                {languageStrings["submit"]}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
export async function getServerSideProps(context) {
    const authorisedUser = await verifyAuth(
        context,
        process.env.NEXT_PRODUCTION
    );
    if (authorisedUser == false) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
            props: {},
        };
    }
    let rejected: object = {};
    let query: string = "";
    let errors: object = {};
    const { locale, req } = context;
    const data = parseCookies(req);
    let currentLocale: string = data.NEXT_LOCALE || locale;
    //Fetch language strings using current locale.
    const localLanguageStrings = getLanguage("cancel", currentLocale);
    const globalLanguageStrings = getLanguage("global", currentLocale);
    const languageStrings = {
        ...localLanguageStrings,
        ...globalLanguageStrings,
    };
    if (context.query.testuser) {
        query = "?testuser=" + context.query.testuser;
        if (context.query.usecher) {
            query += "&usecher=true";
        }
        if (context.query.debug) {
            query += "&debug=true";
        }
    }
    if (context.req.method === "POST") {
        await getBody(context.req, context.res);
    }
    if (typeof context.req.body != "undefined" && context.req.body.Reject) {
        const endpoint: string =
            process.env.NEXT_URL +
            `/api/patient/${authorisedUser.nhs_number}/appointment/${context.query.appointment}/cancel`;
        rejected = await rejectAppointment(endpoint);
    }
    if (
        typeof context.req.body != "undefined" &&
        context.req.body.save &&
        context.req.body.reason
    ) {
        const endpoint: string =
            process.env.NEXT_URL +
            `/api/patient/${authorisedUser.nhs_number}/appointment/${context.query.appointment}/cancel`;
        const reason = {
            reason: context.req.body?.reason,
            explanation: context.req.body?.explanation,
        };
        const { StatusCode } = await rejectReason(endpoint, reason);
        if (StatusCode == 200) {
            return {
                redirect: {
                    destination: "/appointments" + query,
                    permanent: false,
                },
                props: {},
            };
        } else {
            errors["formErrors"] = errors;
        }
    } else {
        errors["formErrors"] = ["You must provide a reason."];
    }
    const breadCrumbs: object[] = [
        {
            key: "appointmentPageName",
            href: "/appointment",
            current: false,
        },
        {
            key: "cancellationReasonPageName",
            href: `/appointment/${context.query.appointment}/cancel`,
            current: true,
        },
    ];
    return {
        props: {
            breadCrumbs: breadCrumbs,
            rejected: rejected,
            query: query,
            errors: errors,
            languageStrings: languageStrings,
        },
    };
}
