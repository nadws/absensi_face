import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const images = ["/logo/hero3.jpg", "/logo/hero4.jpg", "/logo/hero6.jpg"];
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 8000); // 4 detik

        return () => clearInterval(interval);
    }, [images.length]);

    const [weather, setWeather] = useState("Fetching weather...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://wttr.in/?format=3`);
                const data = await response.text();
                setWeather(data);
            } catch (err) {
                setError("Failed to fetch weather data");
            }
        };

        fetchWeather();
    }, []);

    return (
        <>
            <Head title="Welcome" />
            <div className="container mx-auto flex justify-center items-center">
                <nav className="flex justify-between items-center  px-8 fixed top-4 border border-[#F46700]  w-11/12 bg-white shadow-md z-50 left-1/2 transform -translate-x-1/2 rounded-3xl hover:shadow-2xl hover:shadow-[#F46700]">
                    <ApplicationLogo className="w-16 h-16 fill-current text-gray-500" />

                    <div className="flex space-x-4">
                        {auth.user ? (
                            <Link href={route("dashboard")}>
                                <button className="hover:bg-[#F46700] hover:text-white text-[#F46700] py-2 px-4 rounded-xl font-mona font-bold">
                                    Dashboard
                                </button>
                            </Link>
                        ) : (
                            <>
                                <Link href={route("login")}>
                                    <button className="hover:bg-[#F46700] hover:text-white text-[#F46700] py-2 px-4 rounded-xl font-mona font-bold">
                                        Login
                                    </button>
                                </Link>
                                <Link href={route("register")}>
                                    <button className="hover:bg-[#F46700] hover:text-white text-[#F46700] py-2 px-4 rounded-xl font-mona font-bold">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
                <div className="relative lg:grid grid-cols-1 gap-4 mt-24 hidden">
                    <div className="relative h-4/5 w-full">
                        <img
                            src={images[currentIndex]}
                            alt={`Hero ${currentIndex + 1}`}
                            className="h-4/5 w-full rounded-3xl bg-cover bg-center"
                        />

                        <div className="absolute inset-0 flex h-4/5 flex-col items-start justify-center p-8 text-white bg-black bg-opacity-50 rounded-3xl">
                            <h1 className="text-6xl font-semibold font-poppins">
                                Manage your store
                            </h1>
                            <h1 className="text-6xl font-semibold font-poppins">
                                with ease
                            </h1>
                            {error ? (
                                <p className="text-lg text-red-500 mt-2">
                                    {error}
                                </p>
                            ) : (
                                <p className="text-lg text-gray-200 mt-2">
                                    {weather}
                                </p>
                            )}
                            <div className="flex space-x-2 mt-4">
                                <button
                                    className="rounded-full border border-gray-400 p-2 hover:bg-gray-200 hover:text-black"
                                    onClick={() =>
                                        setCurrentIndex((prevIndex) =>
                                            prevIndex === 0
                                                ? images.length - 1
                                                : prevIndex - 1
                                        )
                                    }
                                >
                                    ←
                                </button>
                                <button
                                    className="rounded-full border border-gray-400 p-2 hover:bg-gray-200 hover:text-black"
                                    onClick={() =>
                                        setCurrentIndex(
                                            (prevIndex) =>
                                                (prevIndex + 1) % images.length
                                        )
                                    }
                                >
                                    →
                                </button>
                            </div>
                        </div>
                        <div className="absolute inset-x-0 top-2/3 flex items-center justify-center">
                            <div className="h-36 bg-white w-10/12 rounded-xl border border-gray-300 text-white grid grid-cols-3 gap-2 p-7">
                                <div className="border-r-4 border-gray-400 ">
                                    <h1 className="text-2xl font-semibold text-black font-poppins">
                                        Stock
                                    </h1>
                                    <div className=" mt-4 flex justify-between w-full">
                                        <p className="text-lg text-gray-500 font-poppins nowrap w-full">
                                            Your Stock Management
                                        </p>
                                        <i class="fa-solid fa-boxes-stacked  text-gray-500 mr-4 text-2xl"></i>
                                    </div>
                                </div>
                                <div className="border-r-4 border-gray-400 ml-4">
                                    <h1 className="text-2xl font-semibold text-black font-poppins">
                                        Point Of Sale
                                    </h1>
                                    <div className=" mt-4 flex justify-between w-full ">
                                        <p className="text-lg text-gray-500 font-poppins nowrap w-full">
                                            Your Sales Management
                                        </p>
                                        <i class="fa-solid fa-cart-shopping text-gray-500 mr-4 text-2xl"></i>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h1 className="text-2xl font-semibold text-black font-poppins">
                                        Dashboard
                                    </h1>
                                    <div className=" mt-4 flex justify-between w-full">
                                        <p className="text-lg text-gray-500 font-poppins nowrap w-full">
                                            Your Dashboard Interactive
                                        </p>
                                        <i class="fas fa-tachometer-alt text-gray-500 mr-4 text-2xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
