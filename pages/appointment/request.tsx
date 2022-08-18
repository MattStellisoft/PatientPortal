import Link from 'next/link';
import Layout from '../../components/Layout';
import { verifyAuth } from '../../models/auth';
import { parseCookies } from '../../helpers/parseCookies';
import { getLanguage } from '../../models/languages';
import { contactApi } from '../../models/chad';
import { Errors, Breadcrumb } from '../../interfaces/interfaces';
import { getPatientOverview } from '../../models/patients';
import DateFields from '../../components/form_controls/DateFields';
import {
    appointmentBookingRequestCher,
    appointmentBookingRequest,
} from '../../models/appointments';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
export default function request({
    breadCrumbs,
    query,
    languageStrings,
    debug,
    errors,
    referral,
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
                        {typeof errors.autoBookingDisabled != 'undefined' ? (
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
                            <form
                                method="POST"
                                action={
                                    process.env.NEXT_URL +
                                    process.env.NEXT_API_PATH +
                                    '/appointment/request'
                                }
                                className="space-y-8"
                            >
                                <input
                                    type="hidden"
                                    name="NHSNumber"
                                    value={referral.NHSNumber}
                                />
                                <input
                                    type="hidden"
                                    name="IDReferral"
                                    value={referral.IDReferral}
                                />
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
                                                                    'heading'
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
                                                                'prompt'
                                                            ]
                                                        }
                                                    </div>
                                                    <DateFields name="RequestAppointment"></DateFields>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        name="submit"
                                        value="submit"
                                        className=" bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        {languageStrings['submit']}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </Layout>
    );
}
export async function getServerSideProps({ req, query, locale }) {
    const debug: boolean = query?.debug ? query?.debug : false;
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
    let errors: Errors = {};
    let currentLocale: string = req.cookies.NEXT_LOCALE || locale;
    const localLanguageStrings = getLanguage('request', currentLocale);
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
        var results = {};
        if (Array.isArray(statusMessage.stages)) {
            //re-map "stages" array as dictionary for ease of lookup.
            statusMessage.stages.map((stage) => {
                results[stage.stage] = stage.Status;
            });
        }
    } else {
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
        typeof statusMessage.autoBookingflag != 'undefined' &&
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
    const breadCrumbs: Breadcrumb[] = [
        {
            key: 'appointmentsPageName',
            href: '/appointments',
            current: false,
        },
        {
            key: 'requestAppointmentPageName',
            href: '/appointment/request',
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
            referral: statusMessage.stages.length ? statusMessage.stages : {},
        },
    };
}
