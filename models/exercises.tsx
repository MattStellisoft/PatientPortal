export async function getExercises(patient, accessCode) {
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
        "/programs/" +
        accessCode +
        "/exercises";
    const response = await fetch(endpoint, config);
    type JSONResponse = {
        weeks: object;
        StatusCode: number;
        errors?: Array<{ message: string }>;
    };
    const data: JSONResponse = await response.json();
    if (response.ok) {
        if (data) {
            return data;
        } else {
            return Promise.reject(
                new Error(
                    `We could not find a programs assigned to this client.`
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
export async function getAdherence(patient, accessCode) {
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
        "/programs/" +
        accessCode +
        "/adherence";
    const response = await fetch(endpoint, config);
    type JSONResponse = {
        weeks: object;
        StatusCode: number;
        errors?: Array<{ message: string }>;
    };
    const data: JSONResponse = await response.json();
    if (response.ok) {
        if (data) {
            return data;
        } else {
            return Promise.reject(
                new Error(
                    `We could not find a adherence data assigned to this client.`
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
