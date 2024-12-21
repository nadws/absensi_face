import TextInput from "@/Components/TextInput";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function PaymentMobile({
    cardItems,
    numeral,
    totalTagihan,
    totalPembayaran,
    kategori,
    akun,
    handleNominalChange,
    handleCopyToInput,
    inputValues,
}) {
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "/image/image.png";
    };
    const [isOpenValueMobile, setIsOpenValueMobile] = useState(0);

    return (
        <div className="w-full p-4 block md:hidden">
            <div className="mb-2 flex items-center justify-between">
                <Link href="/pos" className="p-2  rounded-sm">
                    <i className="fa-solid fa-arrow-left"></i>
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
                    Total tagihan
                    <span>Rp. {numeral(totalTagihan).format("0,0")}</span>
                </h5>
                <h5 className="font-bold font-mona text-lg mt-2 flex justify-between">
                    Total dibayarkan{" "}
                    <span>Rp. {numeral(totalPembayaran).format("0,0")}</span>
                </h5>
                <h5 className="font-medium font-mona text-base mt-2 flex justify-between">
                    Kembalian{" "}
                    <span>
                        Rp.{" "}
                        {numeral(
                            totalPembayaran - totalTagihan < 0
                                ? 0
                                : totalPembayaran - totalTagihan
                        ).format("0,0")}
                    </span>
                </h5>
            </div>

            <div className="mt-2 border border-gray-300  ">
                <h5 className="font-bold font-mona text-lg p-4">
                    Payment Method
                </h5>
                {kategori.map((item) => (
                    <div key={item.id}>
                        <div
                            className="border w-full border-gray-300 mt-3 p-4 flex items-center justify-between cursor-pointer"
                            onClick={(event) => {
                                event.preventDefault();
                                isOpenValueMobile === item.id
                                    ? setIsOpenValueMobile(0)
                                    : setIsOpenValueMobile(item.id);
                            }}
                        >
                            <h5 className="font-bold font-mona">
                                {item.kategori}
                            </h5>
                            <i className="fa-solid fa-caret-down"></i>
                        </div>
                        <div
                            className={`border w-full border-gray-300  p-4 ${
                                isOpenValueMobile === item.id
                                    ? "block"
                                    : "hidden"
                            }`}
                        >
                            {akun
                                .filter(
                                    (item2) =>
                                        item2.kategori_akun_id === item.id
                                )
                                .map((item2) => (
                                    <div
                                        key={item2.id}
                                        className="w-full relative mb-4 flex items-center justify-between "
                                    >
                                        <h5>{item2.akun}</h5>
                                        <TextInput
                                            type="number"
                                            id={`nominal-${item2.id}`}
                                            className="w-60 rounded-lg h-10 float-end pr-8"
                                            placeholder={item2.akun}
                                            value={inputValues[item2.id] || ""}
                                            onChange={(e) =>
                                                handleNominalChange(
                                                    item2.id,
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <a
                                            className="absolute top-1/2 right-2 transform -translate-y-1/2"
                                            onClick={(e) =>
                                                handleCopyToInput(
                                                    item2.id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <i className="fa-regular fa-copy"></i>
                                        </a>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-2  w-full   ">
                <button
                    className="w-full bg-[#F46700] mt-2 flex items-center justify-center p-4 text-white font-bold font-mona mx-auto rounded-lg disabled:opacity-40"
                    disabled={totalPembayaran < totalTagihan ? true : false}
                >
                    Payment Now
                </button>
            </div>
        </div>
    );
}
