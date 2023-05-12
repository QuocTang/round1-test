import React, { createContext, useContext, useEffect, useState } from 'react';

const Context = createContext<any>(null);

const ContextProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>({});
    const checkUser = localStorage.getItem('user');
    const getUser = JSON.parse(String(checkUser) ?? '');

    useEffect(() => {
        if (getUser) setUser(getUser);
    }, []);
    const value = {
        user,
        setUser,
    };
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const GetState = () => {
    return useContext(Context);
};

export default ContextProvider;
