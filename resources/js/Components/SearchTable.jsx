import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Search({ filters, routes }) {
    const { get, errors, processing, recentlySuccessful } = useForm();
    const [search, setSearch] = useState(filters.search || ""); // gunakan state lokal

    const submit = (e) => {
        e.preventDefault();
        get(route(routes, { search }), { preserveScroll: true }); // kirim nilai search saat submit
    };
    return (
        <form onSubmit={submit} className="float-end">
            <TextInput
                id="search"
                className="mb-4 mr-4 px-4 py-2 border rounded"
                value={search} // gunakan state lokal
                onChange={(e) => setSearch(e.target.value)} // update state lokal
                autoComplete="search"
            />
            <PrimaryButton disabled={processing}>Search</PrimaryButton>
        </form>
    );
}
