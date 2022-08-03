import { patientDocuments } from "../../../../testing/data/testData";

export default function handler(req, res) {
    if (req.query?.nhsnumber && patientDocuments[req.query.nhsnumber]) {
        let errors = [];
        const totalResults = patientDocuments[req.query.nhsnumber].length;
        const start = (req.query.offset - 1) * req.query.perPage;
        const end = start + req.query.perPage;
        const results = patientDocuments[req.query.nhsnumber].slice(start, end);
        return res.status(200).json({
            results: results,
            totalResults: totalResults,
            errors: errors,
        });
    }
    return res.status(200).json({
        results: [],
        totalResults: 0,
        errors: {
            error: "We could not find any documents at this time.",
        },
    });
}
