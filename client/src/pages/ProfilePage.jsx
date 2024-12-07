import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Cookies from 'js-cookie';

const ProfilePage = () => {
  const { userData, Logout } = useAppContext();

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (userData) {
      setCartItems(userData?.userCart?.cart || []);
      setWishlistItems(userData?.userCart?.wishlist || []);
    }
  }, [userData]);



  if (!userData) {
    return <div>Loading...</div>;
  }


  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen">
      <div className="lg:w-1/4 bg-gray-800 text-white p-6 lg:block hidden">
        <div className="text-center mb-8">
          <img
            src={userData.imageUrl || 'https://via.placeholder.com/150'}
            alt="User Avatar"
            className="w-32 h-32 rounded-full mx-auto"
          />
          <h2 className="mt-4 text-xl font-semibold">{userData.name}</h2>
        </div>
        <ul className="space-y-4">
          <li>
            <button className="w-full text-left py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md">
              Update info
            </button>
          </li>
          <li>
            <button
              onClick={Logout}
              className="w-full text-left py-2 px-4 bg-gray-700 hover:bg-red-600 rounded-md">
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="lg:w-3/4 p-8 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Profile Information</h3>
          <div className="flex flex-col lg:flex-row space-x-4">
            <div className='flex gap-2'>
              <p className="font-medium text-gray-700">Username:</p>
              <p>{userData.name}</p>
            </div>
            <div className='flex gap-2'>
              <p className="font-medium text-gray-700">Email:</p>
              <p>{userData.email}</p>
            </div>
            <div className='flex gap-2'>
              <p className="font-medium text-gray-700">Account Created:</p>
              <p>{new Date(userData.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Shopping Cart</h3>
          <div className="space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                    <div>
                      <p className="font-medium text-gray-700">{item.name}</p>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <button className="text-sm text-red-500 hover:text-red-700">
                      Remove
                    </button>
                    <button className="text-sm text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md">
                      Buy Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Wishlist</h3>
          <div className="space-y-4">
            {wishlistItems.length > 0 ? (
              wishlistItems.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                    <div>
                      <p className="font-medium text-gray-700">{item.name}</p>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                  </div>
                  <button className="text-sm text-red-500 hover:text-red-700 mt-4 md:mt-0">
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>Your wishlist is empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
