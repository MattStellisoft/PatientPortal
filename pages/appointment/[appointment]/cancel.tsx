import Layout from '../../../components/Layout';
import { verifyAuth } from '../../../models/auth';
import { parseCookies } from '../../../helpers/parseCookies';
import { getLanguage } from '../../../models/languages';
export default function Cancel({
    breadCrumbs,
    query,
    languageStrings,
    appointmentId,
}) {
    return (
        <Layout
            page="Cancel your appointment"
            title="Cancel your appointment | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            breadCrumbs={breadCrumbs}
            query={query}
            languageStrings={languageStrings}
        >
            <main id="main" role="main" className="lg:col-span-9">
                <div className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-6">
                    <div className="flex items-start space-x-4">
                        <div className="min-w-0 flex-1">
                            <form
                                method="POST"
                                action={'/api/patient/appointment/cancel'}
                                className="relative"
                            >
                                <input
                                    type="hidden"
                                    name="appointmentID"
                                    value={appointmentId}
                                />
                                <fieldset>
                                    <legend className="text-2xl font-bold text-black">
                                        {
                                            languageStrings[
                                                'cancellationReasonQuestion'
                                            ]
                                        }
                                    </legend>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                id="reschedule"
                                                name="cancellationReason"
                                                value="reschedule"
                                                type="radio"
                                                className="focus:ring-blue-750 h-8 w-8 text-blue-750 border-black border-4"
                                                required
                                            />
                                            <label
                                                htmlFor="reschedule"
                                                className="ml-3"
                                            >
                                                <span className="block text-sm font-bold text-black">
                                                    {
                                                        languageStrings[
                                                            'requestReschedule'
                                                        ]
                                                    }
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="error"
                                                name="cancellationReason"
                                                value="error"
                                                type="radio"
                                                className="focus:ring-blue-750 h-8 w-8 text-blue-750 border-black border-4"
                                            />
                                            <label
                                                htmlFor="error"
                                                className="ml-3"
                                            >
                                                <span className="block text-sm font-bold text-black">
                                                    {
                                                        languageStrings[
                                                            'bookedInError'
                                                        ]
                                                    }
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="error"
                                                name="cancellationReason"
                                                value="selfDischarge"
                                                type="radio"
                                                className="focus:ring-blue-750 h-8 w-8 text-blue-750 border-black border-4"
                                            />
                                            <label
                                                htmlFor="error"
                                                className="ml-3"
                                            >
                                                <span className="block text-sm font-bold text-black">
                                                    {
                                                        languageStrings[
                                                            'selfDischarge'
                                                        ]
                                                    }
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="undisclosed"
                                                name="cancellationReason"
                                                value="undisclosed"
                                                type="radio"
                                                className="focus:ring-blue-750 h-8 w-8 text-blue-750 border-black border-4"
                                            />
                                            <label
                                                htmlFor="undisclosed"
                                                className="ml-3"
                                            >
                                                <span className="block text-sm font-bold text-black">
                                                    {
                                                        languageStrings[
                                                            'undisclosed'
                                                        ]
                                                    }
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="none"
                                                name="cancellationReason"
                                                value="none"
                                                type="radio"
                                                className="focus:ring-blue-750 h-8 w-8 text-blue-750 border-black border-4"
                                            />
                                            <label
                                                htmlFor="none"
                                                className="ml-3"
                                            >
                                                <span className="block text-sm font-bold text-black">
                                                    {
                                                        languageStrings[
                                                            'noneOfAbove'
                                                        ]
                                                    }
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="mt-4 border-4 border-black overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-750">
                                    <label
                                        htmlFor="comment"
                                        className="sr-only"
                                    >
                                        {languageStrings['explainReason']}
                                    </label>
                                    <textarea
                                        rows={3}
                                        name="explanation"
                                        id="explanation"
                                        className="block w-full py-3 border-0 resize-none focus:ring-0"
                                        placeholder="Please explain why you need to cancel your appointment (Optional)"
                                        defaultValue={''}
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
                                    className="mt-4 cursor-pointer bg-red-700 py-2 px-4 border-b-4 border-red-900 text-lg font-bold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    {languageStrings['cancelButton']}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
export async function getServerSideProps({ req, query, locale }) {
    const authorisedUser = await verifyAuth(
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
    let rejected: object = {};
    let queryString: string = '';
    let errors: object = {};
    let currentLocale: string = req.cookies.NEXT_LOCALE || locale;
    //Fetch language strings using current locale.
    const localLanguageStrings = getLanguage('cancel', currentLocale);
    const globalLanguageStrings = getLanguage('global', currentLocale);
    const languageStrings = {
        ...localLanguageStrings,
        ...globalLanguageStrings,
    };
    if (query.testuser) {
        queryString = '?testuser=' + query.testuser;
        if (query.usecher) {
            queryString += '&usecher=true';
        }
        if (query.debug) {
            queryString += '&debug=true';
        }
    }
    const breadCrumbs: object[] = [
        {
            key: 'appointmentPageName',
            href: '/appointment',
            current: false,
        },
        {
            key: 'cancellationReasonPageName',
            href: `/appointment/${query.appointment}/cancel`,
            current: true,
        },
    ];
    return {
        props: {
            breadCrumbs: breadCrumbs,
            appointmentId: query.appointment,
            query: queryString,
            errors: errors,
            languageStrings: languageStrings,
        },
    };
}
