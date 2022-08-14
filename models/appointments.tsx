import { AppointmentInterface } from "../interfaces/interfaces";
import { contactApi } from "../models/chad";
export async function getAppointments(endpoint: string, params: object) {
    console.log('endpoint', endpoint)
    var url = new URL(endpoint);
    for (let param in params) {
        url.searchParams.append(param, params[param]);
    }
    const response = await fetch(url.href);
    type JSONResponse = {
        appointments: AppointmentInterface[];
        totalResults: number;
        statusCode: number;
    };
    const { appointments, statusCode, totalResults }: JSONResponse =
        await response.json();

    console.log(appointments, statusCode, totalResults)

    if (response.ok) {
        return {
            appointments: appointments,
            statusCode: statusCode,
            totalResults: totalResults,
        };
    } else {
        return Promise.reject();
    }
}
export async function getAppointment(endpoint: string) {
    var url = new URL(endpoint);
    const response = await fetch(url.href);
    type JSONResponse = {
        appointment: AppointmentInterface;
        statusCode: number;
        errors?: Array<{ message: string }>;
    };
    const { appointment, statusCode, errors }: JSONResponse =
        await response.json();
    if (response.ok) {
        if (appointment) {
            return {
                appointment: appointment,
                statusCode: statusCode,
                errors: errors,
            };
        } else {
            return Promise.reject(
                new Error(`We could not find an appointment at this time.`)
            );
        }
    } else {
        const error = new Error(
            errors?.map((e) => e.message).join("\n") ?? "unknown"
        );
        return Promise.reject(error);
    }
}
export async function confirmAppointment(appointment: AppointmentInterface) {
    const response = await fetch('/api/patient/appointment/cancel');
    // type JSONResponse = {
    //     appointment: object;
    //     StatusCode: number;
    //     errors?: Array<{ message: string }>;
    // };
    // const { appointmentStatus, StatusCode, errors }: JSONResponse =
    //     await response.json();
    // if (response.ok) {
    //     if (appointment) {
    //         return appointment;
    //     } else {
    //         return Promise.reject(
    //             new Error(
    //                 `We encountered an error when confirming your appointment at this time. If the error persists then please contact us.`
    //             )
    //         );
    //     }
    // } else {
    //     const error = new Error(
    //         errors?.map((e) => e.message).join("\n") ?? "unknown"
    //     );
    //     return Promise.reject(error);
    // }
}
export async function rejectAppointment(endpoint: string) {
    var url = new URL(endpoint);
    const response = await fetch(url.href);
    type JSONResponse = {
        rejected: object;
        StatusCode: number;
        errors?: Array<{ message: string }>;
    };
    const { rejected, StatusCode, errors }: JSONResponse =
        await response.json();
    if (response.ok) {
        if (rejected) {
            return rejected;
        } else {
            return Promise.reject(
                new Error(
                    `We encountered an error when rejecting your appointment at this time. If the error persists then please contact us.`
                )
            );
        }
    } else {
        const error = new Error(
            errors?.map((e) => e.message).join("\n") ?? "unknown"
        );
        return Promise.reject(error);
    }
}
export async function rejectReason(endpoint: string, reason: object) {
    const config: RequestInit = {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(reason),
    };
    const response = await fetch(endpoint, config);
    type JSONResponse = {
        StatusCode: number;
        errors?: Array<{ message: string }>;
    };
    const { StatusCode, errors }: JSONResponse = await response.json();
    if (response.ok) {
        if (StatusCode == 200) {
            return { StatusCode };
        } else {
            return Promise.reject(
                new Error(`We are unable to submit the form at this time.`)
            );
        }
    } else {
        const error = new Error(
            errors?.map((e) => e.message).join("\n") ?? "unknown"
        );
        return Promise.reject(error);
    }
}
export async function appointmentBookingRequestCher(context: any, authorisedUser, patientOverview) {
    const request = {
        Resource: "AppointmentBooking",
        Endpoint: "AppointmentBooking",
        Method: "AppointmentBookingRequest",
        Body: {
            requestJson: {
                NHSNumber: context.query.testuser
                    ? context.query.testuser
                    : authorisedUser.nhs_number,
                ReferralId: patientOverview.stages[0].IDReferral
            },
        },
    };
    const { statusMessage, statusCode } = await contactApi(request);
    return statusMessage;
}
export async function appointmentBookingRequest() {
}

