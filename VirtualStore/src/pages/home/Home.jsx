import { useCart } from "../../context/CartContext";

const Home = () => {
    const { addToCart } = useCart()

    const products = [
        { id: 1, name: "Product 1", price: 10, image: 'product1' },
        { id: 2, name: "Product 2", price: 25, image: 'product 2' },
        { id: 3, name: "Product 3", price: 10, imagen: 'product 3' },
    ]

    return (
        <div>
            <h2>Products</h2>
            <div className="products">
                {products.map((product) => (
                    <div key={product.id} className="product">
                        <h3>{product.name}</h3>
                        <p>Precio: ${product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home