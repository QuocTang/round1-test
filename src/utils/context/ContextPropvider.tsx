import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserType } from '../Types';

const Context = createContext<any>(null);

const ContextProvider = ({ children }: any) => {
    const [user, setUser] = useState<UserType>();
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
