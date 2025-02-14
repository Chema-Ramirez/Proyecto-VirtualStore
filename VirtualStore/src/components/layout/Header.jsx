import { useMemo } from 'react'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const { cart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = useCart();
    const navigate = useNavigate();

    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.png" alt="logo image" />
                        </a>
                    </div>
                    <nav className="col-md-6 mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="/img/carrito.png" alt="cart image" />
                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? (
                                    <p className="text-center">Cart is empty</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
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
                                                        <td>
                                                            <img
                                                                className="img-fluid"
                                                                src={`/img/${product.image}.jpg`}
                                                                alt="product image"
                                                            />
                                                        </td>
                                                        <td>{product.name}</td>
                                                        <td className="fw-bold">€{product.price}</td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => decreaseQuantity(product._id)}
                                                            >
                                                                -
                                                            </button>
                                                            {product.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => increaseQuantity(product._id)}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => removeFromCart(product._id)}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p className="text-end">Total pay: <span className="fw-bold">€{cartTotal}</span></p>
                                        <button
                                            className="btn btn-dark w-100 mt-3 p-2"
                                            onClick={() => navigate("/checkout")}
                                        >
                                            Pay
                                        </button>
                                    </>
                                )}
                                <button
                                    className="btn btn-dark w-100 mt-3 p-2"
                                    onClick={clearCart}
                                >
                                    Empty Cart
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
