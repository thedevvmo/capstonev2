import { createAction } from "../../utils/firebase/reducer.utils"
import { CATEGORIES_ACTION_TYPES } from "./category.types"

export const setCategories = (categoriesArray) => {
   return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)
}

