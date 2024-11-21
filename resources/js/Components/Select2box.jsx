import { useState, useEffect, useRef } from "react";

export default function SelectBox({
    options = [],
    className = "",
    onChange,
    currentValue, // Menambahkan currentValue untuk menampilkan nilai yang sudah dipilih
    ...props
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const selectBoxRef = useRef(null);

    // Set initial selected option if currentValue is provided
    useEffect(() => {
        const selected = options.find(
            (option) => option.value === currentValue
        );
        setSelectedOption(selected || null);
    }, [currentValue, options]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectBoxRef.current &&
                !selectBoxRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleFocus = () => {
        setIsDropdownOpen(true);
    };

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onChange(option.value); // Mengirim nilai yang dipilih ke parent
        setIsDropdownOpen(false);
    };

    return (
        <div ref={selectBoxRef} className={`relative ${className}`}>
            <input
                type="text"
                value={selectedOption ? selectedOption.label : searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleFocus}
                placeholder="Cari status..."
                className={
                    "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1  " +
                    className
                }
                {...props}
            />
            {isDropdownOpen && (
                <ul className="absolute  mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-y-scroll max-h-48 ">
                    {(searchTerm === "" ? options : filteredOptions).map(
                        (option, index) => (
                            <li
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="cursor-pointer px-4 py-2 hover:bg-indigo-500 hover:text-white"
                            >
                                {option.label}
                            </li>
                        )
                    )}
                </ul>
            )}
        </div>
    );
}
