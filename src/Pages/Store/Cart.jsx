import CartProduct from '../../Components/CartProduct';
import { CartContext } from '../../Components/Layout';
import { useContext } from 'react';

export default function Cart() {
    const { cartItems, removeFromCart, totalOrderPrice } = useContext(CartContext);

    const cartElements = cartItems.map((product) => {
        return (
          <CartProduct
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            total={product.total}
            img={product.imageUrl}
            remove={removeFromCart}
          />
        );
    })
    
    return (
      <>
        <div className="cart-container">
          <h1>Order Summary</h1>
          {cartElements}
          <div className='cart-summary'>
            <div>Total: ${totalOrderPrice}</div>
            <button>Checkout</button>
          </div>
        </div>
      </>
    );
}