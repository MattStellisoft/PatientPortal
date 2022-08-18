import Layout from '../components/Layout';
import { verifyAuth } from '../models/auth';
import Link from 'next/link';
import Tag from '../components/Tag';
import {
    AppointmentInterface,
    Errors,
    Breadcrumb,
} from '../interfaces/interfaces';
import Pagination from '../components/Pagination';
import AppointmentList from '../components/AppointmentList';
import { getAppointments } from '../models/appointments';
import { parseCookies } from '../helpers/parseCookies';
import { getLanguage } from '../models/languages';
import { contactApi } from '../models/chad';
import { contactChApi } from '../models/chapi';

type Props = {
    appointments?: AppointmentInterface[];
    appointmentsRequiringActions?: AppointmentInterface[];
    languageStrings: string[];
    debug: boolean;
    errors: Errors;
    breadCrumbs?: Breadcrumb[];
    query: string;
    offset?: number;
    perPage?: number;
    totalResults?: number;
};
export default function Appointments({
    appointments,
    appointmentsRequiringActions,
    languageStrings,
    breadCrumbs,
    debug,
    errors,
    query,
    offset,
    totalResults,
    perPage,
}: Props) {
    return (
        <Layout
            page="Appointments"
            title="Appointments | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            breadCrumbs={breadCrumbs}
            query={query}
            data={appointments}
            debug={debug}
            errors={errors}
            languageStrings={languageStrings}
        >
            <main id="main" role="main" className="lg:col-span-9">
                <div className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-6">
                    <h2 className="mb-4 text-2xl font-extrabold sm:tracking-tight lg:text-4xl">
                        {languageStrings['appointmentsPageName']}
                    </h2>
                    <p className="mb-4 text-xl">
                        {languageStrings['appointmentsPageDescription']}
                    </p>
                    <p className="mb-4 text-base">
                        {languageStrings['appointmentsPagePara1']}
                    </p>
                </div>
                <div className="overflow-hidden">
                    {appointmentsRequiringActions.length > 0 &&
                        appointmentsRequiringActions.map(
                            (appointment, index) => (
                                <div
                                    key={index}
                                    className="border-t border-black"
                                >
                                    <a
                                        href={
                                            '/appointment/' +
                                            appointment.IDAppointment +
                                            query
                                        }
                                    >
                                        <div className="py-4 px-6 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg leading-6 font-medium text-blue-750">
                                                    {languageStrings[
                                                        'appointmentSummary'
                                                    ]
                                                        .replace(
                                                            '[ServiceType]',
                                                            appointment.ServiceType,
                                                        )
                                                        .replace(
                                                            '[AppointmentDateTime]',
                                                            new Date(
                                                                appointment.AppointmentDateTime,
                                                            ).toLocaleString(
                                                                'en-GB',
                                                            ),
                                                        )
                                                        .replace(
                                                            '[Clinician]',
                                                            appointment.Clinician,
                                                        )}
                                                </h3>
                                                <Tag
                                                    text="Action required"
                                                    bgColour="bg-yellow-400"
                                                    textColour="text-black"
                                                    textSize="text-base"
                                                    uppercase={false}
                                                ></Tag>
                                            </div>
                                            <p className="mt-4 max-w-2xl text-base">
                                                {appointment.AutoBookedStatus ==
                                                'Unconfirmed'
                                                    ? languageStrings[
                                                          'appointmentsConfirmOrCancelPrompt'
                                                      ]
                                                    : languageStrings[
                                                          'appointmentsCancelPrompt'
                                                      ]}
                                            </p>
                                        </div>
                                    </a>
                                    <div className="mb-4 px-6 sm:px-6">
                                        {appointment.AutoBookedStatus ==
                                            'Unconfirmed' && (
                                            <div className="flex items-center">
                                                <form
                                                    method="post"
                                                    action={
                                                        '/api/patient/appointment/confirm'
                                                    }
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="appointmentID"
                                                        value={
                                                            appointment.IDAppointment
                                                        }
                                                    />
                                                    <input
                                                        name="Confirm"
                                                        value={
                                                            languageStrings[
                                                                'confirmProvisionalButton'
                                                            ]
                                                        }
                                                        type="submit"
                                                        className="cursor-pointer mr-4 bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-750"
                                                    />
                                                </form>
                                                <form
                                                    method="get"
                                                    action={
                                                        '/appointment/cancel' +
                                                        query
                                                    }
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="appointmentID"
                                                        value={
                                                            appointment.IDAppointment
                                                        }
                                                    />
                                                    <Link
                                                        href={
                                                            `/appointment/${appointment.IDAppointment}/cancel` +
                                                            query
                                                        }
                                                    >
                                                        <button className="cursor-pointer bg-red-700 py-2 px-4 border-b-4 border-red-900 text-lg font-bold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                            {
                                                                languageStrings[
                                                                    'cancelProvisionalButton'
                                                                ]
                                                            }
                                                        </button>
                                                    </Link>
                                                </form>
                                            </div>
                                        )}
                                        {appointment.AutoBookedStatus ==
                                            'Confirmed' && (
                                            <Link
                                                href={
                                                    `/appointment/${appointment.IDAppointment}/cancel` +
                                                    query
                                                }
                                            >
                                                <button className="cursor-pointer bg-red-700 py-2 px-4 border-b-4 border-red-900 text-lg font-bold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                    {
                                                        languageStrings[
                                                            'cancelProvisionalButton'
                                                        ]
                                                    }
                                                </button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ),
                        )}
                    {appointments.length > 0 ? (
                        <>
                            <AppointmentList
                                languageStrings={languageStrings}
                                appointments={appointments}
                                query={query}
                            ></AppointmentList>
                            <Pagination
                                path="/appointments"
                                perPage={perPage}
                                offset={offset}
                                query={query}
                                totalResults={totalResults}
                            ></Pagination>
                        </>
                    ) : (
                        <h2 className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-6 text-lg font-bold">
                            {languageStrings['noAppointmentsBooked']}
                        </h2>
                    )}
                </div>
            </main>
        </Layout>
    );
}
export async function getServerSideProps({ req, query, locale }) {
    const debug: boolean = query?.debug ? query?.debug : false;
    if (typeof req.cookies.session_id != 'undefined') {
    } else {
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
    const offset: number = query?.page || 1;
    const perPage: number = query?.perPage || 5;
    let errors: Errors = {};
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
    let currentLocale: string = req.cookies.NEXT_LOCALE || locale;
    const localLanguageStrings = getLanguage('appointments', currentLocale);
    const globalLanguageStrings = getLanguage('global', currentLocale);
    const languageStrings = {
        ...localLanguageStrings,
        ...globalLanguageStrings,
    };
    if (process.env.usecher || (query.usecher && query.testuser)) {
        const request = {
            Resource: 'Appointments',
            Endpoint: 'Appointments',
            Method: 'GetAppointmentDetails',
            Body: {
                requestJson: {
                    NHSNumber: query.testuser
                        ? query.testuser
                        : authorisedUser.nhs_number,
                },
            },
        };
        const { statusMessage } = await contactApi(request);
        var appointments: AppointmentInterface[] = statusMessage.Appointments;
        //statusMessage.Appointments.filter((e) => e.Status != "Attended");
        //order by most recent
        if (typeof appointments != 'undefined' && Array.isArray(appointments)) {
            appointments = appointments.sort(function (a, b) {
                return (
                    new Date(b.AppointmentDateTime).valueOf() -
                    new Date(a.AppointmentDateTime).valueOf()
                );
            });
            totalResults = appointments.length;
            const start = (offset - 1) * perPage;
            const end = start + perPage;
            appointments = appointments.slice(start, end);
        } else {
            totalResults = 0;
            appointments = [];
        }
    } else {
        const params = {
            offset: offset,
            perPage: perPage,
        };
        let url = new URL(
            process.env.NEXT_URL + process.env.NEXT_API_PATH + 'appointments',
        );
        for (let param in params) {
            url.searchParams.append(param, params[param]);
        }
        const options: RequestInit = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                sessionId: req.cookies.session_id,
            }),
        };
        try {
            const response = await fetch(url, options);
            var {
                appointments,
                appointmentsRequiringActions,
                totalResults,
            }: {
                appointments: AppointmentInterface[];
                appointmentsRequiringActions: AppointmentInterface[];
                totalResults: number;
            } = await response.json();
        } catch (error) {
            if (error.name === 'AbortError') return;
            console.log('Error ', error);
        }
    }
    const breadCrumbs: Breadcrumb[] = [
        {
            key: 'appointmentsPageName',
            href: '/appointments',
            current: true,
        },
    ];
    return {
        props: {
            debug: debug,
            totalResults: totalResults,
            appointments: appointments,
            appointmentsRequiringActions: appointmentsRequiringActions,
            languageStrings: languageStrings,
            errors: errors,
            query: queryString,
            offset: offset,
            perPage: perPage,
            breadCrumbs: breadCrumbs,
        },
    };
}
