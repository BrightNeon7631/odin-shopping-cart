import { 
    useState, 
    Suspense,
    useContext
} from 'react';
import { 
    useLoaderData, 
    Await, 
    defer, 
    NavLink 
} from 'react-router-dom';
import { getProduct } from '../../api';
import { 
    FaMinus, 
    FaPlus, 
    FaShoppingCart,
    FaChevronLeft
} from 'react-icons/fa';
import GridLoader from 'react-spinners/GridLoader';
import { CartContext } from '../../Components/Layout';

export function loader({ params }) {
    return defer({ product: getProduct(params.id) });
}

export default function Product() {
    const loaderDataPromise = useLoaderData();
    const { addToCart } = useContext(CartContext);
    const [inputValue, setInputValue] = useState(1);

    function handleInputChange(e) {
        const { value } = e.target;
        value.length < 3 && value != 0 ? setInputValue(parseInt(value, 10)) : null;
    }

    function handleMinusButton() {
        setInputValue((prevState) => {
            return prevState != 1 ? prevState - 1 : prevState;
        })
    }

    function handlePlusButton() {
        setInputValue((prevState) => {
            return prevState != 99 ? prevState + 1 : prevState;
        })
    }

    function handleAddButton() {
        Promise.resolve(loaderDataPromise.product)
        .then((obj) => {
            addToCart(obj, inputValue);
        })
    }

    function renderProduct(product) {
      return (
        <>
          <NavLink 
            to='..'
            relative='path'
            className="return-link"
          >
            <FaChevronLeft /> Return to all products
          </NavLink>
          <div className="product-detail">
            <img className="product-detail-img" src={product.imageUrl} />
            <div className="product-detail-right">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <h2>${product.price}</h2>
              <div className="product-detail-cart-container">
                <div className="product-detail-cart-increment">
                  <FaMinus
                    className="increment-icon"
                    onClick={handleMinusButton}
                  />
                  <input
                    value={inputValue}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <FaPlus
                    className="increment-icon"
                    onClick={handlePlusButton}
                  />
                </div>
                <button className="product-detail-cart-button" onClick={handleAddButton}>
                  <FaShoppingCart /> Add to cart
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
        <Suspense fallback={<GridLoader className='loading' color='#ff7d1a' />}>
            <Await resolve={loaderDataPromise.product}>
                {renderProduct}
            </Await>
        </Suspense>
    )
}