import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, CircularProgress } from '@mui/material'
import Header from '../components/layout/Header'
import { useCart } from '../context/CartContext'
import Products from './Products'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import CopyrightIcon from '@mui/icons-material/Copyright'

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
    }, [navigate]);

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
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                padding: 3,
                backgroundImage: 'url(https://images.unsplash.com/photo-1595991209266-5ff5a3a2f008?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', // Imagen de fondo
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
        >
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                clearCart={clearCart}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                    textAlign: 'center',
                    color: 'white',
                }}
            >
                <CheckroomIcon sx={{ fontSize: 60, marginBottom: 2, backgroundColor: 'black', borderRadius: '20%' }} />
                <Typography variant="h8" sx={{ fontFamily: 'fantasy', fontSize: '45px', backgroundColor: 'black', borderRadius: '20%' }}>
                    Our Collection
                </Typography>
            </Box>
            <Products addToCart={addToCart} cart={cart} />
            <Box
                sx={{
                    padding: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    textAlign: 'center',
                    color: 'white',
                    mt: '16px',  // Esto empuja el footer al final del contenido
                }}
            >
                <Typography variant="body2">
                    Copyright
                    <CopyrightIcon sx={{ fontSize: 16, verticalAlign: 'middle' }} /> VirtualStore 2025
                </Typography>
            </Box>
        </Box>
    )
}

export default Home;
