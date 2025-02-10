import { useEffect, useState } from 'react'
import Cart from '../../components/cart/Cart'
import Header from '../../components/layout/Header'
import { db } from '../../data/db'
import { useCart } from '../../context/CartContext'

const Home = () => {
    const { cart, setCart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = useCart();
    const [data] = useState(db)


    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            setCart(JSON.parse(storedCart))
        }
    }, [setCart])


    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart])

    return (
        <>
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                clearCart={clearCart}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Our collection</h2>

                <div className="row mt-5">
                    {data.map((product) => (
                        <Cart
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                            cart={cart}
                        />
                    ))}
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">VirtualStore - All rights reserved</p>
                </div>
            </footer>
        </>
    )
}

export default Home
