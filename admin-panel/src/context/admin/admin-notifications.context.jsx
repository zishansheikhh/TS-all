import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AdminNotificationsContext = createContext({
    adminNotifications: [],
    setAdminNotifications: () => {},
    notificationCount: 0,
    setNotificationCount: () => {},
})

export const AdminNotificationsProvider = ({children}) => {

    const [adminNotifications, setAdminNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0)

    useEffect(() => {
        let count = adminNotifications.length;
        setNotificationCount(count)
    }, [adminNotifications])


    const value = {adminNotifications, setAdminNotifications, notificationCount, setNotificationCount}

    return (
        <AdminNotificationsContext.Provider value={value}>
            {children}
        </AdminNotificationsContext.Provider>
    )
}