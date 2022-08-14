import { mockSession, patientAppointments } from "../../../testing/data/testData";

export default function handler(req, res) {
    if (req.headers && req.headers.sessionid){
        let patient = mockSession[req.headers.sessionid]
        if (typeof patientAppointments[patient.nhs_number] != "undefined") {
            const totalResults = patientAppointments[patient.nhs_number].length;
            const start = (req.query.offset - 1) * req.query.perPage;
            const end = start + req.query.perPage;
            const appointments = patientAppointments[patient.nhs_number].slice(
                start,
                end
            );
            res.status(200).json({
                appointments: appointments,
                statusCode: 200,
                errors: [],
                totalResults: totalResults,
            });
        } else {
            res.status(200).json({
                appointments: [],
                statusCode: 204,
                errors: [],
                totalResults: 0
            });
        }
    }
}
