import './checkout-item.styles.scss'
import { CartContext } from '../../contexts/cart.context'
import { useContext } from 'react'

const CheckoutItem = ({cartItem}) => {

    const { clearItemFromCart, addItemToCart, removeItemToCart } = useContext(CartContext)

    const handleClick = () => {
        clearItemFromCart(cartItem)
    }


    const {name, imageUrl, price, quantity} = cartItem

    const addItemHandler = () => addItemToCart(cartItem)
    const removeItemHandler = () => removeItemToCart(cartItem)
    return(
        <div className="checkout-item-container flex gap-5">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>

            <span className='name'>{name}</span>

            <span className='quantity flex gap-1'>
                <div className="arrow" onClick={removeItemHandler} >
                    <span>&#10094;</span>
                </div>
                <span>{quantity}</span> 
                <div className="arrow" onClick={addItemHandler} >
                    <span>&#10095;</span>
                </div>
            </span>

            <span className='price'>${price}</span>

            <div className="remove-button" onClick={handleClick}>
                &#10005;
            </div>
        </div>
    )
}

export default CheckoutItem