import { Route, Routes } from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.actions';
import { useDispatch } from 'react-redux';
import './shop.styles.scss'
import { useEffect } from 'react';

const Shop = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const getCategories = async () => {
            const categoriesArray = await getCategoriesAndDocuments()
            // console.log(categoriesArray)
            dispatch(setCategories(categoriesArray))
        }
        getCategories()
      }, [])

      
    return(
       <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=":category" element={<Category />} />
       </Routes>
    )
}

export default Shop;