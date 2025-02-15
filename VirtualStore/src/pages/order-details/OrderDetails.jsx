import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const OrderDetails = () => {
    const { orderId } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`http://localhost:3005/api/orders/${orderId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setOrder(data)
                } else {
                    setError(data.message || 'Error fetching order details')
                }
            } catch (error) {
                console.error('Error fetching order:', error)
                setError('Error fetching order')
            } finally {
                setLoading(false)
            }
        };

        fetchOrder();
    }, [orderId])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <h2>Order Details</h2>
            <p>Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
            <p>Total: {order.totalPrice}€</p>
            <h3>Products:</h3>
            <ul>
                {order.products.map((item) => (
                    <li key={item.product._id}>
                        {item.product.name} - {item.quantity} x {item.product.price}€
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OrderDetails
