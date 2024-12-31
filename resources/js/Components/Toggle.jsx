import React, { useState } from "react";

export default function Toggle({ isOn, handleToggle }) {
    return (
        <div
            className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer ${
                isOn === "Y" ? "bg-orange-600" : "bg-gray-300"
            }`}
            onClick={handleToggle}
        >
            <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
                    isOn === "Y" ? "translate-x-8" : "translate-x-0"
                }`}
            ></div>
        </div>
    );
}
