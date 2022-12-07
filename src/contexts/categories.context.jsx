
import { createContext, useState, useEffect } from "react";
import SHOP_DATA from '../shop-data.js'
import { addCollectionAndDocuments, getCategoriesAndDocuments} from "../utils/firebase/firebase.utils.js";


// For any context we need the context value + provider

// Default value - (actual value you want to access)
export const CategoriesContext = createContext({
    categoriesMap: [],
})


export const CategoriesProvider = ({children}) => {
    // Any of child components can access the value anywhere inside the component tree
    // Whenever statechanges -> display user
    const [categoriesMap, setCategoriesMap] = useState({})

    // useEffect(() => {
    //     return () => {
    //         addCollectionAndDocuments('categories', SHOP_DATA)
    //     };
    // }, [])

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
    }, [])

    const value = { categoriesMap }

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}

