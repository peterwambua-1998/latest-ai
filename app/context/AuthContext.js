import { useContext, createContext, useState, useEffect } from "react";
import { auth, app } from "../firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [name, setName] = useState('peter');
    const [user, setUser] = useState(null);

    const signInEmailPass = (email, password) => {
       signInWithEmailAndPassword(auth, email, password);
    }

    const logOut =  () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (<AuthContext.Provider value={{user, signInEmailPass, logOut}}>{children}</AuthContext.Provider>)
}

export const UserAuth = () => {
    return useContext(AuthContext);
}