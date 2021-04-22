import React, { useState, createContext } from 'react';

export const RefreshContext = createContext();

export const RefreshPage = ({ children }) => {
    const [data, setData] = useState(false);

    return (
        <RefreshContext.Provider value={[data, setData]}>
            {children}
        </RefreshContext.Provider>   
    );
};
