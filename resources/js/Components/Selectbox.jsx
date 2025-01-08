export default function SelectBox({
    className = "",
    options = [],
    currentValue = "",
    setJudul = "-Pilih-",
    ...props
}) {
    return (
        <select
            {...props}
            defaultValue={currentValue}
            className={
                "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block  " +
                className
            }
        >
            <option>{setJudul}</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
