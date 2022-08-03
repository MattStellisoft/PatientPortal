import Layout from "../components/Layout";
import { getDocuments } from "../models/documents";
import { verifyAuth } from "../models/auth";
import { DocumentInterface, Breadcrumb } from "../interfaces/interfaces";
import DocumentsList from "../components/DocumentsList";
import Pagination from "../components/Pagination";
import { contactApi } from "../models/chad";
import { parseCookies } from "../helpers/parseCookies";
import { getLanguage } from "../models/languages";
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
                            {languageStrings["documentsPageName"]}
                        </h2>
                        <p className="mb-4 text-xl">
                            {languageStrings["documentsPageDescription"]}
                        </p>
                        <p className="mb-4 text-base">
                            {languageStrings["documentsPagePara1"]}
                        </p>
                    </div>
                    <p className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-6 text-lg font-bold">
                        {languageStrings["documentResults"].replace(
                            "[totalResults]",
                            totalResults
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
export async function getServerSideProps(context) {
    const debug: boolean = context.query?.debug ? context.query?.debug : false;
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
    const offset: number = context.query?.page || 1;
    const perPage: number = context.query?.perPage || 5;
    let query: string = "";
    let errors: object = {};
    const { locale, req } = context;
    const data = parseCookies(req);
    let currentLocale: string = data.NEXT_LOCALE || locale;
    //Fetch language strings using current locale.
    const localLanguageStrings = getLanguage("documents", currentLocale);
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
    if (
        process.env.usecher ||
        (context.query.usecher && context.query.testuser)
    ) {
        const request = {
            Resource: "Documents",
            Endpoint: "Document",
            Method: "GetDocuments",
            Body: {
                requestJson: {
                    NHSNumber: context.query.testuser
                        ? context.query.testuser
                        : authorisedUser.nhs_number,
                },
            },
        };
        const patientDocuments = await contactApi(request);
        if (typeof patientDocuments.Documents != "undefined") {
            var totalResults: number = patientDocuments.Documents.length;
            const start = (offset - 1) * perPage;
            const end = start + perPage;
            var results: DocumentInterface[] = patientDocuments.Documents.slice(
                start,
                end
            );
        } else {
            var totalResults: number = 0;
            var results: DocumentInterface[] = [];
        }
    } else {
        const endpoint =
            process.env.NEXT_CHAPI_URL +
            `/api/patient/${authorisedUser.nhs_number}/documents`;
        const params = {
            offset: offset,
            perPage: perPage,
        };
        var { results, totalResults } = await getDocuments(endpoint, params);
    }
    const breadCrumbs: Breadcrumb[] = [
        {
            key: "documentsPageName",
            href: "/documents",
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
            query: query,
            breadCrumbs: breadCrumbs,
        },
    };
}
