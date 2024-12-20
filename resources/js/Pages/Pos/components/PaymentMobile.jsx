import { Link } from "@inertiajs/react";

export default function PaymentMobile({ cardItems, numeral, totalTagihan }) {
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "/image/image.png";
    };
    return (
        <div className="w-full p-4 block md:hidden">
            <div className="mb-2 flex items-center justify-between">
                <Link href="/pos" className="p-2  rounded-sm">
                    <i class="fa-solid fa-arrow-left"></i>
                </Link>
                <h5 className="text-center font-mona font-bold text-lg">
                    Payment
                </h5>
                <h5></h5>
            </div>
            <div className="bg-white border border-gray-300 rounded-md w-full p-4">
                <h5 className="font-bold font-mona ">Ordered</h5>
                <div className=" overflow-y-scroll h-80 mt-6 ">
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
                                    {numeral(item.qty).format("0,0")} x Rp.
                                    {numeral(item.harga).format("0,0")} =
                                    <span>
                                        {" "}
                                        Rp.{numeral(item.ttl_rp).format("0,0")}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-2 border border-gray-300 p-4">
                <h5 className="font-bold font-mona text-lg">Order Summary</h5>
                <h5 className="font-bold font-mona text-lg mt-2 flex justify-between">
                    Total <span>Rp. {numeral(totalTagihan).format("0,0")}</span>
                </h5>
            </div>
            <button className="w-full bg-[#F46700] mt-2 flex items-center justify-center p-4 text-white font-bold font-mona mx-auto rounded-lg">
                Payment Now
            </button>
        </div>
    );
}
