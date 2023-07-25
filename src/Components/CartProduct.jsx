/* eslint-disable react/prop-types */
import { FaTrash } from 'react-icons/fa';
export default function CartProduct(props) {

    return (
        <div className='cart-product'>
            <img className='cart-product-img' src={props.img} />
            <div className='cart-product-info'>
                <div className='cart-product-title'>{props.name}</div>
                <div className='cart-product-bottom'>
                    <div className='cart-product-price'>${props.price}</div>
                    <div>x</div>
                    <div className='cart-product-quantity'>{props.quantity}</div>
                    <div className='cart-product-totalprice'>${props.total}</div>
                </div>
            </div>
            <FaTrash className='trash-icon' onClick={() => props.remove(props.id)} />
        </div>
    )
}