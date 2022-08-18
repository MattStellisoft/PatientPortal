export async function getAccessToken() {
    const config: RequestInit = {
        method: 'GET',
        headers: new Headers({
            appname: 'PatientPortal',
        }),
    };
    const response = await fetch(
        'https://ochad.connecthealthworks.co.uk/api/public',
        config,
    );
    type JSONResponse = {
        access_token: string;
        errors: [e: { message: string }];
    };
    const { access_token, errors }: JSONResponse = await response.json();
    if (response.ok) {
        if (access_token) {
            return access_token;
        } else {
            return Promise.reject(
                new Error(`You are not authorised to access this service`),
            );
        }
    } else {
        const error = new Error(
            errors?.map((e) => e.message).join('\n') ?? 'unknown',
        );
        return Promise.reject(error);
    }
}
export async function contactApi({ Resource, Endpoint, Method, Body }) {
    const token = await getAccessToken();
    const post_data = Body;
    const config: RequestInit = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Method: Method,
            Endpoint: Endpoint,
            IdToken: 'public',
            redirect: 'follow',
        }),
        body: JSON.stringify(post_data),
    };
    console.log('config', config);
    const response = await fetch(
        'https://connecthealth.azure-api.net/cher/api',
        config,
    );
    const data = await response.json();
    console.log('data', data);
    if (response.ok) {
        if (data) {
            return data;
        } else {
            return Promise.reject(
                new Error(
                    `We were unable to locate ${
                        Resource || 'data'
                    } linked to your patient record.`,
                ),
            );
        }
    } else {
        return Promise.reject();
    }
}
