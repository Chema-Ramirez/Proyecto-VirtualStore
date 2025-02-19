import { useState, useEffect } from 'react'

const Admin = () => {
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [editUser, setEditUser] = useState({ name: '', email: '', id: '' })
    const [newProductData, setNewProductData] = useState({ name: '', price: '', description: '', stock: '', imageUrl: '', });
    const [editProduct, setEditProduct] = useState({ name: '', price: '', description: '', stock: '', imageUrl: '', id: '' });
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
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    setOrders([]);
                }
            })
            .catch((error) => console.log(error));


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
        setEditUser({ name: user.name, email: user.email, id: user._id })
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
                setUsers(users.filter((user) => user._id !== userId))
            })
            .catch((error) => console.log(error))
    }


    const handleUpdateUser = () => {
        if (!editUser.id) {
            alert('User ID is required!')
            return
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
                    alert(data.message)
                } else {
                    alert('User updated successfully!')
                    setUsers(
                        users.map((user) =>
                            user._id === editUser.id ? { ...user, ...data } : user
                        )
                    );
                    setEditUser({ name: '', email: '', id: '' })
                }
            })
            .catch((error) => {
                console.error('Error updating user:', error)
                alert('Error updating user.')
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
                    alert('Product created successfully!');
                    setProducts((prevProducts) => [...prevProducts, data]); // Añadir el nuevo producto a la lista
                    setNewProductData({ name: '', price: '', description: '', stock: '', imageUrl: '' }); // Limpiar los campos del formulario
                } else {
                    alert('Error creating product.');
                }
            })
            .catch((error) => {
                console.error('Error creating product:', error);
                alert('Error creating product.');
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
        });
    };

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
            });
    };


    return (
        <div>
            <h1>Admin Panel</h1>
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
                <div>
                    <h2>Edit User</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleUpdateUser()
                        }}
                    >
                        <input
                            type="text"
                            value={editUser.name}
                            onChange={(e) =>
                                setEditUser({ ...editUser, name: e.target.value })
                            }
                            placeholder="Name"
                            required
                        />
                        <input
                            type="email"
                            value={editUser.email}
                            onChange={(e) =>
                                setEditUser({ ...editUser, email: e.target.value })
                            }
                            placeholder="Email"
                            required
                        />
                        <button type="submit">Update User</button>
                    </form>
                </div>
            )}

            <h2>Orders</h2>
            <ul>
                {Array.isArray(orders) && orders.length > 0 ? (
                    orders.map((order) => (
                        <li key={order._id}>Order #{order._id} - Status: {order.status}</li>
                    ))
                ) : (
                    <li>No orders available</li>
                )}
            </ul>


            <div>
                <h2>Create New Product</h2>
                <form onSubmit={handleCreateProduct}>
                    <input
                        type="text"
                        value={newProductData.name}
                        onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                        placeholder="Product Name"
                        required
                    />
                    <input
                        type="number"
                        value={newProductData.price}
                        onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
                        placeholder="Price"
                        required
                    />
                    <input
                        type="text"
                        value={newProductData.description}
                        onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                        placeholder="Description"
                        required
                    />
                    <input
                        type="number"
                        value={newProductData.stock}
                        onChange={(e) => setNewProductData({ ...newProductData, stock: e.target.value })}
                        placeholder="Stock"
                        required
                    />
                    <input
                        type="text"
                        value={newProductData.imageUrl}
                        onChange={(e) => setNewProductData({ ...newProductData, imageUrl: e.target.value })}
                        placeholder="Image URL"
                        required
                    />
                    <button type="submit">Create Product</button>
                </form>

                <h2>Products</h2>
                <ul>
                    {products.map((product) => (
                        <li key={product._id}>
                            {product.name} - {product.price} - {product.stock}
                            <button onClick={() => handleEditProduct(product)}>Edit</button>
                            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                        </li>
                    ))}
                </ul>

                {editProduct.id && (
                    <div>
                        <h2>Edit Product</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateProduct();
                        }}>
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
                            <input
                                type="text"
                                value={editProduct.description}
                                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                                placeholder="Description"
                                required
                            />
                            <input
                                type="number"
                                value={editProduct.stock}
                                onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                                placeholder="Stock"
                                required
                            />
                            <input
                                type="text"
                                value={editProduct.imageUrl}
                                onChange={(e) => setEditProduct({ ...editProduct, imageUrl: e.target.value })}
                                placeholder="Image URL"
                                required
                            />
                            <button type="submit">Update Product</button>
                        </form>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Admin
