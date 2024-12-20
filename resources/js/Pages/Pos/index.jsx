import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchTable from "@/Components/SearchTable";
import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import numeral from "numeral";
import Cart from "@/Pages/Pos/components/Cart";
import Product from "@/Pages/Pos/components/Product";
import Kategori from "@/Pages/Pos/components/Kategori";
import CartMobile from "@/Pages/Pos/components/CartMobile";
import Swal from "sweetalert2";

export default function Pos({ auth, data, filters }) {
    const [cardItems, setCardItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const storedCardItems = localStorage.getItem("cardItems");
        if (storedCardItems) {
            const parsedCardItems = JSON.parse(storedCardItems);
            setCardItems(parsedCardItems);
        } else {
        }
    }, []);

    const handleCartClick = (items, event) => {
        items.forEach((item) => {
            const isItemInCards = cardItems.some(
                (cardItem) => cardItem.id === item.id
            );
            if (!isItemInCards) {
                const updatedCardItems = [...cardItems, item];
                localStorage.setItem(
                    "cardItems",
                    JSON.stringify(updatedCardItems)
                );
                setCardItems(updatedCardItems);
                setCartCount(updatedCardItems.length);
            }
        });
    };
    const updateQtyInLocalStorage = (id, newQty) => {
        const storedItems = JSON.parse(localStorage.getItem("cardItems")) || [];
        const updatedItems = storedItems.map((item) =>
            item.id === id
                ? { ...item, qty: newQty, ttl_rp: newQty * item.harga }
                : item
        );
        localStorage.setItem("cardItems", JSON.stringify(updatedItems));
        return updatedItems; // Kembalikan array yang diperbarui
    };

    const removeFromCards = (item) => {
        const existingData =
            JSON.parse(localStorage.getItem("cardItems")) || [];
        const updatedData = existingData.filter((el) => el.id !== item.id);
        localStorage.setItem("cardItems", JSON.stringify(updatedData));

        setCardItems(updatedData);
        setCartCount(updatedData.length);
    };
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "/image/image.png";
    };

    useEffect(() => {
        const cardItems = JSON.parse(localStorage.getItem("cardItems")) || [];
        setCartCount(cardItems.length);
        const handleStorageChange = () => {
            const updatedCardItems =
                JSON.parse(localStorage.getItem("cardItems")) || [];
            setCartCount(updatedCardItems.length);
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Toggle state
    };

    const showSwal = () => {
        Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "error",
            title: "Qty tidak mencukupi stok",
        });
    };

    return (
        <div className="bg-[#F8F8F8]">
            <Head title="POS" />
            <div className="py-4">
                <div className="grid grid-cols-5 gap-2">
                    <div className="col-span-5 lg:col-span-3">
                        <div className="flex flex-col">
                            <div className="ml-9">
                                <Link href="/dashboard" className="text-xl">
                                    <i className="fas fa-home text-[#F46700]  "></i>
                                </Link>
                                <button
                                    href="/dashboard"
                                    className="relative text-xl float-end mr-8 lg:hidden"
                                    onClick={toggleSidebar}
                                >
                                    <i className="fa-solid fa-cart-shopping text-[#F46700] "></i>
                                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                </button>

                                <CartMobile
                                    isOpen={isOpen}
                                    toggleSidebar={toggleSidebar}
                                    cardItems={cardItems}
                                    removeFromCards={removeFromCards}
                                    updateQtyInLocalStorage={
                                        updateQtyInLocalStorage
                                    }
                                    setCardItems={setCardItems}
                                    showSwal={showSwal}
                                />
                            </div>

                            <div className="grid lg:grid-cols-3 sm:grid-cols-4">
                                <div className=" sm:col-span-2 col-span-3 mb-2 p-4">
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
                                    kat={filters.kategori}
                                    className="w-full   sm:mt-4 mt-2 px-8 col-span-4 sm:col-span-2 lg:col-span-1"
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
                        updateQtyInLocalStorage={updateQtyInLocalStorage}
                        setCardItems={setCardItems}
                        showSwal={showSwal}
                    />
                </div>
            </div>
        </div>
    );
}
