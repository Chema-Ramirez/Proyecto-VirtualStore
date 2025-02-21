import { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Button, TextField, Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
const theme = createTheme({
    palette: {
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#fff',
            secondary: '#b0b0b0',
        },
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
})


const Admin = () => {
    const [users, setUsers] = useState([])
    const [editUser, setEditUser] = useState({ name: '', email: '', id: '' })
    const [orders, setOrders] = useState([])
    const [editOrder, setEditOrder] = useState({ status: '', id: '' });
    const [products, setProducts] = useState([])
    const [newProductData, setNewProductData] = useState({ name: '', price: '', description: '', stock: '', imageUrl: '', imageUrl2: '' })
    const [editProduct, setEditProduct] = useState({ name: '', price: '', description: '', stock: '', imageUrl: '', imageUrl2: '', id: '' })
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            window.location.href = '/'
        }


        fetch('http://localhost:3005/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    setUsers([]);
                }
            })
            .catch((error) => console.log(error))


        fetch('http://localhost:3005/api/orders', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Orders data:', data)
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    setOrders([]);
                }
            })
            .catch((error) => console.log(error))


        fetch('http://localhost:3005/api/products', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]);
                }
            })
            .catch((error) => console.log(error))
    }, [token]);


    const handleEditUser = (user) => {
        setEditUser({ name: user.name, email: user.email, id: user._id });
    };


    const handleDeleteUser = (userId) => {
        fetch(`http://localhost:3005/users/${userId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                setUsers(users.filter((user) => user._id !== userId));
            })
            .catch((error) => console.log(error));
    };


    const handleUpdateUser = () => {
        if (!editUser.id) {
            alert('User ID is required!');
            return;
        }

        fetch(`http://localhost:3005/users/${editUser.id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: editUser.name,
                email: editUser.email,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    alert(data.message);
                } else {
                    alert('User updated successfully!');
                    setUsers(
                        users.map((user) =>
                            user._id === editUser.id ? { ...user, ...data } : user
                        )
                    );
                    setEditUser({ name: '', email: '', id: '' });
                }
            })
            .catch((error) => {
                console.error('Error updating user:', error);
                alert('Error updating user.');
            });
    };


    const handleDeleteOrder = (orderId) => {
        fetch(`http://localhost:3005/api/orders/${orderId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                setOrders(orders.filter((order) => order._id !== orderId))
            })
            .catch((error) => console.log(error));
    };


    const handleEditOrder = (order) => {
        setEditOrder({ status: order.status, id: order._id })
    };


    const handleUpdateOrder = () => {
        if (!editOrder.id) {
            alert('Order ID is required!');
            return;
        }

        fetch(`http://localhost:3005/api/orders/${editOrder.id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: editOrder.status,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    alert(data.message);
                } else {
                    alert('Order updated successfully!');
                    setOrders(
                        orders.map((order) =>
                            order._id === editOrder.id ? { ...order, ...data } : order
                        )
                    );
                    setEditOrder({ status: '', id: '' });
                }
            })
            .catch((error) => {
                console.error('Error updating order:', error);
                alert('Error updating order.');
            });
    };


    const handleCreateProduct = (e) => {
        e.preventDefault();

        const newProduct = {
            name: newProductData.name,
            price: newProductData.price,
            description: newProductData.description,
            stock: newProductData.stock,
            imageUrl: newProductData.imageUrl,
            imageUrl2: newProductData.imageUrl2,
        };

        fetch('http://localhost:3005/api/products', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data._id) {
                    alert('Product created successfully!')
                    setProducts((prevProducts) => [...prevProducts, data])
                    setNewProductData({ name: '', price: '', description: '', stock: '', imageUrl: '', imageUrl2: '' })
                } else {
                    alert('Error creating product.');
                }
            })
            .catch((error) => {
                console.error('Error creating product:', error);
                alert('Error creating product.')
            });
    };


    const handleDeleteProduct = (productId) => {
        fetch(`http://localhost:3005/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                setProducts(products.filter((product) => product._id !== productId));
            })
            .catch((error) => console.log(error));
    };


    const handleEditProduct = (product) => {
        setEditProduct({
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            imageUrl: product.imageUrl,
            imageUrl2: product.imageUrl2,
            id: product._id,
        })
    }


    const handleUpdateProduct = () => {
        if (!editProduct.id) {
            alert('Product ID is required!');
            return;
        }

        fetch(`http://localhost:3005/api/products/${editProduct.id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: editProduct.name,
                price: editProduct.price,
                description: editProduct.description,
                stock: editProduct.stock,
                imageUrl: editProduct.imageUrl,
                imageUrl2: editProduct.imageUrl2
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    alert(data.message);
                } else {
                    alert('Product updated successfully!');
                    setProducts(
                        products.map((product) =>
                            product._id === editProduct.id ? { ...product, ...data } : product
                        )
                    );
                    setEditProduct({ name: '', price: '', description: '', stock: '', imageUrl: '', imageUrl2: '', id: '' });
                }
            })
            .catch((error) => {
                console.error('Error updating product:', error);
                alert('Error updating product.');
            })
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <Drawer
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                            backgroundColor: '#1d1d1d',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Box sx={{ padding: 2, backgroundImage: 'url(https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <Typography variant="h4" color="textPrimary" fontFamily={'fantasy'}>Admin Panel</Typography>
                    </Box>
                    <List>
                        <ListItem
                            button
                            component="a"
                            href="#users"
                            sx={{
                                color: '#fff',
                                fontSize: '1.2rem',
                                '&:hover': {
                                    backgroundColor: 'ActiveCaption',
                                    color: '#8e44ad',
                                },
                            }}
                        >
                            <ListItemText primary="Users" />
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            href="#orders"
                            sx={{
                                color: '#fff',
                                fontSize: '1.2rem',
                                '&:hover': {
                                    backgroundColor: 'ActiveCaption',
                                    color: '#8e44ad',
                                },
                            }}
                        >
                            <ListItemText primary="Orders" />
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            href="#products"
                            sx={{
                                color: '#fff',
                                fontSize: '1.2rem',
                                '&:hover': {
                                    backgroundColor: 'ActiveCaption',
                                    color: '#8e44ad',
                                },
                            }}
                        >
                            <ListItemText primary="Products" />
                        </ListItem>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: '#121212',
                        color: 'text.primary',
                        padding: 3,
                        marginBottom: '50px',
                        backgroundImage: `url('https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed'
                    }}
                >
                    <AppBar position="sticky" sx={{ backgroundColor: '#000000', marginBottom: 5 }}>
                        <Toolbar>
                            <AdminPanelSettingsIcon sx={{ color: 'white', marginRight: 2, fontSize: 80 }} />
                            <Typography variant="h2" color="white" fontFamily={'fantasy'}>
                                ADMIN DASHBOARD
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Container>
                        <section id="users" style={{ marginBottom: '40px' }}>
                            <Typography variant="h3" fontFamily={'fantasy'}>Users</Typography>
                            <List>
                                {users.map((user) => (
                                    <ListItem
                                        key={user._id}
                                        sx={{
                                            border: '2px solid #fff',
                                            padding: 2,
                                            marginBottom: 2,
                                            borderRadius: 2,
                                        }}
                                    >
                                        <ListItemText primary={`${user.name} - ${user.email}`} />
                                        <Button variant="outlined" onClick={() => handleEditUser(user)}>Edit</Button>
                                        <Button variant="outlined" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                                    </ListItem>
                                ))}
                            </List>

                            {editUser.id && (
                                <Box sx={{ padding: 2 }}>
                                    <Typography variant="h4" fontFamily={'fantasy'}>Edit User</Typography>
                                    <form onSubmit={(e) => { e.preventDefault(); handleUpdateUser(); }}>
                                        <TextField
                                            label="Name"
                                            value={editUser.name}
                                            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                            InputProps={{
                                                sx: {
                                                    color: "#fff",
                                                    borderRadius: "20px",
                                                    "& label": {
                                                        borderColor: "white",
                                                        borderWidth: 1,
                                                    }
                                                },
                                            }}
                                        />
                                        <TextField
                                            label="Email"
                                            type="email"
                                            value={editUser.email}
                                            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                            InputProps={{
                                                sx: {
                                                    color: "#fff",
                                                    borderRadius: "20px",
                                                    "& label": {
                                                        color: "white",
                                                    }
                                                }
                                            }}
                                        />
                                        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                                            Update User
                                        </Button>
                                    </form>
                                </Box>
                            )}
                        </section>

                        <section id="orders" style={{ marginBottom: '40px' }}>
                            <Typography variant="h3" fontFamily={'fantasy'}>Orders</Typography>
                            <List>
                                {orders.map((order) => (
                                    <ListItem
                                        key={order._id}
                                        sx={{
                                            border: '2px solid #fff',
                                            padding: 2,
                                            marginBottom: 2,
                                            borderRadius: 2,
                                        }}
                                    >
                                        <ListItemText
                                            primary={`Order #${order._id}`}
                                            secondary={`Total: ${order.totalPrice}€`}
                                        />
                                        <Button variant="outlined" onClick={() => handleEditOrder(order)}>Edit Status</Button>
                                        <Button variant="outlined" onClick={() => handleDeleteOrder(order._id)}>Delete Order</Button>
                                    </ListItem>
                                ))}
                            </List>

                            {editOrder.id && (
                                <Box sx={{ padding: 2 }}>
                                    <Typography variant="h4" fontFamily={'fantasy'}>Edit Order Status</Typography>
                                    <form onSubmit={(e) => { e.preventDefault(); handleUpdateOrder(); }}>
                                        <TextField
                                            label="Order Status"
                                            value={editOrder.status}
                                            onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>Update Status</Button>
                                    </form>
                                </Box>
                            )}
                        </section>

                        <section id="products">
                            <Typography variant="h3" fontFamily={'fantasy'}>Products</Typography>
                            <form onSubmit={handleCreateProduct} className="new-product-form">
                                <Typography variant="h4">Create New Product</Typography>
                                <TextField
                                    label="Product Name"
                                    value={newProductData.name}
                                    onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Price"
                                    type="number"
                                    value={newProductData.price}
                                    onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Description"
                                    value={newProductData.description}
                                    onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={4}
                                />
                                <TextField
                                    label="Stock Quantity"
                                    type="number"
                                    value={newProductData.stock}
                                    onChange={(e) => setNewProductData({ ...newProductData, stock: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Image URL"
                                    value={newProductData.imageUrl}
                                    onChange={(e) => setNewProductData({ ...newProductData, imageUrl: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Image URL"
                                    value={newProductData.imageUrl2}
                                    onChange={(e) => setNewProductData({ ...newProductData, imageUrl2: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, marginBottom: 10 }}>Add Product</Button>
                            </form>

                            <List>
                                {products.map((product) => (
                                    <ListItem
                                        key={product._id}
                                        sx={{
                                            marginTop: 2,
                                            border: '2px solid #fff',
                                            padding: 2,
                                            marginBottom: 2,
                                            borderRadius: 2,
                                        }}
                                    >
                                        <ListItemText
                                            primary={product.name}
                                            secondary={`Price: ${product.price}€, Stock: ${product.stock}`}
                                        />
                                        <Button variant="outlined" onClick={() => handleEditProduct(product)}>Edit</Button>
                                        <Button variant="outlined" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                                    </ListItem>
                                ))}
                            </List>

                            {editProduct.id && (
                                <Box sx={{ padding: 2, marginTop: 5 }}>
                                    <Typography variant="h4" fontFamily={'fantasy'}>Edit Product</Typography>
                                    <form onSubmit={(e) => { e.preventDefault(); handleUpdateProduct(); }}>
                                        <TextField
                                            label="Product Name"
                                            value={editProduct.name}
                                            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Price"
                                            type="number"
                                            value={editProduct.price}
                                            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Description"
                                            value={editProduct.description}
                                            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                            multiline
                                            rows={4}
                                        />
                                        <TextField
                                            label="Stock Quantity"
                                            type="number"
                                            value={editProduct.stock}
                                            onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Image URL"
                                            value={editProduct.imageUrl}
                                            onChange={(e) => setEditProduct({ ...editProduct, imageUrl: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Image URL"
                                            value={editProduct.imageUrl2}
                                            onChange={(e) => setEditProduct({ ...editProduct, imageUrl2: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>Update Product</Button>
                                    </form>
                                </Box>
                            )}
                        </section>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Admin;