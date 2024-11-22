import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import Cookies from 'js-cookie';

const UserAuthModal = ({ setIsModalOpen }) => {
    const [currentScreen, setCurrentScreen] = useState("signup");

    const {
        user, setUser,
        username, setUsername,
        email, setEmail,
        password, setPassword,
        image, setImage,
    } = useAppContext();

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log({ username, email, password });
        try {
            const response = await axios.post('http://localhost:3000/api/user/signup', {
                username, email, password,
            });
            console.log(response.data);
            setCurrentScreen("login");
        } catch (error) {
            alert(`Signup failed: ${error.message}`);
        }
    };
    


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', {
                email, password
            })
            alert(response.data.message);
            setUser(response.data)
            setIsModalOpen(false);
            Cookies.set('token', response.data.token)
        } catch (error) {
            alert(`Login failed: ${error.message}`);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md">
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {currentScreen === "signup" ? "Sign Up" : "Log In"}
                    </h3>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg
                            className="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                            aria-hidden="true"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4">
                    {currentScreen === "signup" ? (
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    // required
                                    className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Sign Up
                            </button>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setCurrentScreen("login")}
                                    className="text-blue-600 dark:text-blue-400 underline"
                                >
                                    Log In
                                </button>
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Log In
                            </button>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setCurrentScreen("signup")}
                                    className="text-blue-600 dark:text-blue-400 underline"
                                >
                                    Sign Up
                                </button>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserAuthModal;
