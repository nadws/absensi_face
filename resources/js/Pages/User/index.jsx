import Pagination from "@/Components/Pagination";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { debounce } from "lodash"; // Import debounce from lodash or write your own
import { Inertia } from "@inertiajs/inertia";

export default function UserIndex({ auth, users, filters }) {
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        const delayedSearch = debounce(() => {
            Inertia.get(route("users"), { search });
        }, 300);

        if (search) {
            delayedSearch();
        } else {
            // Jika search kosong, kirimkan tanpa filter
            Inertia.get(route("users"));
        }

        return () => {
            delayedSearch.cancel();
        };
    }, [search]);

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
                            <input
                                type="text"
                                value={search}
                                onChange={handleSearch}
                                placeholder="Search by name or email"
                                className="mb-4 px-4 py-2 border rounded"
                            />
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b-2">
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Id
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map(({ id, name, email }) => (
                                        <tr key={id} className="border-b">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap"></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* <Pagination links={users.links} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
