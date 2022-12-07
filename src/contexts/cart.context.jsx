import { createContext, useState, useLayoutEffect } from "react";
import { useReducer } from "react";

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
    setIsCartOpen: () => {},
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

// Initial state stores readable values
const INITIAL_STATE = {
    isCartOpen: true,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:

            return{
                ...state,
                ...payload
            }

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            
            return{
                ...state,
                isCartOpen: payload
            }
            
        default: throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}



export const CartProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const {cartItems, isCartOpen, cartCount, cartTotal} = state


    
    const updateCartItemsReducer = (newCartItems) => {
        const newCartTotal = newCartItems.reduce((acc, el) => acc + el.price * el.quantity, 0)
        // const newPrice = newCartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)

        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}})
        /*
            generate newCartTotal
            
            generate newCartCount

            dispatch new action with payload = {
                newCartItem,
                newCartTotal,
                newCartCount
            }
            
        */
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = (addCartItem(cartItems, productToAdd))
        updateCartItemsReducer(newCartItems)
    }

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = (removeCartItem(cartItems, cartItemToRemove))
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = (clearCartItem(cartItems, cartItemToClear))
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool })
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, cartItems, clearItemFromCart, cartCount, cartTotal }

    return(
        <CartContext.Provider value={value} >{children}</CartContext.Provider>
    )
}

