import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({children}) => {

    if (localStorage.getItem("seller")) {
        return children
    }

    return <Navigate to="/seller/seller-login" />
}

export default SellerProtectedRoute;