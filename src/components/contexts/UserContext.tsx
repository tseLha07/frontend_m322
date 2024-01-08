import React, { createContext, useContext, useState, FC, ReactNode } from 'react';
import { FullUser } from '../../types/FullUser';
import { UserContextType } from '../../types/UserContextType';

const initialUser: FullUser | null = null;

const initialContext: UserContextType = {
    user: initialUser,
    loginUser: () => { },
    logoutUser: () => { },
};

const UserContext = createContext<UserContextType>(initialContext);

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<FullUser | null>(initialUser);

    const loginUser = (userData: FullUser) => {
        setUser(userData);
    };

    const logoutUser = () => {
        setUser(initialUser);
    };

    const contextValue: UserContextType = {
        user,
        loginUser,
        logoutUser,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
