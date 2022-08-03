import Link from "next/link";
import {
    HomeIcon,
    DocumentIcon,
    CalendarIcon,
    BellIcon,
} from "@heroicons/react/outline";

const navigation = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Appointments", href: "/appointments", icon: CalendarIcon },
    { name: "Documents", href: "/documents", icon: DocumentIcon },
    { name: "Notifications", href: "/notifications", icon: BellIcon },
];

export default function MobileNavigation({ languageStrings }) {
    return (
        <nav className="block z-20 sm:hidden fixed bottom-0 inset-x-0 bg-white flex border-black border-t-4 justify-between text-1xs text-black">
            {navigation.map((item) => (
                <Link href={item.href} key={item.name}>
                    <a
                        className="w-full block py-2 px-1 text-center hover:bg-yellow-300 transition duration-300"
                        aria-current={item.href ? "page" : undefined}
                    >
                        <item.icon
                            className="w-6 h-6 mb-1 mx-auto"
                            aria-hidden="true"
                        />
                        <span className="truncate uppercase">{item.name}</span>
                    </a>
                </Link>
            ))}
        </nav>
    );
}
