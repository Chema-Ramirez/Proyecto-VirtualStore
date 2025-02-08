import { useState } from "react";

const Home = () => {
    const products = [
        { id: 1, name: "Product 1", price: 10 },
        { id: 2, name: "Product 2", price: 25 },
        { id: 3, name: "Product 3", price: 10 },
    ]
    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        setCart([...cart, product])
    }

    const calculateTotal = () => {
        return cart.reduce((acc, product) => acc + product.price, 0)
    }

    return (
        <div>
            <h2>Products</h2>
            <div className="products">
                {products.map((product) => (
                    <div key={product.id} className="product">
                        <h3>{product.name}</h3>
                        <p>Price: {product.price}€</p>
                        <button onClick={() => addToCart(product)}>Add to cart</button>
                    </div>
                ))}
            </div>
            <h3>Cart</h3>
            <div className="cart">
                {cart.length > 0 ? (
                    <div>
                        <ul>
                            {cart.map((product, index) => (
                                <li key={index}>
                                    {product.name} - {product.price}€
                                </li>
                            ))}
                        </ul>
                        <p>Total price: {calculateTotal()}€</p>
                    </div>
                ) : (
                    <p>Cart is empty</p>
                )}
            </div>
        </div>
    )
}

export default Home