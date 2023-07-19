import { useState, Suspense } from 'react';
import { useLoaderData, Await, defer } from 'react-router-dom';
import { getProduct } from '../../api';
import { 
    FaMinus, 
    FaPlus, 
    FaShoppingCart
} from 'react-icons/fa';
import GridLoader from 'react-spinners/GridLoader';

export function loader({ params }) {
    return defer({ product: getProduct(params.id) });
}

export default function Product() {
    const loaderDataPromise = useLoaderData();
    const [inputValue, setInputValue] = useState(1);

    function handleInputChange(e) {
        const { value } = e.target;
        value.length < 3 ? setInputValue(parseInt(value, 10)) : null;
    }

    function handleMinusButton() {
        setInputValue((prevState) => {
            return prevState != 0 ? prevState - 1 : prevState;
        })
    }

    function handlePlusButton() {
        setInputValue((prevState) => {
            return prevState != 99 ? prevState + 1 : prevState;
        })
    }

    function renderProduct(product) {
      return (
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
                <FaPlus className="increment-icon" onClick={handlePlusButton} />
              </div>
              <button className="product-detail-cart-button">
                <FaShoppingCart /> Add to cart
              </button>
            </div>
          </div>
        </div>
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