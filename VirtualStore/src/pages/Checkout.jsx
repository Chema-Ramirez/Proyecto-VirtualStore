import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { TextField, Button, Box, Typography } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { useNavigate } from 'react-router-dom'

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
                console.log('Order ID:', data._id)
                navigate(`/user/${data._id}`)
            } else {
                setError(data.message || 'Failed to create order')
            }
        } catch (error) {
            console.error('Error making payment:', error)
            setError('Error processing payment')
        } finally {
            setLoading(false)
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
        <Box
            sx={{
                padding: 0,
                margin: 0,
                height: '100vh',
                width: '100vw',
                backgroundImage: 'url(https://images.unsplash.com/photo-1612864740469-d74de99c6037?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#fff',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    maxWidth: '500px',
                    width: '100%',
                }}
            >
                <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center', fontFamily: 'fantasy' }}>
                    <PaymentIcon sx={{ marginRight: 2, fontSize: 40, color: '#137c2c' }} />
                    Checkout
                </Typography>

                {error && (
                    <Typography variant="body1" sx={{ color: 'red', marginBottom: 2 }}>
                        {error}
                    </Typography>
                )}

                <Typography variant="h4" sx={{ marginBottom: 2, color: 'black', fontFamily: 'fantasy' }}>
                    Enter your payment details
                </Typography>
                <form>
                    <TextField
                        label="Card Number"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9876 5432"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label=""
                        name="expirationDate"
                        type="month"
                        value={paymentData.expirationDate}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="CVV"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Card Holder Name"
                        name="cardHolder"
                        value={paymentData.cardHolder}
                        onChange={handleInputChange}
                        placeholder="Sr. Johnson"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                </form>

                <Box sx={{ marginTop: 3 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handlePayment}
                        disabled={loading}
                        sx={{
                            backgroundColor: '#5DA3DE',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#1F4A6E',
                            },
                        }}
                    >
                        {loading ? 'Processing...' : 'Pay Now'}
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            marginTop: 2,
                            backgroundColor: '#0BAE7F',
                            '&:hover': {
                                backgroundColor: '#0F6C51',
                            },
                        }}
                        onClick={() => navigate('/home')}
                    >
                        Back to Home
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Checkout
