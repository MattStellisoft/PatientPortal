import Link from "next/link";
export default function Notification({ link, query, title, message }) {
    return (
        <Link href={link + query}>
            <div className="cursor-pointer border-4 border-blue-750 mb-4">
                <div className="flex flex-col">
                    <h3 className="bg-blue-750 text-base text-white font-bold px-4 py-2">
                        {title}
                    </h3>
                    <div className="mt-2 font-bold text-base p-4">
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
