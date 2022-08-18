import Layout from '../components/Layout';
import { getDocuments } from '../models/documents';
import { verifyAuth } from '../models/auth';
import { DocumentInterface, Breadcrumb } from '../interfaces/interfaces';
import DocumentsList from '../components/DocumentsList';
import Pagination from '../components/Pagination';
import { contactApi } from '../models/chad';
import { parseCookies } from '../helpers/parseCookies';
import { getLanguage } from '../models/languages';
type Props = {
    documents?: DocumentInterface[];
    offset?: number;
    debug: boolean;
    errors: object;
    perPage?: number;
    totalResults?: number;
    languageStrings: string[];
    breadCrumbs?: Breadcrumb[];
    query?: string;
};
export default function Documents({
    documents,
    offset,
    debug,
    errors,
    totalResults,
    perPage,
    languageStrings,
    breadCrumbs,
    query,
}: Props) {
    return (
        <Layout
            errors={errors}
            debug={debug}
            data={documents}
            page="Documents"
            title="Documents | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            languageStrings={languageStrings}
            breadCrumbs={breadCrumbs}
            query={query}
        >
            <main id="main" role="main" className="lg:col-span-9">
                <div className="overflow-hidden">
                    <div className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-6">
                        <h2 className="mb-4 text-2xl font-extrabold sm:tracking-tight lg:text-4xl">
                            {languageStrings['documentsPageName']}
                        </h2>
                        <p className="mb-4 text-xl">
                            {languageStrings['documentsPageDescription']}
                        </p>
                        <p className="mb-4 text-base">
                            {languageStrings['documentsPagePara1']}
                        </p>
                    </div>
                    <p className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-6 text-lg font-bold">
                        {languageStrings['documentResults'].replace(
                            '[totalResults]',
                            totalResults,
                        )}
                    </p>
                    <DocumentsList
                        documents={documents}
                        languageStrings={languageStrings}
                        query={query}
                    ></DocumentsList>
                    <Pagination
                        path="/documents"
                        perPage={perPage}
                        offset={offset}
                        query={query}
                        totalResults={totalResults}
                    ></Pagination>
                </div>
            </main>
        </Layout>
    );
}
export async function getServerSideProps({ req, query }) {
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
    const offset: number = query?.page || 1;
    const perPage: number = query?.perPage || 5;
    let queryString: string = '';
    let errors: object = {};
    const data = parseCookies(req);
    let currentLocale: string = data.NEXT_LOCALE || query.locale;
    //Fetch language strings using current locale.
    const localLanguageStrings = getLanguage('documents', currentLocale);
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
    if (process.env.usecher || (query.usecher && query.testuser)) {
        const request = {
            Resource: 'Documents',
            Endpoint: 'Document',
            Method: 'GetDocuments',
            Body: {
                requestJson: {
                    NHSNumber: query.testuser
                        ? query.testuser
                        : authorisedUser.nhs_number,
                },
            },
        };
        const patientDocuments = await contactApi(request);
        if (
            typeof patientDocuments.Documents != 'undefined' &&
            patientDocuments.Documents != null
        ) {
            var totalResults: number = patientDocuments.Documents.length;
            const start = (offset - 1) * perPage;
            const end = start + perPage;
            var results: DocumentInterface[] = patientDocuments.Documents.slice(
                start,
                end,
            );
        } else {
            var totalResults: number = 0;
            var results: DocumentInterface[] = [];
        }
    } else {
        const params = {
            offset: offset,
            perPage: perPage,
        };
        let url = new URL(
            process.env.NEXT_URL + process.env.NEXT_API_PATH + 'documents',
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
        }: { results: DocumentInterface[]; totalResults: number } =
            await response.json();
    }
    const breadCrumbs: Breadcrumb[] = [
        {
            key: 'documentsPageName',
            href: '/documents',
            current: true,
        },
    ];
    return {
        props: {
            debug: debug,
            documents: results,
            totalResults: totalResults,
            errors: errors,
            offset: offset,
            languageStrings: languageStrings,
            perPage: perPage,
            query: queryString,
            breadCrumbs: breadCrumbs,
        },
    };
}
