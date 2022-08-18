import {
    mockSession,
    patientAppointments,
} from '../../../testing/data/testData';

export default function handler(req, res) {
    if (req.headers && req.headers.sessionid) {
        let patient = mockSession[req.headers.sessionid];
        if (typeof patientAppointments[patient.nhs_number] != 'undefined') {
            const appointmentsRequiringActions = patientAppointments[
                patient.nhs_number
            ].filter(function (appointment) {
                return appointment.AutoBookedStatus == 'Unconfirmed';
            });
            var appointments = patientAppointments[patient.nhs_number].filter(
                function (appointment) {
                    return appointment.AutoBookedStatus != 'Unconfirmed';
                },
            );
            const totalResults = appointments.length;
            const start = (req.query.offset - 1) * req.query.perPage;
            const end = start + req.query.perPage;
            appointments = appointments.slice(start, end);
            res.status(200).json({
                appointments: appointments,
                appointmentsRequiringActions: appointmentsRequiringActions,
                statusCode: 200,
                errors: [],
                totalResults: totalResults,
            });
        } else {
            res.status(200).json({
                appointments: [],
                appointmentsRequiringActions: [],
                statusCode: 204,
                errors: [],
                totalResults: 0,
            });
        }
    }
}
