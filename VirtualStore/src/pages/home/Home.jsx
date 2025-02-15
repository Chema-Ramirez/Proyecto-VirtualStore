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
    const [orders, setOrders] = useState([])
    const [error, setError] = useState('')

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

    useEffect(() => {
        if (authState.user) {
            const fetchOrders = async () => {
                try {
                    const response = await fetch('http://localhost:3005/api/orders/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authState.token}`,
                        },
                    })

                    const data = await response.json()

                    if (response.ok) {
                        setOrders(data)
                    } else {
                        setError(data.message || 'Failed to fetch orders')
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error)
                    setError('Error fetching orders')
                }
            }

            fetchOrders()
        }
    }, [authState])

    if (loading) {
        return <div>Loading...</div>
    }

    const name = authState.user ? authState.user.name : 'User'

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const goToOrderDetails = (orderId) => {
        navigate(`/order-details/${orderId}`);
    };

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
                    <button onClick={() => navigate("/order-details/")} className="btn btn-primary">
                        View My Orders
                    </button>
                </div>

                <h3>Your Orders:</h3>
                {error && <p>{error}</p>}
                <ul>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <li key={order._id}>
                                <button onClick={() => goToOrderDetails(order._id)} className="btn btn-link">
                                    {order._id}
                                </button>
                                {' '} - Status: {order.status} - Total: {order.totalPrice}€
                            </li>
                        ))
                    ) : (
                        <p>No orders found.</p>
                    )}
                </ul>

                <div className="mt-5">
                    <Products
                        addToCart={addToCart}
                        cart={cart}
                    />
                </div>
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
