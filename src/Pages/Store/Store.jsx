import { Suspense } from 'react';
import { 
    useLoaderData,
    useSearchParams, 
    defer, 
    Await 
} from 'react-router-dom';
import { getProducts } from '../../api';
import ProductElement from '../../Components/ProductElement';
import GridLoader from 'react-spinners/GridLoader';
import { BiSolidDownArrow } from 'react-icons/bi';

export function loader() {
    return defer({ products: getProducts() });
}

export default function Store() {
    const loaderDataPromise = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const priceFilter = searchParams.get('price');

    function handlePriceFilterChange() {
        setSearchParams(prevParams => {
            if (priceFilter === null || priceFilter === 'desc') {
                prevParams.delete('price');
                prevParams.set('price', 'asc');
            } else if (priceFilter === 'asc') {
                prevParams.delete('price');
                prevParams.set('price', 'desc');
            }
            return prevParams;
        })
    }

    function renderProducts(products) {
        const displayedProducts = (() => {
            let sortedArray = [];
            if (priceFilter === 'asc') {
                sortedArray = [...products].sort((a, b) => a.price - b.price);
            } else if (priceFilter === 'desc') {
                sortedArray = [...products].sort((a, b) => b.price - a.price);
            } else {
                return products;
            }
            return sortedArray;
        })


        const productElements = displayedProducts().map((product) => {
            return (
                <ProductElement 
                    key={product.id}
                    id={product.id}
                    name={product.title}
                    price={product.price}
                    img={product.image}
                    priceState={`?${searchParams.toString()}`}
                />
            )
        })
        
        return (
            <div className='products-container'>
                {productElements}
            </div>
        )
    }

    return (
        <>
            <div
                className="sort-price"
                onClick={handlePriceFilterChange}
            >
                <div>SORT PRICE</div>
                <BiSolidDownArrow
                    className={priceFilter === 'asc' ? 'price-asc' : 'price-desc'}
                />
            </div>
            <Suspense fallback={<GridLoader className="loading" color="#0074B7" />}>
                <Await resolve={loaderDataPromise.products}>{renderProducts}</Await>
            </Suspense>
        </>
    );
}