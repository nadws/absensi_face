import { Link } from "@inertiajs/react";

export default function ModalSuccess({ isOpen }) {
    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-6 w-96">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-green-600">
                            Success
                        </h2>
                        {/* <button className="text-gray-500 hover:text-gray-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.293 4.293a1 1 0 011.414 0L10 6.586l2.293-2.293a1 1 0 111.414 1.414L11.414 8l2.293 2.293a1 1 0 11-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 11-1.414-1.414L8.586 8 6.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button> */}
                    </div>
                    {/* Modal Body */}
                    <div className="mt-4 text-center">
                        <p className="text-green-600">
                            Your payment was successful!
                        </p>
                    </div>
                    {/* Modal Footer */}
                    <div className="mt-6 text-center">
                        <Link
                            href={route("pos")}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Back to Store
                        </Link>
                    </div>
                </div>
            </div>
        )
    );
}
