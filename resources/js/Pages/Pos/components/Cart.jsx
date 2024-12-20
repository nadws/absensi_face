import numeral from "numeral";
import { Link } from "@inertiajs/react";

export default function Cart({
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
        <div className="overflow-hidden bg-white shadow-sm  mr-10 col-span-2 hidden lg:block">
            <div className="w-full max-w-2xl bg-white rounded-lg p-6 ">
                <h1 className="text-2xl font-semibold mb-4 font-mona">
                    Shopping Cart
                </h1>
                <div className="h-96 overflow-y-scroll">
                    {cardItems.length === 0 ? (
                        <>
                            <hr className="border-t border-gray-300" />
                            <img
                                src="/logo/cart.png"
                                className="w-full h-full object-contain p-3 rounded"
                                alt=""
                            />
                        </>
                    ) : (
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
                    )}
                </div>
            </div>
            <div className="mt-6 border-t pt-4 bg-white  rounded-lg p-6">
                <table width={"100%"}>
                    <thead>
                        <tr>
                            <th className="text-left font-mona" width={"70%"}>
                                Total
                            </th>
                            <th className="text-right font-mona" width={"2%"}>
                                Rp
                            </th>
                            <th className="text-right font-mona" width={"28%"}>
                                {numeral(
                                    cardItems.reduce(
                                        (total, item) => total + item.ttl_rp,
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
                                            total + item.harga * 0.1,
                                        0
                                    )
                                ).format("0,0")}
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={3} className="border-t pt-4 mt-2"></th>
                        </tr>
                        <tr>
                            <th className="text-left font-mona" width={"70%"}>
                                Total
                            </th>
                            <th className="text-right font-mona" width={"2%"}>
                                Rp
                            </th>
                            <th className="text-right font-mona" width={"28%"}>
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
        </div>
    );
}
