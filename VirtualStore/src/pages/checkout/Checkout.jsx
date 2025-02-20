import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import './Checkout.css'

const Checkout = () => {
    const { authState } = useAuth()
    const { cart, clearCart } = useCart()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardHolder: ''
    })

    const handlePayment = async () => {
        if (!authState.user) {
            setError('You must be logged in to complete the purchase')
            return
        }

        if (cart.length === 0) {
            setError('Your cart is empty')
            return
        }

        const { cardNumber, expirationDate, cvv, cardHolder } = paymentData;
        if (!cardNumber || !expirationDate || !cvv || !cardHolder) {
            setError('Please fill in all payment details')
            return
        }

        const orderData = {
            user: authState.user._id,
            products: cart.map(item => ({
                product: item._id,
                quantity: item.quantity,
            })),
            totalPrice: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
        };

        try {
            setLoading(true);

            const response = await fetch('http://localhost:3005/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.token}`,
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json()

            if (response.ok) {
                alert('Order created successfully')
                clearCart()
                localStorage.removeItem('cart')
                console.log('Order ID:', data._id);
                navigate('/home')
            } else {
                setError(data.message || 'Failed to create order')
            }
        } catch (error) {
            console.error('Error making payment:', error)
            setError('Error processing payment')
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setPaymentData({
            ...paymentData,
            [name]: value
        });
    };

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Checkout</h1>
            {error && <p className="error-message">{error}</p>}

            <div className="payment-form-container">
                <h2>Enter your payment details</h2>
                <form className="payment-form">
                    <div className="input-group">
                        <label>Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={paymentData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9876 5432"
                        />
                    </div>

                    <div className="input-group">
                        <label>Expiration Date</label>
                        <input
                            type="month"
                            name="expirationDate"
                            value={paymentData.expirationDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                        />
                    </div>

                    <div className="input-group">
                        <label>CVV</label>
                        <input
                            type="text"
                            name="cvv"
                            value={paymentData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                        />
                    </div>

                    <div className="input-group">
                        <label>Card Holder Name</label>
                        <input
                            type="text"
                            name="cardHolder"
                            value={paymentData.cardHolder}
                            onChange={handleInputChange}
                            placeholder="Sr. Johnson"
                        />
                    </div>
                </form>
            </div>

            <div className="checkout-buttons">
                <button className="pay-now-btn" onClick={handlePayment} disabled={loading}>
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
                <button className="back-home-btn" onClick={() => navigate('/home')}>Back to Home</button>
            </div>
        </div>
    )
}

export default Checkout;
