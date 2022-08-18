import Layout from "../../components/Layout";
import { verifyAuth } from "../../models/auth";
import { parseCookies } from "../../helpers/parseCookies";
import { getQuestionnaire } from "../../models/questionnaires";
import TextAreaInput from "../../components/form_controls/TextAreaInput";
import TextInput from "../../components/form_controls/TextInput";
import DateFields from "../../components/form_controls/DateFields";
import bodyParser from "body-parser";
import { promisify } from "util";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import * as yup from "yup";
import { getLanguage } from "../../models/languages";
import { transformAll } from "@demvsystems/yup-ast";
const getBody = promisify(bodyParser.urlencoded());
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
export default function Questionnaire({
    questionnaireData,
    questionnaireId,
    questionNumber,
    languageStrings,
    breadCrumbs,
    query,
    debug,
    errors,
}) {
    return (
        <Layout
            page={questionnaireData.meta.name}
            title="Questionnaire | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            breadCrumbs={breadCrumbs}
            languageStrings={languageStrings}
            query={query}
            debug={debug}
            errors={errors}
            data={questionnaireData}
        >
            <main id="main" role="main" className="lg:col-span-9">
                {(typeof questionNumber == "undefined" ||
                    questionNumber == -1) && (
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                        <h1 className="text-4xl font-extrabold tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">
                            {questionnaireData.meta.name}
                        </h1>
                        <p className="mt-6 text-xl text-blue-750 max-w-3xl">
                            {questionnaireData.meta.description}
                        </p>
                        <form
                            method="POST"
                            action={"/questionnaire/" + questionnaireId + query}
                            className="space-y-8"
                        >
                            <button
                                type="submit"
                                name="start"
                                value="true"
                                className="mt-4 bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-750"
                            >
                                {languageStrings["start"]}
                            </button>
                        </form>
                    </div>
                )}
                {questionNumber > 0 &&
                    questionNumber <= questionnaireData.questions.length && (
                        <form
                            method="POST"
                            action={"/questionnaire/" + questionnaireId + query}
                        >
                            {questionNumber > 0 && (
                                <input
                                    type="hidden"
                                    name="questionNumber"
                                    value={Number(questionNumber)}
                                />
                            )}
                            <div>
                                <div className="lg:my-0 py-5 sm:py-0 space-y-6 p-6">
                                    <div
                                        className={classNames(
                                            typeof errors != "undefined" &&
                                                errors.length > 0
                                                ? "border-l-4 border-red-500 pl-4"
                                                : "",
                                            "space-y-8 sm:space-y-5"
                                        )}
                                    >
                                        <div className="space-y-8 sm:space-y-5">
                                            {questionnaireData.questions.map(
                                                (question, questionIndex) => (
                                                    <div key={questionIndex}>
                                                        {(questionNumber == 0 ||
                                                            questionIndex ==
                                                                questionNumber -
                                                                    1) && (
                                                            <div>
                                                                <div className="mb-4 text-base font-bold">
                                                                    {languageStrings[
                                                                        "appointmentDetail"
                                                                    ]
                                                                        .replace(
                                                                            "[questionNumber]",
                                                                            questionNumber
                                                                        )
                                                                        .replace(
                                                                            "[questionsRemaining]",
                                                                            questionnaireData
                                                                                .questions
                                                                                .length
                                                                        )}
                                                                </div>
                                                                <label
                                                                    htmlFor={
                                                                        question.name
                                                                    }
                                                                    className="mb-4 block text-4xl font-bold text-black sm:mt-px sm:pt-2"
                                                                >
                                                                    {
                                                                        question.question
                                                                    }
                                                                </label>
                                                                <div className="mb-4 text-base">
                                                                    {
                                                                        question.hint
                                                                    }
                                                                </div>

                                                                {errors && (
                                                                    <div className="mb-4 text-red-500 font-bold text-base">
                                                                        {errors.map(
                                                                            (
                                                                                error
                                                                            ) => (
                                                                                <span>
                                                                                    {
                                                                                        languageStrings[
                                                                                            error
                                                                                        ]
                                                                                    }
                                                                                </span>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}

                                                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                    {(() => {
                                                                        switch (
                                                                            question.answerType
                                                                        ) {
                                                                            case "ShortTextField":
                                                                                return (
                                                                                    <TextInput
                                                                                        classNames={
                                                                                            classNames
                                                                                        }
                                                                                        name={
                                                                                            question.name
                                                                                        }
                                                                                        inputMode={
                                                                                            question.inputMode
                                                                                        }
                                                                                        pattern={
                                                                                            question.pattern
                                                                                        }
                                                                                        errors={
                                                                                            errors
                                                                                        }
                                                                                    />
                                                                                );
                                                                            case "Lickert":
                                                                                return (
                                                                                    <fieldset className="mt-6">
                                                                                        <div className="mt-4 space-y-4">
                                                                                            <div className="max-w-sm grid grid-cols-5 gap-8">
                                                                                                {[
                                                                                                    ...Array(
                                                                                                        10
                                                                                                    ),
                                                                                                ].map(
                                                                                                    (
                                                                                                        elementInArray,
                                                                                                        index
                                                                                                    ) => (
                                                                                                        <div className="flex flex-col items-left">
                                                                                                            <label
                                                                                                                htmlFor="push-everything"
                                                                                                                className="ml-3 mb-2"
                                                                                                            >
                                                                                                                <span className="block text-sm font-bold text-black">
                                                                                                                    {index +
                                                                                                                        1}
                                                                                                                </span>
                                                                                                            </label>
                                                                                                            <input
                                                                                                                id="push-everything"
                                                                                                                name="push-notifications"
                                                                                                                type="radio"
                                                                                                                className="focus:ring-blue-500 h-8 w-8 text-blue-600 border-black border-4"
                                                                                                            />
                                                                                                        </div>
                                                                                                    )
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                    </fieldset>
                                                                                );
                                                                            case "DateFields":
                                                                                return (
                                                                                    <div id="date">
                                                                                        <div className="inline-block mr-4 mb-0">
                                                                                            <div className="govuk-form-group">
                                                                                                <label
                                                                                                    className="govuk-label govuk-date-input__label"
                                                                                                    htmlFor="dob-day"
                                                                                                >
                                                                                                    Day
                                                                                                </label>
                                                                                                <input
                                                                                                    className="mt-4 focus:ring-blue-500 focus:border-blue-500 block max-w-xs min-w-0 sm:text-sm border-4 border-black"
                                                                                                    style={{
                                                                                                        maxWidth:
                                                                                                            "7ex",
                                                                                                    }}
                                                                                                    maxLength={
                                                                                                        2
                                                                                                    }
                                                                                                    id="dob-day"
                                                                                                    name="dob-day"
                                                                                                    type="text"
                                                                                                    autoComplete="bday-day"
                                                                                                    inputMode="numeric"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="inline-block mr-4 mb-0">
                                                                                            <div className="govuk-form-group">
                                                                                                <label
                                                                                                    className="govuk-label govuk-date-input__label"
                                                                                                    htmlFor="dob-month"
                                                                                                >
                                                                                                    Month
                                                                                                </label>
                                                                                                <input
                                                                                                    className="mt-4 focus:ring-blue-500 focus:border-blue-500 block max-w-xs min-w-0 sm:text-sm border-4 border-black"
                                                                                                    style={{
                                                                                                        maxWidth:
                                                                                                            "7ex",
                                                                                                    }}
                                                                                                    maxLength={
                                                                                                        2
                                                                                                    }
                                                                                                    id="dob-month"
                                                                                                    name="dob-month"
                                                                                                    type="text"
                                                                                                    autoComplete="bday-month"
                                                                                                    inputMode="numeric"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="inline-block mr-4 mb-0">
                                                                                            <div className="govuk-form-group">
                                                                                                <label
                                                                                                    className="govuk-label govuk-date-input__label"
                                                                                                    htmlFor="dob-year"
                                                                                                >
                                                                                                    Year
                                                                                                </label>
                                                                                                <input
                                                                                                    className="mt-4 focus:ring-blue-500 focus:border-blue-500 flex-grow block max-w-sm min-w-0 sm:text-sm border-4 border-black"
                                                                                                    style={{
                                                                                                        maxWidth:
                                                                                                            "10ex",
                                                                                                    }}
                                                                                                    maxLength={
                                                                                                        4
                                                                                                    }
                                                                                                    id="dob-year"
                                                                                                    name="dob-year"
                                                                                                    type="text"
                                                                                                    autoComplete="bday-year"
                                                                                                    inputMode="numeric"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            case "TimeFields":
                                                                                return (
                                                                                    <div id="time">
                                                                                        <div className="inline-block mr-4 mb-0">
                                                                                            <div>
                                                                                                <label htmlFor="time-hour">
                                                                                                    Hour
                                                                                                </label>
                                                                                                <input
                                                                                                    className="mt-4 focus:ring-blue-500 focus:border-blue-500 block max-w-xs min-w-0 sm:text-sm border-4 border-black"
                                                                                                    style={{
                                                                                                        maxWidth:
                                                                                                            "7ex",
                                                                                                    }}
                                                                                                    maxLength={
                                                                                                        2
                                                                                                    }
                                                                                                    id="time-hour"
                                                                                                    name="time-hour"
                                                                                                    type="text"
                                                                                                    autoComplete="time-hour"
                                                                                                    inputMode="numeric"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="inline-block mr-4 mb-0">
                                                                                            <div>
                                                                                                <label htmlFor="time-minute">
                                                                                                    Minute
                                                                                                </label>
                                                                                                <input
                                                                                                    className="mt-4 focus:ring-blue-500 focus:border-blue-500 block max-w-xs min-w-0 sm:text-sm border-4 border-black"
                                                                                                    style={{
                                                                                                        maxWidth:
                                                                                                            "7ex",
                                                                                                    }}
                                                                                                    maxLength={
                                                                                                        2
                                                                                                    }
                                                                                                    id="time-minute"
                                                                                                    name="time-minute"
                                                                                                    type="text"
                                                                                                    autoComplete="time-minute"
                                                                                                    inputMode="numeric"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                        {/* <div className="inline-block mr-4 mb-0">
                                                                                <div className="govuk-form-group">
                                                                                    <label
                                                                                        className="govuk-label govuk-date-input__label"
                                                                                        htmlFor="dob-year"
                                                                                    >
                                                                                        Second
                                                                                    </label>
                                                                                    <input
                                                                                        className="mt-4 focus:ring-blue-500 focus:border-blue-500 flex-grow block max-w-sm min-w-0 sm:text-sm border-4 border-black"
                                                                                        style={{
                                                                                            maxWidth:
                                                                                                "7ex",
                                                                                        }}
                                                                                        maxLength={
                                                                                            2
                                                                                        }
                                                                                        id="dob-year"
                                                                                        name="dob-year"
                                                                                        type="text"
                                                                                        autoComplete="bday-year"
                                                                                        inputMode="numeric"
                                                                                    />
                                                                                </div>
                                                                            </div> */}
                                                                                    </div>
                                                                                );
                                                                            case "MultilineTextField":
                                                                                return (
                                                                                    <TextAreaInput
                                                                                        classNames={
                                                                                            classNames
                                                                                        }
                                                                                        name={
                                                                                            question.name
                                                                                        }
                                                                                        errors={
                                                                                            errors
                                                                                        }
                                                                                    />
                                                                                );
                                                                            default:
                                                                                return null;
                                                                        }
                                                                    })()}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    {questionNumber > 0 && (
                                        <div className="flex">
                                            <button
                                                type="submit"
                                                name="continue"
                                                className="bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-750"
                                            >
                                                {languageStrings["continue"]}
                                            </button>
                                            <div className="ml-4 flex items-center justify-start">
                                                <ChevronLeftIcon
                                                    className="flex-shrink-0 h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                                <button
                                                    type="submit"
                                                    name="goback"
                                                    value="true"
                                                    className="font-bold text-black hover:underline"
                                                >
                                                    {languageStrings["back"]}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    )}
                {questionNumber > questionnaireData.questions.length && (
                    <div className="overflow-hidden">
                        <div className="px-6 py-4 sm:px-0">
                            <h3 className="text-2xl leading-6 font-bold">
                                {languageStrings["checkAnswersHeading"]}
                            </h3>
                        </div>
                        <div className="border-t border-gray-200 px-6 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                {questionnaireData.questions.map(
                                    (question, questionIndex) => (
                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                            <dt className="text-base font-bold">
                                                {question.question}
                                            </dt>
                                            <dd className="mt-1 text-base sm:mt-0">
                                                {question.value}
                                            </dd>
                                            <dd className="mt-4 text-base sm:mt-0 sm:text-right">
                                                <form method="POST">
                                                    <input
                                                        type="hidden"
                                                        name="questionNumber"
                                                        value={
                                                            questionIndex + 1
                                                        }
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="text-blue-750"
                                                    >
                                                        {
                                                            languageStrings[
                                                                "change"
                                                            ]
                                                        }
                                                    </button>
                                                </form>
                                            </dd>
                                        </div>
                                    )
                                )}
                            </dl>
                        </div>
                        <div className="px-6 py-5 sm:px-0">
                            <h3 className="text-lg leading-6 font-bold">
                                {languageStrings["sendQuestionnaireHeading"]}
                            </h3>
                            <p className="mt-1 max-w-2xl text-base mb-4">
                                {
                                    languageStrings[
                                        "sendQuestionnaireDeclaration"
                                    ]
                                }
                            </p>
                            <button
                                type="submit"
                                className="bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-750"
                            >
                                {languageStrings["submit"]}
                            </button>
                        </div>
                    </div>
                )}
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
    const { locale, req } = context;
    const data = parseCookies(req);
    let currentLocale: string = data.NEXT_LOCALE || locale;
    const languageStrings = getLanguage("questionnaire", currentLocale);
    let query: string = "";
    if (context.query.testuser) {
        query = "?testuser=" + context.query.testuser;
        if (context.query.usecher) {
            query += "&usecher=true";
        }
        if (context.query.debug) {
            query += "&debug=true";
        }
    }
    let pageNumber: number = 0;
    let questionNumber: number = -1;
    let errors: [] = [];
    // const endpoint: string =
    //     process.env.NEXT_URL +
    //     `/api/patient/${authorisedUser.nhs_number}/questionnaire/${context.params.questionnaire}`;
    // const answers = await getAnswers(
    //     endpoint,
    //     context.params.questionnaire,
    //     currentLocale
    // );
    const questionnaireData = await getQuestionnaire(
        context.params.questionnaire,
        currentLocale
    );
    if (context.req.method === "POST") {
        await getBody(context.req, context.res);
    }
    if (
        typeof context.req.body != "undefined" &&
        context.req.body.start == "true"
    ) {
        questionNumber = 1;
    }
    if (
        typeof context.req.body != "undefined" &&
        context.req.body.goback == "true"
    ) {
        questionNumber = Number(questionNumber) - 1;
    }
    if (
        typeof context.req.body != "undefined" &&
        context.req.body.questionNumber
    ) {
        questionNumber = Number(context.req.body.questionNumber);
        let schema = transformAll(
            questionnaireData.questions[context.req.body.questionNumber - 1]
                .validation
        );
        let submission = {};
        submission[
            questionnaireData.questions[
                context.req.body.questionNumber - 1
            ].name
        ] =
            context.req.body[
                questionnaireData.questions[
                    context.req.body.questionNumber - 1
                ].name
            ];
        let validationOutcome = await schema
            .validate(submission)
            .catch(function (err) {
                return err;
            });
        if (typeof validationOutcome.errors == "undefined") {
            questionNumber += 1;
        } else {
            errors = validationOutcome.errors;
        }
    }
    const breadCrumbs: object[] = [
        {
            name: "Questionnaires",
            href: "/questionnaires",
            current: false,
        },
        {
            name: questionnaireData.meta.name,
            href: "/questionnaire/" + context.params.questionnaire,
            current: true,
        },
    ];
    return {
        props: {
            questionnaireData: questionnaireData,
            questionnaireId: context.params.questionnaire,
            breadCrumbs: breadCrumbs,
            languageStrings: languageStrings,
            pageNumber: pageNumber,
            questionNumber: questionNumber,
            query: query,
            errors: errors,
            debug,
        },
    };
}
