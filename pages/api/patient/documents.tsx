import { patientDocuments, mockSession } from '../../../testing/data/testData';

export default function handler(req, res) {
    if (req.headers && req.headers.sessionid) {
        let patient = mockSession[req.headers.sessionid];
        if (typeof patientDocuments[patient.nhs_number] != 'undefined') {
            let errors = [];
            const totalResults = patientDocuments[patient.nhs_number].length;
            const start = (req.query.offset - 1) * req.query.perPage;
            const end = start + req.query.perPage;
            const results = patientDocuments[patient.nhs_number].slice(
                start,
                end,
            );
            res.status(200).json({
                results: results,
                totalResults: totalResults,
                errors: errors,
            });
        }
    } else {
        res.status(200).json({
            results: [],
            totalResults: 0,
            errors: {
                error: 'We could not find any documents at this time.',
            },
        });
    }
}
