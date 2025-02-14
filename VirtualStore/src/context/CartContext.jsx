import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            localStorage.removeItem("cart");
        }
    }, [cart])

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existProduct = prevCart.find(item => item._id === product._id);

            if (existProduct) {
                if (existProduct.quantity >= 10) return prevCart;
                return prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            return [...prevCart, { ...product, quantity: 1 }];
        })
    }

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item._id !== productId));
    }

    const increaseQuantity = (productId) => {
        setCart((prevCart) => prevCart.map(item =>
            item._id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ))
    }

    const decreaseQuantity = (productId) => {
        setCart((prevCart) => prevCart.map(item =>
            item._id === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ))
    }

    const clearCart = () => {
        setCart([]);
    }

    const isProductInCart = (productId) => {
        return cart.some(item => item._id === productId);
    };

    return (
        <CartContext.Provider value={{
            cart, setCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isProductInCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const useCart = () => useContext(CartContext);
