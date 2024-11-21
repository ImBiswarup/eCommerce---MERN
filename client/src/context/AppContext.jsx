import React, { createContext, useContext, useState } from 'react';

export const Appcontext = createContext();

const AppContext = ({ children }) => {
    const [user, setuser] = useState('Biswa')

    return (
        <Appcontext.Provider value={{
            user, setuser
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
