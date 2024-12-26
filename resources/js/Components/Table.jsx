import React from "react";

export default function Table({ columns, rows, renderRow }) {
    return (
        <table className="min-w-full mt-4 ">
            <thead>
                <tr className="border-b-2 border-gray-300">
                    {columns.map((column, index) => (
                        <th
                            key={index}
                            className="px-6 py-3 text-left text-lg font-medium text-black"
                        >
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.length > 0 ? (
                    rows.map((row, index) => (
                        <tr key={index} className="border-b">
                            {renderRow(row, index)}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan="100%"
                            className="text-center py-4 border-b "
                        >
                            <center>
                                <img
                                    src="/logo/file.png"
                                    alt=""
                                    className="w-20 "
                                />
                            </center>
                            data kosong ?
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
