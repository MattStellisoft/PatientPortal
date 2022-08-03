import { NHSLoginUserInfoInterface } from "../interfaces/interfaces";
import GenerateAssertionJwt from "../helpers/token_helper";
import * as cookie from "cookie";
import { testUsers } from "../testing/data/testData";

export async function verifyAuth(context, production: string) {
    if (
        production == "false" &&
        typeof context.query.testuser == "undefined" &&
        typeof context.req.headers.cookie != "undefined"
    ) {
        let userInfo: NHSLoginUserInfoInterface;
        const parsedCookies = cookie.parse(context.req.headers.cookie);
        if (typeof parsedCookies?.access_token != "undefined") {
            userInfo = await getUserInfo(parsedCookies?.access_token);
        }
        if (
            typeof userInfo != 'object' &&
            typeof parsedCookies?.refresh_token != "undefined"
        ) {
            const accessToken = await getRefreshedAccessToken(
                parsedCookies?.refresh_token
            );
            if (accessToken == false) {
                return {
                    redirect: {
                        destination: "/signin",
                        permanent: false,
                    },
                    props: {},
                };
            } else {
                userInfo = await getUserInfo(accessToken.access_token);
            }
        }
        //Calculate age for verification purposes.
        if (typeof userInfo != "undefined" && userInfo.birthdate) {
            var dob = new Date(userInfo.birthdate);
            var month_diff = Date.now() - dob.getTime();
            var age_dt = new Date(month_diff);
            var year = age_dt.getUTCFullYear();
            var age = Math.abs(year - 1970);
            userInfo.age = age;
            return userInfo;
        } else {
            return false;
        }
    } else {
        if (
            typeof context.query?.testuser != "undefined" &&
            typeof testUsers[context.query.testuser] != "undefined"
        ) {
            return testUsers[context.query.testuser];
        }
        return false;
    }
}
async function getRefreshedAccessToken(refresh_token) {
    const post_data = new URLSearchParams({
        client_id: process.env.NEXT_NHSLOGIN_CLIENT_ID,
        grant_type: "refresh_token",
        refresh_token: refresh_token,
        redirect_uri: process.env.NEXT_NHSLOGIN_CALLBACK_URI,
        client_assertion_type:
            "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: GenerateAssertionJwt(),
    }).toString();
    const refreshTokenConfig: RequestInit = {
        method: "POST",
        headers: {
            "Content-Length": post_data.length.toString(),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: post_data,
    };
    const accessToken = await fetch(
        process.env.NEXT_NHSLOGIN_TOKEN_URI,
        refreshTokenConfig
    );
    if (accessToken) {
        const jsonAccessToken = await accessToken.json().then((data) => {
            if (data.message && data.message == "Unauthorized") {
                return false;
            } else {
                return data;
            }
        });
        return jsonAccessToken;
    }
    return false;
}
async function getUserInfo(access_token) {
    if (typeof access_token != "undefined") {
        const userInfoConfig: RequestInit = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };
        const userData = await fetch(
            process.env.NEXT_NHSLOGIN_USER_INFO_URI,
            userInfoConfig
        );
        const jsonUserInfo = await userData.json().then((data) => {
            if (data.message && data.message == "Unauthorized") {
                return false;
            } else {
                return data;
            }
        });
        return jsonUserInfo;
    }
    return false;
}
