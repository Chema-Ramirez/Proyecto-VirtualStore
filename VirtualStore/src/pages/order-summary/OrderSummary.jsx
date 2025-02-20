import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const OrderSummary = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        console.log('Fetching order with ID:', orderId)
        const fetchOrder = async () => {
            try {
                const response = await fetch(`http://localhost:3005/api/orders/${orderId}`)
                const data = await response.json();
                if (response.ok) {
                    setOrder(data);
                } else {
                    alert(data.message || 'Failed to fetch order');
                }
            } catch (error) {
                console.error('Error fetching order:', error)
                alert('Error fetching order')
            }
        };

        fetchOrder()
    }, [orderId])

    if (!order) return <p>Loading...</p>

    return (
        <div>
            <h2>Order Summary</h2>
            <p>Order ID: {order._id}</p>
            <p>Total: {order.totalPrice}€</p>
            <p>Status: {order.status}</p>
            <h3>Products:</h3>
            <ul>
                {order.products.map((item) => (
                    <li key={item.product._id}>
                        {item.product.name} - {item.quantity} x {item.product.price}€
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/home')}>Back to Home</button>
        </div>
    )
}

export default OrderSummary
