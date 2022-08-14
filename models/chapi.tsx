export async function contactChApi( method, endpoint, post_data, params, session_id ) {
    var url = new URL(process.env.NEXT_URL + process.env.NEXT_API_PATH + endpoint);
    if (typeof params != 'undefined') {
        for (let param in params) {
            url.searchParams.append(param, params[param]);
        }
    }
    if (method == 'POST') {
        var config: RequestInit = {
            method: method,
            headers: new Headers({
                "Content-Type": "application/json",
                "sessionId": session_id
            }),
            body: JSON.stringify(post_data),
        };
    } else {
        var config: RequestInit = {
            method: method,
            headers: new Headers({
                "Content-Type": "application/json",
                "sessionId": session_id
            })
        };
    }
    const response = await fetch(
        url,
        config
    );
    const data = await response.json();
    if (response.ok) {
        if (data) {
            return data;
        } else {
            return Promise.reject(
                new Error(
                    `There was an error.`
                )
            );
        }
    } else {
        return Promise.reject();
    }
}