import { useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import './Header.css'

export default function Header() {
    const { cart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = useCart();
    const { authState } = useAuth()
    const navigate = useNavigate();

    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

    const name = authState.user ? authState.user.name : 'User'

    return (
        <header>
            <div>
                <img src="img/Logo Alienigena Marca Blanco y Negro.png" alt="logo image" />
                <p className="welcome-message">Welcome, {name}!</p>
                <button onClick={() => navigate('/')}>Logout</button>
            </div>

            <div className="cart-container">
                <img src="/img/carrito.png" alt="cart" />
                <div>
                    {isEmpty ? (
                        <p>Cart is empty</p>
                    ) : (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(product => (
                                        <tr key={product._id}>
                                            <td><img src={`/img/${product.image}.jpg`} alt={product.name} /></td>
                                            <td>{product.name}</td>
                                            <td>{product.price}€</td>
                                            <td>
                                                <button onClick={() => decreaseQuantity(product._id)}>-</button>
                                                {product.quantity}
                                                <button onClick={() => increaseQuantity(product._id)}>+</button>
                                            </td>
                                            <td>
                                                <button onClick={() => removeFromCart(product._id)}>X</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p>Total: €{cartTotal}</p>
                            <button onClick={() => navigate("/checkout")}>Pay</button>
                        </>
                    )}
                    <button onClick={clearCart}>Empty Cart</button>
                </div>
            </div>
        </header>
    )
}
