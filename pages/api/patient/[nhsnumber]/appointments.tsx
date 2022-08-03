import { patientAppointments } from "../../../../testing/data/testData";

export default function handler(req, res) {
    if (typeof patientAppointments[req.query?.nhsnumber] != "undefined") {
        const totalResults = patientAppointments[req.query.nhsnumber].length;
        const start = (req.query.offset - 1) * req.query.perPage;
        const end = start + req.query.perPage;
        const appointments = patientAppointments[req.query.nhsnumber].slice(
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
