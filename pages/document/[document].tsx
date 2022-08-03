//See: https://codesandbox.io/s/react-pdf-next-js-forked-x12d2?file=/components/pdf-viewer.js:796-833
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../../components/Layout";
import DateFields from "../../components/form_controls/DateFields";
import Link from "next/link";
import bodyParser from "body-parser";
import { verifyAuth } from "../../models/auth";
import { promisify } from "util";
import TextInput from "../../components/form_controls/TextInput";
import { getDocument } from "../../models/documents";
import { contactApi } from "../../models/chad";
import * as yup from "yup";
import { Breadcrumb } from "../../interfaces/interfaces";
import { parseCookies } from "../../helpers/parseCookies";
import { getLanguage } from "../../models/languages";
import {
    isValidPhoneNumber,
    validatePhoneNumberLength,
} from "libphonenumber-js";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
//import ReCAPTCHA from "react-google-recaptcha";
const PDFViewer = dynamic(() => import("../../components/PdfViewer"), {
    ssr: false,
});
const getBody = promisify(bodyParser.urlencoded());
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
export default function Document({
    documentData,
    uuid,
    breadCrumbs,
    query,
    debug,
    errors,
    languageStrings,
}) {
    const [postcode, setPostcode] = useState();
    const [dob, setDob] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const document = JSON.parse(documentData);
    if (!document.base64Pdf) {
        return (
            <Layout
                languageStrings={languageStrings}
                breadCrumbs={breadCrumbs}
                query={query}
                debug={debug}
                data={documentData}
                errors={errors}
            >
                <main id="main" role="main" className="lg:col-span-9">
                    <div className="lg:my-0 my-4 lg:px-0 px-6">
                        <form action="#" method="POST">
                            <input type="hidden" name="uuid" value={uuid} />
                            <div>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl leading-6 font-bold text-black">
                                            {languageStrings["verifyHeading"]}
                                            <span className="hover:underline text-blue-750">
                                                <Link href="/signin">
                                                    {languageStrings["signin"]}
                                                </Link>
                                            </span>
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6">
                                        {errors["g-recaptcha"] && (
                                            <div className="col-span-3 sm:col-span-2">
                                                <div className="mb-4 text-red-500 font-bold text-base">
                                                    {errors["g-recaptcha"].map(
                                                        (error, index) => (
                                                            <p key={index}>
                                                                {
                                                                    languageStrings[
                                                                        error
                                                                    ]
                                                                }
                                                            </p>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        <div
                                            className={classNames(
                                                typeof errors["postcode"] !=
                                                    "undefined" &&
                                                    errors["postcode"].length >
                                                        0
                                                    ? "border-l-4 border-red-500 pl-4"
                                                    : "",
                                                "col-span-3 sm:col-span-2"
                                            )}
                                        >
                                            <label
                                                htmlFor="company-website"
                                                className="block text-base font-bold text-black"
                                            >
                                                <p className="mb-2">
                                                    {
                                                        languageStrings[
                                                            "postcodeAddressInputLabel"
                                                        ]
                                                    }
                                                </p>
                                                {errors["postcode"] && (
                                                    <div className="mb-4 text-red-500 font-bold text-base">
                                                        {errors["postcode"].map(
                                                            (error, index) => (
                                                                <p key={index}>
                                                                    {
                                                                        languageStrings[
                                                                            error
                                                                        ]
                                                                    }
                                                                </p>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                                <TextInput
                                                    name={"postcode"}
                                                    classNames={classNames}
                                                    type="text"
                                                    autoComplete={"postcode"}
                                                    defaultValue={postcode}
                                                    errors={errors["postcode"]}
                                                ></TextInput>
                                            </label>
                                        </div>
                                        <div
                                            className={classNames(
                                                typeof errors["dob"] !=
                                                    "undefined" &&
                                                    errors["dob"].length > 0
                                                    ? "border-l-4 border-red-500 pl-4"
                                                    : "",
                                                "col-span-3 sm:col-span-2"
                                            )}
                                        >
                                            <label
                                                htmlFor="company-website"
                                                className="block text-base font-bold text-black"
                                            >
                                                <p className="mb-2">
                                                    {
                                                        languageStrings[
                                                            "dobInputLabel"
                                                        ]
                                                    }
                                                </p>
                                                {errors["dob"] && (
                                                    <div className="mb-4 text-red-500 font-bold text-base">
                                                        {errors["dob"].map(
                                                            (error, index) => (
                                                                <p key={index}>
                                                                    {
                                                                        languageStrings[
                                                                            error
                                                                        ]
                                                                    }
                                                                </p>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                                <DateFields
                                                    name={"dob"}
                                                    classNames={classNames}
                                                    type={"tel"}
                                                    defaultValue={dob}
                                                    errors={errors["dob"]}
                                                ></DateFields>
                                            </label>
                                        </div>
                                        <div
                                            className={classNames(
                                                typeof errors["email"] !=
                                                    "undefined" &&
                                                    errors["email"].length > 0
                                                    ? "border-l-4 border-red-500 pl-4"
                                                    : "",
                                                "col-span-3 sm:col-span-2"
                                            )}
                                        >
                                            <label
                                                htmlFor="company-website"
                                                className="block text-base font-bold text-black"
                                            >
                                                <p className="mb-2">
                                                    {
                                                        languageStrings[
                                                            "emailAddressInputLabel"
                                                        ]
                                                    }
                                                </p>
                                                {errors["email"] && (
                                                    <div className="mb-4 text-red-500 font-bold text-base">
                                                        {errors["email"].map(
                                                            (error, index) => (
                                                                <p key={index}>
                                                                    {
                                                                        languageStrings[
                                                                            error
                                                                        ]
                                                                    }
                                                                </p>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                                <TextInput
                                                    name={"email"}
                                                    classNames={classNames}
                                                    type={"email"}
                                                    autoComplete={"email"}
                                                    defaultValue={email}
                                                    errors={errors["email"]}
                                                ></TextInput>
                                            </label>
                                        </div>
                                        <div
                                            className={classNames(
                                                typeof errors["phoneNumber"] !=
                                                    "undefined" &&
                                                    errors["phoneNumber"]
                                                        .length > 0
                                                    ? "border-l-4 border-red-500 pl-4"
                                                    : "",
                                                "col-span-3 sm:col-span-2"
                                            )}
                                        >
                                            <label
                                                htmlFor="company-website"
                                                className="block text-base font-bold text-black"
                                            >
                                                <p className="mb-2">
                                                    {
                                                        languageStrings[
                                                            "phoneNumberInputLabel"
                                                        ]
                                                    }
                                                </p>
                                                {errors["phoneNumber"] && (
                                                    <div className="mb-4 text-red-500 font-bold text-base">
                                                        {errors[
                                                            "phoneNumber"
                                                        ].map(
                                                            (error, index) => (
                                                                <p key={index}>
                                                                    {
                                                                        languageStrings[
                                                                            error
                                                                        ]
                                                                    }
                                                                </p>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                                <TextInput
                                                    name={"phoneNumber"}
                                                    classNames={classNames}
                                                    type={"tel"}
                                                    inputMode={"numeric"}
                                                    pattern={"[0-9]*"}
                                                    autoComplete={"tel"}
                                                    defaultValue={phoneNumber}
                                                    errors={
                                                        errors["phoneNumber"]
                                                    }
                                                ></TextInput>
                                            </label>
                                        </div>
                                        <div
                                            className="g-recaptcha col-span-3 sm:col-span-2"
                                            data-sitekey={
                                                process.env.NEXT_RECAPTCHA_KEY
                                            }
                                        ></div>
                                    </div>
                                </div>
                                <div className="py-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        {
                                            languageStrings[
                                                "submitDocumentVerificationForm"
                                            ]
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </Layout>
        );
    } else if (document.base64Pdf) {
        return (
            <Layout
                breadCrumbs={breadCrumbs}
                query={query}
                languageStrings={languageStrings}
                debug={debug}
                data={documentData}
                errors={errors}
            >
                <main id="main" role="main" className="lg:col-span-9">
                    <PDFViewer
                        file={document.base64Pdf}
                        query={query}
                    ></PDFViewer>
                </main>
            </Layout>
        );
    }
}
export async function getServerSideProps(context) {
    const debug: boolean = context.query?.debug ? context.query?.debug : false;
    const { params, query } = context;
    let documentData: object = {};
    let errors: object = {};
    let queryString: string = "";
    const { locale, req } = context;
    const data = parseCookies(req);
    let currentLocale: string = data.NEXT_LOCALE || locale;
    //Fetch language strings using current locale.
    const localLanguageStrings = getLanguage("document", currentLocale);
    const globalLanguageStrings = getLanguage("global", currentLocale);
    const languageStrings = {
        ...localLanguageStrings,
        ...globalLanguageStrings,
    };
    if (context.query.testuser) {
        queryString = "?testuser=" + context.query.testuser;
        if (context.query.usecher) {
            queryString += "&usecher=true";
        }
        if (context.query.debug) {
            queryString += "&debug=true";
        }
    }
    if (query.UUID) {
        if (context.req.method === "POST") {
            await getBody(context.req, context.res);
            const patientRecord = {
                email: context.req.body?.email,
                phoneNumber: context.req.body?.phoneNumber,
                dob:
                    context.req.body?.dobDay +
                    "-" +
                    context.req.body?.dobMonth +
                    "-" +
                    context.req.body?.dobYear,
                postcode: context.req.body?.postcode,
            };
            let schema = yup.object().shape({
                postcode: yup
                    .string()
                    .trim()
                    .matches(
                        /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/,
                        "Postcode is incorrect"
                    )
                    .required(),
                email: yup.string().email().required(),
                dob: yup
                    .date()
                    .required()
                    .typeError("Please enter a valid date"),
            });
            const validationOutcome = await schema
                .validate(patientRecord, { abortEarly: false })
                .catch(function (err) {
                    err.inner.forEach((e) => {
                        if (typeof errors[e.path] == "undefined") {
                            errors[e.path] = [];
                        }
                        errors[e.path].push(e.message);
                    });
                });
            let phoneValidationOutcome = isValidPhoneNumber(
                patientRecord.phoneNumber,
                "GB"
            );
            if (phoneValidationOutcome == false) {
                if (
                    typeof errors["phoneNumber"] != "undefined" &&
                    Array.isArray(errors["phoneNumber"])
                ) {
                    errors["phoneNumber"].push("INVALID_PHONE");
                } else {
                    errors["phoneNumber"] = [];
                    errors["phoneNumber"].push("INVALID_PHONE");
                }
            }
            let phoneLengthOutcome = validatePhoneNumberLength(
                patientRecord.phoneNumber,
                "GB"
            );
            if (typeof phoneLengthOutcome != "undefined") {
                if (
                    typeof errors["phoneNumber"] != "undefined" &&
                    Array.isArray(errors["phoneNumber"])
                ) {
                    errors["phoneNumber"].push(phoneLengthOutcome);
                } else {
                    errors["phoneNumber"] = [];
                    errors["phoneNumber"].push(phoneLengthOutcome);
                }
            }
            if (
                typeof context.req.body != "undefined" &&
                typeof context.req.body["g-recaptcha-response"] !=
                    "undefined" &&
                Object.keys(errors).length === 0 &&
                errors.constructor === Object
            ) {
                //implementing recaptcha v2, docs found here: https://developers.google.com/recaptcha/docs/display
                const recaptchaBody = {
                    secret: process.env.NEXT_RECAPTCHA_SECRET,
                    response: context.req.body["g-recaptcha-response"],
                };
                const config: RequestInit = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams(
                        Object.entries(recaptchaBody)
                    ).toString(),
                };
                const response = await fetch(
                    "https://www.google.com/recaptcha/api/siteverify",
                    config
                );
                const { success, "error-codes": errorCodes } =
                    await response.json();
                if (success) {
                    documentData = await getDocument(
                        null,
                        patientRecord,
                        context.req.body.uuid
                    );
                } else {
                    errors["g-recaptcha"] = null;
                    errors["g-recaptcha"] = errorCodes;
                }
            }
        }
    } else {
        const authorisedUser = await verifyAuth(
            context,
            process.env.NEXT_PRODUCTION
        );
        if (authorisedUser == false) {
            return {
                redirect: {
                    destination: "/signin",
                    permanent: false,
                },
                props: {},
            };
        }
        if (process.env.usecher || context.query.usecher) {
            const request = {
                Resource: "Document",
                Endpoint: "Document",
                Method: "GetDocumentBase64",
                Body: {
                    requestJson: {
                        DocumentUID: context.params.document,
                    },
                },
            };
            documentData = await contactApi(request);
            documentData["base64Pdf"] = documentData["DocumentData"];
        } else {
            const endpoint: string =
                process.env.NEXT_URL +
                `/api/patient/${authorisedUser.nhs_number}/document/${context.params.document}`;
            const document = await getDocument(endpoint, null, null);
            documentData["base64Pdf"] = document.document.DocumentB64;
        }
    }
    const breadCrumbs: Breadcrumb[] = [
        {
            key: "documentPageName",
            href: "/document",
            current: true,
        },
    ];
    return {
        props: {
            uuid: query?.UUID || null,
            documentData: JSON.stringify(documentData),
            breadCrumbs: breadCrumbs,
            languageStrings: languageStrings,
            query: queryString,
            errors: errors,
            debug: debug,
        },
    };
}
