import { createContext, useState } from "react";

export const CartContext = createContext({
    items: 0,
    setItems: () => {}
})

export const CartProvider = ({children}) => {
    const [items, setItems] = useState(0)
    const value = {items, setItems}
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}