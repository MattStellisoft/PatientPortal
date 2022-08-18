import type { NextApiRequest, NextApiResponse } from 'next';
import { Issuer } from 'openid-client';
import { serialize } from 'cookie';
import Cookies from 'cookies';
import GenerateAssertionJwt from '../../helpers/token_helper';
import { testUsers } from '../../testing/data/testData';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    await Issuer.discover(process.env.NEXT_NHSLOGIN_URI).then(function (
        nhsLoginIssuer,
    ) {
        const client = new nhsLoginIssuer.Client({
            client_id: process.env.NEXT_NHSLOGIN_CLIENT_ID,
            redirect_uris: [process.env.NEXT_NHSLOGIN_CALLBACK_URI],
            response_types: ['code'],
            token_endpoint_auth_method: 'private_key_jwt',
        });
        const post_data = new URLSearchParams({
            grant_type: 'authorization_code',
            code: client.callbackParams(req).code,
            redirect_uri: process.env.NEXT_NHSLOGIN_CALLBACK_URI,
            client_assertion_type:
                'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            client_assertion: GenerateAssertionJwt(),
        }).toString();
        const configObj: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Length': post_data.length.toString(),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: post_data,
        };
        fetch(process.env.NEXT_NHSLOGIN_TOKEN_URI, configObj)
            .then((response) => response.json())
            .then(async (response) => {
                //console.log('response', response, req.query);
                if (
                    response &&
                    response.access_token &&
                    response.refresh_token
                ) {
                    // WHEN GOING LIVE SET COOKIES WITH SECURITY PARAMS
                    // res.setHeader(
                    //     "Set-Cookie",
                    //     serialize("jwt", response.refresh_token, {
                    //         httpOnly: true,
                    //         sameSite: "strict",
                    //         secure: true,
                    //         maxAge: 24 * 60 * 60 * 1000,
                    //     })
                    // );
                    // res.status(200).end();
                    // res.status(200).json({
                    //     refresh: response.refresh_token,
                    // });

                    if (false) {
                        const userInfoConfig: RequestInit = {
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${response.access_token}`,
                            },
                        };
                        const userData = await fetch(
                            process.env.NEXT_NHSLOGIN_USER_INFO_URI,
                            userInfoConfig,
                        );
                        const jsonUserInfo = await userData
                            .json()
                            .then((data) => {
                                if (
                                    data.message &&
                                    data.message == 'Unauthorized'
                                ) {
                                    return false;
                                } else {
                                    return data;
                                }
                            });
                        const verificationConfigObj: RequestInit = {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            }),
                            body: JSON.stringify({
                                nhs_number: jsonUserInfo.nhs_number,
                                dob: jsonUserInfo.birthdate,
                            }),
                        };
                        const verificationEndpoint =
                            process.env.NEXT_CHAPI_URL +
                            `/api/verifyIdentity/${jsonUserInfo.nhs_number}`;
                        fetch(verificationEndpoint, verificationConfigObj)
                            .then((response) => response.json())
                            .then((response) => {
                                const cookies = new Cookies(req, res);
                                cookies.set('session_id', response.sessionId, {
                                    httpOnly: true, // true by default
                                });
                                res.redirect(307, '/');
                            });
                    } else {
                        const userInfoConfig: RequestInit = {
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${response.access_token}`,
                            },
                        };
                        const userData = await fetch(
                            process.env.NEXT_NHSLOGIN_USER_INFO_URI,
                            userInfoConfig,
                        );
                        await userData.json().then((data) => {
                            if (
                                data.message &&
                                data.message == 'Unauthorized'
                            ) {
                                return false;
                            } else {
                                var dob = new Date(data.birthdate);
                                var month_diff = Date.now() - dob.getTime();
                                var age_dt = new Date(month_diff);
                                var year = age_dt.getUTCFullYear();
                                var age = Math.abs(year - 1970);
                                if (age < 18) {
                                    res.redirect(
                                        307,
                                        '/signin?error=age_restriction_error',
                                    );
                                }
                            }
                        });
                        // Set a cookie
                        const cookies = new Cookies(req, res);
                        cookies.set('access_token', response.access_token, {
                            httpOnly: true, // true by default
                        });
                        cookies.set('refresh_token', response.refresh_token, {
                            httpOnly: true, // true by default
                        });
                        res.redirect(307, '/');
                    }
                } else if (response.error_description) {
                    res.redirect(
                        307,
                        '/signin?error=' + response.error_description,
                    );
                }
            })
            .catch((error) => {
                const errorMessage =
                    (error.response && error.response.data) ||
                    error.message ||
                    error;
                return res.status(500).send(errorMessage);
            });
    });
}
