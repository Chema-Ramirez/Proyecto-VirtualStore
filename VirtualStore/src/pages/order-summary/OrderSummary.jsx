import { useCart } from "../../context/CartContext"
import { useNavigate } from "react-router-dom"

const OrderSummary = () => {
    const { cart, clearCart } = useCart()
    const navigate = useNavigate()

    const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0)

    const handleConfirmOrder = () => {
        clearCart();
        localStorage.removeItem('cart')
        navigate("/home")
    }

    return (
        <div className="order-summary">
            <h2>Order Summary</h2>
            {cart.length === 0 ? (
                <p>No products in your cart</p>
            ) : (
                <div>
                    <h3>Products</h3>
                    <div>
                        {cart.map((product) => (
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
                        <h3>Total: {totalPrice}€</h3>
                        <button onClick={handleConfirmOrder}>Confirm Order</button>
                        <button onClick={() => navigate("/home")}>Back to the shop</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderSummary
