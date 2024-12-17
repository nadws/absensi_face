import { Link } from "@inertiajs/react";

export default function Pagination({
    links,
    searchQuery = "",
    paginate = 10,
    url = "",
}) {
    // Pastikan searchQuery adalah string kosong jika tidak ada pencarian
    const validSearchQuery =
        searchQuery && searchQuery !== "null" ? searchQuery : "";

    return (
        <div className="flex mt-8 space-x-2 px-5">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={
                        link.url
                            ? `${link.url}${
                                  link.url.includes("?") ? "&" : "?"
                              }search=${validSearchQuery}&paginate=${paginate}&${url}`
                            : ""
                    }
                    className={
                        link.active
                            ? "bg-[#F46700] text-white px-4 py-2 border border-[#F46700] rounded-md "
                            : "text-[#F46700] hover:bg-[#F46700] hover:text-white px-4 py-2 border "
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
