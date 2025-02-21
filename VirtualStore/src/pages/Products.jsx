import { useState, useEffect } from 'react'
import { Box, Button, CircularProgress, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useCart } from '../context/CartContext'

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const { cart, addToCart } = useCart()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3005/api/products')
                if (!response.ok) {
                    throw new Error('Error getting products')
                }
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.error('Error:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container spacing={4}>
            {products.map((product) => {
                const isInCart = cart.some((item) => item._id === product._id)
                return (
                    <Grid item xs={12} sm={6} md={3} key={product._id}>
                        <Card sx={{ height: '100%', borderRadius: '40px ' }}>
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image={product.imageUrl}
                                    alt={product.name}
                                    sx={{
                                        transition: '0.3s',
                                        '&:hover': {
                                            opacity: 0,
                                        }
                                    }}
                                />
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image={product.imageUrl2}
                                    alt={product.name}
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        transition: '0.3s',
                                        opacity: 0,
                                        '&:hover': {
                                            opacity: 1,
                                        }
                                    }}
                                />
                            </Box>
                            <CardContent>
                                <Typography variant="h6" component="div">{product.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{product.price.toFixed(2)}€</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => addToCart(product)}
                                    disabled={isInCart}
                                    sx={{ marginTop: 1, backgroundColor: "#2E7D32" }}
                                >
                                    {isInCart ? 'In Cart' : 'Add to Cart'}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default Products
