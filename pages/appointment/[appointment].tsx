import Layout from '../../components/Layout';
import { verifyAuth } from '../../models/auth';
import { getAppointment, confirmAppointment } from '../../models/appointments';
import Link from 'next/link';
import {
    AppointmentInterface,
    Breadcrumb,
    Errors,
} from '../../interfaces/interfaces';
import { googleCalendarAppointmentUrl } from '../../helpers/googleCalendar';
import { outlookCalendarAppointmentUrl } from '../../helpers/outlookCalendar';
import { parseCookies } from '../../helpers/parseCookies';
import { getLanguage } from '../../models/languages';
import { contactApi } from '../../models/chad';
import { Wrapper } from '@googlemaps/react-wrapper';
import GoogleMapComponent from '../../components/GoogleMapComponent';
type Props = {
    appointment?: AppointmentInterface;
    languageStrings: string[];
    breadCrumbs?: Breadcrumb[];
    errors: Error;
    query: string;
    debug: boolean;
};
export default function Appointment({
    appointment,
    languageStrings,
    breadCrumbs,
    debug,
    errors,
    query,
}: Props) {
    const center = { lat: -34.397, lng: 150.644 };
    const zoom = 4;
    return (
        <Layout
            page="Appointment"
            title="Appointment | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            breadCrumbs={breadCrumbs}
            debug={debug}
            data={appointment}
            errors={errors}
            languageStrings={languageStrings}
            query={query}
        >
            <div className="lg:col-span-9">
                <div className="my-6 lg:my-0 px-4 py-5 sm:py-0 space-y-6 sm:p-6">
                    {appointment.IDAppointment && (
                        <>
                            <h2 className="mb-4 text-2xl font-extrabold sm:tracking-tight lg:text-4xl">
                                {languageStrings['appointmentPageName']}
                            </h2>
                            <p className="mb-4 text-xl">
                                {languageStrings['appointmentPageDescription']}
                            </p>
                            <div>
                                <div className="mb-4 p-10 bg-blue-750 text-white">
                                    <div className="block text-center text-2xl font-extrabold sm:tracking-tight lg:text-4xl">
                                        {languageStrings['appointmentDetail']
                                            .replace(
                                                '[ServiceType]',
                                                appointment.ServiceType,
                                            )
                                            .replace(
                                                '[AppointmentDateTime]',
                                                new Date(
                                                    appointment.AppointmentDateTime,
                                                ).toLocaleString('en-GB'),
                                            )
                                            .replace(
                                                '[Clinician]',
                                                appointment.Clinician,
                                            )}
                                    </div>
                                </div>
                                {appointment.AutoBookedStatus ==
                                    'Confirmed' && (
                                    <>
                                        <div className="flex flex-col">
                                            <a
                                                href={googleCalendarAppointmentUrl(
                                                    appointment,
                                                )}
                                            >
                                                <button
                                                    type="button"
                                                    className="group inline-flex items-center py-4 px-1 text-sm font-medium cursor-pointer"
                                                >
                                                    <img
                                                        alt="Google Calendar"
                                                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxyZWN0IHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgeD0iMTMiIHk9IjEzIiBmaWxsPSIjZmZmIi8+PHBvbHlnb24gZmlsbD0iIzFlODhlNSIgcG9pbnRzPSIyNS42OCwyMC45MiAyNi42ODgsMjIuMzYgMjguMjcyLDIxLjIwOCAyOC4yNzIsMjkuNTYgMzAsMjkuNTYgMzAsMTguNjE2IDI4LjU2LDE4LjYxNiIvPjxwYXRoIGZpbGw9IiMxZTg4ZTUiIGQ9Ik0yMi45NDMsMjMuNzQ1YzAuNjI1LTAuNTc0LDEuMDEzLTEuMzcsMS4wMTMtMi4yNDljMC0xLjc0Ny0xLjUzMy0zLjE2OC0zLjQxNy0zLjE2OCBjLTEuNjAyLDAtMi45NzIsMS4wMDktMy4zMywyLjQ1M2wxLjY1NywwLjQyMWMwLjE2NS0wLjY2NCwwLjg2OC0xLjE0NiwxLjY3My0xLjE0NmMwLjk0MiwwLDEuNzA5LDAuNjQ2LDEuNzA5LDEuNDQgYzAsMC43OTQtMC43NjcsMS40NC0xLjcwOSwxLjQ0aC0wLjk5N3YxLjcyOGgwLjk5N2MxLjA4MSwwLDEuOTkzLDAuNzUxLDEuOTkzLDEuNjRjMCwwLjkwNC0wLjg2NiwxLjY0LTEuOTMxLDEuNjQgYy0wLjk2MiwwLTEuNzg0LTAuNjEtMS45MTQtMS40MThMMTcsMjYuODAyYzAuMjYyLDEuNjM2LDEuODEsMi44NywzLjYsMi44N2MyLjAwNywwLDMuNjQtMS41MTEsMy42NC0zLjM2OCBDMjQuMjQsMjUuMjgxLDIzLjczNiwyNC4zNjMsMjIuOTQzLDIzLjc0NXoiLz48cG9seWdvbiBmaWxsPSIjZmJjMDJkIiBwb2ludHM9IjM0LDQyIDE0LDQyIDEzLDM4IDE0LDM0IDM0LDM0IDM1LDM4Ii8+PHBvbHlnb24gZmlsbD0iIzRjYWY1MCIgcG9pbnRzPSIzOCwzNSA0MiwzNCA0MiwxNCAzOCwxMyAzNCwxNCAzNCwzNCIvPjxwYXRoIGZpbGw9IiMxZTg4ZTUiIGQ9Ik0zNCwxNGwxLTRsLTEtNEg5QzcuMzQzLDYsNiw3LjM0Myw2LDl2MjVsNCwxbDQtMVYxNEgzNHoiLz48cG9seWdvbiBmaWxsPSIjZTUzOTM1IiBwb2ludHM9IjM0LDM0IDM0LDQyIDQyLDM0Ii8+PHBhdGggZmlsbD0iIzE1NjVjMCIgZD0iTTM5LDZoLTV2OGg4VjlDNDIsNy4zNDMsNDAuNjU3LDYsMzksNnoiLz48cGF0aCBmaWxsPSIjMTU2NWMwIiBkPSJNOSw0Mmg1di04SDZ2NUM2LDQwLjY1Nyw3LjM0Myw0Miw5LDQyeiIvPjwvc3ZnPg=="
                                                        className="-ml-0.5 mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                    />
                                                    <span>
                                                        {
                                                            languageStrings[
                                                                'addToGoogleCalendar'
                                                            ]
                                                        }
                                                    </span>
                                                </button>
                                            </a>
                                            <a
                                                href={outlookCalendarAppointmentUrl(
                                                    appointment,
                                                )}
                                            >
                                                <button
                                                    type="button"
                                                    className="group inline-flex items-center py-4 px-1 text-sm font-medium"
                                                >
                                                    <img
                                                        alt="Microsoft Outlook"
                                                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiMwM0E5RjQiIGQ9Ik0yMSwzMWMwLDEuMTA0LDAuODk2LDIsMiwyaDE3YzEuMTA0LDAsMi0wLjg5NiwyLTJWMTZjMC0xLjEwNC0wLjg5Ni0yLTItMkgyM2MtMS4xMDQsMC0yLDAuODk2LTIsMlYzMXoiLz48cGF0aCBmaWxsPSIjQjNFNUZDIiBkPSJNNDIsMTYuOTc1VjE2YzAtMC40MjgtMC4xMzctMC44MjMtMC4zNjctMS4xNDhsLTExLjI2NCw2LjkzMmwtNy41NDItNC42NTZMMjIuMTI1LDE5bDguNDU5LDVMNDIsMTYuOTc1eiIvPjxwYXRoIGZpbGw9IiMwMjc3QkQiIGQ9Ik0yNyA0MS40Nkw2IDM3LjQ2IDYgOS40NiAyNyA1LjQ2eiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0yMS4yMTYsMTguMzExYy0xLjA5OC0xLjI3NS0yLjU0Ni0xLjkxMy00LjMyOC0xLjkxM2MtMS44OTIsMC0zLjQwOCwwLjY2OS00LjU1NCwyLjAwM2MtMS4xNDQsMS4zMzctMS43MTksMy4wODgtMS43MTksNS4yNDZjMCwyLjA0NSwwLjU2NCwzLjcxNCwxLjY5LDQuOTg2YzEuMTI2LDEuMjczLDIuNTkyLDEuOTEsNC4zNzgsMS45MWMxLjg0LDAsMy4zMzEtMC42NTIsNC40NzQtMS45NzVjMS4xNDMtMS4zMTMsMS43MTItMy4wNDMsMS43MTItNS4xOTlDMjIuODY5LDIxLjI4MSwyMi4zMTgsMTkuNTk1LDIxLjIxNiwxOC4zMTF6IE0xOS4wNDksMjYuNzM1Yy0wLjU2OCwwLjc2OS0xLjMzOSwxLjE1Mi0yLjMxMywxLjE1MmMtMC45MzksMC0xLjY5OS0wLjM5NC0yLjI4NS0xLjE4N2MtMC41ODEtMC43ODUtMC44Ny0xLjg2MS0wLjg3LTMuMjExYzAtMS4zMzYsMC4yODktMi40MTQsMC44Ny0zLjIyNWMwLjU4Ni0wLjgxLDEuMzY4LTEuMjExLDIuMzU1LTEuMjExYzAuOTYyLDAsMS43MTgsMC4zOTMsMi4yNjcsMS4xNzhjMC41NTUsMC43OTUsMC44MzMsMS44OTUsMC44MzMsMy4zMUMxOS45MDcsMjQuOTA2LDE5LjYxOCwyNS45NjgsMTkuMDQ5LDI2LjczNXoiLz48L3N2Zz4="
                                                        className="-ml-0.5 mr-2 h-5 w-5 text-indigo-500"
                                                    />
                                                    <span>
                                                        {
                                                            languageStrings[
                                                                'addToOutlookCalendar'
                                                            ]
                                                        }
                                                    </span>
                                                </button>
                                            </a>
                                        </div>
                                        <Wrapper apiKey={'YOUR_API_KEY'}>
                                            <GoogleMapComponent
                                                center={center}
                                                zoom={zoom}
                                            />
                                        </Wrapper>
                                        <div className="my-4">
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
                                        </div>
                                    </>
                                )}
                            </div>
                            {appointment.AutoBookedStatus == 'Unconfirmed' && (
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
                                            value={appointment.IDAppointment}
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
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
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
    const localLanguageStrings = getLanguage('appointment', currentLocale);
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
        const { statusMessage, statusCode } = await contactApi(request);
        const filteredAppointments: AppointmentInterface[] =
            statusMessage.Appointments.filter(
                (e) => e.IDAppointment == query?.appointment,
            );
        if (filteredAppointments.length > 0) {
            var appointment: AppointmentInterface = filteredAppointments[0];
        }
    } else {
        let url = new URL(
            process.env.NEXT_URL +
                process.env.NEXT_API_PATH +
                'appointment/' +
                query.appointment,
        );
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
                appointment,
            }: {
                appointment: AppointmentInterface;
            } = await response.json();
        } catch (error) {
            if (error.name === 'AbortError') return;
        }
    }
    const breadCrumbs: Breadcrumb[] = [
        { key: 'appointmentsPageName', href: '/appointments', current: true },
        {
            key: 'appointmentPageName',
            href: '/appointment/' + query?.appointment,
            current: true,
        },
    ];
    const endDate = new Date(appointment.AppointmentDateTime);
    let addDuration = new Date(
        endDate.getTime() + appointment.Duration * 60 * 1000,
    ).toString();
    appointment.AppointmentEndDateTime = new Date(addDuration).toISOString();
    return {
        props: {
            debug: debug,
            appointment: appointment,
            languageStrings: languageStrings,
            breadCrumbs: breadCrumbs,
            query: queryString,
            errors: errors,
        },
    };
}
