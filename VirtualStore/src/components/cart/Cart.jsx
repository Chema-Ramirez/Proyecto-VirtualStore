import { useCart } from "../../context/CartContext"
import PropTypes from 'prop-types';


export default function Cart({ product }) {
    const { _id, name, image, description, price, quantity } = product;
    const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, isProductInCart } = useCart()

    const isInCart = isProductInCart(_id)

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen producto" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">€{price}</p>

                {isInCart && (
                    <div>
                        <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={() => decreaseQuantity(_id)}
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button
                            type="button"
                            className="btn btn-light ms-2"
                            onClick={() => increaseQuantity(_id)}
                        >
                            +
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger mt-2 w-100"
                            onClick={() => removeFromCart(_id)}
                        >
                            Remove
                        </button>
                    </div>
                )}

                {!isInCart && (
                    <button
                        type="button"
                        className="btn btn-dark w-100 mt-2"
                        onClick={() => addToCart(product)}
                        disabled={isInCart}
                    >
                        {isInCart ? 'Already in cart' : 'Add to cart'}
                    </button>
                )}
            </div>
        </div>
    );
}

Cart.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    }).isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    increaseQuantity: PropTypes.func.isRequired,
    decreaseQuantity: PropTypes.func.isRequired,
    isInCart: PropTypes.bool.isRequired
};
