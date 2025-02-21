import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { useAuth } from '../context/AuthContext'

const OrderSummary = () => {
    const { orderId } = useParams()
    const { authState } = useAuth();
    const [orderDetails, setOrderDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3005/api/orders/${orderId}`, {
                    headers: {
                        'Authorization': `Bearer ${authState.token}`,
                    },
                })

                if (response.ok) {
                    const data = await response.json();
                    setOrderDetails(data);
                } else {
                    console.error('Failed to fetch order details');
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setLoading(false)
            }
        }

        fetchOrderDetails();
    }, [orderId, authState.token])

    if (loading) {
        return (
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4">Loading...</Typography>
            </Box>
        )
    }

    if (!orderDetails) {
        return (
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4">Order not found</Typography>
            </Box>
        )
    }

    const { products, totalPrice } = orderDetails

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
                <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center', fontFamily: 'fantasy', color: 'black' }}>
                    Order Summary
                </Typography>

                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h4" sx={{ marginBottom: 2, color: 'black', fontFamily: 'fantasy' }}>
                        Order Details
                    </Typography>

                    <Typography variant="h6" sx={{ marginBottom: 2, color: 'black' }}>
                        <strong>Order ID:</strong> {orderDetails._id}
                    </Typography>

                    <Typography variant="h6" sx={{ marginBottom: 2, color: 'black' }}>
                        <strong>Products:</strong>
                    </Typography>

                    {products.map((item) => (
                        <Box key={item.product._id} sx={{ marginBottom: 2, color: 'black' }}>
                            <Typography variant="body1">
                                {item.product.name} (x{item.quantity}) - {item.product.price * item.quantity}€
                            </Typography>
                        </Box>
                    ))}

                    <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold', color: 'black' }}>
                        <strong>Total Price:</strong> {totalPrice}€
                    </Typography>

                    <Box sx={{ marginTop: 3 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => navigate('/home')}
                            sx={{
                                backgroundColor: '#5DA3DE',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#1F4A6E',
                                },
                            }}
                        >
                            Back to Home
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default OrderSummary
