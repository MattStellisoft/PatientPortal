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
    const body = req.body;
    console.log(body);
    if (
        !body.RequestAppointmentDay ||
        !body.RequestAppointmentMonth ||
        !body.RequestAppointmentYear
    ) {
        return res
            .status(400)
            .json({ statusMessage: 'Invalid date entered', StatusCode: 500 });
    } else {
        const request = {
            Resource: 'AppointmentBooking',
            Endpoint: 'AppointmentBooking',
            Method: 'AppointmentBookingRequest',
            Body: {
                requestJson: {
                    ReferralId: req.body.IDReferral,
                    NHSNumber: req.body.NHSNumber,
                    RequestDate:
                        body.RequestAppointmentDay +
                        '/' +
                        body.RequestAppointmentMonth +
                        '/' +
                        body.RequestAppointmentYear,
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
    }
}
