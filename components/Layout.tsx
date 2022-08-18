import React, { ReactNode, useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';
import Sidebar from './Sidebar';
import Footer from './Footer';
import DebugBar from './DebugBar';
import useStorage from '../hooks/useStorage';
import Breadcrumbs from './Breadcrumbs';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
type Props = {
    children?: ReactNode;
    title?: string;
    debug?: boolean;
    url?: string;
    errors?: object;
    page?: string;
    data?: any;
    breadCrumbs?: any;
    query?: string;
    languageStrings: string[];
};
function acceptCookies(languageStrings) {
    const { getItem, setItem } = useStorage();
    const hideCookie = getItem('hideCookie');
    const [cookies, setCookies, removeCookies] = useCookies([
        'acceptCookies',
        '_ga',
        '_gat',
        '_gid',
    ]);
    function setCookiePreferences(preference) {
        if (preference == true || preference == 'true') {
            setCookies('acceptCookies', preference, {
                path: '/',
                expires: new Date(
                    new Date().getTime() + 1000 * 60 * 60 * 24 * 365,
                ),
            });
        } else {
            removeCookies('acceptCookies');
            removeCookies('_ga');
            removeCookies('_gat');
            removeCookies('_gid');
        }
    }
    if (!hideCookie) {
        return (
            <div className="bg-gray-50">
                <div className="max-w-6xl m-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-1">
                            <h3 className="text-lg font-bold text-blue-950">
                                {languageStrings['acceptCookiesHeading']}
                            </h3>
                            <p className="mt-4 font-bold text-blue-750">
                                <span>
                                    {languageStrings['acceptCookiesPara1']}
                                </span>
                            </p>
                            <p className="mt-4 font-bold text-blue-750">
                                <span>
                                    {languageStrings['acceptCookiesPara2']}
                                </span>
                            </p>
                            <p className="mt-4 font-bold text-blue-750">
                                <span>
                                    {languageStrings['acceptCookiesPara3']}
                                </span>
                            </p>
                            <p className="mt-4 font-bold text-blue-750">
                                <a
                                    className="underline"
                                    href="https://www.connecthealth.co.uk/cookie-policy/"
                                    target="_blank"
                                >
                                    {languageStrings['viewCookiePolicy']}
                                </a>
                            </p>
                            <div className="mt-4 flex">
                                <button
                                    onClick={() => {
                                        setItem(
                                            'hideCookie',
                                            'true',
                                            'session',
                                        );
                                        setCookiePreferences('true');
                                    }}
                                    className="bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {languageStrings['acceptCookiesButton']}
                                </button>
                                <button
                                    onClick={() => {
                                        setItem(
                                            'hideCookie',
                                            'true',
                                            'session',
                                        );
                                        setCookiePreferences('false');
                                    }}
                                    className="ml-3 bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {languageStrings['rejectCookiesButton']}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const Layout = ({
    debug = false,
    page = 'Connect Health Patient Portal',
    query,
    url,
    data,
    errors,
    children,
    title = 'Connect Health Patient Portal | Musculoskeletal Services - NHS - Occupational Health',
    breadCrumbs = [],
    languageStrings,
}: Props) => {
    const [cookies, updateCookie, setCookie] = useCookies(['acceptCookies']);
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="preload" href="/fonts/Gotham-Book.woff" as="font" />
                {/* {typeof cookies.activateAccessibilityAssistant != 'undefined' &&
                    cookies.activateAccessibilityAssistant == 'true' && (
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
        var serviceUrl = "//api.reciteme.com/asset/js?key=";
        var serviceKey = "13259b745e4c9258b00590572cfc050993f50480";
        var options = {};  // Options can be added as needed
        var autoLoad = true;
        var enableFragment = "#reciteEnable";
        var loaded = [], frag = !1; window.location.hash === enableFragment && (frag = !0); function loadScript(c, b) { var a = document.createElement("script"); a.type = "text/javascript"; a.readyState ? a.onreadystatechange = function () { if ("loaded" == a.readyState || "complete" == a.readyState) a.onreadystatechange = null, void 0 != b && b() } : void 0 != b && (a.onload = function () { b() }); a.src = c; document.getElementsByTagName("head")[0].appendChild(a) } function _rc(c) { c += "="; for (var b = document.cookie.split(";"), a = 0; a < b.length; a++) { for (var d = b[a]; " " == d.charAt(0);)d = d.substring(1, d.length); if (0 == d.indexOf(c)) return d.substring(c.length, d.length) } return null } function loadService(c) { console.log('loadServiceCalled');for (var b = serviceUrl + serviceKey, a = 0; a < loaded.length; a++)if (loaded[a] == b) return; loaded.push(b); loadScript(serviceUrl + serviceKey, function () { "function" === typeof _reciteLoaded && _reciteLoaded(); "function" == typeof c && c(); Recite.load(options); Recite.Event.subscribe("Recite:load", function () { Recite.enable() }) }) } "true" == _rc("Recite.Persist") && loadService(); if (autoLoad && "false" != _rc("Recite.Persist") || frag) document.addEventListener ? document.addEventListener("DOMContentLoaded", function (c) { loadService() }) : loadService();
`,
                            }}
                        />
                    )} */}
            </Head>
            <div className="bg-gray-50">
                <header>
                    {acceptCookies(languageStrings)}
                    <Navigation
                        languageStrings={languageStrings}
                        query={query}
                    />
                    <Breadcrumbs
                        languageStrings={languageStrings}
                        query={query}
                        breadCrumbs={breadCrumbs}
                    ></Breadcrumbs>
                </header>
                <div className="lg:py-10">
                    {page != 'Homepage' ? (
                        <div className="mx-auto lg:max-w-6xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
                            <div className="hidden lg:block lg:col-span-3">
                                <Sidebar
                                    languageStrings={languageStrings}
                                    query={query}
                                />
                            </div>
                            {children}
                        </div>
                    ) : (
                        <div className="mx-auto lg:max-w-6xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
                            {children}
                        </div>
                    )}
                </div>
                <Footer languageStrings={languageStrings} />
                <MobileNavigation languageStrings={languageStrings} />
                {debug && (
                    <DebugBar
                        url={url}
                        errors={errors}
                        data={data}
                        languageStrings={languageStrings}
                    ></DebugBar>
                )}
            </div>
            {router.pathname == '/document/[document]' && (
                <Script
                    src="https://www.google.com/recaptcha/api.js"
                    strategy="lazyOnload"
                ></Script>
            )}
            {cookies.acceptCookies == 'true' ? (
                <>
                    <Script
                        strategy="lazyOnload"
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_GOOGLE_ANALYTICS_TRACKING_CODE}`}
                    ></Script>
                    <Script
                        async
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                
                                gtag('config', ${process.env.NEXT_GOOGLE_ANALYTICS_TRACKING_CODE});`,
                        }}
                    ></Script>
                </>
            ) : (
                ''
            )}
        </div>
    );
};

export default Layout;
