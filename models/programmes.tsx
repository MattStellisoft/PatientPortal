import { ProgrammeInterface } from "../interfaces/interfaces";
export async function getProgrammes(patient) {
    const config: RequestInit = {
        method: "GET",
        headers: new Headers({
            accept: "application/json",
            "X-Api-Key": process.env.NEXT_PHYSITRACK_KEY,
        }),
    };
    const endpoint =
        process.env.NEXT_PHYSITRACK_URL +
        "clients/" +
        patient.PhysitrackClientID +
        "/programs";
    const response = await fetch(endpoint, config);
    type JSONResponse = {
        programs: ProgrammeInterface[];
        StatusCode: number;
        errors?: Array<{ message: string }>;
    };
    const { programs, errors }: JSONResponse = await response.json();
    if (response.ok) {
        if (programs) {
            return { programmes: programs, totalResults: programs.length };
        } else {
            return Promise.reject(
                new Error(
                    `We could not find any programmes assigned to this client.`
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
