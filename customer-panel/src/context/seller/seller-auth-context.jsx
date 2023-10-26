import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { httpDemandCylinders, httpGetCurrentSellerInfo } from "../../utils/nodejs/seller";
import { makeid, sellerSocket } from "../socket.io";
import { SellerNotificationsContext } from "./seller-notifications.context";


const updateDemandCylinders = async (quantity, sellerInfo) => {
    const {Small, Medium, Large} = quantity;
    try {
        let response = await httpDemandCylinders(quantity)
        if (response.success === true) {
            console.log('getting response')
            let newSellerInfo = sellerInfo
            newSellerInfo.Small = Number(sellerInfo.Small) + Number(Small);
            newSellerInfo.Medium = Number(sellerInfo.Medium) + Number(Medium);
            newSellerInfo.Large = Number(sellerInfo.Large) + Number(Large);
            return newSellerInfo
        }
    } catch (error) {
        console.log("error in updating demand of seller", error)
    }

}



export const SellerAuthContext = createContext({
    isSellerLogin: null,
    setIsSellerLogin: () => {},
    sellerInfo: null,
    setSellerInfo: () => {},
    AddDemandCylinders: () => {},
})

export const SellerAuthProvider = ({children}) => {


    const [isSellerLogin, setIsSellerLogin] = useState(false)
    const [sellerInfo, setSellerInfo] = useState(null)

    useEffect(() => {
        if (localStorage.getItem("seller")) {
            setIsSellerLogin(true)
        } else {
            setIsSellerLogin(false)
        }
    },[localStorage.getItem("seller")])

    useEffect(() => {
        const getSellerInfo = async () => {
            console.log("seller info", isSellerLogin)
            if (isSellerLogin) {
                try {
                    const sellerInfoData = await httpGetCurrentSellerInfo()
                    setSellerInfo(sellerInfoData)
                } catch (error) {
                    console.log("error in getting seller info",error)
                }
            }
        }
        getSellerInfo()
    }, [isSellerLogin])

    useEffect(() => {
        sellerSocket.on("update_seller_orders", async (data) => {
            if (isSellerLogin) {
                if (Number(data.currentSeller) == sellerInfo.SellerId ) {
                    const sellerInfoData = await httpGetCurrentSellerInfo()
                    setSellerInfo(sellerInfoData)
                }
            }
        })

        return () => sellerSocket.off("update_seller_orders")
    }, [sellerSocket, sellerInfo])

    useEffect(() => {
        sellerSocket.on("update_seller_demand_orders", async (data) => {
            if (isSellerLogin) {
                if (Number(data.sellerId) == sellerInfo.SellerId ) {
                    const sellerInfoData = await httpGetCurrentSellerInfo()
                    setSellerInfo(sellerInfoData)
                }
            }
        })

        return () => sellerSocket.off("update_seller_demand_orders")
    }, [sellerSocket, sellerInfo])

    const AddDemandCylinders = async ({quantity, Refill}) => {
        let newSellerInfo = await updateDemandCylinders(quantity, sellerInfo)
        console.log(newSellerInfo);
        setSellerInfo(newSellerInfo)
        let SellerToken = localStorage.getItem('seller')
        sellerSocket.emit("add_demand_from_seller", {quantity, SellerToken, Refill})
    }

    const value = {isSellerLogin, setIsSellerLogin, sellerInfo, setSellerInfo, AddDemandCylinders}
    return (
        <SellerAuthContext.Provider value={value}>
            {children}
        </SellerAuthContext.Provider>
    )
}