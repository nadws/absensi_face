import { useState } from "react";
import TextInput from "@/Components/TextInput";
import SelectBox from "@/Components/Selectbox";
import pagelenght from "@/data/pagelength.json";
import { router } from "@inertiajs/react";

export default function Search({
    filters,
    routes,
    paging,
    placeholder = "Search...",
    kat = "",
    className = "",
}) {
    const [search, setSearch] = useState(filters.search || ""); // gunakan state lokal
    const [typingTimeout, setTypingTimeout] = useState(null); // untuk debounce

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        // Clear timeout sebelumnya
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set timeout baru untuk debounce
        setTypingTimeout(
            setTimeout(() => {
                router.get(
                    route(routes, { search: value, kat: kat }),
                    {},
                    { preserveState: true, preserveScroll: true }
                );
            }, 200) // Kirim permintaan setelah 300ms
        );
    };

    return (
        <>
            <div className={className}>
                <TextInput
                    id="search"
                    className=" float-end mb-4 px-4 py-2 border rounded"
                    value={search}
                    onChange={handleSearchChange} // Panggil handleSearchChange
                    autoComplete="search"
                    placeholder={placeholder}
                />
            </div>
            {paging && (
                <SelectBox
                    onChange={(e) =>
                        router.get(
                            route(routes),
                            { paginate: e.target.value },
                            { preserveState: true }
                        )
                    }
                    currentValue={filters.paginate}
                    options={pagelenght}
                />
            )}
        </>
    );
}
