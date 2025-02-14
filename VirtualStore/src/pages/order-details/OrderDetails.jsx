import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const OrderDetails = () => {
    const [order, setOrder] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const savedOrder = localStorage.getItem("orderDetails")
        if (savedOrder) {
            setOrder(JSON.parse(savedOrder))
        } else {
            navigate("/home")
        }
    }, [navigate])

    return (
        <div className="order-details">
            {order ? (
                <div>
                    <h2>Your Order is Confirmed!</h2>
                    <h3>Order Date: {order.date}</h3>
                    <h3>Products:</h3>
                    {order.products.map((product) => (
                        <div key={product.id} className="cart-item">
                            <img
                                className="img-fluid"
                                src={`/img/${product.image}.jpg`}
                                alt="product image"
                                style={{ width: "75px", height: "75px", objectFit: "cover" }}
                            />
                            <p>{product.name}</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>Price: {product.price}€</p>
                        </div>
                    ))}
                    <h3>Total: {order.totalPrice}€</h3>
                    <button onClick={() => navigate("/home")}>Back to Shop</button>
                </div>
            ) : (
                <p>Loading order details...</p>
            )}
        </div>
    )
}

export default OrderDetails
