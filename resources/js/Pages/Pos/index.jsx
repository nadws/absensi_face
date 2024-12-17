import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchTable from "@/Components/SearchTable";
import { useState, useEffect } from "react";
import numeral from "numeral";
import Cart from "@/Pages/Pos/components/Cart";
import Product from "@/Pages/Pos/components/Product";
import Kategori from "@/Pages/Pos/components/Kategori";
import { Link } from "@inertiajs/react";

export default function Pos({ auth, data, filters }) {
    const [cardItems, setCardItems] = useState([]);

    useEffect(() => {
        const storedCardItems = localStorage.getItem("cardItems");
        if (storedCardItems) {
            const parsedCardItems = JSON.parse(storedCardItems);
            setCardItems(parsedCardItems);
        } else {
        }
    }, []);

    const handleCartClick = (item, event) => {
        const isItemInCards = cardItems.some(
            (cardItem) => cardItem.id === item.id
        );
        if (!isItemInCards) {
            const updatedCardItems = [...cardItems, item];
            localStorage.setItem("cardItems", JSON.stringify(updatedCardItems));
            setCardItems(updatedCardItems);
        }
    };
    const removeFromCards = (item) => {
        const existingData =
            JSON.parse(localStorage.getItem("cardItems")) || [];
        const updatedData = existingData.filter((el) => el.id !== item.id);
        localStorage.setItem("cardItems", JSON.stringify(updatedData));

        setCardItems(updatedData);

        // Update favorite status for this specific item
    };
    const handleImageError = (e) => {
        e.target.onerror = null; // Mencegah loop jika default image juga tidak tersedia
        e.target.src = "/image/image.png"; // Path ke gambar default
    };

    return (
        <div className="bg-[#F8F8F8]">
            <Head title="POS" />
            <div className="py-4">
                <div className="grid grid-cols-5 gap-2">
                    <div className="col-span-3">
                        <div className="flex flex-col">
                            <div className="ml-9">
                                <Link href="/dashboard" className="text-xl">
                                    <i className="fas fa-home text-[#F46700]  "></i>
                                </Link>
                            </div>
                            <div className="grid grid-cols-3">
                                <div className=" col-span-2 mb-2 p-4">
                                    <h2 className="font-semibold text-xl text-gray-800 text-left ml-4 font-mona">
                                        Welcome , POS
                                    </h2>
                                    <p className="ml-4 text-gray-400 font-mona">
                                        Discover whatever you need easily
                                    </p>
                                </div>
                                <SearchTable
                                    filters={filters}
                                    routes="pos"
                                    className="w-full   mt-4 px-8"
                                    placeholder="Search product..."
                                />
                            </div>
                            <Kategori
                                pemilik={data.pemilik}
                                filters={filters}
                            />

                            <Product
                                data={data}
                                handleCartClick={handleCartClick}
                                cardItems={cardItems}
                                handleImageError={handleImageError}
                                removeFromCards={removeFromCards}
                            />

                            <Pagination
                                links={data.produk.links}
                                searchQuery={filters.search}
                                paginate={filters.paginate}
                                url={`kat=${filters.kategori}`}
                            />
                        </div>
                    </div>
                    <Cart
                        cardItems={cardItems}
                        removeFromCards={removeFromCards}
                    />
                </div>
            </div>
        </div>
    );
}
