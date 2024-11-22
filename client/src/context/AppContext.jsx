import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
export const Appcontext = createContext();

const AppContext = ({ children }) => {
    const [user, setUser] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')


    return (
        <Appcontext.Provider value={{
            user, setUser,
            username, setUsername,
            email, setEmail,
            password, setPassword,
            image, setImage,
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
