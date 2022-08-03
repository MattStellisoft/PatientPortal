const social = [
    {
        name: "Facebook",
        href: "https://www.facebook.com/ConnectPhysiotherapy",
        src: "https://design-system.digital.nhs.uk/cdn/latest/icons/hex/facebook.svg",
        alt: "Facebook",
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/connect-physical-health",
        src: "https://design-system.digital.nhs.uk/cdn/latest/icons/hex/linkedin.svg",
        alt: "LinkedIn",
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: "Twitter",
        href: "https://twitter.com/Connect_Health_",
        src: "https://design-system.digital.nhs.uk/cdn/latest/icons/hex/twitter.svg",
        alt: "Twitter",
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
        ),
    },
    {
        name: "YouTube",
        href: "https://www.youtube.com/channel/UCJxTRmBrEksa2G7E1jwJ9FA",
        src: "https://design-system.digital.nhs.uk/cdn/latest/icons/hex/youtube.svg",
        alt: "YouTube",
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
];
export default function Footer({ languageStrings }) {
    return (
        <footer
            className="bg-gray-100 mb-8 lg:mb-0 border-t-4 border-blue-750"
            aria-labelledby="footer-heading"
        >
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="max-w-6xl mx-auto py-12 px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:gap-8">
                    <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-bold text-blue-950 tracking-wider uppercase">
                                    {languageStrings["col1Heading"]}
                                </h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {languageStrings.col1Links.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className="text-base text-blue-750 hover:text-gray-900"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-bold text-blue-950 tracking-wider uppercase">
                                    {languageStrings["col2Heading"]}
                                </h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {languageStrings.col2Links.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className="text-base text-blue-750 hover:text-gray-900"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-bold text-blue-950 tracking-wider uppercase">
                                    {languageStrings["col3Heading"]}
                                </h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {languageStrings.col3Links.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className="text-base text-blue-750 hover:text-gray-900"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-bold text-blue-950 tracking-wider uppercase">
                                    {languageStrings["col1Heading"]}
                                </h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {languageStrings.col4Links.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className="text-base text-blue-750 hover:text-gray-900"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="font-bold">
                <div className="max-w-6xl mx-auto py-12 px-6 lg:py-16 lg:px-8 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                        {social.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-blue-750 hover:text-blue-950"
                            >
                                <span className="sr-only">{item.name}</span>
                                {/* <item.icon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                /> */}
                                <img
                                    className="h-8 w-8"
                                    src={item.src}
                                    alt={item.alt}
                                />
                            </a>
                        ))}
                    </div>
                    <p className="mt-8 text-base text-blue-750 md:mt-0 md:order-1">
                        &copy;{" "}
                        {new Date().toLocaleDateString("en-gb", {
                            year: "numeric",
                        })}{" "}
                        {languageStrings["rightsReserved"]}
                    </p>
                </div>
            </div>
        </footer>
    );
}
