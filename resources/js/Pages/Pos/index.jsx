import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchTable from "@/Components/SearchTable";

export default function Pos({ auth, products, filters }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pos
                </h2>
            }
        >
            <Head title="Pos" />

            <div className="py-12">
                <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-3">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8   grid grid-cols-4 gap-4">
                            <SearchTable
                                filters={filters}
                                routes="pos"
                                className="col-span-4"
                            />
                            {products.data.map(({ id, name, image }) => (
                                <div
                                    key={id}
                                    className="bg-white shadow-sm sm:rounded-lg cursor-pointer"
                                >
                                    <img
                                        src={image}
                                        alt=""
                                        className="w-full h-32 object-cover"
                                    />
                                    <div className="p-6 text-gray-900">
                                        {name}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination
                            links={products.links}
                            searchQuery={filters.search}
                            paginate={filters.paginate}
                        />
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mr-10">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
