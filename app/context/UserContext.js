import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userh, setUser] = useState(null);

    const setUserData = (userData) => {
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ userh, setUserData }}>
          {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    return useContext(UserContext);
};