import { useState } from "react";
import { createContext } from "react";

export const AdminAuthContext = createContext({
    isAdminLogin: null,
    setIsAdminLogin: () => {},
})


export const AdminAuthProvider = ({children}) => {

    const [isAdminLogin, setIsAdminLogin] = useState(false)

    const value = {isAdminLogin, setIsAdminLogin}

    return(
        <AdminAuthContext.Provider value={value}>
            {children}
        </AdminAuthContext.Provider>
    )
}