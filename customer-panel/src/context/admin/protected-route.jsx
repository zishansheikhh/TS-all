import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { AdminAuthContext } from "./auth.context"

export const ProtectedRoute = ({children}) => {
    const {isAdminLogin, setIsAdminLogin} = useContext(AdminAuthContext)
    
    useEffect(()=> {
        if (localStorage.getItem("admin")) {
            setIsAdminLogin(true)
        }
    },[isAdminLogin])


    // if (localStorage.getItem("admin")) {
    //     return children
        
    // }
    return children;
    // return <Navigate to="/admin/admin-login" />
}