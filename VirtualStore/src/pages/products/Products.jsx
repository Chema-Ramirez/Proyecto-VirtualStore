import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import Cart from '../../components/cart/Cart'

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cart, addToCart } = useCart()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3005/api/products');
                if (!response.ok) {
                    throw new Error('Error getting products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="row mt-5">
            {products.length > 0 ? (
                products.map((product) => {
                    const isInCart = cart.some(item => item._id === product._id)

                    return (
                        <Cart
                            key={product._id}
                            product={product}
                            addToCart={addToCart}
                            cart={cart}
                            isInCart={isInCart}
                        />
                    )
                })
            ) : (
                <p>No products available</p>
            )}
        </div>
    )
}

export default Products
