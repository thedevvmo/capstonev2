

import CategoryPreview from '../../components/category-preview/category-preview.component'
import { useSelector } from 'react-redux'
import { categoriesSelector } from '../../store/categories/category.selectors'

const CategoriesPreview = () => {
    const categories = useSelector(categoriesSelector)
    // console.log(categories)
    // const { categoriesMap } = useContext(CategoriesContext)
    
    return(
        <>
            {
                Object.keys(categories).map((title) => {
                    const products = categories[title]

                    return (
                    <CategoryPreview key={title} title={title} products={products}/>
                    )
                })
            }
        </>
    )
}

export default CategoriesPreview;