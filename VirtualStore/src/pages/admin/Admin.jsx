import { useState, useEffect } from 'react';
import './Admin.css'

const Admin = () => {
    const [users, setUsers] = useState([])
    const [editUser, setEditUser] = useState({ name: '', email: '', id: '' })
    const [orders, setOrders] = useState([])
    const [editOrder, setEditOrder] = useState({ status: '', id: '' });
    const [products, setProducts] = useState([])
    const [newProductData, setNewProductData] = useState({ name: '', price: '', description: '', stock: '', imageUrl: '' })
    const [editProduct, setEditProduct] = useState({ name: '', price: '', description: '', stock: '', imageUrl: '', id: '' })
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
            .catch((error) => console.log(error));


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
                    setNewProductData({ name: '', price: '', description: '', stock: '', imageUrl: '' })
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
                    setEditProduct({ name: '', price: '', description: '', stock: '', imageUrl: '', id: '' });
                }
            })
            .catch((error) => {
                console.error('Error updating product:', error);
                alert('Error updating product.');
            })
    }


    return (
        <div className="admin-container">
            <div className="sidebar">
                <h2>Admin Panel</h2>
                <ul>
                    <li><a href="#users">Users</a></li>
                    <li><a href="#orders">Orders</a></li>
                    <li><a href="#products">Products</a></li>
                </ul>
            </div>

            <div className="content">
                <section id="users">
                    <h2>Users</h2>
                    <ul>
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((user) => (
                                <li key={user._id}>
                                    {user.name} - {user.email}
                                    <button onClick={() => handleEditUser(user)}>Edit</button>
                                    <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                </li>
                            ))
                        ) : (
                            <li>No users available</li>
                        )}
                    </ul>

                    {editUser.id && (
                        <div className="edit-form-container">
                            <h2>Edit User</h2>
                            <form onSubmit={(e) => { e.preventDefault(); handleUpdateUser(); }}>
                                <input
                                    type="text"
                                    value={editUser.name}
                                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                    placeholder="Name"
                                    required
                                />
                                <input
                                    type="email"
                                    value={editUser.email}
                                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                    placeholder="Email"
                                    required
                                />
                                <button type="submit">Update User</button>
                            </form>
                        </div>
                    )}
                </section>

                <section id="orders">
                    <h2>Orders</h2>
                    <ul>
                        {orders.map((order) => (
                            <li key={order._id}>
                                <h3>Order #{order._id}</h3>
                                <p><strong>User:</strong> {order.user ? order.user.name : 'Unknown'} (Email: {order.user ? order.user.email : 'N/A'})</p>
                                <h4>Products:</h4>
                                <ul>
                                    {order.products.map((productItem) => (
                                        <li key={productItem.product._id}>
                                            {productItem.product.name} - Quantity: {productItem.quantity} - Price: {productItem.product.price}€
                                        </li>
                                    ))}
                                </ul>
                                <p><strong>Total Price:</strong> {order.totalPrice}€</p>
                                <p><strong>Status:</strong> {order.status}</p>
                                <button onClick={() => handleEditOrder(order)}>Edit Status</button>
                                <button onClick={() => handleDeleteOrder(order._id)}>Delete Order</button>
                            </li>
                        ))}
                    </ul>

                    {editOrder.id && (
                        <div className="edit-form-container">
                            <h2>Edit Order Status</h2>
                            <form onSubmit={(e) => { e.preventDefault(); handleUpdateOrder(); }}>
                                <input
                                    type="text"
                                    value={editOrder.status}
                                    onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}
                                    placeholder="Order Status"
                                    required
                                />
                                <button type="submit">Update Status</button>
                            </form>
                        </div>
                    )}
                </section>

                <section id="products">
                    <h2>Products</h2>
                    <form onSubmit={handleCreateProduct} className="new-product-form">
                        <h3>Create New Product</h3>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProductData.name}
                            onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newProductData.price}
                            onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={newProductData.description}
                            onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Stock Quantity"
                            value={newProductData.stock}
                            onChange={(e) => setNewProductData({ ...newProductData, stock: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={newProductData.imageUrl}
                            onChange={(e) => setNewProductData({ ...newProductData, imageUrl: e.target.value })}
                        />
                        <button type="submit">Add Product</button>
                    </form>

                    <ul>
                        {products.map((product) => (
                            <li key={product._id}>
                                {product.name} - {product.price}€ - Stock: {product.stock}
                                <button onClick={() => handleEditProduct(product)}>Edit</button>
                                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>

                    {editProduct.id && (
                        <div className="edit-form-container">
                            <h2>Edit Product</h2>
                            <form onSubmit={(e) => { e.preventDefault(); handleUpdateProduct(); }}>
                                <input
                                    type="text"
                                    value={editProduct.name}
                                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                    placeholder="Product Name"
                                    required
                                />
                                <input
                                    type="number"
                                    value={editProduct.price}
                                    onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                                    placeholder="Price"
                                    required
                                />
                                <textarea
                                    value={editProduct.description}
                                    onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                                    placeholder="Description"
                                    required
                                />
                                <input
                                    type="number"
                                    value={editProduct.stock}
                                    onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                                    placeholder="Stock Quantity"
                                    required
                                />
                                <input
                                    type="text"
                                    value={editProduct.imageUrl}
                                    onChange={(e) => setEditProduct({ ...editProduct, imageUrl: e.target.value })}
                                    placeholder="Image URL"
                                />
                                <button type="submit">Update Product</button>
                            </form>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default Admin
