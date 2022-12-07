
import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.style.jsx'
import { useContext } from 'react'
import { CartContext } from '../../../contexts/cart.context'

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, newCartCount } = useContext(CartContext)
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{newCartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon