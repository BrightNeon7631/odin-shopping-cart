import { useLoaderData } from 'react-router-dom';
import { getProduct } from '../../api';

export function loader({ params }) {
    return getProduct(params.id);
}

export default function Product() {
    const product = useLoaderData();
    return (
        <div>
            <h1>Product Page!</h1>
            <h2>{product.name}</h2>
            <h2>{product.price}</h2>
        </div>
    )
}