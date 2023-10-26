import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { httpAddProduct, httpDeleteProduct, httpGetAllProducts } from "../../utils/nodejs/admin";
import { AdminAuthContext } from "./auth.context";


const addIsChecked = async () => {
    const productsArray = await httpGetAllProducts();
    for (let i = 0; i < productsArray.length; i++) {
        productsArray[i].IsChecked = false;
    }
    return productsArray;
}

const addProductToAllProducts = async(productToAdd, allProducts) => {

    //validating if productToAdd already exists or not

    for (let i = 0; i < allProducts.length; i++) {
        if (productToAdd.MFID === allProducts[i].MFID) {
            alert('product already exists')
            return [...allProducts];
        }
    }
    try {
        const response = await httpAddProduct(productToAdd)
        productToAdd.ProductId = response.ProductId
        productToAdd.WithSeller = 1;
        if (response.ok) {
            if (allProducts.length === 0) {
                return [productToAdd]
            } else {
                return [productToAdd, ...allProducts]
            }
        } else{
            console.log('product creation ok is false')
        }
    } catch (error) {
        alert('error on creating product document')
    }
}

const deleteProductFromAllProducts = async(productToDelete, allProducts) => {
    for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].ProductId === productToDelete.ProductId) {
            try {
                const response = await httpDeleteProduct(productToDelete.ProductId)
                console.log(response)
                if (response.ok) {
                    return allProducts.filter((product)=> product.ProductId !== productToDelete.ProductId)
                } else {
                    console.log('product deletion failed')
                }
            } catch (error) {
                console.log('product deletion failed', error)
            }
            
        }
    }
    alert('product not found')
    return;
}



export const ProductsContext = createContext({
    allProducts: [],
    setAllProducts: () => {},
    addNewProduct: () => {},
    deleteProduct: () => {},
    updateAllProducts: () => {},
    withSellerProducts:[],
    findProductsWithSeller: () => {},
})


export const ProductsProvider = ({children}) => {
    const {isAdminLogin} = useContext(AdminAuthContext)

    const [allProducts, setAllProducts] = useState([]);
    const [withSellerProducts, setWithSellerProducts] = useState([])

    useEffect(() => {
        const getProductsArray = async () => { 
            if (isAdminLogin) {
                const productsArray = await addIsChecked();
                setAllProducts(productsArray)
            }
        }
        getProductsArray()
    }, [isAdminLogin])

    const addNewProduct = async (productToAdd) => {
        const newAllProductsArray = await addProductToAllProducts(productToAdd, allProducts)
        setAllProducts(newAllProductsArray)
    }

    const deleteProduct = async (productToDelete) => {
        const newAllProductsArray = await deleteProductFromAllProducts(productToDelete, allProducts)
        setAllProducts(newAllProductsArray)
    }

    const updateAllProducts = async () => {
        const productArray = await addIsChecked()
        setAllProducts([...productArray])
    }

    const findProductsWithSeller = (SellerId) => {
        console.log(allProducts)
        let withSellerProductArray = allProducts.filter((product) => {
            return SellerId == product.WithSeller
        })
        console.log({withSellerProductArray})
        setWithSellerProducts(withSellerProductArray)
    }

    const value = {allProducts, setAllProducts, addNewProduct, deleteProduct, updateAllProducts, withSellerProducts, findProductsWithSeller}

    return (
        <ProductsContext.Provider value={value}>
        {children}
        </ProductsContext.Provider>
    )
}