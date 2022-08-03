import type { NextApiRequest, NextApiResponse } from "next";
import { Issuer } from "openid-client";
import { serialize } from "cookie";
import Cookies from "cookies";
import GenerateAssertionJwt from "../../helpers/token_helper";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await Issuer.discover(process.env.NEXT_NHSLOGIN_URI).then(function (
        nhsLoginIssuer
    ) {
        const client = new nhsLoginIssuer.Client({
            client_id: process.env.NEXT_NHSLOGIN_CLIENT_ID,
            redirect_uris: [process.env.NEXT_NHSLOGIN_CALLBACK_URI],
            response_types: ["code"],
            token_endpoint_auth_method: "private_key_jwt",
        });
        const post_data = new URLSearchParams({
            grant_type: "authorization_code",
            code: client.callbackParams(req).code,
            redirect_uri: process.env.NEXT_NHSLOGIN_CALLBACK_URI,
            client_assertion_type:
                "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            client_assertion: GenerateAssertionJwt(),
        }).toString();
        const configObj: RequestInit = {
            method: "POST",
            headers: {
                "Content-Length": post_data.length.toString(),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: post_data,
        };
        fetch(process.env.NEXT_NHSLOGIN_TOKEN_URI, configObj)
            .then((response) => response.json())
            .then((response) => {
                if (
                    response &&
                    response.access_token &&
                    response.refresh_token
                ) {
                    //Redirect to sign in if dob indicates user is < 18

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
                    // Set a cookie
                    const cookies = new Cookies(req, res);
                    cookies.set("access_token", response.access_token, {
                        httpOnly: true, // true by default
                    });
                    cookies.set("refresh_token", response.refresh_token, {
                        httpOnly: true, // true by default
                    });
                    res.redirect(307, "/");
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
