import CartProduct from '../../Components/CartProduct';
import { CartContext } from '../../Components/Layout';
import { useContext } from 'react';

export default function Cart() {
    const { cartItems, removeFromCart } = useContext(CartContext);

    const cartElements = cartItems.map((product) => {
        return (
          <CartProduct
            key={product.id}
            id={product.id}
            name={product.title}
            price={product.price}
            quantity={product.quantity}
            total={(product.total).toFixed(2)}
            img={product.image}
            remove={removeFromCart}
          />
        );
    })

    const totalOrderPrice = cartItems.reduce((acc, item) => {
      return acc += item.total;
    }, 0)
    
    return (
      <>
        <div className="cart-container">
          <h1>Order Summary</h1>
          {cartElements}
          <div className='cart-summary'>
            <div>Total: ${(totalOrderPrice).toFixed(2)}</div>
            <button>Checkout</button>
          </div>
        </div>
      </>
    );
}