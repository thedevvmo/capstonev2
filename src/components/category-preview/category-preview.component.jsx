import './category-preview.style.scss'
import { Link } from 'react-router-dom'
import ProductCard from '../product-card/product-card.component'

const CategoryPreview = ({title, products}) => {
    return(
        <div className="category-preview-container">
            <h2>
                <Link to={title} className='title mb-4'>{title.toUpperCase()}</Link>
            </h2>

            <div className="preview">
                {
                    products.filter((_ , index) => index < 4)
                    .map((product) => <ProductCard product={product} key={product.id} />)
                }
            </div>

        </div>
    )
    
}

export default CategoryPreview