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

export default function payment({ no_invoice, kategori, akun }) {
    const [cardItems, setCardItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenValue, setIsOpenValue] = useState(1);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            id_produk: [],
            nominal: "0",
        });
    const prevCardItems = useRef(cardItems);

    useEffect(() => {
        if (prevCardItems.current !== cardItems) {
            setData({
                id_produk: cardItems.map((item) => item.id),
                nominal: "10000",
            });
            prevCardItems.current = cardItems; // Simpan nilai sebelumnya
        }
    }, [cardItems, setData]);
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

    return (
        <form
            onSubmit={submit}
            className="bg-[#F8F8F8] py-14 px-8  flex h-full"
        >
            <Head title="POS Payment" />
            <div className="w-1/3 border border-gray-300 rounded-md mr-4 ">
                <div className="border-b  p-4  bg-slate-200">
                    <h5 className="font-mona font-bold text-gray-700">
                        Payment
                        <span className="float-right">#{no_invoice}</span>
                    </h5>
                </div>
                <div className=" overflow-y-scroll h-96">
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
                    <input
                        type="hidden"
                        onChange={(e) =>
                            setData(
                                "id_produk",
                                cardItems.map((item) => item.id)
                            )
                        }
                        value={data.id_produk}
                    />
                </div>
            </div>
            <div className="w-2/3 border border-gray-300 rounded-md flext justify-center">
                <h5 className="text-center mt-6 font-mona text-gray-400 text-lg ">
                    Total Tagihan
                </h5>
                <h5 className="text-center mt-6 font-mona  text-4xl">
                    <span className="text-sm align-top">Rp </span>
                    {numeral(
                        cardItems.reduce((total, item) => total + item.harga, 0)
                    ).format("0,0")}
                </h5>
                <div className="flex justify-center mt-24">
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
                                className="w-full rounded-lg h-11"
                                placeholder={item.akun}
                                required
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-8 bg-gray-100 border-t border-gray-300 p-4 flex justify-between items-center">
                    <Link href={route("pos")}>
                        <SecondaryButton>Cancel</SecondaryButton>
                    </Link>

                    <PrimaryButton disabled={processing}>Pay</PrimaryButton>
                </div>
            </div>
        </form>
    );
}
