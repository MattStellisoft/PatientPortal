import Layout from '../components/Layout';
import { useState } from 'react';
import { verifyAuth } from '../models/auth';
import { parseCookies } from '../helpers/parseCookies';
import { getLanguage } from '../models/languages';
import { contactApi } from '../models/chad';
import TextInput from '../components/form_controls/TextInput';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
export default function Profile({
    breadCrumbs,
    languageStrings,
    profile,
    debug,
    success,
    query,
    errors,
}) {
    const [email, setEmail] = useState(profile.Email);
    const [phoneNumber, setPhoneNumber] = useState(profile.MobileNumber);
    return (
        <Layout
            page="Profile"
            title="Profile | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            breadCrumbs={breadCrumbs}
            debug={debug}
            data={profile}
            errors={errors}
            languageStrings={languageStrings}
            query={query}
        >
            <main id="main" role="main" className="lg:col-span-9">
                <div className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-6">
                    <h2 className="mb-4 text-2xl font-extrabold sm:tracking-tight lg:text-4xl">
                        {languageStrings['profilePageName']}
                    </h2>
                    <p className="mb-4 text-xl">
                        {languageStrings['profilePageDescription']}
                    </p>
                    <p className="mb-4 text-base">
                        {languageStrings['profilePagePara1']}
                    </p>
                    <p>
                        <a
                            target="_blank"
                            className="text-blue-750 hover:underline"
                            href="https://settings.sandpit.signin.nhs.uk"
                        >
                            Go to the NHS Login Setting Page
                        </a>
                    </p>
                </div>
            </main>
        </Layout>
    );
}
export async function getServerSideProps({ query, req, locale }) {
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
    let profile: object = {};
    let success: boolean = false;
    let queryString: string = '';
    let errors: object = {};
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
    //Fetch language strings using current locale.
    const localLanguageStrings = getLanguage('profile', currentLocale);
    const globalLanguageStrings = getLanguage('global', currentLocale);
    const languageStrings = {
        ...localLanguageStrings,
        ...globalLanguageStrings,
    };
    const breadCrumbs: object[] = [
        {
            key: 'profilePageName',
            href: '/profile',
            current: true,
        },
    ];
    return {
        props: {
            breadCrumbs: breadCrumbs,
            profile: profile,
            debug: debug,
            languageStrings: languageStrings,
            query: queryString,
            success: success,
            errors: errors,
        },
    };
}
