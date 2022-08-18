import Layout from '../components/Layout';
import { verifyAuth } from '../models/auth';
import { parseCookies } from '../helpers/parseCookies';
import { getLanguage } from '../models/languages';
import { useCookies } from 'react-cookie';
export default function Prefences({
    breadCrumbs,
    languageStrings,
    query,
    acceptCookies,
    activateAccessibilityAssistant,
}) {
    const [cookies, setCookies, removeCookies] = useCookies([
        'acceptCookies',
        '_ga',
        '_gat',
        '_gid',
    ]);
    const [
        accessibilityCookie,
        setAccessibilityCookie,
        removeAccessibilityCookie,
    ] = useCookies(['activateAccessibilityAssistant']);
    function setCookiePreferences(preference) {
        if (preference == true || preference == 'true') {
            setCookies('acceptCookies', preference, {
                expires: new Date(
                    new Date().getTime() + 1000 * 60 * 60 * 24 * 365,
                ),
            });
        } else {
            removeCookies('acceptCookies');
            removeCookies('_ga');
            removeCookies('_gat');
            removeCookies('_gid');
        }
    }
    function setAccessibilityPreferences(preference) {
        if (preference == true || preference == 'true') {
            setAccessibilityCookie(
                'activateAccessibilityAssistant',
                preference,
                {
                    expires: new Date(
                        new Date().getTime() + 1000 * 60 * 60 * 24 * 365,
                    ),
                },
            );
        } else {
            removeAccessibilityCookie('activateAccessibilityAssistant');
        }
    }
    return (
        <Layout
            page="Preferences"
            title="Preferences | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            breadCrumbs={breadCrumbs}
            languageStrings={languageStrings}
            query={query}
        >
            <main id="main" role="main" className="lg:col-span-9">
                <div className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-6">
                    <h2 className="mb-4 text-2xl font-extrabold sm:tracking-tight lg:text-4xl">
                        {languageStrings['preferencesPageName']}
                    </h2>
                    <p className="mb-4 text-xl">
                        {languageStrings['preferencesPageDescription']}
                    </p>
                    <p className="mb-4 text-base">
                        {languageStrings['preferencesPagePara1']}
                    </p>
                </div>
                <form name="profile" method="POST">
                    <div>
                        <div className="px-6 lg:py-4 lg:px-0 pb-4 sm:px-6">
                            <h3 className="text-lg font-bold">
                                {languageStrings['acceptCookiesHeading']}
                            </h3>
                            <p className="mt-4">
                                <span>
                                    {languageStrings['acceptCookiesPara1']}
                                </span>
                            </p>
                            <p className="mt-4">
                                <span>
                                    {languageStrings['acceptCookiesPara2']}
                                </span>
                            </p>
                            <p className="mt-4 font-bold">
                                {acceptCookies == 'true' && (
                                    <button
                                        name="updateCookiePreference"
                                        value="true"
                                        type="submit"
                                        className="bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-750"
                                        onClick={() => {
                                            setCookiePreferences(false);
                                        }}
                                    >
                                        {
                                            languageStrings[
                                                'disallowCookiesButton'
                                            ]
                                        }
                                    </button>
                                )}
                                {acceptCookies == 'false' && (
                                    <button
                                        name="updateCookiePreference"
                                        value="true"
                                        type="submit"
                                        className="bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-750"
                                        onClick={() => {
                                            setCookiePreferences(true);
                                        }}
                                    >
                                        {languageStrings['allowCookiesButton']}
                                    </button>
                                )}
                            </p>
                        </div>
                    </div>
                </form>
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
    //Fetch language strings using current locale.
    const localLanguageStrings = getLanguage('preferences', currentLocale);
    const globalLanguageStrings = getLanguage('global', currentLocale);
    const languageStrings = {
        ...localLanguageStrings,
        ...globalLanguageStrings,
    };
    if (typeof req.body != 'undefined' && req.body.allowCookies) {
    }
    const breadCrumbs: object[] = [
        {
            key: 'preferencesPageName',
            href: '/preferences',
            current: true,
        },
    ];
    let acceptCookies: string = 'false';
    if (typeof req.cookies.acceptCookies != 'undefined') {
        acceptCookies = req.cookies.acceptCookies;
    }
    return {
        props: {
            acceptCookies: acceptCookies,
            breadCrumbs: breadCrumbs,
            languageStrings: languageStrings,
            query: queryString,
        },
    };
}
