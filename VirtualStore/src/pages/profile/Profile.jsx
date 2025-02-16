import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const { authState, logout } = useAuth()
    const [userData, setUserData] = useState({
        name: authState.user?.name || '',
        email: authState.user?.email || '',
    });
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3005/users/${authState.user._id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            if (!response.ok) {
                throw new Error('Error loading data');
            }
            const data = await response.json()
            setUserData({
                name: data.name,
                email: data.email,
            });
        } catch (err) {
            console.error(err)
            setError('Error loading data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData()
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

        const updatedData = { name: userData.name, email: userData.email };

        try {
            const response = await fetch(`http://localhost:3005/users/${authState.user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Error updating data')
            }

            const updatedUser = await response.json();
            localStorage.setItem('user', JSON.stringify(updatedUser))

            setSuccessMessage('Data updated successfully!')

        } catch (err) {
            console.error(err)
            setError('Error updating data')
        }
    }

    const handleDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete your account? This action is irreversible.");

        if (!isConfirmed) {
            return
        }

        try {
            const response = await fetch(`http://localhost:3005/users/${authState.user._id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            if (!response.ok) {
                throw new Error('Error deleting account');
            }
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            logout()
            navigate('/')
        } catch (err) {
            console.error(err)
            setError('Error al eliminar la cuenta')
        }
    };

    const handleGoHome = () => {
        navigate('/home')
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            <h2>Perfil</h2>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}

            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update</button>
            </form>
            <button onClick={handleDelete}>Delete account</button>
            <button onClick={handleGoHome}>Back Home</button>
        </div>
    )
}

export default Profile
