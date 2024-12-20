import { Link } from "@inertiajs/react";
import numeral from "numeral";
export default function CartMobile({
    isOpen,
    toggleSidebar,
    cardItems,
    removeFromCards,
    updateQtyInLocalStorage,
    setCardItems,
    showSwal,
}) {
    const handleImageError = (e) => {
        e.target.onerror = null; // Mencegah loop jika default image juga tidak tersedia
        e.target.src = "/image/image.png"; // Path ke gambar default
    };
    return (
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white  shadow-lg transform z-50 ${
                isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out`}
        >
            <button
                onClick={toggleSidebar}
                className="absolute top-3 right-4 text-[#F46700] text-2xl font-bold"
            >
                <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="p-4">
                <h2 className="text-xl font-bold">Shopping Cart</h2>
            </div>
            <ul className="mt-4">
                {cardItems.length === 0 ? (
                    <>
                        <img
                            src="/logo/cart.png"
                            className="w-full h-full object-contain p-3 mt-28 rounded"
                            alt=""
                        />
                        <h5 className="text-center font-mona">
                            Keranjang Kosong
                        </h5>
                    </>
                ) : (
                    <>
                        <div className="space-y-4 p-4 h-96 overflow-y-scroll">
                            {cardItems.map((item) => (
                                <div
                                    className="flex items-center border-b pb-4 "
                                    key={item.id}
                                >
                                    <img
                                        src={`/image/${item.foto}`}
                                        alt="Product Image"
                                        className="w-10 h-10 object-cover rounded"
                                        onError={handleImageError}
                                    />
                                    <div className="ml-4 flex-1">
                                        <h2 className="text-base font-semibold font-mona">
                                            {item.nama_produk}
                                        </h2>
                                        <p className="text-sm text-[#F46700] font-mona">
                                            Rp.
                                            {numeral(item.harga).format("0,0")}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                const newQty = item.qty - 1;
                                                if (newQty <= 0) {
                                                    removeFromCards(
                                                        item,
                                                        event
                                                    );
                                                } else {
                                                    const updatedItems =
                                                        updateQtyInLocalStorage(
                                                            item.id,
                                                            newQty
                                                        );
                                                    setCardItems(updatedItems);
                                                }
                                            }}
                                        >
                                            -
                                        </button>
                                        <span>{item.qty}</span>
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                const newQty = item.qty + 1;

                                                if (newQty > item.stok) {
                                                    showSwal();
                                                } else {
                                                    const updatedItems =
                                                        updateQtyInLocalStorage(
                                                            item.id,
                                                            newQty
                                                        );
                                                    setCardItems(updatedItems);
                                                }
                                            }}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-red-400 rounded text-white"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                removeFromCards(item, event);
                                            }}
                                        >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 border-t pt-4 bg-white  rounded-lg p-6">
                            <table width={"100%"}>
                                <thead>
                                    <tr>
                                        <th
                                            className="text-left font-mona"
                                            width={"70%"}
                                        >
                                            Total
                                        </th>
                                        <th
                                            className="text-right font-mona"
                                            width={"2%"}
                                        >
                                            Rp
                                        </th>
                                        <th
                                            className="text-right font-mona"
                                            width={"28%"}
                                        >
                                            Rp.
                                            {numeral(
                                                cardItems.reduce(
                                                    (total, item) =>
                                                        total + item.ttl_rp,
                                                    0
                                                )
                                            ).format("0,0")}
                                        </th>
                                    </tr>
                                    {/* <tr>
                                        <th
                                            className="text-left font-thin text-sm font-mona"
                                            width={"70%"}
                                        >
                                            Tax(10%)
                                        </th>
                                        <th
                                            className="text-right font-thin font-mona"
                                            width={"2%"}
                                        >
                                            Rp
                                        </th>
                                        <th
                                            className="text-right font-thin text-sm font-mona"
                                            width={"28%"}
                                        >
                                            Rp.
                                            {numeral(
                                                cardItems.reduce(
                                                    (total, item) =>
                                                        total +
                                                        item.harga * 0.1,
                                                    0
                                                )
                                            ).format("0,0")}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th
                                            colSpan={3}
                                            className="border-t pt-4 mt-2"
                                        ></th>
                                    </tr>
                                    <tr>
                                        <th
                                            className="text-left font-mona"
                                            width={"70%"}
                                        >
                                            Total
                                        </th>
                                        <th
                                            className="text-right font-mona"
                                            width={"2%"}
                                        >
                                            Rp
                                        </th>
                                        <th
                                            className="text-right font-mona"
                                            width={"28%"}
                                        >
                                            Rp.
                                            {numeral(
                                                cardItems.reduce(
                                                    (total, item) =>
                                                        total +
                                                        item.harga +
                                                        item.harga * 0.1,
                                                    0
                                                )
                                            ).format("0,0")}
                                        </th>
                                    </tr> */}
                                </thead>
                            </table>

                            <Link
                                href={route("pos.payment")}
                                className="w-full mt-4 font-mona bg-[#F46700] text-white py-3 rounded-md hover:bg-[#f8b88a] text-center block"
                            >
                                Continue to Payment
                            </Link>
                        </div>
                    </>
                )}
            </ul>
        </div>
    );
}
