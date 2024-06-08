import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { 
    createContext, 
    useState 
} from 'react';

export const CartContext = createContext(null);

export default function Layout() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product, quant) {
    setCartItems((prevState) => {
        const found = prevState.find(obj => obj.id === product.id);

        if (found) {
            const filterOutFound = prevState.filter(obj => obj.id != found.id);
            return [
                { ...found, quantity: found.quantity + quant, total: found.price * (found.quantity + quant) },
                ...filterOutFound
            ]
        }

        return [
            { ...product, quantity: quant, total: quant * product.price },
            ...prevState
        ]
    })
  }

  function removeFromCart(id) {
    setCartItems((prevState) => {
        return prevState.filter(obj => obj.id !== id);
    })
  }

  return (
    <div className="site-layout">
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
        <Header />
        <Outlet />
      </CartContext.Provider>
      <Footer />
    </div>
  );
}