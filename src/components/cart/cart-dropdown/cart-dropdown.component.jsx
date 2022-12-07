
import {CartDropDownContainer, EmptyMessage, CartItems}  from './cart-dropdown.styles.jsx';
import Button from '../../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return(
        <CartDropDownContainer>
            <CartItems>
                {
                    cartItems.length ? cartItems.map(item => <CartItem key={item.id} cartItem={item} />) : <EmptyMessage>Your cart is empty!</EmptyMessage>
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler} >Checkout</Button>
        </CartDropDownContainer>
    )
}

export default CartDropdown;