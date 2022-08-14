import { patientSteps, mockSession } from "../../../testing/data/testData";

export default function handler(req, res) {
    if (req.headers && req.headers.sessionid){
        let patient = mockSession[req.headers.sessionid];
        if (patient.nhs_number && patientSteps[patient.nhs_number]) {
            const results = patientSteps[patient.nhs_number];
            res.status(200).json({
                statusCode: results.StatusCode,
                statusMessage: results.statusMessage,
            });
        } 
    } else {
        res.status(200).json({
            statusMessage: [],
            statusCode: 204,
            errors: [],
        });
    }
}
