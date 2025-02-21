import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import {
    Button,
    TextField,
    Typography,
    Box,
    Card,
    CardContent,
    Alert,
} from '@mui/material'

const Profile = () => {
    const { authState, logout } = useAuth()
    const [userData, setUserData] = useState({
        name: authState.user?.name || '',
        email: authState.user?.email || '',
    });
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()

    const fetchUserData = async () => {
        try {
            const response = await fetch(
                `http://localhost:3005/users/${authState.user._id}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Error loading data')
            }
            const data = await response.json()
            setUserData({
                name: data.name,
                email: data.email,
            });
        } catch (err) {
            console.error(err)
            setError('Error loading data')
        } finally {
            setLoading(false)
        }
    };

    const fetchUserOrders = async () => {
        try {
            const response = await fetch(
                `http://localhost:3005/api/orders/user/${authState.user._id}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Error loading orders')
            }
            const data = await response.json()
            setOrders(data)
        } catch (err) {
            console.error(err)
            setError('Error loading orders')
        }
    }

    useEffect(() => {
        fetchUserData()
        fetchUserOrders()
    }, [authState.user?._id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault()

        const updatedData = { name: userData.name, email: userData.email }

        try {
            const response = await fetch(
                `http://localhost:3005/users/${authState.user._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            if (!response.ok) {
                throw new Error('Error updating data');
            }

            const updatedUser = await response.json();
            localStorage.setItem('user', JSON.stringify(updatedUser));

            setSuccessMessage('Data updated successfully!');
        } catch (err) {
            console.error(err);
            setError('Error updating data');
        }
    };

    const handleDelete = async () => {
        const isConfirmed = window.confirm(
            'Are you sure you want to delete your account? This action is irreversible.'
        );

        if (!isConfirmed) {
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:3005/users/${authState.user._id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Error deleting account');
            }
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            logout();
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Error deleting account');
        }
    };

    const handleGoHome = () => {
        navigate('/home')
    };

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>
    }

    return (
        <Box
            sx={{
                backgroundImage:
                    'url("https://images.unsplash.com/photo-1595991209266-711c557ac7c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                color: '#fff',
                padding: 2,
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    color: 'white',
                    textShadow: '6px 6px 15px rgb(0, 0, 0)',
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'fantasy',
                }}
            >
                <AccountCircleIcon sx={{ marginRight: 2, fontSize: 50, color: 'black' }} />
                Profile
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}

            <Card sx={{ width: '100%', maxWidth: 800, marginBottom: 3, p: 2 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ color: '#137c2c', mb: 2, display: 'flex', alignItems: 'center' }}>
                        <ManageAccountsIcon sx={{ marginRight: 1, fontSize: 40 }} />
                        Update Profile
                    </Typography>
                    <form onSubmit={handleUpdate}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2, width: '100%' }}
                        >
                            Update
                        </Button>
                    </form>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                            sx={{ width: '45%' }}
                        >
                            Delete Account
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleGoHome}
                            sx={{ width: '45%' }}
                        >
                            Back Home
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ width: '100%', maxWidth: 800, marginTop: 3, p: 2 }}>
                <CardContent>
                    <Typography
                        variant="h5"
                        sx={{ color: '#137c2c', mb: 2, display: 'flex', alignItems: 'center' }}
                    >
                        <ShoppingBasketIcon sx={{ marginRight: 1, fontSize: 40 }} />
                        Your Orders
                    </Typography>
                    {orders.length === 0 ? (
                        <Typography>No orders found.</Typography>
                    ) : (
                        orders.map((order) => (
                            <Card sx={{ marginBottom: 2 }} key={order._id}>
                                <CardContent>
                                    <Typography variant="h6">Order #{order._id}</Typography>
                                    <Typography>Status: {order.status}</Typography>
                                    <Typography>Total Price: {order.totalPrice}€</Typography>
                                    <Typography>
                                        Ordered On: {new Date(order.createdAt).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </CardContent>
            </Card>
        </Box>
    )
}

export default Profile;
