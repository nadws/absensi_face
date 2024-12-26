import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    icon = "",
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-[#F46700] text-[#F46700] focus:border-indigo-700 "
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300") +
                className
            }
        >
            <i className={`fa-solid ${icon}`}></i> &nbsp; {children}
        </Link>
    );
}
