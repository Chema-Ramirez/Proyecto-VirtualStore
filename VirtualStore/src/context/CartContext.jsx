import { createContext, useState, useContext } from "react"
import PropTypes from "prop-types"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existProduct = prevCart.find(item => item.id === product.id);
            if (existProduct) {
                if (existProduct.quantity >= 10) return prevCart
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prevCart, { ...product, quantity: 1 }];
        })
    }

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    }

    const increaseQuantity = (productId) => {
        setCart((prevCart) => prevCart.map(item =>
            item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ))
    }

    const decreaseQuantity = (productId) => {
        setCart((prevCart) => prevCart.map(item =>
            item.id === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ))
    }

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const useCart = () => useContext(CartContext)
