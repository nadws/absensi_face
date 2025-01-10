import Pagination from "@/Components/Pagination";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchTable from "@/Components/SearchTable";
import numeral from "numeral";
import Table from "@/Components/Table";
import Buttonaksi from "@/Components/Buttonaksi";

export default function Product({ auth, produk, filters }) {
    const [selectedImage, setSelectedImage] = useState(null); // Menyimpan gambar yang dipilih

    const handleImageError = (event) => {
        event.target.src = "/storage/image/image.png"; // Gambar placeholder jika error
    };

    const openModal = (foto) => {
        setSelectedImage(foto); // Menyimpan gambar yang dipilih ke state
    };

    const closeModal = () => {
        setSelectedImage(null); // Menghapus gambar dari state untuk menutup modal
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold">
                            Total Data Produk : {produk.total}
                        </label>

                        <Link
                            href={route("products.create")}
                            className="bg-[#F46700] hover:bg-[#f8c19a] text-white font-bold py-2 px-4 rounded"
                        >
                            Create Produk
                        </Link>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm">
                        <div className="p-6 text-gray-900">
                            <SearchTable
                                filters={filters}
                                routes="products"
                                paging="Y"
                            />
                            <Table
                                columns={[
                                    "#",
                                    "Kode Produk",
                                    "Nama Produk",
                                    "Kategori",
                                    "Stok",
                                    "Harga Beli",
                                    "Harga Jual",
                                    "Opname",
                                    "Foto",
                                    "Action",
                                ]}
                                rows={produk.data}
                                renderRow={(
                                    {
                                        id,
                                        kd_produk,
                                        nama_produk,
                                        pemilik,
                                        stok_akhir,
                                        harga_beli,
                                        harga,
                                        opname,
                                        foto,
                                    },
                                    index
                                ) => (
                                    <>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {(produk.current_page - 1) *
                                                produk.per_page +
                                                index +
                                                1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {kd_produk}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {nama_produk}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {pemilik}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {opname === "Y" ? (
                                                stok_akhir
                                            ) : (
                                                <i className="fas fa-infinity"></i>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {numeral(harga_beli).format("0,0")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {numeral(harga).format("0,0")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {opname == "Y" ? "Ya" : "Tidak"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={foto}
                                                className="w-10 h-10 rounded-lg"
                                                alt=""
                                                onError={handleImageError}
                                                onClick={() => openModal(foto)}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Buttonaksi
                                                className=" bg-gray-800 border  hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
                                                url={`/products/edit/${id}`}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Buttonaksi>
                                            <Buttonaksi
                                                className=" bg-red-600  hover:bg-red-500 focus:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2  focus:ring-red-500 ml-2"
                                                url={`/products/delete/${id}`}
                                                confirm={true}
                                                confirmMessage="Apakah Anda yakin ingin menghapus data ini?"
                                                onClick={(e) => {
                                                    if (
                                                        !window.confirm(
                                                            "Apakah Anda yakin ingin menghapus data ini?"
                                                        )
                                                    ) {
                                                        e.preventDefault(); // Batalkan navigasi jika tidak dikonfirmasi
                                                    }
                                                }}
                                            >
                                                <i className="fa-solid fa-trash-alt"></i>
                                            </Buttonaksi>
                                        </td>
                                    </>
                                )}
                            />
                            <Pagination
                                links={produk.links}
                                searchQuery={filters.search}
                                paginate={filters.paginate}
                            />
                        </div>
                        {selectedImage && (
                            <div
                                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                                onClick={closeModal} // Menutup modal saat area luar diklik
                            >
                                <div
                                    className="bg-white p-4 rounded-lg shadow-lg"
                                    onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat modal diklik
                                >
                                    <img
                                        src={selectedImage}
                                        alt="Detail"
                                        className="w-auto h-96"
                                        onError={handleImageError}
                                    />
                                    <button
                                        onClick={closeModal}
                                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
