import Pagination from "@/Components/Pagination";
import { Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchTable from "@/Components/SearchTable";
import Table from "@/Components/Table";

export default function PemilikIndex({ auth, kategori, filters }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Katgeori
                </h2>
            }
        >
            <Head title="Kategori" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold">
                            Total Data Kategori : {kategori.total}
                        </label>

                        <Link
                            href={route("pemilik.create")}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create Kategori
                        </Link>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm">
                        <div className="p-6 text-gray-900">
                            <SearchTable
                                filters={filters}
                                routes="pemilik"
                                paging="Y"
                            />
                            <Table
                                columns={["#", "Kategori", "Action"]}
                                rows={kategori.data}
                                renderRow={({ id, pemilik }, index) => (
                                    <>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {(kategori.current_page - 1) *
                                                kategori.per_page +
                                                index +
                                                1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {pemilik}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                href={route("users.edit", id)}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                        </td>
                                    </>
                                )}
                            />
                            <Pagination
                                links={kategori.links}
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
