import {
    PatientInterface,
    StatusMessageInterface,
} from "../interfaces/interfaces";
export async function updatePatient(endpoint: string, patientRecord: object) {
    const config: RequestInit = {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(patientRecord),
    };
    const response = await fetch(endpoint, config);
    type JSONResponse = {
        profile: object;
        StatusCode: number;
        errors?: Array<{ message: string }>;
    };
    const { profile, StatusCode, errors }: JSONResponse = await response.json();
    if (response.ok) {
        if (profile) {
            return {
                profile: profile,
            };
        } else {
            return Promise.reject(
                new Error(`We are unable to update your details at this time.`)
            );
        }
    } else {
        const error = new Error(
            errors?.map((e) => e.message).join("\n") ?? "unknown"
        );
        return Promise.reject(error);
    }
}
export async function getPatient(endpoint) {
    var url = new URL(endpoint);
    const response = await fetch(url.href);
    type JSONResponse = {
        patient: PatientInterface;
        StatusCode: number;
        errors?: Array<{ message: string }>;
    };
    const { patient, StatusCode, errors }: JSONResponse = await response.json();
    if (response.ok) {
        if (patient) {
            return patient;
        } else {
            return Promise.reject(
                new Error(
                    `We could not find a patient matching your credentials.`
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
export async function getPatientOverview(endpoint: string) {
    let url = new URL(endpoint);
    const response = await fetch(url.href);
    type JSONResponse = {
        statusMessage: StatusMessageInterface;
        StatusCode: number;
    };
    const { statusMessage, StatusCode }: JSONResponse = await response.json();
    if (response.ok) {
        if (statusMessage) {
            return {
                statusMessage: statusMessage,
                StatusCode: StatusCode,
            };
        } else {
            return Promise.reject(
                new Error(
                    `We are unable to find a patient overview attached to your profile.`
                )
            );
        }
    } else {
        // const error = new Error(
        //     errors?.map((e) => e.message).join("\n") ?? "unknown"
        // );
        return Promise.reject();
    }
}
