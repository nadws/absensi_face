import Pagination from "@/Components/Pagination";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchTable from "@/Components/SearchTable";
import numeral from "numeral";
import Table from "@/Components/Table";

export default function UserIndex({ auth, produk, filters }) {
    const [selectedImage, setSelectedImage] = useState(null); // Menyimpan gambar yang dipilih

    const handleImageError = (event) => {
        event.target.src = "/storage/image/placeholder.png"; // Gambar placeholder jika error
    };

    const openModal = (foto) => {
        setSelectedImage(foto); // Menyimpan gambar yang dipilih ke state
    };

    const closeModal = () => {
        setSelectedImage(null); // Menghapus gambar dari state untuk menutup modal
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Products
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold">
                            Total Data Produk : {produk.total}
                        </label>

                        <Link
                            href={route("products.create")}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
                                            {stok_akhir}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {numeral(harga_beli).format("0,0")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {numeral(harga).format("0,0")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={foto}
                                                className="w-10 h-10 rounded-lg"
                                                alt=""
                                                onError={handleImageError}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <a
                                                className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                href={`/users/edit/${id}`}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </a>
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
                                        src={`/image/${selectedImage}`}
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
