import './category.styles.scss'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card.component'
import { useContext, useEffect } from 'react'
import { CategoriesContext } from '../../contexts/categories.context'
import { useState } from 'react'

const Category = () => {
    const {category} = useParams()
    const {categoriesMap} = useContext(CategoriesContext)

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