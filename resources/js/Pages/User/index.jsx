import Pagination from "@/Components/Pagination";
import { Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchTable from "@/Components/SearchTable";

export default function UserIndex({ auth, users, filters }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold">
                            Total Data User : {users.total}
                        </label>

                        <Link
                            href={route("users.create")}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create User
                        </Link>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm">
                        <div className="p-6 text-gray-900">
                            <SearchTable filters={filters} routes="users" />
                            <br />

                            {filters.search && (
                                <span className="border border-gray-400 px-4 py-2 mt-28 rounded-lg">
                                    {" '' " + filters.search + " '' "}
                                </span>
                            )}
                            <table className="min-w-full mt-4">
                                <thead>
                                    <tr className="border-b-2 border-t-2">
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            #
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map(
                                        ({ id, name, email, role }, index) => (
                                            <tr key={id} className="border-b">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {(users.current_page - 1) *
                                                        users.per_page +
                                                        index +
                                                        1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {role}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link
                                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                        href={route(
                                                            "users.edit",
                                                            id
                                                        )}
                                                    >
                                                        <i class="fa-solid fa-pen-to-square"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                            <Pagination
                                links={users.links}
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
