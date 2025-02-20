import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header'
import { useCart } from '../../context/CartContext'
import Products from '../products/Products'

const Home = () => {
    const { cart, setCart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = useCart()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user || !user.token) {
            navigate('/')
        } else {
            setLoading(false)
        }
    }, [navigate])

    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            setCart(JSON.parse(storedCart))
        }
    }, [setCart])

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart])

    if (loading) {
        return <div>Loading...</div>
    }


    return (
        <div className="main-container">
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                clearCart={clearCart}
            />

            <main>
                <h1>Welcome to VirtualStore!</h1>

                <div className="welcome-section">
                    <button onClick={() => navigate("/profile/:userId")}>View My Profile</button>
                </div>

                <h2>Our Collection</h2>

                <Products addToCart={addToCart} cart={cart} />
            </main>

            <footer>
                <p>VirtualStore - All rights reserved</p>
            </footer>
        </div>
    )
}

export default Home
