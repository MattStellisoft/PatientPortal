import type { NextApiRequest, NextApiResponse } from 'next';
import { contactApi } from '../../../../models/chad';
type ResponseData = {
    statusMessage: any;
    StatusCode: number;
};
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    if (typeof req.body.appointmentID != 'undefined') {
        const request = {
            Resource: 'AppointmentBooking',
            Endpoint: 'AppointmentBooking',
            Method: 'ConfirmAppointment',
            Body: {
                requestJson: {
                    AppointmentUID: req.body.appointmentID,
                },
            },
        };
        const { statusMessage, StatusCode } = await contactApi(request);
        if (StatusCode == 400) {
            res.redirect(
                307,
                '/?error=generic_contact_us&errorMessage=' + statusMessage,
            );
        } else {
            res.redirect(307, '/?error=generic_contact_us');
        }
    } else {
        res.redirect(307, '/?error=invalid_appointment_id');
    }
}
