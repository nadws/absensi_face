import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import Select2Box from "@/Components/Select2box";
// import kategori from "@/data/kategori.json";
import SecondaryButton from "@/Components/SecondaryButton";

export default function UserCreate({ auth, kd_produk, kategori }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            nama_produk: "",
            kd_produk: kd_produk,
            kategori: "",
            harga: "",
            harga_beli: "",
            stok: "",
            foto: "image.png",
        });

    const submit = (e) => {
        e.preventDefault();

        post(route("products.store"), {
            preserveScroll: true,
            onSuccess: () => {
                alert("Product new Created");
            },
            onError: (errors) => {
                alert("Product not created");
            },
        });
    };
    const [filePreview, setFilePreview] = useState(null); // State untuk URL file

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Ambil file dari input
        if (file) {
            setFilePreview(URL.createObjectURL(file));
            setData("foto", file); // Buat URL sementara
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create
                </h2>
            }
        >
            <Head title="Produk" />

            <div className="py-12 w-full ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm h-screen">
                        <div className="p-6 text-gray-900">
                            <section className="">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Create Products
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Create a new products.
                                    </p>
                                </header>

                                <form
                                    onSubmit={submit}
                                    className="mt-6 grid grid-cols-2 gap-4  "
                                >
                                    <div className="col-span-2">
                                        <InputLabel
                                            htmlFor="foto"
                                            value="foto"
                                        />
                                        {filePreview === null ? (
                                            <div className="mt-4">
                                                <img
                                                    src="/image/image.png"
                                                    alt="Preview"
                                                    className="w-32 h-32 mb-4 object-cover rounded"
                                                />
                                            </div>
                                        ) : (
                                            <div className="mt-4">
                                                <img
                                                    src={filePreview}
                                                    alt="Preview"
                                                    className="w-32 h-32 mb-4 object-cover rounded"
                                                />
                                            </div>
                                        )}

                                        <TextInput
                                            id="foto"
                                            type="file"
                                            className="mt-5 block w-full"
                                            onChange={handleFileChange}
                                            isFocused
                                            autoComplete="foto"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.foto}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="kd_produk"
                                            value="Kode Produk"
                                        />

                                        <TextInput
                                            id="kd_produk"
                                            className="mt-1 block w-full"
                                            value={data.kd_produk}
                                            onChange={(e) =>
                                                setData(
                                                    "kd_produk",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            isFocused
                                            autoComplete="kd_produk"
                                            readOnly
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.kd_produk}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="nama_produk"
                                            value="Nama Produk"
                                        />

                                        <TextInput
                                            id="nama_produk"
                                            className="mt-1 block w-full"
                                            value={data.nama_produk}
                                            onChange={(e) =>
                                                setData(
                                                    "nama_produk",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            isFocused
                                            autoComplete="nama_produk"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.nama_produk}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="harga_beli"
                                            value="Harga Beli"
                                        />

                                        <TextInput
                                            id="harga_beli"
                                            type="number"
                                            className="mt-1 block w-full"
                                            value={data.harga_beli}
                                            onChange={(e) =>
                                                setData(
                                                    "harga_beli",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            autoComplete="harga_beli"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.harga_beli}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="harga"
                                            value="Harga Jual"
                                        />

                                        <TextInput
                                            id="harga"
                                            type="number"
                                            className="mt-1 block w-full"
                                            value={data.harga}
                                            onChange={(e) =>
                                                setData("harga", e.target.value)
                                            }
                                            required
                                            autoComplete="harga"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.harga}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="kategori"
                                            value="Kategori"
                                        />
                                        <Select2Box
                                            onChange={(value) =>
                                                setData("kategori", value)
                                            }
                                            id="kategori"
                                            currentValue="kategori"
                                            options={kategori}
                                            className="w-full"
                                            placeholder="Pilih Kategori ..."
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.kategori}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="stok"
                                            value="Stok"
                                        />

                                        <TextInput
                                            id="stok"
                                            value={data.stok}
                                            onChange={(e) =>
                                                setData("stok", e.target.value)
                                            }
                                            type="number"
                                            className="mt-1 block w-full"
                                            autoComplete="stok"
                                        />

                                        <InputError
                                            message={errors.stok}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <PrimaryButton disabled={processing}>
                                            Save
                                        </PrimaryButton>
                                        <Link
                                            rel="stylesheet"
                                            href={route("products")}
                                        >
                                            <SecondaryButton>
                                                Cancel
                                            </SecondaryButton>
                                        </Link>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-gray-600">
                                                Saved.
                                            </p>
                                        </Transition>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}