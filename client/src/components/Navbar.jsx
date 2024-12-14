import React, { useState } from "react";
import { FaRegUser, FaBars, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Cart_Sidebar from "./Cart_Sidebar";
import UserAuthModal from "./userAuthModal";



const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [token, setToken] = useState('')
    const { userData, isModalOpen, setIsModalOpen } = useAppContext();

    console.log("user : ", userData);

    // useEffect(() => {
    //     const receivedToken = Cookies.get("token");
    //     setToken(receivedToken);
    // }, [token])


    const navigate = useNavigate();
    const location = useLocation();
    const isOnProfilePage = location.pathname.includes("/u");

    const handleProfileClick = () => {
        if (userData) {
            navigate(`/u/${userData.id}`);
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <header className="bg-gray-900 text-white">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link to="/" className="flex items-center text-xl font-semibold">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-8 h-8 text-white p-1 bg-indigo-500 rounded-full"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3">eKart</span>
                </Link>

                <div className={`${isOnProfilePage ? "hidden" : "relative flex-grow max-w-md mx-4"}`}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="w-full py-2 pl-4 pr-12 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={() => console.log(searchTerm)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 21l-4.35-4.35M18.65 10.65A7.5 7.5 0 1 0 10.65 18.65 7.5 7.5 0 1 0 18.65 10.65z"></path>
                        </svg>
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    {userData && !isOnProfilePage && (
                        <button
                            onClick={handleProfileClick}
                            className="hidden md:flex items-center bg-gray-800 py-2 px-4 rounded-full hover:bg-gray-700"
                        >
                            <FaRegUser className="mr-2" />
                            <span>Profile</span>
                        </button>
                    )}

                    {!userData && !isOnProfilePage && (
                        <button
                            onClick={handleProfileClick}
                            className="hidden md:flex items-center bg-gray-800 py-2 px-4 rounded-full hover:bg-gray-700"
                        >
                            <FaRegUser className="mr-2" />
                            <span>Register</span>
                        </button>
                    )}

                    <button
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        className={`${isOnProfilePage ? "hidden" : ""} flex items-center text-white hover:text-gray-400`}
                    >
                        <FaShoppingCart className="w-6 h-6" />
                    </button>

                    <button
                        className={`${isOnProfilePage ? "hidden" : ""} md:hidden flex items-center text-xl p-2 focus:outline-none`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <FaBars />
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-gray-800 text-white p-4">
                    {/* <div className="mb-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="w-full py-2 px-4 rounded-lg bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div> */}
                    <button
                        onClick={handleProfileClick}
                        className="block w-full py-2 text-center bg-gray-700 rounded-lg hover:bg-gray-600"
                    >
                        {token ? 'Profile' : "Register"}
                    </button>
                </div>
            )}

            {isModalOpen && <UserAuthModal setIsModalOpen={setIsModalOpen} />}

            {isCartOpen && (
                <Cart_Sidebar
                    isOpen={isCartOpen}
                    closeSidebar={() => setIsCartOpen(false)}
                    cartItems={userData?.userCart?.cart}
                />
            )}
        </header>
    );
};

export default Navbar;
