import { createContext, useState, useLayoutEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    // pass callback that receives each item in the array -> only returns cartitem if id value of cart item === productToAdd id value
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    )
    // If we find a match in cartItem return new array, if its ID is the same as product to add item id then we add 1 to the quantity if not we return the cartItem array
        if(existingCartItem){
            return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
            )
        }
    // return new array with modified cartItems / new cart item
    // If cart doesnt have existing cartItem = new product but we want existing cartItems that we have - what we add as an additional is the productToAdd and an additional quantity field.
    return[...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

    // Check if quantity is equal to 1, if it is remove that item from the cart.
    if(existingCartItem.quantity === 1){
        // keep the value of any cart item that does not equate to the id
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    } 

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1}: cartItem)
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    cartCount: 0,
    clearItemFromCart: () => {},
    cartTotal: 0,
})


export const CartProvider = ({children}) => {
    
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    // const [cartTotal, setCartTotal] = useState(0)

    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)

    // useLayoutEffect(() => {
    //     const newPrice = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
    //   return () => {
    //     setCartTotal(newPrice)
    //   };
    // }, [cartItems]);

    const total = cartItems.reduce((acc, el) => acc + el.price * el.quantity, 0)
    

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, cartItems, newCartCount, clearItemFromCart, total }

    return(
        <CartContext.Provider value={value} >{children}</CartContext.Provider>
    )
}