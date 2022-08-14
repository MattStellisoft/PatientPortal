import Layout from "../components/Layout";
import { verifyAuth } from "../models/auth";
import {
    AppointmentInterface,
    Errors,
    Breadcrumb,
} from "../interfaces/interfaces";
import Pagination from "../components/Pagination";
import AppointmentList from "../components/AppointmentList";
import { getAppointments } from "../models/appointments";
import { parseCookies } from "../helpers/parseCookies";
import { getLanguage } from "../models/languages";
import { contactApi } from "../models/chad";
import { contactChApi } from "../models/chapi";

type Props = {
    appointments?: AppointmentInterface[];
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
                        {languageStrings["appointmentsPageName"]}
                    </h2>
                    <p className="mb-4 text-xl">
                        {languageStrings["appointmentsPageDescription"]}
                    </p>
                    <p className="mb-4 text-base">
                        {languageStrings["appointmentsPagePara1"]}
                    </p>
                </div>
                <div className="overflow-hidden">
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
                            {languageStrings["noAppointmentsBooked"]}
                        </h2>
                    )}
                </div>
            </main>
        </Layout>
    );
}
export async function getServerSideProps(context) {
    const { locale, req } = context;
    const debug: boolean = context.query?.debug ? context.query?.debug : false;
    if (typeof req.cookies.session_id != 'undefined') {

    } else {
        var authorisedUser = await verifyAuth(
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
    }
    const offset: number = context.query?.page || 1;
    const perPage: number = context.query?.perPage || 5;
    let errors: Errors = {};
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
    let currentLocale: string = req.cookies.NEXT_LOCALE || locale;
    const localLanguageStrings = getLanguage("appointments", currentLocale);
    const globalLanguageStrings = getLanguage("global", currentLocale);
    const languageStrings = {
        ...localLanguageStrings,
        ...globalLanguageStrings,
    };
    if (
        process.env.usecher ||
        (context.query.usecher && context.query.testuser)
    ) {
        const request = {
            Resource: "Appointments",
            Endpoint: "Appointments",
            Method: "GetAppointmentDetails",
            Body: {
                requestJson: {
                    NHSNumber: context.query.testuser
                        ? context.query.testuser
                        : authorisedUser.nhs_number,
                },
            },
        };
        const { statusMessage } = await contactApi(request);
        var appointments: AppointmentInterface[] = statusMessage.Appointments;
        //statusMessage.Appointments.filter((e) => e.Status != "Attended");
        //order by most recent
        if (typeof appointments != "undefined" && Array.isArray(appointments)) {
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
        var { appointments, totalResults } = await contactChApi(
            'GET',
            'appointments',
            null,
            params,
            req.cookies.session_id
        );
    }
    const breadCrumbs: Breadcrumb[] = [
        {
            key: "appointmentsPageName",
            href: "/appointments",
            current: true,
        },
    ];
    return {
        props: {
            debug: debug,
            totalResults: totalResults,
            appointments: appointments,
            languageStrings: languageStrings,
            errors: errors,
            query: query,
            offset: offset,
            perPage: perPage,
            breadCrumbs: breadCrumbs,
        },
    };
}
