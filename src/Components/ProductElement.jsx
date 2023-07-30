/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
export default function ProductElement(props) {
    return (
        <Link
            to={`${props.id}`}
            className='product-element'
            state = {{ priceState: props.priceState }}
        >
            <img className='product-element-img' src={props.img}/>
            <div className='product-element-text'>
                <div className='product-element-title'>{props.name}</div>
                <div className='product-element-price'>${props.price}</div>
            </div>
        </Link>
    )
}