import { useMemo, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box, Popover, ButtonGroup } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
    const { cart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = useCart()
    const { authState } = useAuth()
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null)

    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    const name = authState.user ? authState.user.name : 'User'

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <AppBar
            position="sticky"
            sx={{
                marginBottom: 2,
                backgroundImage: 'url("https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="img/Logo Alienigena Marca Blanco y Negro.png"
                        alt="logo"
                        style={{ width: '150px', marginRight: '16px', borderRadius: '40% 40%' }}
                    />
                    <Button
                        color="error"
                        onClick={() => {
                            localStorage.removeItem('user');
                            navigate('/');
                        }}
                        startIcon={<LogoutIcon />}
                        sx={{
                            marginLeft: '20px',
                            color: 'white',
                            backgroundColor: 'red',
                            '&:hover': { backgroundColor: 'darkred', color: 'white' }
                        }}
                    >
                        Logout
                    </Button>
                </Box>
                <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'center', color: 'white', fontFamily: 'fantasy', fontSize: '50px' }}>
                    Welcome, {name}!
                </Typography>

                <Button variant="contained" onClick={() => navigate("/profile/:userId")} sx={{ marginBottom: 0, marginRight: '10px' }}>
                    View My Profile
                </Button>

                <IconButton onClick={handleClick} sx={{ marginLeft: 2 }}>
                    <Badge badgeContent={cart.length} color="error">
                        <AddShoppingCartIcon sx={{ color: 'white' }} />
                    </Badge>
                </IconButton>
            </Toolbar>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{ maxWidth: '400px', width: 'auto' }}

            >
                <Box sx={{ padding: 6 }}>
                    {isEmpty ? (
                        <Typography variant="body2">Your cart is empty</Typography>
                    ) : (
                        <Box>
                            <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                                {cart.map((product) => (
                                    <Box key={product._id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>

                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="body2">{product.name}</Typography>
                                            <Typography variant="body2">{product.price}€</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <ButtonGroup size="medium" sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>

                                                    <Button onClick={() => decreaseQuantity(product._id)} variant="contained" color="success">-</Button>
                                                    <Typography variant="body2" marginLeft={2} marginRight={2}>{product.quantity}</Typography>
                                                    <Button onClick={() => increaseQuantity(product._id)} variant="contained" color="success">+</Button>
                                                </ButtonGroup>
                                            </Box>
                                        </Box>
                                        <IconButton onClick={() => removeFromCart(product._id)}>
                                            <Typography variant="body2">X</Typography>
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                                <Typography variant="h6">Total: €{cartTotal.toFixed(2)}</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, marginTop: 2 }}>
                                    <Button onClick={clearCart} sx={{ width: '100%' }} variant="outlined" color="error">
                                        Clear Cart
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/checkout')}
                                        sx={{ width: '100%' }}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Checkout
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Popover>
        </AppBar>
    )
}
