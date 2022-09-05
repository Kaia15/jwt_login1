import React, { useContext, useState, useEffect, createContext } from "react"

const AuthContext = createContext({})

const AuthProvider = ({children}) => {
    const [isLoggingIn, setIsLoggingIn]  = useState(false)
    const [isLoggedOut, setIsLoggedOut] = useState(false)
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    return (
    <AuthContext.Provider value = {{isLoggingIn, setIsLoggingIn, isLoggedOut, setIsLoggedOut, user, setUser, profile, setProfile}}>
        {children}
    </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }