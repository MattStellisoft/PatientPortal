import { useState } from 'react';
import { Errors } from '../interfaces/interfaces';
import { getLanguage } from '../models/languages';
import { CheckIcon, XIcon } from '@heroicons/react/solid';
import {
    CloudUploadIcon,
    CogIcon,
    LockClosedIcon,
    RefreshIcon,
    ServerIcon,
    ShieldCheckIcon,
} from '@heroicons/react/outline';
const features = [
    {
        name: 'Book and manage appointments',
        description: '',
        icon: CloudUploadIcon,
    },
    {
        name: 'Complete and submit electronic health assessments',
        description: '',
        icon: LockClosedIcon,
    },
    {
        name: 'View and download your clinical letters',
        description: '',
        icon: RefreshIcon,
    },
    {
        name: 'View your exercise programmes',
        description: '',
        icon: ShieldCheckIcon,
    },
    {
        name: 'Track your progress',
        description: '',
        icon: CogIcon,
    },
    {
        name: 'Create new referrals',
        description: '',
        icon: ServerIcon,
    },
];
export default function SignIn({ errors, languageStrings, standardLogin }) {
    const [hideErrorBanner, setErrorBannerHide] = useState(false);
    const hideBanner = () => setErrorBannerHide(true);
    return (
        <>
            <div className="block sm:hidden max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-starr sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="h-8 w-auto"
                                src="/connect-logo.png"
                                alt="Workflow"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-screen flex">
                {Object.keys(errors).length > 0 && hideErrorBanner == false && (
                    <div className="fixed inset-x-0 bottom-0 xl:top-0 z-10">
                        {Object.keys(errors).map((key, index) => (
                            <div key={index} className="bg-yellow-400">
                                <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                                    <div className="flex items-center justify-between flex-wrap">
                                        <div className="w-0 flex-1 flex items-center">
                                            <p className="ml-3 font-medium">
                                                <span>{errors[key].name}</span>
                                            </p>
                                        </div>
                                        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                                            <button
                                                onClick={hideBanner}
                                                type="button"
                                                className="-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black sm:-mr-2"
                                            >
                                                <XIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                                <span className="sr-only">
                                                    Dismiss
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex-1 flex flex-col justify-center pb-12 sm:py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className="hidden sm:block">
                            <img
                                className="h-12 w-auto"
                                src="/connect-logo.png"
                                alt="Connect Health Logo"
                            />
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                                {languageStrings['signInPageHeading']}
                                {standardLogin ? '' : ' with NHS Login'}
                            </h2>
                        </div>

                        <div className="mt-8">
                            <p className="text-lg">
                                {languageStrings['signInPageCriteriaHeading']}
                            </p>
                            <ul role="list" className="mt-6 space-y-4">
                                {languageStrings.signInCriteria.map((item) => (
                                    <li
                                        key={languageStrings[item]}
                                        className="flex space-x-3"
                                    >
                                        <CheckIcon
                                            className="flex-shrink-0 h-8 w-8 text-blue-750"
                                            aria-hidden="true"
                                        />
                                        <span className="text-lg">
                                            {languageStrings[item]}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            {standardLogin == false && (
                                <>
                                    <div className="mt-6">
                                        <a
                                            className="text-lg text-blue-750 underline"
                                            href="https://www.nhs.uk/nhs-app/nhs-app-help-and-support/getting-started-with-the-nhs-app/"
                                        >
                                            {
                                                languageStrings[
                                                    'signInPageNhsLoginAboutLink'
                                                ]
                                            }
                                        </a>
                                    </div>
                                    <div className="mt-6">
                                        <a href="https://auth.sandpit.signin.nhs.uk/authorize?scope=openid%20profile%20email%20phone&client_id=CHITU&redirect_uri=http://localhost:3000/api/callback&response_type=code&state=appstate&nonce=randomnonce">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 323.33 59"
                                                className=""
                                            >
                                                <title>
                                                    Sign in with NHS Login
                                                </title>
                                                <g
                                                    id="Layer_2"
                                                    data-name="Layer 2"
                                                >
                                                    <g
                                                        id="Layer_1-2"
                                                        data-name="Layer 1"
                                                    >
                                                        <rect
                                                            style={{
                                                                fill: '#003087',
                                                            }}
                                                            y="4"
                                                            width="323.33"
                                                            height="55"
                                                            rx="4"
                                                        />
                                                        <rect
                                                            style={{
                                                                fill: '#005eb8',
                                                            }}
                                                            width="323.33"
                                                            height="55"
                                                            rx="4"
                                                        />
                                                        <rect
                                                            style={{
                                                                fill: '#005eb8',
                                                            }}
                                                            x="2.1"
                                                            y="2"
                                                            width="319.22"
                                                            height="51"
                                                        />
                                                        <rect
                                                            style={{
                                                                fill: '#005eb8',
                                                            }}
                                                            x="101.05"
                                                            y="13.98"
                                                            width="204.28"
                                                            height="27.04"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M102.63,31.37a6.49,6.49,0,0,0,3,.83c1,0,2.38-.5,2.38-1.73,0-1-.9-1.47-2.23-2-1.79-.69-3.65-1.44-3.65-4,0-2.89,2.17-4.1,4.71-4.1a10,10,0,0,1,3.19.48l-.25,2.21a7,7,0,0,0-2.73-.57A1.87,1.87,0,0,0,105,24.4c0,1,1.16,1.41,2.28,1.85,1.8.67,3.61,1.5,3.61,4s-1.84,4.06-5.06,4.06a11.8,11.8,0,0,1-3.42-.52Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M113.14,22.36V19.9h2.57v2.46Zm0,11.72V24.17h2.57v9.91Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M125,32.5h0a3.52,3.52,0,0,1-3.07,1.58c-2.74,0-4-2.08-4-5,0-2.39,1.24-5.14,4.2-5.14a3.28,3.28,0,0,1,3,1.58h0V24.17h2.46v9c0,3.35-1.73,5.19-5.19,5.19a8.7,8.7,0,0,1-3.47-.67l.21-2.19a7.34,7.34,0,0,0,2.91.86c2.42,0,3-1.56,3-3.61ZM125,29c0-1.52-.54-3.08-2.17-3.08s-2.29,1.33-2.29,3.14c0,1.35.71,3,2.19,3C124.34,32.08,125,30.62,125,29Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M136.71,34.08V28.52c0-1.48-.3-2.58-1.67-2.58-1.64,0-2.27,1.58-2.27,3.33v4.81h-2.58V24.17h2.44v1.35h0a3.7,3.7,0,0,1,3.25-1.58c2.27,0,3.37,1.56,3.37,3.89v6.25Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M147.36,22.36V19.9h2.58v2.46Zm0,11.72V24.17h2.58v9.91Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M159.18,34.08V28.52c0-1.48-.31-2.58-1.68-2.58-1.63,0-2.27,1.58-2.27,3.33v4.81h-2.58V24.17h2.45v1.35h0a3.71,3.71,0,0,1,3.26-1.58c2.27,0,3.36,1.56,3.36,3.89v6.25Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M179.25,34.08l-2.16-7.56h0l-2.12,7.56H172l-3.35-9.91h2.73l2.19,7.33h0l2-7.33h3l2.15,7.33h0l2.06-7.33h2.46l-3,9.91Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M186.93,22.36V19.9h2.58v2.46Zm0,11.72V24.17h2.58v9.91Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M198.11,34.08a6.44,6.44,0,0,1-1.88.23,2.92,2.92,0,0,1-3.16-3.21v-5h-1.9V24.17h1.9v-2l2.58-.83v2.81h2.29v1.89h-2.29v4.6c0,1,.33,1.65,1.23,1.65A2.21,2.21,0,0,0,198,32Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M206.24,34.08v-5.6c0-1.81-.54-2.54-1.68-2.54-1.52,0-2.27,1.39-2.27,3.35v4.79h-2.58V19.65h2.58v5.87h0a3.69,3.69,0,0,1,3.12-1.58c2.29,0,3.36,1.6,3.36,3.87v6.27Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M224.67,34.08l-5.13-10h0v10h-2.58V20.65h3.31l5.12,10.05h0v-10H228V34.08Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M239,34.08V28.19h-5.38v5.89H231V20.65h2.7v5.43H239V20.65h2.7V34.08Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M244.87,31.37a6.49,6.49,0,0,0,3,.83c1,0,2.38-.5,2.38-1.73,0-1-.9-1.47-2.23-2-1.79-.69-3.65-1.44-3.65-4,0-2.89,2.17-4.1,4.71-4.1a10.07,10.07,0,0,1,3.2.48l-.25,2.21a7.08,7.08,0,0,0-2.74-.57,1.86,1.86,0,0,0-2.11,1.86c0,1,1.15,1.41,2.27,1.85,1.8.67,3.61,1.5,3.61,4s-1.84,4.06-5.06,4.06a11.8,11.8,0,0,1-3.42-.52Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M260.73,34.08V19.65h2.58V34.08Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M270.56,34.31a4.89,4.89,0,0,1-5.17-5.12,5.19,5.19,0,1,1,10.37,0A4.9,4.9,0,0,1,270.56,34.31Zm2.51-5.42c0-1.58-.85-2.95-2.51-2.95s-2.48,1.39-2.48,2.95c0,2.09.81,3.42,2.48,3.42S273.07,31,273.07,28.89Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M284.31,32.5h0a3.53,3.53,0,0,1-3.08,1.58c-2.73,0-4-2.08-4-5,0-2.39,1.23-5.14,4.19-5.14a3.28,3.28,0,0,1,3,1.58h0V24.17h2.46v9c0,3.35-1.73,5.19-5.19,5.19a8.68,8.68,0,0,1-3.46-.67l.21-2.19a7.26,7.26,0,0,0,2.9.86c2.43,0,3-1.56,3-3.61Zm0-3.48c0-1.52-.54-3.08-2.18-3.08s-2.29,1.33-2.29,3.14c0,1.35.71,3,2.2,3C283.69,32.08,284.31,30.62,284.31,29Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M289.6,22.36V19.9h2.58v2.46Zm0,11.72V24.17h2.58v9.91Z"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M301.42,34.08V28.52c0-1.48-.31-2.58-1.68-2.58-1.63,0-2.27,1.58-2.27,3.33v4.81h-2.58V24.17h2.45v1.35h0a3.68,3.68,0,0,1,3.25-1.58c2.27,0,3.37,1.56,3.37,3.89v6.25Z"
                                                        />
                                                        <polygon
                                                            style={{
                                                                fill: '#005eb8',
                                                            }}
                                                            points="18.54 14.54 18.54 40.46 84.42 40.46 84.42 14.54 18.54 14.54 18.54 14.54"
                                                        />
                                                        <path
                                                            style={{
                                                                fill: '#fff',
                                                            }}
                                                            d="M85.05,41V14H18V41ZM45,16.61,40.33,38.34H33.07l-4.57-15h-.06l-3,15H19.89l4.67-21.73h7.28l4.48,15.07h.06l3.07-15.07Zm20.77,0L61.2,38.34H55.35L57.29,29H50.37l-1.94,9.31H42.58l4.54-21.73H53l-1.72,8.31h6.91l1.72-8.31Zm16.81.59-1.41,4.33a11,11,0,0,0-4.82-1c-2.31,0-4.19.34-4.19,2.09,0,3.08,8.48,1.93,8.48,8.53,0,6-5.6,7.56-10.67,7.56a24.58,24.58,0,0,1-6.76-1.12l1.38-4.42a11.37,11.37,0,0,0,5.38,1.25c1.81,0,4.66-.35,4.66-2.59,0-3.49-8.48-2.18-8.48-8.31,0-5.61,4.94-7.29,9.73-7.29a17.91,17.91,0,0,1,6.7,1Z"
                                                        />
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                        {standardLogin && (
                            <div className="mt-6">
                                <form
                                    action="#"
                                    method="POST"
                                    className="space-y-6"
                                >
                                    <div>
                                        <label htmlFor="email">
                                            Email address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="w-full mt-4 focus:ring-blue-750 focus:border-blue-750 flex-grow block max-w-sm min-w-0 sm:text-sm border-4 border-black"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="w-full mt-4 focus:ring-blue-750 focus:border-blue-750 flex-grow block max-w-sm min-w-0 sm:text-sm border-4 border-black"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-8 w-8 text-blue-750 focus:ring-blue-750 border-black border-4"
                                            />
                                            <label
                                                htmlFor="remember-me"
                                                className="ml-2 block text-gray-900"
                                            >
                                                Remember me
                                            </label>
                                        </div>

                                        <div>
                                            <a
                                                href="#"
                                                className="font-medium text-750 hover:text-blue-950"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                    <p className="mt-3 text-sm sm:mt-4">
                                        By sigining in using your email address,
                                        you agree to our{' '}
                                        <a
                                            href="https://www.connecthealth.co.uk/policies/privacy-policy/"
                                            target="_blank"
                                            className="font-medium text-blue-750"
                                        >
                                            privacy policy
                                        </a>
                                        .
                                    </p>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
                <div className="hidden lg:block relative w-0 flex-1 bg-hex">
                    <div className="hidden xl:flex absolute w-full h-full justify-center items-center">
                        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                            {/* <div className="flex items-center justify-center rounded-lg bg-gray-50 px-6 py-8">
                                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl sm:tracking-tight text-blue-750">
                                    Use our Patient Portal to
                                </h2>
                            </div> */}
                            <div className="mt-12">
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                    {features.map((feature) => (
                                        <div
                                            key={feature.name}
                                            className="pt-6"
                                        >
                                            <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                                                <div className="-mt-6">
                                                    <div>
                                                        <span className="inline-flex items-center justify-center rounded-md bg-yellow-400 p-3 shadow-lg">
                                                            <feature.icon
                                                                className="h-6 w-6 text-white"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </div>
                                                    <h3 className="mt-8 text-lg font-medium tracking-tight text-blue-750">
                                                        {feature.name}
                                                    </h3>
                                                    <p className="mt-5 text-base text-gray-500">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    let errors: Errors = {};
    const { locale, req } = context;
    let currentLocale: string = req.cookies.NEXT_LOCALE || locale;
    const localLanguageStrings = getLanguage('signin', currentLocale);
    const globalLanguageStrings = getLanguage('global', currentLocale);
    const languageStrings = {
        ...localLanguageStrings,
        ...globalLanguageStrings,
    };
    if (context.query?.error) {
        errors[context.query?.error] = {
            name: '',
            description: '',
            contact: false,
        };
        errors[context.query?.error]['name'] =
            localLanguageStrings[context.query?.error];
    }
    return {
        props: {
            errors: errors,
            languageStrings: languageStrings,
            standardLogin: process.env.CHLOGIN == 'true' ? true : false,
        },
    };
}
