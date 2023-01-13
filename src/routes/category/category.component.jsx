import './category.styles.scss'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card.component'
import { useEffect } from 'react'
import { useState } from 'react'
import { categoriesSelector } from '../../store/categories/category.selectors'
import { useSelector } from 'react-redux'

const Category = () => {
    const categoriesMap = useSelector(categoriesSelector)
    const {category} = useParams()
    // const {categoriesMap} = useContext(CategoriesContext)

    const [products, setProducts] = useState(categoriesMap[category])
    
    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <>
        <h2 className='title text-black font-bold mx-auto text-center'>{category.toLocaleUpperCase()}</h2>
        <div className="category-container">
            {products && products.map((product) =>  <ProductCard key={product.id} product={product} />)}
        </div>
        </>
    )
}

export default Category