import { patientQuestionnaires } from "../../../../testing/data/testData";

export default function handler(req, res) {
    if (typeof patientQuestionnaires[req.query.nhsnumber] != "undefined") {
        const totalResults = patientQuestionnaires[req.query.nhsnumber].length;
        const start = (req.query.offset - 1) * req.query.perPage;
        const end = start + req.query.perPage;
        const results = patientQuestionnaires[req.query.nhsnumber].slice(
            start,
            end
        );
        res.status(200).json({
            results: results,
            totalResults: totalResults,
            statusCode: 1,
        });
    }
    res.status(200).json({
        results: [],
        totalResults: 0,
        statusCode: 1,
    });
}
