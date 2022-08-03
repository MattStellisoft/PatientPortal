import Link from "next/link";

export default function fourohfour() {
    return (
        <>
            <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
                <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex-shrink-0 flex justify-center">
                        <a href="/" className="inline-flex">
                            <span className="sr-only">Connect Health Logo</span>
                            <img
                                className="h-20 w-auto"
                                src="/beeicon.jpg"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="py-16">
                        <div className="text-center">
                            <p className="text-sm font-semibold text-black uppercase tracking-wide">
                                404 error
                            </p>
                            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                                Page not found.
                            </h1>
                            <p className="mt-2 text-base text-black">
                                Sorry, we couldn’t find the page you’re looking
                                for.
                            </p>
                            <div className="mt-6">
                                <Link href="/">
                                    <a className="text-base font-medium text-black hover:text-blue-750">
                                        Go back home
                                        <span aria-hidden="true"> &rarr;</span>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
