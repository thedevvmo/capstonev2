import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, signOutUser } from "../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";


// Default value - (actual value you want to access)
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})


export const UserProvider = ({children}) => {
    // Any of child components can access the value anywhere inside the component tree
    const [currentUser, setCurrentUser] = useState(null);
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

// Use it to wrap the children
{/* <UserProvider>
    <App />
</UserProvider> */}