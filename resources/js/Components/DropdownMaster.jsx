import Dropdown from "@/Components/Dropdown";
export default function DropdownMaster({
    name,
    icon = "",
    isi,
    active = false,
}) {
    return (
        <div className="hidden sm:flex sm:items-center sm:ms-6">
            <div className=" relative">
                <Dropdown>
                    <Dropdown.Trigger icon={icon}>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className={
                                    "inline-flex items-center px-1 pt-1  text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                                    (active
                                        ? "border-[#F46700] text-[#F46700]   "
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300")
                                }
                            >
                                <i className={`fa-solid ${icon}`}></i> &nbsp;
                                {name}
                                <svg
                                    className="ms-2 -me-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        {/* <Dropdown.Link href={route("profile.edit")}>
                            Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Dropdown.Link> */}
                        {isi.map((item, index) => (
                            <Dropdown.Link
                                key={index}
                                href={item.href}
                                active={item.current}
                            >
                                {item.subname}
                            </Dropdown.Link>
                        ))}
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    );
}
