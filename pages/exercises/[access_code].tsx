import Layout from '../../components/Layout';
import { verifyAuth } from '../../models/auth';
import { getPatient } from '../../models/patients';
import { getExercises, getAdherence } from '../../models/exercises';
import RadialProgress from '../../components/charts/Donut';
import { parseCookies } from '../../helpers/parseCookies';
import { getLanguage } from '../../models/languages';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
export default function Exercises({
    exercisesData,
    exercises,
    breadCrumbs,
    query,
    languageStrings,
    debug,
    selectedDate,
}) {
    return (
        <Layout
            languageStrings={languageStrings}
            page="Exercises"
            title="Exercises | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            breadCrumbs={breadCrumbs}
            query={query}
            debug={debug}
            data={exercisesData}
        >
            <main id="main" role="main" className="lg:col-span-9">
                <div className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-6">
                    <h2 className="pb-4 text-2xl font-extrabold sm:tracking-tight lg:text-4xl">
                        {languageStrings['exercisesPageName']}
                    </h2>
                    <p className="mb-4 text-xl">
                        {languageStrings['exercisesPageDescription']}
                        <a
                            target="_blank"
                            className="text-blue-750 hover:underline"
                            href="https://www.connecthealth.co.uk/resources/physionow"
                        >
                            {languageStrings['physioNowPageLink']}
                        </a>
                    </p>
                    <p className="mb-4 text-base">
                        {languageStrings['exercisesPagePara1']}
                    </p>
                </div>
                <p className="mb-4 text-base">
                    Your current adherence score is:
                </p>
                <RadialProgress
                    id={'progressRadial'}
                    points={30}
                    threshold={50}
                />
                <div className="my-6">
                    <form method="GET">
                        <label
                            htmlFor="company-website"
                            className="block text-base font-bold text-black"
                        >
                            <p className="mb-2">Choose a day</p>
                            <select
                                id="date"
                                name="date"
                                className="border-black max-w-lg block w-full focus:ring-blue-750 focus:border-blue-750 sm:max-w-xs sm:text-sm border-4"
                                defaultValue={selectedDate}
                            >
                                {exercisesData.weeks.map((week) =>
                                    week.days.map((day) => (
                                        <option value={day.date}>
                                            {new Date(day.date)
                                                .toDateString()
                                                .toLocaleString()}
                                        </option>
                                    )),
                                )}
                            </select>
                        </label>
                        <button
                            className="mt-2 cursor-pointer mr-4 bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-750"
                            type="submit"
                        >
                            Fetch exercises
                        </button>
                    </form>
                </div>
                <div className="border-t border-gray-200 px-6 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        {exercises.exercises &&
                            exercises.exercises.map((exercise) => (
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-base font-bold">
                                        {exercise.name}
                                    </dt>
                                    <dd className="mt-1 text-base sm:mt-0"></dd>
                                    <dd className="mt-4 text-base sm:mt-0 sm:text-right">
                                        {exercise.reps}
                                    </dd>
                                </div>
                            ))}
                    </dl>
                </div>
            </main>
        </Layout>
    );
}
export async function getServerSideProps({ locale, req, query, params }) {
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
    let queryString: string = '';
    let exercisesData: any = {};
    let exercises: any = {};
    let adherenceData: any = {};
    let selectedDate: string = new Date().toDateString();
    let currentLocale: string = req.cookies.NEXT_LOCALE || locale;
    //Fetch language strings using current locale.
    const localLanguageStrings = getLanguage('preferences', currentLocale);
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
    const endpoint: string =
        process.env.NEXT_URL + `/api/patient/${authorisedUser.nhs_number}`;
    const patient: any = await getPatient(endpoint);

    if (typeof query != 'undefined' && query.date) {
        selectedDate = query.date;
    }

    console.log('query.params', params);

    if (typeof patient.PhysitrackClientID != 'undefined') {
        exercisesData = await getExercises(patient, params.access_code);
        adherenceData = await getAdherence(patient, params.access_code);
        //console.log('selectedDate', new Date(selectedDate).toDateString());
        if (exercisesData && typeof exercisesData.weeks != 'undefined') {
            exercisesData.weeks.map((week) => {
                week.days.map((day) => {
                    if (
                        new Date(day.date).toDateString() ==
                        new Date(selectedDate).toDateString()
                    ) {
                        exercises = day;
                    }
                });
            });
        }
        //console.log('exercisesData', exercisesData)
        //console.log("adherenceData", adherenceData);
        console.log('exercises', exercises);
    }
    const breadCrumbs: object[] = [
        {
            key: 'programmesPageName',
            href: '/programmes/',
            current: false,
        },
        {
            key: 'exercisesPageName',
            href: '/exercises/' + params.access_code,
            current: false,
        },
    ];
    return {
        props: {
            selectedDate: selectedDate,
            exercisesData: exercisesData,
            exercises: exercises,
            accessCode: params.access_code,
            breadCrumbs: breadCrumbs,
            query: queryString,
            languageStrings: languageStrings,
            debug: debug,
        },
    };
}
