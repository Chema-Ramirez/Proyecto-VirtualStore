import { useState, useEffect } from 'react'

const Admin = () => {
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [editUser, setEditUser] = useState({ name: '', email: '', id: '' })
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            window.location.href = '/'
        }

        // Fetch users
        fetch('http://localhost:3005/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setUsers(data)
                } else {
                    setUsers([])
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
                if (Array.isArray(data)) {
                    setOrders(data)
                } else {
                    setOrders([])
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
                    setProducts([])
                }
            })
            .catch((error) => console.log(error))
    }, [token])

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
                    setUsers(users.map((user) => (user._id === editUser.id ? { ...user, ...data } : user)))
                    setEditUser({ name: '', email: '', id: '' })
                }
            })
            .catch((error) => {
                console.error('Error updating user:', error)
                alert('Error updating user.')
            })
    }


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

            <h2>Products</h2>
            <ul>
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => (
                        <li key={product._id}>
                            {product.name} - ${product.price}
                        </li>
                    ))
                ) : (
                    <li>No products available</li>
                )}
            </ul>
        </div>
    )
}

export default Admin
