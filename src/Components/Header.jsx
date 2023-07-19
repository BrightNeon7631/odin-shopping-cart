import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useContext } from 'react';
import { CartContext } from './Layout';

export default function Header() {
    const { cartItems } = useContext(CartContext);

    const activeStyle = {
        color: '#ff7d1a'
    }

    return (
      <header>
        <NavLink to="/" className="nav-home">
          Store Name
        </NavLink>
        <div className="nav-right">
          <NavLink
            to="store"
            end
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Products
          </NavLink>
          <NavLink
            to="store/cart"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            <FaShoppingCart className="icon" />
            <span>{cartItems.length}</span>
          </NavLink>
        </div>
      </header>
    );
}