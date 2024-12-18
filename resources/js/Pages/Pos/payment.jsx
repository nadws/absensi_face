import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchTable from "@/Components/SearchTable";
import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import numeral from "numeral";

export default function payment({ no_invoice }) {
    const [cardItems, setCardItems] = useState([]);

    useEffect(() => {
        const storedCardItems = localStorage.getItem("cardItems");
        if (storedCardItems) {
            const parsedCardItems = JSON.parse(storedCardItems);
            setCardItems(parsedCardItems);
        } else {
        }
    }, []);

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "/image/image.png";
    };

    return (
        <div className="bg-[#F8F8F8] py-40 px-80 h-screen">
            <Head title="POS Payment" />
            <div className="w-3/4">
                <div className="border border-gray-500 p-7 rounded-md">
                    <h5 className="font-mona font-bold text-gray-700">
                        Payment
                        <span className="float-right">#{no_invoice}</span>
                    </h5>
                </div>
                <div className="space-y-4 p-4">
                    {cardItems.map((item) => (
                        <div
                            className="flex items-center border-b pb-4 "
                            key={item.id}
                        >
                            <img
                                src={`/image/${item.foto}`}
                                alt="Product Image"
                                className="w-20 h-20 object-cover rounded"
                                onError={handleImageError}
                            />
                            <div className="ml-4 flex-1">
                                <h2 className="text-lg font-semibold font-mona">
                                    {item.nama_produk}
                                </h2>
                                <p className="text-sm text-[#F46700] font-mona">
                                    Rp.
                                    {numeral(item.harga).format("0,0")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
