import { getAccessToken } from "./chad";
import { DocumentInterface } from "../interfaces/interfaces";

export async function getDocument(
    endpoint: string,
    { dob, postcode, email, phoneNumber },
    uuid: string
) {
    if (endpoint) {
        let url = new URL(endpoint);
        const response = await fetch(url.href);
        type JSONResponse = {
            document: DocumentInterface;
            StatusCode: number;
            errors?: Array<{ message: string }>;
        };
        const { document, StatusCode, errors }: JSONResponse =
            await response.json();
        if (response.ok) {
            if (document) {
                return {
                    document: document,
                    StatusCode: StatusCode,
                    errors: errors,
                };
            } else {
                return Promise.reject(
                    new Error(
                        `We could not locate the document data you requested.`
                    )
                );
            }
        } else {
            const error = new Error(
                errors?.map((e) => e.message).join("\n") ?? "unknown"
            );
            return Promise.reject(error);
        }
    } else {
        const token = await getAccessToken();
        const post_data = GetLightValidationBody(
            dob,
            postcode,
            email,
            phoneNumber,
            uuid
        );
        const config: RequestInit = {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Method: "validate",
                Endpoint: "CarePlan",
                IdToken: "public",
                redirect: "follow",
            }),
            body: post_data,
        };
        const response = await fetch(
            "https://connecthealth.azure-api.net/cher/api",
            config
        );
        type JSONResponse = {
            base64Pdf: string;
            firstName: string;
            StatusCode: number;
            errors?: Array<{ message: string }>;
        };
        const { base64Pdf, firstName, StatusCode, errors }: JSONResponse =
            await response.json();
        if (response.ok) {
            if (base64Pdf) {
                return {
                    base64Pdf: base64Pdf,
                    firstName: firstName,
                };
            } else {
                return Promise.reject(
                    new Error(`Document not found for ${uuid}`)
                );
            }
        } else {
            const error = new Error(
                errors?.map((e) => e.message).join("\n") ?? "unknown"
            );
            return Promise.reject(error);
        }
    }
}
export function GetLightValidationBody(
    dob: Date,
    postcode: string,
    email: string,
    phoneNumber: string,
    uuid: string = null
) {
    dob = new Date(dob);
    let day = dob.getDate() < 10 ? "0" + dob.getDate() : dob.getDate();
    let month: number | string = dob.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let year = dob.getFullYear();
    let formattedDob = `${year}-${month}-${day}`;
    postcode = postcode.trim();
    email = email.trim();
    phoneNumber = phoneNumber.trim().replace(/\s/g, "");
    var raw = JSON.stringify({
        requestJson: {
            DateOfBirth: formattedDob,
            Postcode: postcode,
            Email: email,
            MobileNumber: phoneNumber,
            UUID: uuid,
        },
    });
    return raw;
}
export async function getDocuments(endpoint: string, params: object) {
    let url = new URL(endpoint);
    for (let param in params) {
        url.searchParams.append(param, params[param]);
    }
    const response = await fetch(url.href);
    type JSONResponse = {
        results: DocumentInterface[];
        totalResults: number;
        StatusCode: number;
        errors?: object;
    };
    const { results, totalResults, StatusCode, errors }: JSONResponse =
        await response.json();
    if (response.ok) {
        if (results) {
            return {
                results: results,
                totalResults: totalResults,
                errors: errors,
            };
        } else {
            return Promise.reject(new Error(`No results were found.`));
        }
    } else {
        // const error = new Error(
        //     errors?.map((e) => e.message).join("\n") ?? "unknown"
        // );
        return Promise.reject();
    }
}
