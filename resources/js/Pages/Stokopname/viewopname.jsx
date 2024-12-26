import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import SearchTable from "@/Components/SearchTable";
import Pagination from "@/Components/Pagination";
import numeral from "numeral";
import TextInput from "@/Components/TextInput";

export default function viewopname({ auth, produk }) {
    const handleImageError = (event) => {
        event.target.src = "/storage/image/image.png"; // Gambar placeholder jika error
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Stok Opname
                </h2>
            }
        >
            <Head title="Stok Opname" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold">Stok Opname</label>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm">
                        <div className="p-6 text-gray-900">
                            <Table
                                columns={[
                                    "#",
                                    "Kode Produk",
                                    "Nama Produk",
                                    "Kategori",
                                    "Stok",
                                    "Stok Aktual",
                                    "Harga Beli",
                                    "Harga Jual",
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
                                            <TextInput type="number" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {numeral(harga_beli).format("0,0")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {numeral(harga).format("0,0")}
                                        </td>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
