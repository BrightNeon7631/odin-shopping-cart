import { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';
import { getProducts } from '../../api';
import ProductElement from '../../Components/ProductElement';
import GridLoader from 'react-spinners/GridLoader';

export function loader() {
    return defer({ products: getProducts()});
}

export default function Store() {
    const loaderDataPromise = useLoaderData();

    function renderProducts(products) {
        const productElements = products.map((product) => {
            return (
                <ProductElement 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    img={product.imageUrl}
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
        <h1>Store Page!</h1>
        <Suspense fallback={<GridLoader className='loading' color='#ff7d1a' />}>
          <Await resolve={loaderDataPromise.products}>{renderProducts}</Await>
        </Suspense>
      </>
    );
}