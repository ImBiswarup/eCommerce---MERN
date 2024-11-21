import React, { useEffect, useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showProfileButton, setShowProfileButton] = useState(false);

    console.log(window.location.pathname);

    useEffect(() => {
        const toggleProfileButton = () => {
            if (window.location.pathname.includes('/user')) {
                setShowProfileButton(false);
            } else {
                setShowProfileButton(true);
            }
        };

        toggleProfileButton();
    }, [window.location.pathname]);

    return (
        <>
            <header className="text-gray-400 bg-gray-900 body-font h-28">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link to='/' className="flex title-font font-medium items-center text-white mb-4 md:mb-0 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl">Tailblocks</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="relative flex justify-center items-center flex-grow md:w-1/2 mt-4 md:mt-0 mx-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value) }}
                            placeholder="Search..."
                            className="text-white w-full py-2 pl-10 pr-4 rounded-full bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            className="absolute right-0 top-0 mt-2 mr-3 text-gray-400 hover:text-white"
                            onClick={() => { console.log(searchTerm) }} // Use this to handle search
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M21 21l-4.35-4.35M18.65 10.65A7.5 7.5 0 1 0 10.65 18.65 7.5 7.5 0 1 0 18.65 10.65z"></path>
                            </svg>
                        </button>
                    </div>

                    {/* User Profile Button */}
                    {showProfileButton && (
                        <Link to={`/user/10`}>
                            <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded-full text-base mt-4 md:mt-0">
                                <FaRegUser />
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </Link>
                    )}
                </div>
            </header>
        </>
    );
};

export default Navbar;
