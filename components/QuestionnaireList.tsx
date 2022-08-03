import Link from "next/link";
export default function questionnaireList({ questionnaires, status, query }) {
    return (
        <div className="overflow-hidden">
            <div className="border-t border-black px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-black">
                    {questionnaires.map((questionnaire, index) => (
                        <div
                            key={index}
                            className="p-4 sm:py-5 flex items-center justify-between"
                        >
                            <dt className="text-base font-bold text-blue-750">
                                {questionnaire.QuestionnaireTypeUuid ? (
                                    <Link
                                        href={
                                            "/questionnaire/" +
                                            questionnaire.QuestionnaireTypeUuid +
                                            query
                                        }
                                    >
                                        {questionnaire.QuestionnaireName}
                                    </Link>
                                ) : (
                                    <Link
                                        href={`https://chquestionnaires.connecthealthworks.co.uk/?UUID=${questionnaire.patientsUUID}&questionnaire=${questionnaire.typeUUID}&a=${questionnaire.AnswersUuid}`}
                                    >
                                        {questionnaire.name
                                            ? questionnaire.name
                                            : questionnaire.Uuid}
                                    </Link>
                                )}
                            </dt>
                            {status ? (
                                <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
                                    {typeof questionnaire.DateTimeAnswersReceived !=
                                        "undefined" ||
                                    questionnaire.completed ? (
                                        <span className="inline-flex items-center px-2 py-1 font-bold bg-blue-750 text-white">
                                            Completed
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 font-medium bg-gray-600 text-white">
                                            Incomplete
                                        </span>
                                    )}
                                </dd>
                            ) : (
                                ""
                            )}
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}
