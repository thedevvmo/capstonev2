import { createContext, useState, useEffect, useReducer } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";


// Default value - (actual value you want to access)
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})


export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

export const userReducer = (state, action) => {

    const { type, payload } = action
    
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: payload
            }
        default: throw new Error(`Unhandled type ${type} in userReducer`)
    }
}

const INITIAL_STATE = {
    currentUser: null
}


export const UserProvider = ({children}) => {
const [ {currentUser}, dispatch ] = useReducer(userReducer, INITIAL_STATE);
        
// Any of child components can access the value anywhere inside the component tree


    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
    }

    const value = {currentUser, setCurrentUser}
    
    // Whenever statechanges -> display user
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        }) 
        return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
