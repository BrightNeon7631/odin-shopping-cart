import { useLoaderData } from 'react-router-dom';
import { getProducts } from '../../api';
import ProductElement from '../../Components/ProductElement';

export function loader() {
    return getProducts();
}

export default function Store() {
    const products = useLoaderData();

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
        <>
            <h1>Store Page!</h1>
            <div className='products-container'>
                {productElements}
            </div>
        </>
        
    )
}