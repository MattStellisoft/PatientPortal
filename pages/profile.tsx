import Layout from "../components/Layout";
import { useState } from "react";
import { verifyAuth } from "../models/auth";
import { parseCookies } from "../helpers/parseCookies";
import { getLanguage } from "../models/languages";
import { contactApi } from "../models/chad";
import { getPatient, updatePatient } from "../models/patients";
import TextInput from "../components/form_controls/TextInput";
import bodyParser from "body-parser";
import { promisify } from "util";
import * as yup from "yup";
import {
    isValidPhoneNumber,
    validatePhoneNumberLength,
} from "libphonenumber-js";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
const getBody = promisify(bodyParser.urlencoded());
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
export default function Profile({
    breadCrumbs,
    languageStrings,
    profile,
    debug,
    success,
    query,
    errors,
}) {
    const [email, setEmail] = useState(profile.Email);
    const [phoneNumber, setPhoneNumber] = useState(profile.MobileNumber);
    return (
        <Layout
            page="Profile"
            title="Profile | Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health"
            breadCrumbs={breadCrumbs}
            debug={debug}
            data={profile}
            errors={errors}
            languageStrings={languageStrings}
            query={query}
        >
            <main id="main" role="main" className="lg:col-span-9">
                <div className="lg:my-0 my-4 lg:pb-4 lg:px-0 px-6">
                    <h2 className="mb-4 text-2xl font-extrabold sm:tracking-tight lg:text-4xl">
                        {languageStrings["profilePageName"]}
                    </h2>
                    <p className="mb-4 text-xl">
                        {languageStrings["profilePageDescription"]}
                    </p>
                    <p className="mb-4 text-base">
                        {languageStrings["profilePagePara1"]}
                    </p>
                </div>
                <form name="profile" method="POST" action={"/profile" + query}>
                    <div>
                        <div className="py-6 lg:py-0 lg:px-0 space-y-6 px-6">
                            <div>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <ExclamationCircleIcon
                                            className="h-10 w-10 text-black"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-base font-bold">
                                            {languageStrings["warningText1"]}
                                            <a
                                                href="https://digital.nhs.uk/services/summary-care-records-scr"
                                                target="_blank"
                                                className="font-bold underline text-black"
                                            >
                                                {
                                                    languageStrings[
                                                        "warningText2"
                                                    ]
                                                }
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                {success && (
                                    <div className="mt-4 border-4 border-blue-750 mb-4">
                                        <div className="flex flex-col">
                                            <h3 className="bg-blue-750 text-base text-white font-bold px-4 py-2">
                                                {
                                                    languageStrings[
                                                        "updateSuccessHeading"
                                                    ]
                                                }
                                            </h3>
                                            <div className="mt-2 font-bold text-base p-4">
                                                <p>
                                                    {
                                                        languageStrings[
                                                            "updateSuccessMessage"
                                                        ]
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                <div
                                    className={classNames(
                                        typeof errors["email"] != "undefined" &&
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
                                                    (error) => (
                                                        <span>
                                                            {
                                                                languageStrings[
                                                                    error
                                                                ]
                                                            }
                                                        </span>
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
                                            errors["phoneNumber"].length > 0
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
                                                {errors["phoneNumber"].map(
                                                    (error) => (
                                                        <p>
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
                                            errors={errors["phoneNumber"]}
                                        ></TextInput>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 lg:py-4 lg:px-0 pb-4 sm:px-6">
                            <button
                                name="save"
                                value="save"
                                type="submit"
                                className="bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-750"
                            >
                                {languageStrings["saveButton"]}
                            </button>
                        </div>
                    </div>
                </form>
                <form action="#" method="POST"></form>
                {/* <form action="#" method="POST">
                    <div className="sm:overflow-hidden">
                        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                            <div>
                                <h3 className="text-2xl leading-6 font-bold text-black">
                                    Alerts
                                </h3>
                                <p className="mt-1 text-sm text-black">
                                    Control how we alert you to important
                                    changes that take place or opt out.
                                </p>
                            </div>
                            <fieldset>
                                <legend className="text-base font-bold text-black">
                                    By Email
                                </legend>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-start">
                                        <div className="h-8 flex items-center">
                                            <input
                                                id="appointment"
                                                name="appointment"
                                                type="checkbox"
                                                className="focus:ring-blue-500 h-8 w-8 text-blue-600 border-black border-4"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="appointment"
                                                className="font-bold text-black"
                                            >
                                                Appointment updates
                                            </label>
                                            <p className="text-black">
                                                Receive an alert when a change
                                                to an appointment takes place.
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-start">
                                            <div className="h-8 flex items-center">
                                                <input
                                                    id="assessment"
                                                    name="assessment"
                                                    type="checkbox"
                                                    className="focus:ring-blue-500 h-8 w-8 text-blue-600 border-black border-4"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label
                                                    htmlFor="candidates"
                                                    className="font-bold text-black"
                                                >
                                                    Assessment updates
                                                </label>
                                                <p className="text-black">
                                                    Receive an alert when action
                                                    is required in relation to a
                                                    digital assessment.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-start">
                                            <div className="h-8 flex items-center">
                                                <input
                                                    id="document"
                                                    name="document"
                                                    type="checkbox"
                                                    className="focus:ring-blue-500 h-8 w-8 text-blue-600 border-black border-4"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label
                                                    htmlFor="document"
                                                    className="font-bold text-black"
                                                >
                                                    Document updates
                                                </label>
                                                <p className="text-black">
                                                    Receive an alert when a new
                                                    document is made available.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className="mt-6">
                                <legend className="text-base font-bold text-black">
                                    Push Notifications
                                </legend>
                                <p className="text-sm text-black">
                                    These are delivered via SMS to your mobile
                                    phone.
                                </p>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
                                            className="focus:ring-blue-500 h-8 w-8 text-blue-600 border-black border-4"
                                        />
                                        <label
                                            htmlFor="push-everything"
                                            className="ml-3"
                                        >
                                            <span className="block text-sm font-bold text-black">
                                                Everything
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="push-email"
                                            name="push-notifications"
                                            type="radio"
                                            className="focus:ring-blue-500 h-8 w-8 text-blue-600 border-black border-4"
                                        />
                                        <label
                                            htmlFor="push-email"
                                            className="ml-3"
                                        >
                                            <span className="block text-sm font-bold text-black">
                                                Same as email
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="push-nothing"
                                            name="push-notifications"
                                            type="radio"
                                            className="focus:ring-blue-500 h-8 w-8 text-blue-600 border-black border-4"
                                        />
                                        <label
                                            htmlFor="push-nothing"
                                            className="ml-3"
                                        >
                                            <span className="block text-sm font-bold text-black">
                                                No push notifications
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="px-4 py-6 sm:px-6">
                            <button
                                type="submit"
                                className="bg-green-500 py-2 px-4 border-4 border-black text-lg font-bold text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form> */}
            </main>
        </Layout>
    );
}
export async function getServerSideProps(context) {
    const debug: boolean = context.query?.debug ? context.query?.debug : false;
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
    let profile: object = {};
    let success: boolean = false;
    let query: string = "";
    let errors: object = {};
    if (context.query.testuser) {
        query = "?testuser=" + context.query.testuser;
        if (context.query.usecher) {
            query += "&usecher=true";
        }
        if (context.query.debug) {
            query += "&debug=true";
        }
    }
    const { locale, req } = context;
    const data = parseCookies(req);
    let currentLocale: string = data.NEXT_LOCALE || locale;
    //Fetch language strings using current locale.
    const localLanguageStrings = getLanguage("profile", currentLocale);
    const globalLanguageStrings = getLanguage("global", currentLocale);
    const languageStrings = {
        ...localLanguageStrings,
        ...globalLanguageStrings,
    };
    const endpoint: string =
        process.env.NEXT_URL +
        process.env.NEXT_API_PATH +
        authorisedUser.nhs_number;
    if (context.req.method === "POST") {
        await getBody(context.req, context.res);
    }
    if (
        typeof context.req.body != "undefined" &&
        context.req.body.save &&
        (context.req.body.phoneNumber || context.req.body.email)
    ) {
        const patientRecord = {
            email: context.req.body?.email,
            phoneNumber: context.req.body?.phoneNumber,
        };
        let schema = yup.object().shape({
            email: yup.string().email(),
        });
        const validationOutcome = await schema
            .validate(patientRecord)
            .catch(function (err) {
                return err;
            });
        if (typeof validationOutcome.errors != "undefined") {
            errors["email"] = validationOutcome.errors;
        }
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
            typeof validationOutcome.errors == "undefined" &&
            phoneValidationOutcome &&
            typeof phoneLengthOutcome == "undefined"
        ) {
            const patient = await updatePatient(endpoint, patientRecord);
            if (
                Object.keys(patient).length > 0 &&
                patient.constructor === Object
            ) {
                success = true;
                profile = patient.profile;
            }
        }
    }
    if (
        process.env.usecher ||
        (context.query.usecher && context.query.testuser)
    ) {
        const request = {
            Resource: "Patient",
            Endpoint: "Patient",
            Method: "GetPatient",
            Body: {
                requestJson: {
                    NHSNumber: context.query.testuser
                        ? context.query.testuser
                        : authorisedUser.nhs_number,
                },
            },
        };
        const { Patient } = await contactApi(request);
        profile = Patient;
    } else {
        profile = await getPatient(endpoint);
    }
    const breadCrumbs: object[] = [
        {
            key: "profilePageName",
            href: "/profile",
            current: true,
        },
    ];
    return {
        props: {
            breadCrumbs: breadCrumbs,
            profile: profile,
            debug: debug,
            languageStrings: languageStrings,
            query: query,
            success: success,
            errors: errors,
        },
    };
}
