import React, { createContext, useContext, useEffect, useState } from 'react';
export const Appcontext = createContext();
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
const AppContext = ({ children }) => {
    const [user, setUser] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const [cartItem, setCartItem] = useState([])
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        console.log("token: ", token);
        if (!token) { console.log('no token'); }
        if (token) {
          try {
            const decoded = jwtDecode(token);
            console.log(decoded);
            setUserData(decoded);
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        }
      }, []);

      const Logout = () => {
        Cookies.remove('token');
        window.location.href('/');
      };

    return (
        <Appcontext.Provider value={{
            user, setUser,
            username, setUsername,
            email, setEmail,
            password, setPassword,
            image, setImage,
            cartItem, setCartItem,
            userData, setUserData,
            Logout
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
