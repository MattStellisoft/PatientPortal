import {
    patientQuestionnaires,
    mockSession,
} from '../../../testing/data/testData';

export default function handler(req, res) {
    if (req.headers && req.headers.sessionid) {
        let patient = mockSession[req.headers.sessionid];
        if (typeof patientQuestionnaires[patient.nhs_number] != 'undefined') {
            const totalResults =
                patientQuestionnaires[patient.nhs_number].length;
            const start = (req.query.offset - 1) * req.query.perPage;
            const end = start + req.query.perPage;
            const results = patientQuestionnaires[patient.nhs_number].slice(
                start,
                end,
            );
            res.status(200).json({
                results: results,
                totalResults: totalResults,
                statusCode: 1,
            });
        }
    } else {
        res.status(200).json({
            results: [],
            totalResults: 0,
            statusCode: 1,
        });
    }
}
