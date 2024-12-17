import { Link } from "@inertiajs/react";
export default function Kategori({ pemilik, filters }) {
    return (
        <div className="px-8   mb-2 ">
            <div className="py-3 overflow-x-auto whitespace-nowrap mb-2 thin-scrollbar">
                <Link
                    href="/pos"
                    className={`border rounded-md  px-4 py-2 mr-3 ${
                        filters.kategori === null || filters.kategori === "null"
                            ? "bg-[#F46700] text-white"
                            : "text-gray-600 shadow-lg"
                    } `}
                >
                    All
                </Link>
                {pemilik.map((item) => (
                    <Link
                        href={`/pos?kat=${item.id}`}
                        key={item.id}
                        className={`border rounded-md  px-4 py-2 mr-3 ${
                            filters.kategori == item.id
                                ? "bg-[#F46700] text-white"
                                : "text-gray-600 shadow-lg"
                        } `}
                    >
                        {item.pemilik}
                    </Link>
                ))}
            </div>
        </div>
    );
}
