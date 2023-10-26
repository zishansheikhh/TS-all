import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { httpGetProductCategories } from "../../utils/nodejs/seller";
import { SellerAuthContext } from "./seller-auth-context";


//Check if Using it somewhere or not


export const ProductCategoriesContext = createContext({
    productCategories: null,
    setProductCategories:() => {}
})

export const ProductCategoriesProvider = ({children}) => {

    const [productCategories, setProductCategories] = useState([])

    const {isSellerLogin} = useContext(SellerAuthContext)

    useEffect(() => {
        const updateProductCategories = async () => {
            if (isSellerLogin) {
                const categoriesArr = await httpGetProductCategories()
                setProductCategories(categoriesArr)
            }
        }
        updateProductCategories()
    },[isSellerLogin])


    const value = {productCategories, setProductCategories}
    return (
        <ProductCategoriesContext.Provider value={value}>
            {children}
        </ProductCategoriesContext.Provider>
    )
}