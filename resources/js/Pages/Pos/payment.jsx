import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchTable from "@/Components/SearchTable";
import { useState, useEffect, useRef } from "react";
import { Link, useForm } from "@inertiajs/react";
import numeral from "numeral";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import PaymentMobile from "@/Pages/pos/components/PaymentMobile";

export default function payment({ no_invoice, kategori, akun }) {
    const [cardItems, setCardItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenValue, setIsOpenValue] = useState(1);
    const [totalPembayaran, setTotalPembayaran] = useState(0);
    const [totalTagihan, setTotalTaginah] = useState(0);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            produk: [],
            nominal: "",
        });
    const prevCardItems = useRef(cardItems);

    useEffect(() => {
        if (prevCardItems.current !== cardItems) {
            setData({
                produk: cardItems.map((item) => item),
                nominal: akun.map((item) => ({
                    id_akun: item.id,
                    nominal: "",
                })),
            });
            prevCardItems.current = cardItems; // Simpan nilai sebelumnya
        }
    }, [cardItems, setData]);

    useEffect(() => {
        const totaltag = cardItems.reduce(
            (total, item) => total + item.ttl_rp,
            0
        );
        setTotalTaginah(totaltag);
    }, [cardItems]);
    const submit = (e) => {
        e.preventDefault();
        post(route("pos.save_payment"), {
            preserveScroll: true,

            onSuccess: () => {
                alert("Pembayaran berhasil");
                localStorage.removeItem("cardItems");
            },
            onError: (errors) => {
                console.error("Error saat mengirim data:", errors);
                alert("Pembayaran gagal, cek kembali data Anda.");
            },
        });
    };

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
    const toggleSidebar = (item) => {
        setIsOpen(!isOpen);
        setIsOpenValue(item);
    };

    const handleNominalChange = (id, value) => {
        // Update data nominal terlebih dahulu
        setData((prevData) => {
            const updatedNominal = prevData.nominal.map((item) =>
                item.id_akun === id
                    ? { ...item, nominal: parseFloat(value) || 0 }
                    : item
            );

            // Hitung total pembayaran
            const totalPembayaran = updatedNominal.reduce(
                (total, item) => total + item.nominal,
                0
            );
            setTotalPembayaran(totalPembayaran);

            return {
                ...prevData,
                nominal: updatedNominal,
                totalPembayaran, // Simpan total pembayaran di state
            };
        });
    };

    return (
        <form
            onSubmit={submit}
            className="bg-[#F8F8F8] md:py-14 md:px-8  flex h-full justify-center w-full"
        >
            <Head title="POS Payment" />
            <div className="w-1/3 border border-gray-300 rounded-md mr-4 hidden md:block">
                <div className="border-b  p-4  bg-slate-200">
                    <h5 className="font-mona font-bold text-gray-700">
                        Payment
                        <span className="float-right">#{no_invoice}</span>
                    </h5>
                </div>
                <div className=" overflow-y-scroll h-96 ">
                    {cardItems.map((item) => (
                        <div
                            className="flex items-center border-b pb-4 ml-4"
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
            <div className="w-2/3 border border-gray-300 rounded-md flext justify-center hidden md:block">
                <h5 className="text-center mt-6 font-mona text-gray-400 text-lg ">
                    Total Tagihan
                </h5>
                <h5 className="text-center mt-6 font-mona  text-4xl">
                    <span className="text-sm align-top">Rp </span>
                    {numeral(totalTagihan).format("0,0")}
                </h5>
                <h5 className="text-center mt-6 font-mona text-gray-400 text-lg ">
                    Total Pembayaran
                </h5>
                <h5 className="text-center mt-6 font-mona  text-4xl">
                    <span className="text-sm align-top">Rp </span>
                    {numeral(totalPembayaran).format("0,0")}
                </h5>
                <h5 className="text-center mt-6 font-mona text-gray-400 text-lg ">
                    Kembalian
                </h5>
                <h5 className="text-center mt-6 font-mona  text-lg">
                    <span className="text-sm align-top">Rp </span>
                    {numeral(
                        totalPembayaran - totalTagihan < 0
                            ? 0
                            : totalPembayaran - totalTagihan
                    ).format("0,0")}
                </h5>
                <div className="flex justify-center mt-12">
                    {kategori.map((item) => (
                        <button
                            key={item.id}
                            className={`py-3 px-6 border-b-2 ${
                                isOpenValue === item.id
                                    ? "border-[#F46700] text-[#F46700]"
                                    : ""
                            } `}
                            onClick={(event) => {
                                event.preventDefault();
                                toggleSidebar(item.id, event);
                            }}
                        >
                            {item.kategori}
                        </button>
                    ))}
                </div>
                <div className="mt-2 pt-10 px-10 xl:px-44  grid grid-cols-2 gap-3 place-items-center">
                    {akun.map((item) => (
                        <div
                            key={item.id}
                            className={`w-full ${
                                isOpenValue === item.kategori_akun_id
                                    ? ""
                                    : "hidden"
                            }`}
                        >
                            <TextInput
                                type="number"
                                id="nominal"
                                className="w-full rounded-lg h-11 "
                                placeholder={item.akun}
                                onChange={(e) =>
                                    handleNominalChange(item.id, e.target.value)
                                }
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-8 bg-gray-100 border-t border-gray-300 p-4 flex justify-between items-center">
                    <Link href={route("pos")}>
                        <SecondaryButton>Cancel</SecondaryButton>
                    </Link>

                    <PrimaryButton
                        disabled={totalTagihan > totalPembayaran || processing}
                        submitProcessing={processing}
                    >
                        Pay Now
                    </PrimaryButton>
                </div>
            </div>
            <PaymentMobile
                cardItems={cardItems}
                numeral={numeral}
                totalTagihan={totalTagihan}
            />
        </form>
    );
}
