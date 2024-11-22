import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

const Cart_Sidebar = ({ isOpen, closeSidebar, cartItems, cartItem }) => {
    const {
        user,
    } = useAppContext();
    return (
        <div
            className={`fixed top-0 right-0 z-50 w-96 bg-gray-900 text-white h-full transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold">Your Cart</h2>
                <button onClick={closeSidebar} className="text-2xl text-gray-400 hover:text-white">
                    <FaTimes />
                </button>
            </div>

            <div className="px-4 py-2 overflow-y-auto">
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-400">Your cart is empty</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-700">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover"
                                />
                                <div>
                                    <p className="font-medium text-gray-300">{item.name}</p>
                                    <p className="text-sm text-gray-500">${item.price}</p>
                                </div>
                            </div>
                            <button className="text-sm text-red-500 hover:text-red-700">
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="px-4 py-2 border-t border-gray-700 mt-4">
                <div className="flex justify-between items-center">
                    <p className="text-lg">Total:</p>
                    <p className="text-lg font-semibold">${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
                </div>
                <button className="w-full py-2 mt-4 bg-indigo-600 rounded-md text-white hover:bg-indigo-700">
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart_Sidebar;
