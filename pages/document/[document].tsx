import Layout from '../../components/Layout';
import { verifyAuth } from '../../models/auth';
import { getLanguage } from '../../models/languages';
import { Breadcrumb } from '../../interfaces/interfaces';
import dynamic from 'next/dynamic';
import { contactApi } from '../../models/chad';
import { promisify } from 'util';
const PDFViewer = dynamic(() => import('../../components/PdfViewer'), {
    ssr: false,
});
export default function Document({
    documentData,
    uuid,
    breadCrumbs,
    query,
    debug,
    errors,
    languageStrings,
}) {
    const document = JSON.parse(documentData);
    return (
        <Layout
            breadCrumbs={breadCrumbs}
            query={query}
            languageStrings={languageStrings}
            debug={debug}
            data={documentData}
            errors={errors}
        >
            <main id="main" role="main" className="lg:col-span-9">
                {documentData.DocumentB64}
                <PDFViewer
                    file={document.DocumentB64}
                    query={query}
                ></PDFViewer>
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
    let errors: object = {};
    let queryString: string = '';
    let currentLocale: string = req.cookies.NEXT_LOCALE || locale;
    //Fetch language strings using current locale.
    const localLanguageStrings = getLanguage('document', currentLocale);
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
    if (process.env.usecher || query.usecher) {
        const request = {
            Resource: 'Document',
            Endpoint: 'Document',
            Method: 'GetDocumentBase64',
            Body: {
                requestJson: {
                    DocumentUID: query.document,
                },
            },
        };
        var documentData = await contactApi(request);
        documentData['base64Pdf'] = documentData['DocumentData'];
    } else {
        let url = new URL(
            process.env.NEXT_URL +
                process.env.NEXT_API_PATH +
                'document/' +
                query.document,
        );
        const options: RequestInit = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                sessionId: req.cookies.session_id,
            }),
        };
        const response = await fetch(url, options);
        var { document } = await response.json();
    }
    const breadCrumbs: Breadcrumb[] = [
        {
            key: 'documentPageName',
            href: '/document',
            current: true,
        },
    ];
    return {
        props: {
            uuid: query?.UUID || null,
            documentData: JSON.stringify(document),
            breadCrumbs: breadCrumbs,
            languageStrings: languageStrings,
            query: queryString,
            errors: errors,
            debug: debug,
        },
    };
}
