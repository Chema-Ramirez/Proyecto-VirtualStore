import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import './Products.css'

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cart, addToCart } = useCart();

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

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="products-container">
            {products.length > 0 ? (
                products.map((product) => {
                    const isInCart = cart.some(item => item._id === product._id);
                    return (
                        <div key={product._id} className="product-card">
                            <img
                                src={product.image}
                                alt={product.name}
                            />
                            <div className="details">
                                <p>{product.name}</p>
                                <span>{product.price.toFixed(2)}€</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    disabled={isInCart}
                                >
                                    {isInCart ? 'In Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="no-products-message">No products available</p>
            )}
        </div>
    )
}

export default Products
