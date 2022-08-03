import Layout from "../components/Layout";
import { parseCookies } from "../helpers/parseCookies";
import { getLanguage } from "../models/languages";

export default function Help({ breadCrumbs, languageStrings }) {
    return (
        <Layout
            page="Help"
            languageStrings={languageStrings}
            title="Help | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            breadCrumbs={breadCrumbs}
        >
            <div className="lg:col-span-9"></div>
        </Layout>
    );
}
export async function getServerSideProps(context) {
    const { locale, req } = context;
    const data = parseCookies(req);
    let currentLocale: string = data.NEXT_LOCALE || locale;
    //Fetch language strings using current locale.
    const localLanguageStrings = getLanguage("help", currentLocale);
    const globalLanguageStrings = getLanguage("global", currentLocale);
    const languageStrings = {
        ...localLanguageStrings,
        ...globalLanguageStrings,
    };
    const breadCrumbs: object[] = [
        {
            key: "helpPageName",
            href: "/help",
            current: true,
        },
    ];
    return {
        props: {
            breadCrumbs: breadCrumbs,
            languageStrings: languageStrings,
        },
    };
}
