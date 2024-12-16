import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchTable from "@/Components/SearchTable";
import { useState, useEffect } from "react";
import numeral from "numeral";
import { Link } from "@inertiajs/react";

export default function Pos({ auth, produk, filters }) {
    const [favoriteItems, setFavoriteItems] = useState([]);

    useEffect(() => {
        const storedFavoriteItems = localStorage.getItem("favoriteItems");
        if (storedFavoriteItems) {
            const parsedFavoriteItems = JSON.parse(storedFavoriteItems);
            setFavoriteItems(parsedFavoriteItems);
        } else {
        }
    }, []);

    const handleHeartClick = (item, event) => {
        const isItemInFavorites = favoriteItems.some(
            (favoriteItem) => favoriteItem.id === item.id
        );
        if (!isItemInFavorites) {
            const updatedFavoriteItems = [...favoriteItems, item];
            localStorage.setItem(
                "favoriteItems",
                JSON.stringify(updatedFavoriteItems)
            );
            setFavoriteItems(updatedFavoriteItems);
        }
    };
    const removeFromFavorites = (item) => {
        const existingData =
            JSON.parse(localStorage.getItem("favoriteItems")) || [];
        const updatedData = existingData.filter((el) => el.id !== item.id);
        localStorage.setItem("favoriteItems", JSON.stringify(updatedData));

        setFavoriteItems(updatedData);

        // Update favorite status for this specific item
    };
    const handleImageError = (e) => {
        e.target.onerror = null; // Mencegah loop jika default image juga tidak tersedia
        e.target.src = "/image/image.png"; // Path ke gambar default
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pos
                </h2>
            }
        >
            <Head title="Pos" />

            <div className="py-12">
                <div className="grid grid-cols-5 gap-2">
                    <div className="col-span-3">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8   ">
                            <SearchTable
                                filters={filters}
                                routes="pos"
                                className="width-full"
                            />
                        </div>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8   grid grid-cols-4 gap-4">
                            {produk.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white shadow-sm sm:rounded-lg cursor-pointer"
                                    onClick={(event) => {
                                        event.preventDefault(); // Menghentikan penyebaran event
                                        handleHeartClick(item, event);
                                    }}
                                >
                                    <img
                                        src={`/image/${item.foto}`}
                                        alt={`Image for ${item.nama_produk}`}
                                        className="w-full h-32 object-contain"
                                        onError={handleImageError}
                                    />

                                    <div className="p-6 text-gray-900 text-center">
                                        {item.nama_produk} <br />
                                        Rp. {numeral(item.harga).format("0,0")}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination
                            links={produk.links}
                            searchQuery={filters.search}
                            paginate={filters.paginate}
                        />
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg mr-10 col-span-2">
                        <div className="w-full max-w-2xl bg-white rounded-lg p-6 ">
                            <h1 className="text-2xl font-semibold mb-4">
                                Shopping Cart
                            </h1>
                            <div className="h-96 overflow-y-scroll">
                                {favoriteItems.length === 0 ? (
                                    <>
                                        <hr className="border-t border-gray-300" />
                                        <p className="text-5xl font-bold text-center mt-32 mb-32">
                                            Keranjang Kosong
                                        </p>
                                    </>
                                ) : (
                                    <div className="space-y-4 p-4">
                                        {favoriteItems.map((item) => (
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
                                                    <h2 className="text-lg font-semibold">
                                                        {item.nama_produk}
                                                    </h2>
                                                    <p className="text-sm text-gray-600">
                                                        Rp.
                                                        {numeral(
                                                            item.harga
                                                        ).format("0,0")}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button className="px-2 py-1 bg-gray-200 rounded">
                                                        -
                                                    </button>
                                                    <span>1</span>
                                                    <button className="px-2 py-1 bg-gray-200 rounded">
                                                        +
                                                    </button>
                                                    <button
                                                        className="px-2 py-1 bg-red-400 rounded text-white"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            removeFromFavorites(
                                                                item,
                                                                event
                                                            );
                                                        }}
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-6 border-t pt-4 bg-white  rounded-lg p-6">
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span>
                                    Rp.
                                    {numeral(
                                        favoriteItems.reduce(
                                            (total, item) => total + item.harga,
                                            0
                                        )
                                    ).format("0,0")}
                                </span>
                            </div>
                            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
