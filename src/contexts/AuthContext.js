import { createContext } from 'react';
import { useState, useEffect } from 'react';

export const AuthContext = createContext({
    jwt: "",
    username: "",
    email:"",
    setter: () => {}
})

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
    {
        jwt: "",
        username: "",
        email:"",
        setter: () => {}
    }
    );

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        setCurrentUser({jwt: jwt, username: username, email: email});
    }, [])

    return (
        <AuthContext.Provider value={{jwt: currentUser.jwt, username: currentUser.username, setter: setCurrentUser, email: currentUser.email}}>
            {children}
        </AuthContext.Provider>)
}
