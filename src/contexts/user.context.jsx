import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer.utilis";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";


// Default value - (actual value you want to access)
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

// No longer use useState to store the value we use a reducer
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

// Reducer function
const userReducer = (state, action) => {
    console.log(`dispatched`)
    console.log(action)
    /* On action, only two options -> type & payload
    Payload stores the value on what to set the value to */
    const {type, payload} = action;
    
    switch(type){
        /* If type is of string SET_CURRENT_USER  */
        case USER_ACTION_TYPES.SET_CURRENT_USER: 
            return{
                /* Spread through other values so it only changes necessary ones */ 
                ...state,
                currentUser: payload
            }
        /* If we are keeping track of a value
        case 'increment':
            return{
                value: state.value + 1
        } */
        default:
        /* Fall back Function */
        throw new Error(`Unhandled type ${type} in userReducer`)
    }
    // return{
    //     currentUser: payload
    // }
}

const INITIAL_STATE = {
    currentUser: null
}


export const UserProvider = ({children}) => {
    // Any of child components can access the value anywhere inside the component tree
    // const [currentUser, setCurrentUser] = useState(null);
    // const value = {currentUser, setCurrentUser}

    // State object - current state & second is a dispatch function - passed through userReducer to change state accordingly
    const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE)
    const { currentUser } = state
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
    }
    
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

    const value = {currentUser, setCurrentUser}

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

/*

const userReducer = (state, action) => {
    return{
        currentUser: null
    }
}



*/