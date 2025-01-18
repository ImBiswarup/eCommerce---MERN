import React, { createContext, useContext, useEffect, useState } from 'react';
export const Appcontext = createContext();
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useParams } from 'react-router-dom';
const AppContext = ({ children }) => {
  const userId = useParams()
  const [user, setUser] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('')
  const [quantity, setQuantity] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(1)
  const [selectedItem, setSelectedItem] = useState([])
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [sellerProducts, setsellerProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const [actulaUser, setActulaUser] = useState([])
  const [role, setRole] = useState('Customer');
  const [currentScreen, setCurrentScreen] = useState("signup");


  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [description, setdescription] = useState('');

  const apiUrl = process.env.VITE_API_URL;

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      console.log('no token');
    }
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token value : ", decoded);
        setUserData(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    // console.log({ username, email, password });
    try {
      const response = await axios.post(`${apiUrl}/api/user/signup`, {
        username, email, password, role
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
      const response = await axios.post(`${apiUrl}/api/user/login`, {
        email, password
      })
      console.log(response.data);
      setUser(response.data)
      setIsModalOpen(false);
      alert(`Welcome ${response.data.user.username}`);
      Cookies.set('token', response.data.user.token)
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.log("no token");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token value:", decoded);
      } catch (error) {
        console.error("Error decoding token:", error);

      }
    };

    fetchUserData();
  }, []);


  const Logout = () => {
    Cookies.remove('token');
    window.location.href('/');
  };


  const addToCart = async () => {
    try {
      const token = Cookies.get('token'); // Ensure authentication token is sent in the headers
      console.log('selectedItem: ', selectedItem);
      const response = await axios.post(
        `${apiUrl}/api/user/add-to-cart`,
        {
          itemQuantity,
          cartItem: selectedItem, // Ensure the key matches backend expectations
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token if required
          },
        }
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      if (error.response) {
        console.error('Server Error:', error.response.data.message);
      }
    }
  };


  const RemoveFromCart = async (cartItemId) => {
    try {
      const token = Cookies.get("token");

      if (!cartItemId) {
        console.error("cartItemId is missing.");
        return;
      }

      const response = await axios.post(
        `${apiUrl}/api/user/remove-from-cart`,
        { cartItemId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("updated cart after removing cart item: ", response.data.cart);

      if (response?.data?.cart) {
        setCartItems(response?.data?.cart);
      } else {
        console.error("No updated cart received from the server.");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user/allItems`);
        // console.log("All items: ", response.data);
        setAllItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error.message);
      }
    };

    fetchItems();
  }, [userData]);

  const addItems = async (name,
    price,
    imageUrl,
    category,
    quantity,
    description) => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies

      if (!token) {
        console.error("No token found. Cannot authorize the request.");
        return;
      }

      const response = await axios.post(
        `${apiUrl}/api/item/add-items`,
        {
          name,
          price,
          imageUrl,
          category,
          quantity,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Item added successfully:", response.data);
    } catch (error) {
      console.error("Error adding item:", error.response?.data || error.message);
    }
  };


  const getActualUser = async (userId) => {
    try {
      const res = await axios.get(`${apiUrl}/api/user/user/${userId}`);
      console.log("userId: ", userId);
      console.log("response from the api endpoint: ", res.data);
      setUserData(res.data);
      setsellerProducts(res.data?.addedItems)
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };
  const fetchUserCart = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const res = await axios.get(`${apiUrl}/api/user/getItem`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Cart Items: ", res.data);
      // if (res.data?.cart) {
      //     const cartItems = res.data.cart.map((cartItem) => ({
      //         _id: cartItem._id, 
      //         itemName: cartItem.item.name, 
      //         itemPrice: Number(cartItem.item.price),
      //         quantity: Number(cartItem.quantity), 
      //         totalPrice: Number(cartItem.item.price) * Number(cartItem.quantity), 
      //     }));

      //     setCartItems(cartItems); 
      // } else {
      //     console.warn("No cart items found.");
      //     setCartItems([]);
      // }

      setCartItems(res.data?.cart);
    } catch (error) {
      console.error("Error fetching cart items:", error?.response?.data || error.message);
    }
  };



  return (
    <Appcontext.Provider value={{
      user, setUser,
      username, setUsername,
      email, setEmail,
      password, setPassword,
      image, setImage,
      handleLogin, handleSignup,
      isModalOpen, setIsModalOpen,
      quantity, setQuantity,
      userData, setUserData,
      currentScreen, setCurrentScreen,
      Logout,
      itemQuantity, setItemQuantity,
      addToCart, RemoveFromCart,
      selectedItem, setSelectedItem,
      suggestedItems, setSuggestedItems,
      allItems, setAllItems,
      cartItems, setCartItems,
      sellerProducts, setsellerProducts,
      wishlistItems, setWishlistItems, fetchUserCart,
      role, setRole,
      name, setName,
      price, setPrice,
      imageUrl, setImageUrl,
      category, setCategory,
      description, setdescription,
      addItems, getActualUser
    }}>
      {children}
    </Appcontext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Appcontext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppContext Provider");
  }

  return context;
};

export default AppContext;
