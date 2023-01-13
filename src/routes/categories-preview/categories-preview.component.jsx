
import { CategoriesContext } from '../../contexts/categories.context'
import { useContext } from 'react'
import CategoryPreview from '../../components/category-preview/category-preview.component'
import { useSelector } from 'react-redux'
import { categoriesSelector } from '../../store/categories/category.selectors'

const CategoriesPreview = () => {
    const categoriesMap = useSelector(categoriesSelector)
    console.log(categoriesMap)
    // const { categoriesMap } = useContext(CategoriesContext)
    
    return(
        <>
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title]

                    return (
                    <CategoryPreview key={title} title={title} products={products}/>
                    )
                })
            }
        </>
    )
}

export default CategoriesPreview;