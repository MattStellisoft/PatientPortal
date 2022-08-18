import Layout from '../components/Layout';
import { parseCookies } from '../helpers/parseCookies';
import { getLanguage } from '../models/languages';
import {
    getQuestionnairesUid,
    getQuestionnairesNhsNumber,
    getQuestionnaires,
} from '../models/questionnaires';
import { verifyAuth } from '../models/auth';
import { QuestionnaireInterface, Errors } from '../interfaces/interfaces';
import QuestionnaireList from '../components/QuestionnaireList';
import Pagination from '../components/Pagination';
type Props = {
    questionnaires?: QuestionnaireInterface[];
    languageStrings: string[];
    offset?: number;
    debug: boolean;
    errors: object;
    totalResults?: number;
    totalRemaining: number;
    perPage?: number;
    breadCrumbs?: object[];
    query?: string;
};
export default function Questionnaires({
    questionnaires,
    offset,
    languageStrings,
    totalResults,
    debug,
    errors,
    totalRemaining,
    perPage,
    breadCrumbs,
    query,
}: Props) {
    return (
        <Layout
            debug={debug}
            data={questionnaires}
            errors={errors}
            page="Questionnaires"
            title="Questionnaires | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            languageStrings={languageStrings}
            breadCrumbs={breadCrumbs}
            query={query}
        >
            <main id="main" role="main" className="lg:col-span-9">
                <div className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-6">
                    <h2 className="mb-4 text-2xl font-extrabold sm:tracking-tight lg:text-4xl">
                        {languageStrings['questionnairesPageName']}
                    </h2>
                    <p className="mb-4 text-xl">
                        {languageStrings['questionnairesPageDescription']}
                    </p>
                    <p className="mb-4 text-base">
                        {languageStrings['questionnairesPagePara1']}
                    </p>
                </div>
                <div className="overflow-hidden">
                    <p className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-4 text-lg font-bold">
                        {languageStrings['questionnaireResults']
                            .replace('[totalRemaining]', totalRemaining)
                            .replace('[totalResults]', totalResults)}
                    </p>
                    <QuestionnaireList
                        questionnaires={questionnaires}
                        status
                        query={query}
                    ></QuestionnaireList>
                    <Pagination
                        path="/questionnaires"
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
    let errors: Errors = {};
    let currentLocale: string = req.cookies.NEXT_LOCALE || locale;
    const localLanguageStrings = getLanguage('questionnaires', currentLocale);
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
    if (typeof query.UUID !== 'undefined') {
        var { results, totalResults, statusCode } = await getQuestionnairesUid(
            query.UUID as string,
            currentLocale,
            offset,
            perPage,
        );
        query = '?UUID=' + query.UUID;
    } else {
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
        if (process.env.usecher || (query.usecher && query.testuser)) {
            var { results, totalResults, statusCode } =
                await getQuestionnairesNhsNumber(
                    query.testuser ? query.testuser : authorisedUser.nhs_number,
                    offset,
                    perPage,
                );
        } else {
            const params = {
                offset: offset,
                perPage: perPage,
            };
            let url = new URL(
                process.env.NEXT_URL +
                    process.env.NEXT_API_PATH +
                    'questionnaires',
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
            const response = await fetch(url, options);
            var {
                results,
                totalResults,
            }: { results: QuestionnaireInterface[]; totalResults: number } =
                await response.json();
        }
    }
    const breadCrumbs: object[] = [
        {
            key: 'questionnairesPageName',
            href: '/questionnaires',
            current: true,
        },
    ];
    let totalRemaining: number = 0;
    if (typeof results != 'undefined' && Array.isArray(results)) {
        const incompleteResults = results.filter(
            (questionnaire) =>
                questionnaire.DateTimeAnswersReceived == 'undefined' ||
                questionnaire.completed == false,
        );
        totalRemaining = incompleteResults.length;
    }
    return {
        props: {
            debug: debug,
            questionnaires: results,
            totalResults: totalResults,
            totalRemaining: totalRemaining,
            languageStrings: languageStrings,
            offset: offset,
            errors: errors,
            query: queryString,
            perPage: perPage,
            breadCrumbs: breadCrumbs,
        },
    };
}
