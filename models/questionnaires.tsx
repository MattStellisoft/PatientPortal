import fs from "fs";
import path from "path";
import { QuestionnaireInterface } from "../interfaces/interfaces";
import { getAccessToken } from "./chad";
const questionnairesDirectory = path.join(
    process.cwd(),
    "/i18n/questionnaires"
);
export function getQuestionnaire(questionnaire, locale) {
    const fullPath = path.join(
        questionnairesDirectory,
        `${questionnaire}-${locale}.json`
    );
    const fileContents = fs.readFileSync(fullPath, "utf8");
    let questionnaireData = JSON.parse(fileContents);
    return questionnaireData;
}
export async function getQuestionnaires(endpoint: string, params: object) {
    let url = new URL(endpoint);
    for (let param in params) {
        url.searchParams.append(param, params[param]);
    }
    const response = await fetch(url.href);
    type JSONResponse = {
        results: QuestionnaireInterface[];
        totalResults: number;
        statusCode: number;
        errors?: Array<{ message: string }>;
    };
    const { results, totalResults, statusCode, errors }: JSONResponse =
        await response.json();
    if (response.ok) {
        if (results) {
            return {
                results: results,
                totalResults: totalResults,
                statusCode: statusCode,
                errors: errors,
            };
        } else {
            return Promise.reject(
                new Error(
                    "We are unable to find any questionnaires matching your patient record."
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
export async function getQuestionnairesNhsNumber(
    nhsNumber: string,
    offset?: number,
    perPage?: number
) {
    const token = await getAccessToken();
    const post_data = JSON.stringify({
        requestJson: {
            results: [{ NhsNumber: nhsNumber }],
        },
    });
    const config: RequestInit = {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Method: "GetNhsNumbersQuestionnaire",
            Endpoint: "QPortal",
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
        data: QuestionnaireInterface[];
        statusCode: number;
    };
    const { data, statusCode }: JSONResponse = await response.json();
    if (response.ok) {
        if (data) {
            const totalResults: number = data.length;
            const start: number = (offset - 1) * perPage;
            const end: number = start + perPage;
            const results: QuestionnaireInterface[] = data.slice(start, end);
            return {
                results: results,
                totalResults: totalResults,
                statusCode: statusCode,
            };
        } else {
            return Promise.reject(
                new Error(
                    `We were unable to locate questionnaires linked to your patient record.`
                )
            );
        }
    } else {
        return Promise.reject();
    }
}
export async function getQuestionnairesUid(
    uuid: string,
    locale?: string,
    offset?: number,
    perPage?: number
) {
    const token = await getAccessToken();
    const post_data = JSON.stringify({
        requestJson: {
            results: [{ uuid: uuid }],
        },
    });
    const config: RequestInit = {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Method: "GetPatientInfo",
            Endpoint: "QPortal",
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
        QInfo?: [];
        statusCode: number;
        errors: any[];
    };
    const { QInfo, statusCode, errors }: JSONResponse = await response.json();
    if (response.ok) {
        if (QInfo) {
            const totalResults: number = QInfo.length;
            const start: number = (offset - 1) * perPage;
            const end: number = start + perPage;
            const results: QuestionnaireInterface[] = QInfo.slice(start, end);
            return {
                results: results,
                totalResults: totalResults,
                statusCode: statusCode,
                errors: errors,
            };
        } else {
            return Promise.reject(
                new Error(`Questionnaires not found for ${uuid}`)
            );
        }
    } else {
        const error = new Error(
            errors?.map((e) => e.message).join("\n") ?? "unknown"
        );
        return Promise.reject(error);
    }
}
