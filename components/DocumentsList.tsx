import Link from "next/link";
export default function DocumentsList({ documents, languageStrings, query }) {
    return (
        <div className="overflow-hidden">
            <div className="border-t border-black">
                <dl className="sm:divide-y sm:divide-black">
                    {documents.map((document, index) => (
                        <div
                            key={index}
                            className="px-6 py-4 flex items-center justify-between"
                        >
                            <dt className="text-base font-bold text-blue-750">
                                <Link
                                    href={
                                        "/document/" +
                                        document.DocumentUID +
                                        query
                                    }
                                >
                                    {languageStrings.documentSummary
                                        .replace(
                                            "[DocumentType]",
                                            document.DocumentType
                                        )
                                        .replace(
                                            "[DateSent]",
                                            new Date(
                                                document.LetterCreatedDateTime
                                                    ? document.LetterCreatedDateTime
                                                    : document.LetterCreated
                                            ).toLocaleDateString("en-gb", {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })
                                        )}
                                </Link>
                            </dt>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}
