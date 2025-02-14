import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import Products from '../products/Products'

const Home = () => {
    const { cart, setCart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = useCart()
    const { authState, logout } = useAuth()
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

    const name = authState.user ? authState.user.name : 'User'

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const goToOrderDetails = () => {
        navigate("/order-details")
    }

    return (
        <>
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                clearCart={clearCart}
            />

            <div className="text-center mt-3">
                <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                </button>
            </div>

            <main className="container-xl mt-5">
                <div className="text-center mt-3">
                    <p>Welcome, {name}!</p>
                </div>

                <h2 className="text-center">Our collection</h2>

                <div className="text-center mt-4">
                    <button onClick={goToOrderDetails} className="btn btn-primary">
                        View My Orders
                    </button>
                </div>

                <Products
                    addToCart={addToCart}
                    cart={cart}
                />
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">VirtualStore - All rights reserved</p>
                </div>
            </footer>
        </>
    )
}

export default Home
