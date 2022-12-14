import Layout from '../components/Layout';
import { verifyAuth } from '../models/auth';
import { parseCookies } from '../helpers/parseCookies';
import { getLanguage } from '../models/languages';
import { contactApi } from '../models/chad';
export default function PhysioNow({ breadCrumbs, languageStrings, query }) {
    return (
        <Layout
            page="PhysioNow"
            title="PhysioNow | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            breadCrumbs={breadCrumbs}
            languageStrings={languageStrings}
            query={query}
        >
            <main id="main" role="main" className="lg:col-span-9">
                <div className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-6">
                    <h2 className="pb-4 text-2xl font-extrabold sm:tracking-tight lg:text-4xl">
                        {languageStrings['physioNowPageName']}
                    </h2>
                    <p className="mb-4 text-xl">
                        {languageStrings['physioNowPageDescription']}
                        <a
                            target="_blank"
                            className="text-blue-750 hover:underline"
                            href="https://www.connecthealth.co.uk/resources/physionow"
                        >
                            {languageStrings['physioNowPageLink']}
                        </a>
                        .
                    </p>
                    <p className="mb-4 text-base">
                        {languageStrings['physioNowPagePara1']}
                    </p>
                </div>
                <iframe
                    className="w-full h-96"
                    src="https://phio.eql.ai/provider/connecthealth"
                ></iframe>
            </main>
        </Layout>
    );
}
export async function getServerSideProps({ req, query, locale }) {
    let queryString: string = '';
    if (query.testuser) {
        queryString = '?testuser=' + query.testuser;
        if (query.usecher) {
            queryString += '&usecher=true';
        }
    }
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
    let currentLocale: string = req.cookies.NEXT_LOCALE || locale;
    const localLanguageStrings = getLanguage('physionow', currentLocale);
    const globalLanguageStrings = getLanguage('global', currentLocale);
    const languageStrings = {
        ...localLanguageStrings,
        ...globalLanguageStrings,
    };
    if (process.env.usecher || (query.usecher && query.testuser)) {
        const request = {
            Resource: 'PhysioNow',
            Endpoint: 'PhysioNow',
            Method: 'GetPhysioNowDetails',
            Body: {
                requestJson: {
                    NHSNumber: query.testuser
                        ? query.testuser
                        : authorisedUser.nhs_number,
                },
            },
        };
        const test = await contactApi(request);
    } else {
        //profile = await getPhysioNowDetails(endpoint);
    }
    const breadCrumbs: object[] = [
        {
            key: 'phioPageName',
            href: '/physionow',
            current: true,
        },
    ];
    return {
        props: {
            breadCrumbs: breadCrumbs,
            languageStrings: languageStrings,
            query: queryString,
        },
    };
}
