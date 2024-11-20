import { Link } from "@inertiajs/react";

export default function Pagination({ links, searchQuery = "", paginate = 10 }) {
    // Pastikan searchQuery adalah string kosong jika tidak ada pencarian
    const validSearchQuery =
        searchQuery && searchQuery !== "null" ? searchQuery : "";

    return (
        <div className="flex mt-8 space-x-2">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={
                        link.url
                            ? `${link.url}${
                                  link.url.includes("?") ? "&" : "?"
                              }search=${validSearchQuery}&paginate=${paginate}`
                            : ""
                    }
                    className={
                        link.active
                            ? "bg-indigo-600 text-white px-4 py-2 border border-indigo-600 rounded-md "
                            : "text-indigo-600 hover:bg-indigo-600 hover:text-white px-4 py-2 border "
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
