import Layout from '../components/Layout';
import { getPatient } from '../models/patients';
import { getProgrammes } from '../models/programmes';
import { verifyAuth } from '../models/auth';
import ProgrammeList from '../components/ProgrammeList';
import { ProgrammeInterface } from '../interfaces/interfaces';
import { contactApi } from '../models/chad';
import Pagination from '../components/Pagination';
import { parseCookies } from '../helpers/parseCookies';
import { getLanguage } from '../models/languages';
type Props = {
    programmes?: ProgrammeInterface;
    languageStrings: string[];
    query?: string;
    debug?: boolean;
    offset?: number;
    totalResults?: number;
    perPage?: number;
    breadCrumbs?: object[];
};
export default function Programmes({
    programmes,
    query,
    offset,
    languageStrings,
    totalResults,
    perPage,
    debug,
    breadCrumbs,
}: Props) {
    return (
        <Layout
            page="Programs"
            title="Excercise Programs | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            breadCrumbs={breadCrumbs}
            query={query}
            data={programmes}
            debug={debug}
            languageStrings={languageStrings}
        >
            <main id="main" role="main" className="lg:col-span-9">
                <div className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-6">
                    <h2 className="mb-4 text-2xl font-extrabold sm:tracking-tight lg:text-4xl">
                        {languageStrings['exercisesPageName']}
                    </h2>
                    <p className="mb-4 text-xl">
                        {languageStrings['exercisesPageDescription']}
                    </p>
                    <p className="mb-4 text-base">
                        {languageStrings['exercisesPagePara1']}
                    </p>
                </div>
                <div className="overflow-hidden">
                    <p className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-4 text-lg font-bold">
                        {languageStrings['programmeResults'].replace(
                            '[totalResults]',
                            totalResults,
                        )}
                    </p>
                    <ProgrammeList
                        programmes={programmes}
                        status={false}
                        query={query}
                    ></ProgrammeList>
                    <Pagination
                        path="/exercises"
                        query={query}
                        perPage={perPage}
                        offset={offset}
                        totalResults={totalResults}
                    ></Pagination>
                </div>
            </main>
        </Layout>
    );
}
export async function getServerSideProps({ query, locale, req }) {
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
    const data = parseCookies(req);
    let currentLocale: string = data.NEXT_LOCALE || locale;
    //Fetch language strings using current locale.
    const localLanguageStrings = getLanguage('programmes', currentLocale);
    const globalLanguageStrings = getLanguage('global', currentLocale);
    const languageStrings = {
        ...localLanguageStrings,
        ...globalLanguageStrings,
    };
    const offset: number = query?.page || 1;
    const perPage: number = query?.perPage || 5;
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
    if (process.env.usecher || (query.usecher && query.testuser)) {
        const request = {
            Resource: 'Patient',
            Endpoint: 'Patient',
            Method: 'GetPatient',
            Body: {
                requestJson: {
                    NHSNumber: query.testuser
                        ? query.testuser
                        : authorisedUser.nhs_number,
                },
            },
        };
        const { Patient } = await contactApi(request);
        if (typeof Patient.PhysitrackClientID != 'undefined') {
            var { programmes, totalResults } = await getProgrammes(Patient);
        } else {
            var programmes: ProgrammeInterface[] = [];
            var totalResults: number = 0;
        }
    } else {
        const endpoint: string =
            process.env.NEXT_URL +
            process.env.NEXT_API_PATH +
            authorisedUser.nhs_number;
        const patient: any = await getPatient(endpoint);
        if (typeof patient.PhysitrackClientID != 'undefined') {
            var { programmes, totalResults } = await getProgrammes(patient);
        } else {
            var programmes: ProgrammeInterface[] = [];
            var totalResults: number = 0;
        }
    }
    const breadCrumbs: object[] = [
        {
            key: 'programmesPageDescription',
            href: '/programmes',
            current: true,
        },
    ];
    return {
        props: {
            programmes: programmes,
            debug: debug,
            totalResults: totalResults,
            breadCrumbs: breadCrumbs,
            languageStrings: languageStrings,
            perPage: perPage,
            offset: offset,
            query: queryString,
        },
    };
}
