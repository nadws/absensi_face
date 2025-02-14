import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import SearchTable from "@/Components/SearchTable";
import Pagination from "@/Components/Pagination";
export default function stokopname({ auth, invoicestok, filters }) {
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
                        <Link
                            href={route("stokopname.viewOpname")}
                            className="bg-[#F46700] hover:bg-[#f8c19a] text-white font-bold py-2 px-4 rounded"
                        >
                            <i className="fa-solid fa-plus"></i> Create Opname
                        </Link>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm">
                        <div className="p-6 text-gray-900">
                            <SearchTable
                                filters={filters}
                                routes="stokopname"
                                paging="Y"
                            />
                            <Table
                                columns={[
                                    "#",
                                    "Tanggal",
                                    "Invoice",
                                    "Status",
                                    "Action",
                                ]}
                                rows={invoicestok.data}
                                renderRow={(
                                    { id, opname_date, status },
                                    index
                                ) => (
                                    <>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {(invoicestok.current_page - 1) *
                                                produk.per_page +
                                                index +
                                                1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {opname_date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {status}
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
                                links={invoicestok.links}
                                searchQuery={filters.search}
                                paginate={filters.paginate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
