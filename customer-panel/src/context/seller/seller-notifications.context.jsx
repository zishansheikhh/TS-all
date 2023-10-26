import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const SellerNotificationsContext = createContext({
    sellerNotifications: [],
    setSellerNotifications: () => {},
    notificationCount: 0,
    setNotificationCount: () => {},
})

export const SellerNotificationsProvider = ({children}) => {

    const [sellerNotifications, setSellerNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0)

    useEffect(() => {
        let count = sellerNotifications.length;
        setNotificationCount(count)
    }, [sellerNotifications])


    const value = {sellerNotifications, setSellerNotifications, notificationCount, setNotificationCount}

    return (
        <SellerNotificationsContext.Provider value={value}>
            {children}
        </SellerNotificationsContext.Provider>
    )
}