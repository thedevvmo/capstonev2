
import './category-item.style.scss'

const CategoryItem = ({categories}) => {

    const {imageUrl, title} = categories
    return(
        <div className="category-container">
            <div className='background-image' style={{background: `url(${imageUrl})`}}></div>
                <div className='category-body-container'>
                    <h1>{title}</h1>
                    <p>Shop Now</p>
                </div>
        </div>
    )
}

export default CategoryItem