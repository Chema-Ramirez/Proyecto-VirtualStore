import { useEffect, useState } from 'react';
import Pages from './pages/index';
import { BrowserRouter as Router } from 'react-router-dom';
import Cart from './components/cart/Cart';
import Header from './components/layout/Header';
import './App.css';
import { db } from './data/db';
import { useCart } from './context/CartContext';

function App() {
  const { cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = useCart();

  const [data] = useState(db);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
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
          {data.map((guitar) => (
            <Cart
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
              cart={cart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">VirtualStore - Todos los derechos Reservados</p>
        </div>
      </footer>

      <Pages />
    </Router>
  );
}

export default App;
