import { Link } from "@inertiajs/react";

export default function Buttonaksi({
    className = "",
    children,
    url,
    confirm = false,
    confirmMessage = "Apakah Anda yakin ingin menghapus data ini?",
}) {
    return (
        <Link
            className={
                "inline-flex items-center px-4 py-2  border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2  focus:ring-offset-2 transition ease-in-out duration-150" +
                className
            }
            href={url}
            onClick={(e) => {
                if (confirm) {
                    if (!window.confirm(confirmMessage)) {
                        e.preventDefault();
                    }
                }
            }}
        >
            {children}
        </Link>
    );
}
